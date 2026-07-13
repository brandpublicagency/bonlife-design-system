import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import { LogIn, LogOut, Menu, ShieldCheck } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@/hooks/use-auth";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getMyAdminStatus } from "@/lib/admin.functions";

const NAV_ITEMS = [
  { to: "/", label: "Overview" },
  { to: "/foundations", label: "Foundations" },
  { to: "/iconography", label: "Iconography" },
  { to: "/components", label: "Components" },
  { to: "/social", label: "Social" },
  { to: "/marketing", label: "Marketing Kit" },
  { to: "/knowledge-base", label: "Knowledge Base" },
  { to: "/downloads", label: "Downloads" },
] as const;

export function NavDrawer() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const qc = useQueryClient();
  const { session } = useSession();
  const currentPath = useRouterState({ select: (r) => r.location.pathname });

  const { data: adminData } = useQuery({
    queryKey: ["me", "isAdmin", session?.user.id ?? "anon"],
    queryFn: () => getMyAdminStatus(),
    enabled: !!session,
  });
  const isAdmin = !!adminData?.isAdmin;

  async function handleSignOut() {
    await qc.cancelQueries();
    qc.clear();
    await supabase.auth.signOut();
    setOpen(false);
    navigate({ to: "/", replace: true });
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          type="button"
          aria-label="Open navigation"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-hairline text-navy transition hover:bg-surface-tint"
        >
          <Menu size={18} />
        </button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[320px] border-l border-hairline bg-surface p-0 sm:w-[380px]">
        <SheetTitle className="sr-only">Navigation</SheetTitle>
        <SheetDescription className="sr-only">Bonlife design system navigation</SheetDescription>
        <div className="flex h-full flex-col">
          <div className="flex items-center border-b border-hairline px-6 py-5">
            <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-coral">
              Navigate
            </span>
          </div>

          <nav className="flex-1 overflow-y-auto px-3 py-4">
            <ul className="grid gap-1">
              {NAV_ITEMS.map((it) => {
                const active =
                  it.to === "/"
                    ? currentPath === "/"
                    : currentPath === it.to || currentPath.startsWith(it.to + "/");
                return (
                  <li key={it.to}>
                    <Link
                      to={it.to}
                      onClick={() => setOpen(false)}
                      className={
                        "block rounded-lg px-4 py-3 font-display text-[16px] font-semibold transition " +
                        (active
                          ? "bg-navy text-white"
                          : "text-navy hover:bg-surface-tint")
                      }
                    >
                      {it.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="border-t border-hairline px-3 py-4">
            <div className="mb-2 px-4 text-[10px] font-semibold uppercase tracking-[0.14em] text-navy/50">
              Admin
            </div>
            {!session ? (
              <Link
                to="/auth"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 rounded-lg px-4 py-3 font-display text-[14px] font-semibold text-navy hover:bg-surface-tint"
              >
                <LogIn size={16} /> Sign in
              </Link>
            ) : (
              <div className="grid gap-1">
                {isAdmin ? (
                  <Link
                    to="/admin/knowledge-base"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2 rounded-lg px-4 py-3 font-display text-[14px] font-semibold text-navy hover:bg-surface-tint"
                  >
                    <ShieldCheck size={16} /> Knowledge Base backend
                  </Link>
                ) : (
                  <div className="px-4 py-2 text-[12.5px] text-navy/60">
                    Signed in as <span className="text-navy">{session.user.email}</span>.
                    Ask an admin to promote your account.
                  </div>
                )}
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="flex items-center gap-2 rounded-lg px-4 py-3 text-left font-display text-[14px] font-semibold text-navy hover:bg-surface-tint"
                >
                  <LogOut size={16} /> Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
