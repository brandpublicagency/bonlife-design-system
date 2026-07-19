import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import {
  BookOpen,
  Building2,
  Component,
  Download,
  Home,
  LogIn,
  LogOut,
  Mail,
  Megaphone,
  Menu,
  MessageCircle,
  Palette,
  Phone,
  ShieldCheck,
  Share2,
  Sparkles,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
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
import wordmarkDark from "@/assets/bonlife/logos/bonlife-wordmark-dark.svg";
import { SYSTEM_VERSION } from "@/components/bonlife/SiteChrome";

type NavPath =
  | "/"
  | "/foundations"
  | "/iconography"
  | "/components"
  | "/social"
  | "/marketing"
  | "/downloads"
  | "/knowledge-base"
  | "/contact";

type NavItem = { to: NavPath; label: string; caption: string; icon: LucideIcon };

const GROUPS: { label: string; items: NavItem[] }[] = [
  {
    label: "System",
    items: [
      { to: "/", label: "Overview", caption: "Start here", icon: Home },
      { to: "/foundations", label: "Foundations", caption: "Colour, type, motion", icon: Palette },
      { to: "/iconography", label: "Iconography", caption: "1px Lucide set", icon: Sparkles },
      { to: "/components", label: "Components", caption: "Buttons, cards, forms", icon: Component },
    ],
  },
  {
    label: "Kits",
    items: [
      { to: "/social", label: "Social", caption: "Posts, stories, carousels", icon: Share2 },
      { to: "/marketing", label: "Marketing", caption: "Demo homepage", icon: Megaphone },
      { to: "/downloads", label: "Downloads", caption: "Logos, colours, assets", icon: Download },
    ],
  },
  {
    label: "Content",
    items: [
      { to: "/knowledge-base", label: "Knowledge base", caption: "Single source of truth", icon: BookOpen },
      { to: "/contact", label: "Contact", caption: "Branches & partners", icon: Building2 },
    ],
  },
];

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

  const isActive = (to: NavPath) =>
    to === "/" ? currentPath === "/" : currentPath === to || currentPath.startsWith(to + "/");

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          type="button"
          aria-label="Open navigation"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-hairline text-navy transition hover:bg-surface-tint"
        >
          <Menu size={18} strokeWidth={1.5} />
        </button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-[340px] border-l border-hairline bg-surface p-0 sm:w-[400px]"
      >
        <SheetTitle className="sr-only">Navigation</SheetTitle>
        <SheetDescription className="sr-only">
          Bonlife design system navigation
        </SheetDescription>

        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-hairline px-6 py-5">
            <Link to="/" onClick={() => setOpen(false)} className="flex items-center gap-2.5">
              <img src={wordmarkDark} alt="Bonlife" className="h-[22px]" />
            </Link>
            <span className="rounded-full border border-hairline px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              Design System · {SYSTEM_VERSION}
            </span>
          </div>

          {/* Groups */}
          <nav className="flex-1 space-y-6 overflow-y-auto px-4 py-6">
            {GROUPS.map((group) => (
              <div key={group.label}>
                <div className="mb-2 px-3 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-coral">
                  {group.label}
                </div>
                <ul className="grid gap-0.5">
                  {group.items.map((it) => {
                    const active = isActive(it.to);
                    const Icon = it.icon;
                    return (
                      <li key={it.to}>
                        <Link
                          to={it.to}
                          onClick={() => setOpen(false)}
                          className={
                            "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors " +
                            (active
                              ? "bg-surface-tint"
                              : "hover:bg-surface-tint")
                          }
                        >
                          {active ? (
                            <span
                              aria-hidden
                              className="absolute left-0 top-1/2 h-6 w-[3px] -translate-y-1/2 rounded-r-full bg-coral"
                            />
                          ) : null}
                          <span
                            className={
                              "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg " +
                              (active
                                ? "bg-navy text-white"
                                : "bg-white text-navy/70 group-hover:text-navy")
                            }
                          >
                            <Icon size={15} strokeWidth={1.5} />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span
                              className={
                                "block font-display text-[14px] font-semibold " +
                                (active ? "text-navy" : "text-navy/90")
                              }
                            >
                              {it.label}
                            </span>
                            <span className="mt-0.5 block text-[11.5px] leading-tight text-muted-foreground">
                              {it.caption}
                            </span>
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </nav>

          {/* Footer / Contact + Auth */}
          <div className="border-t border-hairline bg-white px-4 py-5">
            <div className="mb-3 grid gap-1.5 rounded-xl bg-surface-tint px-3 py-3">
              <a
                href="tel:+264833371730"
                className="flex items-center gap-2 text-[12.5px] text-navy hover:text-coral"
              >
                <Phone size={13} strokeWidth={1.5} className="text-coral" />
                +264 83 337 1730
              </a>
              <a
                href="mailto:info@bonlifenam.com"
                className="flex items-center gap-2 text-[12.5px] text-navy hover:text-coral"
              >
                <Mail size={13} strokeWidth={1.5} className="text-coral" />
                info@bonlifenam.com
              </a>
              <div className="flex items-center gap-2 text-[12.5px] text-navy/70">
                <MessageCircle size={13} strokeWidth={1.5} className="text-coral" />
                SMS <span className="font-mono text-navy">74448</span>
              </div>
            </div>

            {!session ? (
              <Link
                to="/auth"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2 rounded-lg border border-hairline bg-white py-2.5 font-display text-[13px] font-semibold text-navy transition-colors hover:bg-surface-tint"
              >
                <LogIn size={14} strokeWidth={1.5} /> Admin sign in
              </Link>
            ) : (
              <div className="grid gap-1">
                {isAdmin ? (
                  <Link
                    to="/admin/knowledge-base"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2 rounded-lg px-3 py-2 font-display text-[13px] font-semibold text-navy hover:bg-surface-tint"
                  >
                    <ShieldCheck size={14} strokeWidth={1.5} /> Knowledge base backend
                  </Link>
                ) : null}
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-left font-display text-[13px] font-semibold text-navy/70 hover:bg-surface-tint hover:text-navy"
                >
                  <LogOut size={14} strokeWidth={1.5} /> Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
