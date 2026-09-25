import { defineTool, ToolError } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseForUser } from "../supabase";

export default defineTool({
  name: "get_kb_section",
  title: "Read a Knowledge Base section",
  description: "Read the full Markdown content of one Knowledge Base section by its slug.",
  inputSchema: { slug: z.string().trim().min(1).describe("Section slug, e.g. 3-products-and-services.") },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ slug }, ctx) => {
    const { data, error } = await supabaseForUser(ctx)
      .from("kb_sections")
      .select("id, slug, title, body_markdown, parent_id, updated_at")
      .eq("slug", slug)
      .maybeSingle();
    if (error) throw new ToolError(error.message);
    if (!data) throw new ToolError(`No section with slug "${slug}"`);
    const section = { ...data };
    return {
      content: [{ type: "text", text: `# ${data.title}\n\n${data.body_markdown}` }],
      structuredContent: { section },
    };
  },
});
