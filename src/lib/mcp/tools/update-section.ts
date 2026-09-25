import { defineTool, ToolError } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseForUser } from "../supabase";
import { ADMIN_ONLY, cleanBody, cleanTitle, findSection, sectionJson } from "../kb-ops";

export default defineTool({
  name: "update_kb_section",
  title: "Edit a Knowledge Base section",
  description:
    "Replace the title and/or full Markdown body of a section (by id or slug). Admins only; published immediately.",
  inputSchema: {
    id: z.string().uuid().optional().describe("Section id."),
    slug: z.string().trim().min(1).optional().describe("Section slug."),
    title: z.string().trim().min(1).max(200).optional().describe("New title, without a number."),
    body_markdown: z.string().max(200000).optional().describe("New full Markdown body."),
  },
  annotations: { readOnlyHint: false, destructiveHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ id, slug, title, body_markdown }, ctx) => {
    if (title === undefined && body_markdown === undefined) {
      throw new ToolError("Provide a title or body_markdown to change.");
    }
    const sb = supabaseForUser(ctx);
    const target = await findSection(sb, { id, slug });
    const patch: { title?: string; body_markdown?: string } = {};
    if (title !== undefined) patch.title = cleanTitle(title);
    if (body_markdown !== undefined) patch.body_markdown = cleanBody(body_markdown);
    const { data, error } = await sb.from("kb_sections").update(patch).eq("id", target.id).select("*");
    if (error) throw new ToolError(error.message);
    if (!data?.length) throw new ToolError(ADMIN_ONLY);
    return {
      content: [{ type: "text", text: `Updated "${data[0].title}".` }],
      structuredContent: { section: sectionJson(data[0]) },
    };
  },
});
