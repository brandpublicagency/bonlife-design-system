import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseForUser } from "../supabase";
import { findSection, sectionJson } from "../kb-ops";

export default defineTool({
  name: "get_kb_section",
  title: "Read a Knowledge Base section",
  description: "Read the full Markdown content of one Knowledge Base section by id or slug.",
  inputSchema: {
    id: z.string().uuid().optional().describe("Section id."),
    slug: z.string().trim().min(1).optional().describe("Section slug, e.g. 3-products-and-services."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ id, slug }, ctx) => {
    const r = await findSection(supabaseForUser(ctx), { id, slug });
    return {
      content: [{ type: "text", text: `# ${r.title}\n\n${r.body_markdown}` }],
      structuredContent: { section: { ...sectionJson(r), body_markdown: r.body_markdown } },
    };
  },
});
