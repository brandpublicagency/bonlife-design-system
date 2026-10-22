import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

/** Editor deletions are leaf-only; subtree deletion requires the explicit MCP flow. */
export async function deleteLeafKbSection(sb: SupabaseClient<Database>, id: string) {
  const { count, error: childError } = await sb
    .from("kb_sections")
    .select("id", { count: "exact", head: true })
    .eq("parent_id", id);
  if (childError) throw new Error(childError.message);
  if (count == null) throw new Error("Could not check nested sections. Nothing was deleted.");
  if (count > 0) {
    throw new Error(
      `This section has ${count} nested ${count === 1 ? "section" : "sections"}. Delete or move them first. Nothing was deleted.`,
    );
  }
  const { error } = await sb.from("kb_sections").delete().eq("id", id);
  if (error) throw new Error(error.message);
  return { ok: true };
}