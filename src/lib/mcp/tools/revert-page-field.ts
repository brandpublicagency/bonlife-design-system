import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseForUser } from "../supabase";
import { loadOverrides, pageSlug, saveOverrides } from "../site-ops";
import { deletePath } from "@/content/site/merge";

export default defineTool({
  name: "revert_page_field",
  title: "Restore original page content",
  description:
    "Put fields on a site page back to their original built-in values. Leave paths empty to restore the whole page. Admins only.",
  inputSchema: {
    slug: z.string().trim().min(1),
    paths: z.array(z.string().trim().min(1)).max(50).optional().describe("Field paths to restore; omit for the whole page."),
  },
  annotations: { readOnlyHint: false, destructiveHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ slug, paths }, ctx) => {
    const s = pageSlug(slug);
    const sb = supabaseForUser(ctx);
    let overrides: Record<string, unknown> = {};
    if (paths?.length) {
      overrides = await loadOverrides(sb, s);
      for (const p of paths) deletePath(overrides, p);
    }
    await saveOverrides(sb, s, overrides);
    const what = paths?.length ? paths.join(", ") : "the whole page";
    return {
      content: [{ type: "text", text: `Restored ${what} on ${s}.` }],
      structuredContent: { slug: s, restored: paths ?? "all" },
    };
  },
});
