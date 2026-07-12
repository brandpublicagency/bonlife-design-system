import { createMiddleware } from "@tanstack/react-start";
import { requireSupabaseAuth } from "./auth-middleware";

// Combines the standard Supabase auth middleware with an admin-role check.
// Any server function using this middleware is only reachable by users
// whose row exists in `public.user_roles` with role='admin'.
export const requireSupabaseAdmin = createMiddleware({ type: "function" })
  .middleware([requireSupabaseAuth])
  .server(async ({ next, context }) => {
    const { data, error } = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    if (error) throw new Error("Could not verify admin status");
    if (!data) throw new Error("Forbidden: admin access required");
    return next({ context });
  });
