import type { SupabaseClient } from "@supabase/supabase-js";
import { ToolError } from "@lovable.dev/mcp-js";
import type { Database } from "@/integrations/supabase/types";

export type Sb = SupabaseClient<Database>;
export type Row = Database["public"]["Tables"]["kb_sections"]["Row"];

export const ADMIN_ONLY = "Only Knowledge Base admins can make changes. Sign in with an admin account.";

export function cleanTitle(t: string) {
  return t.replace(/^\s*(section\s+)?\d+(\.\d+)*[.)]?\s*/i, "").replace(/[\u2014\u2013]/g, "-").trim();
}
export function cleanBody(t: string) {
  return t.replace(/[\u2014\u2013]/g, "-");
}

export function slugify(input: string): string {
  return (
    input
      .toLowerCase()
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 60) || `section-${Date.now()}`
  );
}

export async function uniqueSlug(sb: Sb, base: string) {
  let c = base;
  for (let n = 2; n < 22; n++) {
    const { data } = await sb.from("kb_sections").select("id").eq("slug", c).maybeSingle();
    if (!data) return c;
    c = `${base}-${n}`;
  }
  return `${base}-${Date.now()}`;
}

export async function allRows(sb: Sb): Promise<Row[]> {
  const { data, error } = await sb.from("kb_sections").select("*");
  if (error) throw new ToolError(error.message);
  return data ?? [];
}

export async function findSection(sb: Sb, ref: { id?: string; slug?: string }): Promise<Row> {
  if (!ref.id && !ref.slug) throw new ToolError("Provide an id or slug.");
  let q = sb.from("kb_sections").select("*");
  q = ref.id ? q.eq("id", ref.id) : q.eq("slug", ref.slug!);
  const { data, error } = await q.maybeSingle();
  if (error) throw new ToolError(error.message);
  if (!data) throw new ToolError(`Section not found: ${ref.id ?? ref.slug}`);
  return data;
}

export function siblingsOf(rows: Row[], parentId: string | null) {
  return rows
    .filter((r) => r.parent_id === parentId)
    .sort((a, b) => a.sibling_order - b.sibling_order || a.order_index - b.order_index);
}

/** Write a new sibling order for a parent group (0..n-1). */
export async function writeOrder(sb: Sb, list: Row[]) {
  for (let i = 0; i < list.length; i++) {
    if (list[i].sibling_order === i) continue;
    const { data, error } = await sb
      .from("kb_sections")
      .update({ sibling_order: i })
      .eq("id", list[i].id)
      .select("id");
    if (error) throw new ToolError(error.message);
    if (!data?.length) throw new ToolError(ADMIN_ONLY);
  }
}

export const sectionJson = (r: Row) => ({
  id: r.id,
  slug: r.slug,
  title: r.title,
  parent_id: r.parent_id,
  updated_at: r.updated_at,
});
