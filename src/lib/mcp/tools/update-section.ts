import { defineTool, ToolError } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseForUser } from "../supabase";

export default defineTool({
  name: "update_kb_section",
  title: "Update a Knowledge Base section",
  description:
    "Replace the title and/or Markdown body of a Knowledge Base section. Admins only; changes are published immediately.",
  inputSchema: {
    slug: z.string().trim().min(1).describe("Slug of the section to update."),
    title: z.string().trim().min(1).max(200).optional().describe("New title (without a number)."),
    body_markdown: z.string().max(200000).optional().describe("New full Markdown body."),
  },
  annotations: { readOnlyHint: false, destructiveHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ slug, title, body_markdown }, ctx) => {
    if (title === undefined && body_markdown === undefined) {
      throw new ToolError("Provide a title or body_markdown to change.");
    }
    const patch: { title?: string; body_markdown?: string } = {};
    if (title !== undefined) patch.title = title;
    if (body_markdown !== undefined) patch.body_markdown = body_markdown;
    const { data, error } = await supabaseForUser(ctx)
      .from("kb_sections")
      .update(patch)
      .eq("slug", slug)
      .select("slug, title, updated_at");
    if (error) throw new ToolError(error.message);
    if (!data?.length) throw new ToolError("Section not found, or your account is not a Knowledge Base admin.");
    return {
      content: [{ type: "text", text: `Updated "${data[0].title}".` }],
      structuredContent: { section: { ...data[0] } },
    };
  },
});
