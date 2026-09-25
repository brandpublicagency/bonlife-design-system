import { defineTool } from "@lovable.dev/mcp-js";
import { orderKbSections, sectionDisplayNumbers } from "@/lib/kb-hierarchy";
import { supabaseForUser } from "../supabase";
import { allRows, sectionJson } from "../kb-ops";

export default defineTool({
  name: "get_full_kb",
  title: "Read the whole Knowledge Base",
  description: "Return every Knowledge Base section, in order, with its number, id, slug and full Markdown text.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async (_a, ctx) => {
    const ordered = orderKbSections(await allRows(supabaseForUser(ctx)));
    const nums = sectionDisplayNumbers(ordered);
    const sections = ordered.map((r) => ({
      ...sectionJson(r),
      number: nums.get(r.id) ?? null,
      body_markdown: r.body_markdown,
    }));
    const text = sections
      .map((s) => `## ${s.number ? s.number + " " : ""}${s.title}\n[id: ${s.id} | slug: ${s.slug}]\n\n${s.body_markdown}`)
      .join("\n\n---\n\n");
    return { content: [{ type: "text", text }], structuredContent: { sections } };
  },
});
