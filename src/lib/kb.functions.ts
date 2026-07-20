import { createServerFn } from "@tanstack/react-start";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { generateText, NoObjectGeneratedError, Output } from "ai";
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

const DraftSchema = z.object({
  drafts: z.array(
    z.object({
      title: z.string(),
      body_markdown: z.string(),
    }),
  ),
});

const EXTRACT_SYSTEM = `You extract Bonlife knowledge-base sections from an uploaded document.

Rules:
- Return an array of proposed sections. Each is { title, body_markdown }.
- Titles must be short, human, and specific (max 80 chars).
- body_markdown must be clean Markdown suitable for a design-system reference doc.
- Preserve headings (H3+), lists, tables, and links from the source where useful.
- Write in Bonlife voice: warm, plain, benefit-led, no jargon.
- Group tightly related content under one section rather than fragmenting.
- Return between 1 and 12 sections. Never return more than 12.
- If the document is empty or unusable, return { "drafts": [] }.`;

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
  .handler(async ({ data }) => {
    const key = process.env.LOVABLE_API_KEY;
    if (!key) throw new Error("Missing LOVABLE_API_KEY");

    const { createLovableAiGatewayProvider } = await import("./ai-gateway.server");
    const gateway = createLovableAiGatewayProvider(key);
    const model = gateway("google/gemini-2.5-flash");

    const isPdf =
      data.mimeType === "application/pdf" || data.filename.toLowerCase().endsWith(".pdf");
    const isText =
      data.mimeType.startsWith("text/") ||
      /\.(md|markdown|txt)$/i.test(data.filename);

    let userContent:
      | string
      | Array<
          | { type: "text"; text: string }
          | { type: "file"; data: string; mediaType: string; filename?: string }
        >;

    if (isPdf) {
      userContent = [
        {
          type: "text",
          text: `Extract knowledge-base sections from this document ("${data.filename}"). Return { drafts: [{ title, body_markdown }, ...] }. Max 12 drafts.`,
        },
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
      userContent = `File: ${data.filename}\n\n---\n${clamped}\n---\n\nReturn { drafts: [{ title, body_markdown }, ...] }. Max 12 drafts.`;
    } else {
      throw new Error(
        `Unsupported file type: ${data.mimeType || "unknown"}. Upload a .pdf, .md, or .txt file.`,
      );
    }

    try {
      const { output } = await generateText({
        model,
        output: Output.object({ schema: DraftSchema }),
        system: EXTRACT_SYSTEM,
        messages: [{ role: "user", content: userContent as never }],
      });
      const drafts = (output?.drafts ?? [])
        .slice(0, 12)
        .map((d) => ({
          title: d.title.slice(0, 200),
          body_markdown: d.body_markdown.slice(0, 40_000),
        }));
      return { drafts };
    } catch (error) {
      if (NoObjectGeneratedError.isInstance(error)) {
        const text = (error.text ?? "").trim();
        if (!text) return { drafts: [] };
        return {
          drafts: [
            {
              title: `Import: ${data.filename}`.slice(0, 200),
              body_markdown: text.slice(0, 40_000),
            },
          ],
        };
      }
      throw error;
    }
  });
