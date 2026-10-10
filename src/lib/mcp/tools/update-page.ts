import { defineTool, ToolError } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseForUser } from "../supabase";
import { cleanValue, loadOverrides, pageSlug, saveOverrides, validateField } from "../site-ops";
import { setPath } from "@/content/site/merge";

export default defineTool({
  name: "update_page",
  title: "Edit site page content",
  description:
    "Change one or more fields on a site page. Each change is a dotted field path (from list_pages/get_page) and its new value. Lists must be sent whole, with the same item shape. Admins only; changes go live immediately.",
  inputSchema: {
    slug: z.string().trim().min(1).describe("Page slug, e.g. contact."),
    changes: z
      .array(z.object({ path: z.string().trim().min(1), value: z.any() }))
      .min(1)
      .max(50)
      .describe("Fields to change, e.g. [{path:'headOffice.phone', value:'+264 61 250 339'}]."),
  },
  annotations: { readOnlyHint: false, destructiveHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ slug, changes }, ctx) => {
    const s = pageSlug(slug);
    for (const c of changes) {
      if (c.value === undefined) throw new ToolError(`Missing value for "${c.path}".`);
      validateField(s, c.path, c.value);
    }
    const sb = supabaseForUser(ctx);
    const overrides = await loadOverrides(sb, s);
    for (const c of changes) setPath(overrides, c.path, cleanValue(c.value));
    await saveOverrides(sb, s, overrides);
    return {
      content: [{ type: "text", text: `Updated ${changes.length} field(s) on ${s}: ${changes.map((c) => c.path).join(", ")}.` }],
      structuredContent: { slug: s, updated: changes.map((c) => c.path) },
    };
  },
});
