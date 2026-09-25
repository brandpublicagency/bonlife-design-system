import { defineTool, ToolError } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseForUser } from "../supabase";
import {
  ADMIN_ONLY, allRows, cleanBody, cleanTitle, sectionJson, siblingsOf, slugify, uniqueSlug, writeOrder,
} from "../kb-ops";

export default defineTool({
  name: "create_kb_section",
  title: "Add a Knowledge Base section",
  description:
    "Add a new section. Optionally nest it under a top-level parent (e.g. the Plans section) and place it after a sibling. Numbers update automatically. Admins only.",
  inputSchema: {
    title: z.string().trim().min(1).max(200).describe("Title, without a number."),
    body_markdown: z.string().max(200000).default("").describe("Full Markdown body."),
    parent_id: z.string().uuid().nullable().optional().describe("Top-level parent id, or null for top level."),
    insert_after_id: z.string().uuid().nullable().optional().describe("Sibling to place it after; omit to add at the end."),
  },
  annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: false, openWorldHint: false },
  handler: async ({ title, body_markdown, parent_id, insert_after_id }, ctx) => {
    const sb = supabaseForUser(ctx);
    const rows = await allRows(sb);
    const parentId = parent_id ?? null;
    if (parentId) {
      const p = rows.find((r) => r.id === parentId);
      if (!p || p.parent_id) throw new ToolError("parent_id must be a top-level section.");
    }
    const siblings = siblingsOf(rows, parentId);
    let pos = siblings.length;
    if (insert_after_id) {
      const i = siblings.findIndex((r) => r.id === insert_after_id);
      if (i < 0) throw new ToolError("insert_after_id must be a sibling under the same parent.");
      pos = i + 1;
    }
    const clean = cleanTitle(title);
    const { data, error } = await sb
      .from("kb_sections")
      .insert({
        slug: await uniqueSlug(sb, slugify(clean)),
        title: clean,
        body_markdown: cleanBody(body_markdown),
        parent_id: parentId,
        sibling_order: siblings.length,
        order_index: rows.reduce((m, r) => Math.max(m, r.order_index), -1) + 1,
      })
      .select("*")
      .single();
    if (error) throw new ToolError(error.code === "42501" ? ADMIN_ONLY : error.message);
    const next = [...siblings];
    next.splice(pos, 0, data);
    await writeOrder(sb, next);
    return {
      content: [{ type: "text", text: `Added "${data.title}" (${data.slug}).` }],
      structuredContent: { section: sectionJson(data) },
    };
  },
});
