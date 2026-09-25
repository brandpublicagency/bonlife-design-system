import { defineTool, ToolError } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseForUser } from "../supabase";
import { ADMIN_ONLY, allRows, findSection, siblingsOf, writeOrder } from "../kb-ops";

export default defineTool({
  name: "delete_kb_section",
  title: "Delete a Knowledge Base section",
  description:
    "Permanently delete a section. Sections with child sections need include_children: true, which deletes them too. Admins only; cannot be undone.",
  inputSchema: {
    id: z.string().uuid().optional().describe("Section id."),
    slug: z.string().trim().min(1).optional().describe("Section slug."),
    include_children: z.boolean().default(false).describe("Also delete its child sections."),
  },
  annotations: { readOnlyHint: false, destructiveHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ id, slug, include_children }, ctx) => {
    const sb = supabaseForUser(ctx);
    const target = await findSection(sb, { id, slug });
    const rows = await allRows(sb);
    const children = rows.filter((r) => r.parent_id === target.id);
    if (children.length && !include_children) {
      throw new ToolError(
        `"${target.title}" has ${children.length} child sections. Re-run with include_children: true to delete them all.`,
      );
    }
    for (const c of children) {
      const { data, error } = await sb.from("kb_sections").delete().eq("id", c.id).select("id");
      if (error) throw new ToolError(error.message);
      if (!data?.length) throw new ToolError(ADMIN_ONLY);
    }
    const { data, error } = await sb.from("kb_sections").delete().eq("id", target.id).select("id");
    if (error) throw new ToolError(error.message);
    if (!data?.length) throw new ToolError(ADMIN_ONLY);
    await writeOrder(sb, siblingsOf(rows, target.parent_id).filter((r) => r.id !== target.id));
    const extra = children.length ? ` and ${children.length} child sections` : "";
    return { content: [{ type: "text", text: `Deleted "${target.title}"${extra}.` }] };
  },
});
