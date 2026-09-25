import { defineTool } from "@lovable.dev/mcp-js";
import { orderKbSections, sectionDisplayNumbers } from "@/lib/kb-hierarchy";
import { supabaseForUser } from "../supabase";

export default defineTool({
  name: "list_kb_sections",
  title: "List Knowledge Base sections",
  description: "List every Bonlife Knowledge Base section with its number, slug, title and parent.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async (_args, ctx) => {
    const { data, error } = await supabaseForUser(ctx)
      .from("kb_sections")
      .select("id, slug, title, parent_id, sibling_order, order_index, updated_at");
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    const ordered = orderKbSections(data ?? []);
    const nums = sectionDisplayNumbers(ordered);
    const sections = ordered.map((s) => ({
      id: s.id,
      number: nums.get(s.id) ?? null,
      slug: s.slug,
      title: s.title,
      parent_id: s.parent_id,
      updated_at: s.updated_at,
    }));
    const text = sections.map((s) => `${s.number ?? "-"} ${s.title} (${s.slug})`).join("\n");
    return { content: [{ type: "text", text }], structuredContent: { sections } };
  },
});
