import { useEffect, useState } from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type SidebarItem = {
  id: string;
  label: string;
  icon?: LucideIcon;
};

export type SidebarGroup = {
  label: string;
  items: SidebarItem[];
};

type Props = {
  label?: string;
  items?: SidebarItem[];
  groups?: SidebarGroup[];
};

function flatten(items?: SidebarItem[], groups?: SidebarGroup[]): SidebarItem[] {
  if (items) return items;
  if (groups) return groups.flatMap((g) => g.items);
  return [];
}

export function PageSidebar({ label = "Sections", items, groups }: Props) {
  const all = flatten(items, groups);
  const [activeId, setActiveId] = useState<string>(all[0]?.id ?? "");

  useEffect(() => {
    if (!all.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-120px 0px -60% 0px", threshold: 0 },
    );
    all.forEach((it) => {
      const el = document.getElementById(it.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [all.map((i) => i.id).join("|")]);

  return (
    <>
      {/* Mobile pill strip */}
      <nav
        aria-label={label}
        className="mb-6 -mx-6 flex gap-2 overflow-x-auto px-6 pb-1 md:hidden"
      >
        {all.map((it) => (
          <a
            key={it.id}
            href={`#${it.id}`}
            className={cn(
              "shrink-0 rounded-full border px-3.5 py-1.5 font-display text-[12px] font-semibold transition-colors",
              activeId === it.id
                ? "border-navy bg-navy text-white"
                : "border-hairline bg-surface text-navy/70 hover:text-navy",
            )}
          >
            {it.label}
          </a>
        ))}
      </nav>

      {/* Desktop sticky sidebar */}
      <aside className="hidden md:block">
        <div className="sticky top-24">
          {groups ? (
            <div className="flex flex-col gap-5">
              {groups.map((g) => (
                <div key={g.label}>
                  <div className="mb-2 px-3 font-display text-[10.5px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                    {g.label}
                  </div>
                  <ItemList items={g.items} activeId={activeId} />
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="mb-3 px-3 font-display text-[10.5px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                {label}
              </div>
              <ItemList items={items ?? []} activeId={activeId} numbered />
            </>
          )}
        </div>
      </aside>
    </>
  );
}

function ItemList({
  items,
  activeId,
  numbered = false,
}: {
  items: SidebarItem[];
  activeId: string;
  numbered?: boolean;
}) {
  return (
    <ul className="flex flex-col gap-0.5">
      {items.map((it, i) => {
        const Icon = it.icon;
        const active = activeId === it.id;
        return (
          <li key={it.id}>
            <a
              href={`#${it.id}`}
              className={cn(
                "group flex items-center gap-3 rounded-xl border border-transparent px-3 py-2 font-display text-[13px] font-medium transition-colors",
                active
                  ? "border-hairline bg-surface-tint text-navy"
                  : "text-navy/60 hover:bg-surface-tint hover:text-navy",
              )}
            >
              {Icon ? (
                <Icon strokeWidth={1} size={16} className="shrink-0" />
              ) : null}
              <span className="min-w-0 truncate">{it.label}</span>
              {numbered ? (
                <span
                  className={cn(
                    "ml-auto font-mono text-[10.5px]",
                    active ? "text-coral" : "text-muted-foreground/70",
                  )}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
              ) : null}
            </a>
          </li>
        );
      })}
    </ul>
  );
}

export function PageWithSidebar({
  children,
  sidebar,
  className,
}: {
  children: React.ReactNode;
  sidebar: React.ReactNode;
  className?: string;
}) {
  return (
    <main className={cn("mx-auto max-w-[1200px] px-6 py-12 sm:px-8", className)}>
      <div className="grid gap-8 md:grid-cols-[220px_minmax(0,1fr)] md:gap-10">
        {sidebar}
        <div className="min-w-0">{children}</div>
      </div>
    </main>
  );
}
