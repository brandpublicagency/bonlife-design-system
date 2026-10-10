import { ToolError } from "@lovable.dev/mcp-js";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database, Json } from "@/integrations/supabase/types";
import { SITE_PAGES, SITE_PAGE_SLUGS, type SitePageSlug } from "@/content/site/registry";
import { deepMerge, getPath } from "@/content/site/merge";

export const PAGE_ADMIN_ONLY =
  "Only Bonlife admin accounts can change page content. Ask an admin to connect.";

export function pageSlug(slug: string): SitePageSlug {
  if (!(SITE_PAGE_SLUGS as string[]).includes(slug)) {
    throw new ToolError(`Unknown page "${slug}". Pages: ${SITE_PAGE_SLUGS.join(", ")}.`);
  }
  return slug as SitePageSlug;
}

export async function loadOverrides(sb: SupabaseClient<Database>, slug: SitePageSlug) {
  const { data, error } = await sb.from("site_pages").select("content").eq("slug", slug).maybeSingle();
  if (error) throw new ToolError(error.message);
  return ((data?.content ?? {}) as Record<string, unknown>) || {};
}

export async function mergedPage<S extends SitePageSlug>(sb: SupabaseClient<Database>, slug: S) {
  return deepMerge(SITE_PAGES[slug].defaults, await loadOverrides(sb, slug)) as (typeof SITE_PAGES)[S]["defaults"];
}

/** Check a path exists in the defaults and the new value has the same shape. */
export function validateField(slug: SitePageSlug, path: string, value: unknown) {
  const def = getPath(SITE_PAGES[slug].defaults, path);
  if (def === undefined) throw new ToolError(`"${path}" is not an editable field on ${slug}. Use list_pages or get_page to see fields.`);
  if (/\.\d+(\.|$)/.test(path)) {
    throw new ToolError(`Edit lists as a whole: set "${path.replace(/\.\d+.*$/, "")}" to the full new list.`);
  }
  if (Array.isArray(def)) {
    if (!Array.isArray(value)) throw new ToolError(`"${path}" must be a list.`);
    const sample = def[0];
    if (sample && typeof sample === "object") {
      const keys = Object.keys(sample);
      value.forEach((item, i) => {
        if (!item || typeof item !== "object") throw new ToolError(`"${path}" item ${i + 1} must be an object with ${keys.join(", ")}.`);
        for (const k of keys) {
          if (typeof (item as Record<string, unknown>)[k] !== typeof (sample as Record<string, unknown>)[k]) {
            throw new ToolError(`"${path}" item ${i + 1} needs "${k}" as ${typeof (sample as Record<string, unknown>)[k]}.`);
          }
        }
      });
    }
  } else if (typeof def === "object" && def !== null) {
    throw new ToolError(`"${path}" is a group. Edit its individual fields instead.`);
  } else if (typeof value !== typeof def) {
    throw new ToolError(`"${path}" must be a ${typeof def}.`);
  }
}

export function cleanValue(v: unknown): unknown {
  if (typeof v === "string") return v.replace(/\s*[—–]\s*/g, " - ");
  if (Array.isArray(v)) return v.map(cleanValue);
  if (v && typeof v === "object") {
    return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, cleanValue(x)]));
  }
  return v;
}

export async function saveOverrides(
  sb: SupabaseClient<Database>,
  slug: SitePageSlug,
  content: Record<string, unknown>,
) {
  const { data, error } = await sb
    .from("site_pages")
    .upsert({ slug, content: content as Json }, { onConflict: "slug" })
    .select("slug");
  if (error) {
    if (/row-level security|permission/i.test(error.message)) throw new ToolError(PAGE_ADMIN_ONLY);
    throw new ToolError(error.message);
  }
  if (!data?.length) throw new ToolError(PAGE_ADMIN_ONLY);
}
