import { defineTool, ToolError } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseForUser } from "../supabase";
import { ADMIN_ONLY, allRows, findSection, siblingsOf, writeOrder } from "../kb-ops";

export default defineTool({
  name: "move_kb_section",
  title: "Move a Knowledge Base section",
  description:
    "Reorder a section up/down, or move it under a different top-level parent (or to the top level) after a chosen sibling. Admins only.",
  inputSchema: {
    id: z.string().uuid().optional().describe("Section id."),
    slug: z.string().trim().min(1).optional().describe("Section slug."),
    direction: z.enum(["up", "down"]).optional().describe("Move one step among its current siblings."),
    new_parent_id: z
      .string()
      .uuid()
      .nullable()
      .optional()
      .describe("Move under this top-level parent; null moves it to the top level."),
    insert_after_id: z.string().uuid().nullable().optional().describe("Place after this sibling in the destination; null puts it first."),
  },
  annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: false, openWorldHint: false },
  handler: async ({ id, slug, direction, new_parent_id, insert_after_id }, ctx) => {
    const sb = supabaseForUser(ctx);
    const target = await findSection(sb, { id, slug });
    const rows = await allRows(sb);
    const destParent = new_parent_id === undefined ? target.parent_id : new_parent_id;

    if (direction && new_parent_id === undefined && insert_after_id === undefined) {
      const list = siblingsOf(rows, target.parent_id);
      const i = list.findIndex((r) => r.id === target.id);
      const j = direction === "up" ? i - 1 : i + 1;
      if (j < 0 || j >= list.length) return { content: [{ type: "text", text: "Already at the edge; nothing moved." }] };
      [list[i], list[j]] = [list[j], list[i]];
      await writeOrder(sb, list);
      return { content: [{ type: "text", text: `Moved "${target.title}" ${direction}.` }] };
    }

    if (destParent) {
      const p = rows.find((r) => r.id === destParent);
      if (!p || p.parent_id) throw new ToolError("new_parent_id must be a top-level section.");
      if (destParent === target.id) throw new ToolError("A section cannot be its own parent.");
      if (rows.some((r) => r.parent_id === target.id)) throw new ToolError("A section with children cannot be nested.");
    }
    const dest = siblingsOf(rows, destParent).filter((r) => r.id !== target.id);
    let pos = dest.length;
    if (insert_after_id === null) pos = 0;
    else if (insert_after_id) {
      const i = dest.findIndex((r) => r.id === insert_after_id);
      if (i < 0) throw new ToolError("insert_after_id must be a sibling in the destination.");
      pos = i + 1;
    }
    if (destParent !== target.parent_id) {
      const { data, error } = await sb
        .from("kb_sections")
        .update({ parent_id: destParent, sibling_order: pos })
        .eq("id", target.id)
        .select("*");
      if (error) throw new ToolError(error.message);
      if (!data?.length) throw new ToolError(ADMIN_ONLY);
      await writeOrder(sb, siblingsOf(rows, target.parent_id).filter((r) => r.id !== target.id));
    }
    const moved = { ...target, parent_id: destParent, sibling_order: -1 };
    dest.splice(pos, 0, moved);
    await writeOrder(sb, dest);
    return { content: [{ type: "text", text: `Moved "${target.title}".` }] };
  },
});
