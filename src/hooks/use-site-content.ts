import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { getSitePageOverrides } from "@/lib/site-content.functions";
import { SITE_PAGES, type SitePageSlug } from "@/content/site/registry";
import { deepMerge } from "@/content/site/merge";

export const sitePageQuery = (slug: SitePageSlug) =>
  queryOptions({
    queryKey: ["site-page", slug],
    queryFn: async () => {
      try {
        const res = await getSitePageOverrides({ data: { slug } });
        return JSON.parse(res.json) as Record<string, unknown>;
      } catch {
        return {} as Record<string, unknown>;
      }
    },
    staleTime: 30_000,
  });

/** Page content: stored edits merged over today's built-in text. */
export function useSiteContent<S extends SitePageSlug>(slug: S) {
  const { data } = useSuspenseQuery(sitePageQuery(slug));
  return deepMerge(SITE_PAGES[slug].defaults, data) as (typeof SITE_PAGES)[S]["defaults"];
}

export function loadSitePage(
  context: { queryClient?: import("@tanstack/react-query").QueryClient },
  slug: SitePageSlug,
) {
  return context.queryClient?.ensureQueryData(sitePageQuery(slug));
}
