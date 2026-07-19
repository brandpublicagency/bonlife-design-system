import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Download, HeartHandshake } from "lucide-react";
import { SiteHeader, SiteFooter, PageHeader } from "@/components/bonlife/SiteChrome";
import { IconTile, downloadIcon } from "@/components/bonlife/IconTile";
import { ICON_GROUPS, type IconGroup } from "@/lib/bonlife-icons";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/iconography")({
  head: () => ({
    meta: [
      { title: "Iconography — Bonlife Design System" },
      {
        name: "description",
        content:
          "Bonlife icon library — Lucide icons at 1px stroke, curated for product categories, customer actions and shared utility. Download any icon as SVG.",
      },
      { property: "og:title", content: "Iconography — Bonlife Design System" },
      {
        property: "og:description",
        content:
          "Curated Lucide icons at 1px stroke for Bonlife product categories, customer actions and utility.",
      },
      { property: "og:url", content: "/iconography" },
    ],
    links: [{ rel: "canonical", href: "/iconography" }],
  }),
  component: IconographyPage,
});

function GroupHeader({
  index,
  group,
  dark,
}: {
  index: number;
  group: IconGroup;
  dark: boolean;
}) {
  const { Icon } = group;
  const iconWrapRef = useRef<HTMLDivElement | null>(null);
  return (
    <div className="mb-6 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border-b border-hairline pb-5 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] md:items-end md:gap-6">
      <div className="flex min-w-0 items-center gap-3">
        <div
          ref={iconWrapRef}
          className={cn(
            "group/cat relative grid h-11 w-11 shrink-0 place-items-center rounded-xl border",
            dark
              ? "border-white/15 bg-white/5 text-white"
              : "border-hairline bg-surface-tint text-navy",
          )}
        >
          <Icon strokeWidth={1} size={22} aria-hidden />
          <button
            type="button"
            aria-label={`Download ${group.title} category icon as SVG`}
            onClick={() => {
              const svg = iconWrapRef.current?.querySelector("svg");
              if (svg) downloadIcon(svg, `bonlife-category-${group.id}.svg`);
            }}
            className={cn(
              "absolute -bottom-1.5 -right-1.5 inline-flex h-6 w-6 items-center justify-center rounded-full border shadow-sm opacity-0 transition-opacity focus-visible:opacity-100 focus-visible:outline-none group-hover/cat:opacity-100",
              dark
                ? "border-white/20 bg-navy text-white hover:bg-navy-700"
                : "border-hairline bg-surface text-navy hover:bg-surface-tint",
            )}
          >
            <Download size={11} strokeWidth={1.5} />
          </button>
        </div>
        <div className="min-w-0">
          <div className={cn("text-[10.5px] font-semibold uppercase tracking-[0.14em]", dark ? "text-coral" : "text-coral")}>
            {String(index + 1).padStart(2, "0")} · Category
          </div>
          <h2 className={cn("mt-0.5 truncate !text-[22px] !leading-[1.15] sm:!text-[24px]", dark && "!text-white")}>
            {group.title}
          </h2>
        </div>
      </div>
      <p className={cn("hidden text-[13.5px] leading-[1.55] md:block md:pl-6", dark ? "text-white/60" : "text-muted-foreground")}>
        {group.lead}
      </p>
    </div>
  );
}

function IconographyPage() {
  const [dark, setDark] = useState(false);
  const [activeId, setActiveId] = useState<string>(ICON_GROUPS[0]?.id ?? "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-120px 0px -60% 0px", threshold: 0 },
    );
    ICON_GROUPS.forEach((g) => {
      const el = document.getElementById(g.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <SiteHeader />
      <PageHeader
        eyebrow="Iconography"
        title="One thin line, eight groups."
        lead="Bonlife icons are Lucide at 1px stroke — outlined, never filled. Stroke inherits colour from the surface it sits on, so a single set covers light and dark. Hover any tile to download the SVG."
      />

      <main className="mx-auto max-w-[1200px] px-6 pt-10 sm:px-8">
        {/* Mobile category strip */}
        <nav
          aria-label="Icon categories"
          className="mb-6 -mx-6 flex gap-2 overflow-x-auto px-6 pb-1 md:hidden"
        >
          {ICON_GROUPS.map((g) => (
            <a
              key={g.id}
              href={`#${g.id}`}
              className={cn(
                "shrink-0 rounded-full border px-3.5 py-1.5 font-display text-[12px] font-semibold transition-colors",
                activeId === g.id
                  ? "border-navy bg-navy text-white"
                  : "border-hairline bg-surface text-navy/70 hover:text-navy",
              )}
            >
              {g.title}
            </a>
          ))}
        </nav>

        <div className="grid gap-8 md:grid-cols-[220px_minmax(0,1fr)] md:gap-10">
          {/* Sticky sidebar */}
          <aside className="hidden md:block">
            <div className="sticky top-24">
              <div className="mb-3 px-3 font-display text-[10.5px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                Categories
              </div>
              <ul className="flex flex-col gap-0.5">
                {ICON_GROUPS.map((g, i) => {
                  const { Icon } = g;
                  const active = activeId === g.id;
                  return (
                    <li key={g.id}>
                      <a
                        href={`#${g.id}`}
                        className={cn(
                          "group flex items-center gap-3 rounded-xl border border-transparent px-3 py-2 font-display text-[13px] font-medium transition-colors",
                          active
                            ? "border-hairline bg-surface-tint text-navy"
                            : "text-navy/60 hover:bg-surface-tint hover:text-navy",
                        )}
                      >
                        <Icon strokeWidth={1} size={16} className="shrink-0" />
                        <span className="min-w-0 truncate">{g.title}</span>
                        <span className={cn("ml-auto font-mono text-[10.5px]", active ? "text-coral" : "text-muted-foreground/70")}>
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </aside>

          {/* Content column */}
          <div className="min-w-0">
            {/* Unified utility bar — always light chrome */}
            <div className="grid gap-4 rounded-2xl border border-hairline bg-surface p-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
              <div className="min-w-0 text-[13px] leading-[1.55] text-muted-foreground">
                <span className="font-display font-semibold text-navy">Full icon set.</span>{" "}
                SVGs and source files live in the shared Google Drive.
              </div>
              <a
                href="https://drive.google.com/drive/folders/1W_OspNdCrFBoq3R7HFNPhk7XqzecMOsU?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-coral px-4 py-2 font-display text-[12.5px] font-semibold text-navy transition-colors hover:bg-coral/90"
              >
                Open icon folder
                <span aria-hidden>↗</span>
              </a>
            </div>

            <div className="mt-4 grid gap-3 rounded-2xl border border-hairline bg-surface p-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:gap-4 sm:p-5">
              <div className="min-w-0 text-[13px] leading-[1.55] text-muted-foreground">
                <span className="font-display font-semibold text-navy">Preview surface.</span>{" "}
                Toggle to confirm 1px strokes read on both.
              </div>
              <div
                role="tablist"
                aria-label="Preview surface"
                className="inline-flex items-center gap-1 justify-self-start rounded-full border border-hairline bg-surface-tint p-1 sm:justify-self-end"
              >
                {(
                  [
                    { value: false, label: "Light" },
                    { value: true, label: "Dark" },
                  ] as const
                ).map((opt) => (
                  <button
                    key={opt.label}
                    type="button"
                    role="tab"
                    aria-selected={dark === opt.value}
                    onClick={() => setDark(opt.value)}
                    className={cn(
                      "rounded-full px-3.5 py-1.5 font-display text-[12px] font-semibold transition-colors",
                      dark === opt.value
                        ? "bg-navy text-white"
                        : "text-navy/70 hover:text-navy",
                    )}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {ICON_GROUPS.map((group, i) => (
              <section
                key={group.id}
                id={group.id}
                className="scroll-mt-24 py-6 sm:py-8"
              >
                <div
                  className={cn(
                    "rounded-3xl p-5 ring-1 sm:p-7",
                    dark
                      ? "bg-navy ring-white/10"
                      : "bg-surface-tint ring-hairline",
                  )}
                >
                  <GroupHeader index={i} group={group} dark={dark} />
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 lg:grid-cols-4">
                    {group.icons.map((entry) => (
                      <IconTile key={entry.name} entry={entry} dark={dark} />
                    ))}
                  </div>
                </div>
              </section>
            ))}

            <section className="border-t border-hairline py-12">
              <div className="grid gap-6 rounded-2xl border border-hairline bg-surface p-6 md:grid-cols-[1.4fr_1fr] md:items-center md:p-8">
                <div>
                  <div className="font-display text-[11px] font-semibold uppercase tracking-[0.14em] text-coral">
                    Usage
                  </div>
                  <h3 className="mt-2 font-display text-[20px] font-semibold text-navy">
                    Always 1px stroke, always <code className="font-mono">currentColor</code>
                  </h3>
                  <p className="mt-3 text-[13.5px] leading-[1.65] text-muted-foreground">
                    Set{" "}
                    <code className="rounded bg-surface-tint px-1.5 py-0.5 font-mono text-[12px] text-navy">
                      {`strokeWidth={1}`}
                    </code>{" "}
                    on every Lucide icon in product. Colour the parent — the icon inherits.
                    On dark surfaces the same icons render in white without a second weight.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl border border-hairline p-4 text-center">
                    <HeartHandshake strokeWidth={1} size={40} className="mx-auto text-navy" />
                    <div className="mt-2 font-mono text-[11px] text-muted-foreground">
                      strokeWidth = 1
                    </div>
                  </div>
                  <div className="rounded-xl border border-hairline p-4 text-center opacity-60">
                    <HeartHandshake strokeWidth={2} size={40} className="mx-auto text-navy" />
                    <div className="mt-2 font-mono text-[11px] text-muted-foreground">
                      strokeWidth = 2
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
