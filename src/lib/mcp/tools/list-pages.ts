import { defineTool } from "@lovable.dev/mcp-js";
import { SITE_PAGES, SITE_PAGE_SLUGS } from "@/content/site/registry";
import { listFields } from "@/content/site/merge";

export default defineTool({
  name: "list_pages",
  title: "List editable site pages",
  description:
    "List every page of the Bonlife Design System site whose content can be read and edited, with its editable field paths. Lists (arrays) are edited as one field.",
  inputSchema: {},
  annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false },
  handler: async () => {
    const pages = SITE_PAGE_SLUGS.map((slug) => ({
      slug,
      title: SITE_PAGES[slug].title,
      url: `https://brand.bonlifenam.com${SITE_PAGES[slug].path}`,
      fields: listFields(SITE_PAGES[slug].defaults),
    }));
    return {
      content: [{ type: "text", text: pages.map((p) => `${p.slug} (${p.url}): ${p.fields.length} fields`).join("\n") }],
      structuredContent: { pages },
    };
  },
});
