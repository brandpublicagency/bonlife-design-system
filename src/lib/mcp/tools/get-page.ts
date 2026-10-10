import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseForUser } from "../supabase";
import { mergedPage, pageSlug, loadOverrides } from "../site-ops";
import { listFields } from "@/content/site/merge";

export default defineTool({
  name: "get_page",
  title: "Read a site page",
  description:
    "Read the full current content of one site page (as shown live), plus which fields have been edited away from the original.",
  inputSchema: { slug: z.string().trim().min(1).describe("Page slug from list_pages, e.g. contact.") },
  annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false },
  handler: async ({ slug }, ctx) => {
    const s = pageSlug(slug);
    const sb = supabaseForUser(ctx);
    const content = await mergedPage(sb, s);
    const edited = listFields(await loadOverrides(sb, s)).filter(Boolean);
    return {
      content: [{ type: "text", text: JSON.stringify({ slug: s, edited_fields: edited, content }, null, 2) }],
      structuredContent: { slug: s, edited_fields: edited, content },
    };
  },
});
