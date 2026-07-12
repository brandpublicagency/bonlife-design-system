import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { requireSupabaseAdmin } from "@/integrations/supabase/admin-middleware";

// Whether the caller is an admin. Any signed-in user can call this.
export const getMyAdminStatus = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    if (error) throw new Error(error.message);
    return { isAdmin: !!data };
  });

// List all admins with their email. Requires supabaseAdmin to read auth.users.
export const listAdmins = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAdmin])
  .handler(async () => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: rows, error } = await supabaseAdmin
      .from("user_roles")
      .select("user_id, created_at")
      .eq("role", "admin")
      .order("created_at", { ascending: true });
    if (error) throw new Error(error.message);

    const admins: Array<{ user_id: string; email: string | null; created_at: string }> = [];
    for (const r of rows ?? []) {
      const { data: userRes } = await supabaseAdmin.auth.admin.getUserById(r.user_id);
      admins.push({
        user_id: r.user_id,
        email: userRes?.user?.email ?? null,
        created_at: r.created_at,
      });
    }
    return { admins };
  });

export const promoteUserByEmail = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAdmin])
  .inputValidator((input: unknown) =>
    z.object({ email: z.string().trim().toLowerCase().email() }).parse(input),
  )
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    // listUsers is paginated; scan up to 10 pages of 200.
    let match: { id: string; email: string | null } | null = null;
    for (let page = 1; page <= 10 && !match; page++) {
      const { data: list, error } = await supabaseAdmin.auth.admin.listUsers({
        page,
        perPage: 200,
      });
      if (error) throw new Error(error.message);
      for (const u of list?.users ?? []) {
        if ((u.email ?? "").toLowerCase() === data.email) {
          match = { id: u.id, email: u.email ?? null };
          break;
        }
      }
      if (!list || list.users.length < 200) break;
    }
    if (!match) {
      throw new Error(
        `No account found for ${data.email}. Ask them to sign up first, then promote them.`,
      );
    }
    const { error: insErr } = await supabaseAdmin
      .from("user_roles")
      .insert({ user_id: match.id, role: "admin" });
    if (insErr && !/duplicate/i.test(insErr.message)) throw new Error(insErr.message);
    return { ok: true, email: match.email };
  });

export const revokeAdmin = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAdmin])
  .inputValidator((input: unknown) =>
    z.object({ userId: z.string().uuid() }).parse(input),
  )
  .handler(async ({ data, context }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { count, error: countErr } = await supabaseAdmin
      .from("user_roles")
      .select("*", { count: "exact", head: true })
      .eq("role", "admin");
    if (countErr) throw new Error(countErr.message);
    if ((count ?? 0) <= 1) {
      throw new Error("Cannot revoke the last remaining admin.");
    }
    if (data.userId === context.userId) {
      // Allow self-revoke only if there's more than one admin left after.
      // The check above already guarantees that.
    }
    const { error } = await supabaseAdmin
      .from("user_roles")
      .delete()
      .eq("user_id", data.userId)
      .eq("role", "admin");
    if (error) throw new Error(error.message);
    return { ok: true };
  });
