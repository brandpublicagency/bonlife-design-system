import { createServerFn } from "@tanstack/react-start";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { streamText, NoObjectGeneratedError, Output, type LanguageModel } from "ai";
import { z } from "zod";
import type { Database } from "@/integrations/supabase/types";
import { requireSupabaseAdmin } from "@/integrations/supabase/admin-middleware";

// Reads (listKbSections) are public via the server publishable client.
// Writes (create/update/delete/reorder/extract) require an authenticated
// admin - enforced by `requireSupabaseAdmin` middleware AND by RLS on
// `public.kb_sections` (INSERT/UPDATE/DELETE gated by has_role='admin').

function getPublicSupabase(): SupabaseClient<Database> {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) throw new Error("Missing Supabase env vars");
  return createClient<Database>(url, key, {
    auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
  });
}

function slugify(input: string): string {
  return (
    input
      .toLowerCase()
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 60) || `section-${Date.now()}`
  );
}

async function ensureUniqueSlug(sb: SupabaseClient<Database>, base: string) {
  let candidate = base;
  let n = 2;
  while (n < 22) {
    const { data } = await sb.from("kb_sections").select("id").eq("slug", candidate).maybeSingle();
    if (!data) return candidate;
    candidate = `${base}-${n++}`;
  }
  return `${base}-${Date.now()}`;
}

export const listKbSections = createServerFn({ method: "GET" }).handler(async () => {
  const sb = getPublicSupabase();
  const { data, error } = await sb
    .from("kb_sections")
    .select("id, slug, title, body_markdown, order_index, updated_at")
    .order("order_index", { ascending: true });
  if (error) throw new Error(error.message);
  return { sections: data ?? [] };
});

export const createKbSection = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAdmin])
  .inputValidator((input: unknown) =>
    z
      .object({
        title: z.string().min(1).max(200),
        body_markdown: z.string().max(200_000).default(""),
      })
      .parse(input),
  )
  .handler(async ({ data, context }) => {
    const sb = context.supabase as unknown as SupabaseClient<Database>;
    const { data: maxRow } = await sb
      .from("kb_sections")
      .select("order_index")
      .order("order_index", { ascending: false })
      .limit(1)
      .maybeSingle();
    const nextOrder = (maxRow?.order_index ?? -1) + 1;
    const slug = await ensureUniqueSlug(sb, slugify(data.title));
    const { data: row, error } = await sb
      .from("kb_sections")
      .insert({
        slug,
        title: data.title,
        body_markdown: data.body_markdown ?? "",
        order_index: nextOrder,
      })
      .select("id, slug, title, body_markdown, order_index, updated_at")
      .single();
    if (error) throw new Error(error.message);
    return row;
  });

export const updateKbSection = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAdmin])
  .inputValidator((input: unknown) =>
    z
      .object({
        id: z.string().uuid(),
        title: z.string().min(1).max(200).optional(),
        body_markdown: z.string().max(200_000).optional(),
      })
      .parse(input),
  )
  .handler(async ({ data, context }) => {
    const sb = context.supabase as unknown as SupabaseClient<Database>;
    const patch: { title?: string; body_markdown?: string } = {};
    if (data.title !== undefined) patch.title = data.title;
    if (data.body_markdown !== undefined) patch.body_markdown = data.body_markdown;
    const { data: row, error } = await sb
      .from("kb_sections")
      .update(patch)
      .eq("id", data.id)
      .select("id, slug, title, body_markdown, order_index, updated_at")
      .single();
    if (error) throw new Error(error.message);
    return row;
  });

export const deleteKbSection = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAdmin])
  .inputValidator((input: unknown) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ data, context }) => {
    const sb = context.supabase as unknown as SupabaseClient<Database>;
    const { error } = await sb.from("kb_sections").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const reorderKbSection = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAdmin])
  .inputValidator((input: unknown) =>
    z
      .object({
        id: z.string().uuid(),
        direction: z.enum(["up", "down"]),
      })
      .parse(input),
  )
  .handler(async ({ data, context }) => {
    const sb = context.supabase as unknown as SupabaseClient<Database>;
    const { data: rows, error } = await sb
      .from("kb_sections")
      .select("id, order_index")
      .order("order_index", { ascending: true });
    if (error) throw new Error(error.message);
    const list = rows ?? [];
    const idx = list.findIndex((r) => r.id === data.id);
    if (idx < 0) throw new Error("Section not found");
    const swapIdx = data.direction === "up" ? idx - 1 : idx + 1;
    if (swapIdx < 0 || swapIdx >= list.length) return { ok: true };
    const a = list[idx];
    const b = list[swapIdx];
    await sb.from("kb_sections").update({ order_index: b.order_index }).eq("id", a.id);
    await sb.from("kb_sections").update({ order_index: a.order_index }).eq("id", b.id);
    return { ok: true };
  });

const ProposalSchema = z.object({
  proposals: z.array(
    z.object({
      action: z.enum(["update_existing", "create_new"]),
      section_id: z.string().nullable(),
      slug: z.string().nullable(),
      insert_after_section_id: z.string().nullable(),
      title: z.string(),
      summary_of_changes: z.string(),
      proposed_body_markdown: z.string(),
    }),
  ),
});

type KbSectionSnapshot = {
  id: string;
  slug: string;
  title: string;
  body_markdown: string;
  updated_at: string;
};

function buildExtractSystem(sections: KbSectionSnapshot[]): string {
  const listing = sections
    .map(
      (s) =>
        `### Section id: ${s.id}\nslug: ${s.slug}\ntitle: ${s.title}\n\n${s.body_markdown}`,
    )
    .join("\n\n---\n\n");

  return `You maintain the Bonlife Knowledge Base - the single source of truth for the Bonlife brand, products, and communication. An admin has uploaded a document. Your job is to decide how its information should be integrated into the knowledge base.

The CURRENT knowledge base sections are listed below, each with its id, slug, title, and full Markdown body:

=== CURRENT KNOWLEDGE BASE ===
${listing || "(the knowledge base is currently empty)"}
=== END CURRENT KNOWLEDGE BASE ===

Rules:
- Read the uploaded document carefully and compare it against the current sections above.
- Prefer "update_existing": when the document contains facts that belong to a topic already covered by a section, merge them into that section. Set section_id to that section's exact id and slug, keep the section's existing title, and return the COMPLETE proposed body (existing validated content preserved, new facts woven in).
- Use "create_new" only for a genuinely distinct topic that no existing section covers. Set section_id and slug to null.
- For "create_new", set insert_after_section_id to the exact id of the existing section the new one should logically follow, so related topics sit together (e.g. a new product topic goes right after the products section). Use null only if it belongs at the very end. For updates, set insert_after_section_id to null.
- Sections are numbered automatically from their position. NEVER put numbers ("1.", "Section 3") in titles.
- Never delete or contradict existing validated content unless the uploaded document explicitly supersedes it.
- summary_of_changes: one or two sentences stating what changed and why (for updates), or why this topic is new (for new sections).
- Titles must be short, human, and specific (max 80 chars).
- proposed_body_markdown must be clean Markdown: headings (H3+), lists, tables, and links where useful.
- Write in the Bonlife voice: warm, plain, benefit-led, zero jargon. Use N$ for money. Use hyphens, never em dashes. Never use "48-hour" wording.
- Return between 1 and 12 proposals. Never more than 12.
- If the document is empty or unusable, return { "proposals": [] }.`;
}

function stripEmDashes(text: string): string {
  return text.replace(/[\u2014\u2013]/g, "-");
}

export const extractKbDraftsFromUpload = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAdmin])
  .inputValidator((input: unknown) =>
    z
      .object({
        filename: z.string().min(1).max(300),
        mimeType: z.string().min(1).max(200),
        base64: z.string().min(1),
      })
      .parse(input),
  )
  .handler(async ({ data, context }) => {
    const key = process.env.LOVABLE_API_KEY;
    if (!key) throw new Error("Missing LOVABLE_API_KEY");

    // Load the full current knowledge base so the model can merge into it.
    const sb = context.supabase as unknown as SupabaseClient<Database>;
    const { data: sectionRows, error: sectionError } = await sb
      .from("kb_sections")
      .select("id, slug, title, body_markdown, updated_at")
      .order("order_index", { ascending: true });
    if (sectionError) throw new Error(sectionError.message);
    const sections = (sectionRows ?? []) as KbSectionSnapshot[];

    const { createAnthropic } = await import("@ai-sdk/anthropic");
    const { createLovableAiGatewayRunIdFetch } = await import("./ai-gateway.server");
    const runIdFetch = createLovableAiGatewayRunIdFetch();
    const anthropic = createAnthropic({
      baseURL: "https://ai.gateway.lovable.dev/v1",
      apiKey: key,
      headers: { "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
      fetch: runIdFetch.fetch,
    });
    // @ai-sdk/anthropic ships a newer provider spec than ai@7's nested copy;
    // the runtime is compatible, so cast across the type mismatch.
    const model = anthropic("anthropic/claude-opus-5-5") as unknown as LanguageModel;

    const isPdf =
      data.mimeType === "application/pdf" || data.filename.toLowerCase().endsWith(".pdf");
    const isText =
      data.mimeType.startsWith("text/") ||
      /\.(md|markdown|txt)$/i.test(data.filename);

    const instruction = `Integrate this document ("${data.filename}") into the knowledge base. Return { proposals: [...] } per the system instructions. Max 12 proposals.`;

    let userContent:
      | string
      | Array<
          | { type: "text"; text: string }
          | { type: "file"; data: string; mediaType: string; filename?: string }
        >;

    if (isPdf) {
      userContent = [
        { type: "text", text: instruction },
        {
          type: "file",
          data: data.base64,
          mediaType: "application/pdf",
          filename: data.filename,
        },
      ];
    } else if (isText) {
      let decoded = "";
      try {
        decoded = Buffer.from(data.base64, "base64").toString("utf-8");
      } catch {
        throw new Error("Could not decode uploaded text file.");
      }
      const clamped = decoded.slice(0, 120_000);
      userContent = `File: ${data.filename}\n\n---\n${clamped}\n---\n\n${instruction}`;
    } else {
      throw new Error(
        `Unsupported file type: ${data.mimeType || "unknown"}. Upload a .pdf, .md, or .txt file.`,
      );
    }

    const normalize = (raw: z.infer<typeof ProposalSchema>["proposals"]) => {
      const byId = new Map(sections.map((s) => [s.id, s]));
      return raw.slice(0, 12).map((p) => {
        const target =
          p.action === "update_existing" && p.section_id
            ? byId.get(p.section_id)
            : undefined;
        const action = target ? "update_existing" : "create_new";
        const after =
          !target && p.insert_after_section_id && byId.has(p.insert_after_section_id)
            ? p.insert_after_section_id
            : null;
        return {
          action: action as "update_existing" | "create_new",
          section_id: target ? target.id : null,
          slug: target ? target.slug : null,
          insert_after_section_id: after,
          title: (target ? target.title : p.title.replace(/^\d+\.\s*/, "")).slice(0, 200),
          summary_of_changes: stripEmDashes(p.summary_of_changes).slice(0, 500),
          proposed_body_markdown: stripEmDashes(p.proposed_body_markdown).slice(0, 40_000),
          current_body_markdown: target ? target.body_markdown : null,
          current_updated_at: target ? target.updated_at : null,
        };
      });
    };

    try {
      // Long documents can run for minutes - stream and consume server-side.
      const result = streamText({
        model,
        output: Output.object({ schema: ProposalSchema }),
        system: buildExtractSystem(sections),
        messages: [{ role: "user", content: userContent as never }],
        maxOutputTokens: 16000,
      });
      const output = await result.output;
      return { proposals: normalize(output?.proposals ?? []) };
    } catch (error) {
      if (NoObjectGeneratedError.isInstance(error)) {
        const text = (error.text ?? "").trim();
        if (!text) return { proposals: [] };
        return {
          proposals: [
            {
              action: "create_new" as const,
              section_id: null,
              slug: null,
              insert_after_section_id: null,
              title: `Import: ${data.filename}`.slice(0, 200),
              summary_of_changes:
                "The AI could not structure this document, so it is proposed as one new section.",
              proposed_body_markdown: stripEmDashes(text).slice(0, 40_000),
              current_body_markdown: null,
              current_updated_at: null,
            },
          ],
        };
      }
      throw error;
    }
  });
