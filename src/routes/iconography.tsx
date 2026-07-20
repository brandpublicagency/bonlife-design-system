import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { Download, HeartHandshake, Info } from "lucide-react";
import { SiteHeader, SiteFooter, PageHeader } from "@/components/bonlife/SiteChrome";
import { IconTile, downloadIcon } from "@/components/bonlife/IconTile";
import { ICON_GROUPS, type IconGroup } from "@/lib/bonlife-icons";
import { cn } from "@/lib/utils";
import { PageSidebar, PageWithSidebar } from "@/components/bonlife/PageSidebar";
import { PageSection } from "@/components/bonlife/PageSection";

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

function CategoryIcon({ group }: { group: IconGroup }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { Icon } = group;
  return (
    <div
      ref={ref}
      className="group/cat relative grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-hairline bg-surface-tint text-navy"
    >
      <Icon strokeWidth={1} size={22} aria-hidden />
      <button
        type="button"
        aria-label={`Download ${group.title} category icon as SVG`}
        onClick={() => {
          const svg = ref.current?.querySelector("svg");
          if (svg) downloadIcon(svg, `bonlife-category-${group.id}.svg`);
        }}
        className="absolute -bottom-1.5 -right-1.5 inline-flex h-6 w-6 items-center justify-center rounded-full border border-hairline bg-surface text-navy opacity-0 shadow-sm transition-opacity hover:bg-surface-tint focus-visible:opacity-100 focus-visible:outline-none group-hover/cat:opacity-100"
      >
        <Download size={11} strokeWidth={1.5} />
      </button>
    </div>
  );
}

function IconographyPage() {
  const [dark, setDark] = useState(false);

  const sidebarItems = [
    ...ICON_GROUPS.map((g) => ({ id: g.id, label: g.title, icon: g.Icon })),
    { id: "usage", label: "Usage", icon: Info },
  ];

  return (
    <>
      <SiteHeader />
      <PageHeader
        eyebrow="Iconography"
        title="One thin line, eight groups."
        lead="Bonlife icons are Lucide at 1px stroke — outlined, never filled. Stroke inherits colour from the surface it sits on, so a single set covers light and dark. Hover any tile to download the SVG."
      />

      <PageWithSidebar
        className="pt-10"
        sidebar={<PageSidebar label="Categories" items={sidebarItems} />}
      >
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
          <PageSection
            key={group.id}
            id={group.id}
            className={i === 0 ? "mt-12" : undefined}
            eyebrow={`${String(i + 1).padStart(2, "0")} · Category`}
            title={group.title}
            lead={group.lead}
            headerAction={<CategoryIcon group={group} />}
            surface
            bodyClassName="pt-6"
          >
            <div
              className={cn(
                "rounded-3xl p-5 ring-1 sm:p-7",
                dark
                  ? "bg-navy ring-white/10"
                  : "bg-surface-tint ring-hairline",
              )}
            >
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 lg:grid-cols-4">
                {group.icons.map((entry) => (
                  <IconTile key={entry.name} entry={entry} dark={dark} />
                ))}
              </div>
            </div>
          </PageSection>
        ))}

        <PageSection
          id="usage"
          eyebrow="Usage"
          title="Always 1px stroke, always currentColor"
          lead="Set strokeWidth={1} on every Lucide icon in product. Colour the parent — the icon inherits. On dark surfaces the same icons render in white without a second weight."
          bodyClassName="pt-4"
        >
          <div className="grid gap-6 rounded-2xl border border-hairline bg-surface p-6 md:grid-cols-[1.4fr_1fr] md:items-center md:p-8">
            <div>
              <p className="text-[13.5px] leading-[1.65] text-muted-foreground">
                Use{" "}
                <code className="rounded bg-surface-tint px-1.5 py-0.5 font-mono text-[12px] text-navy">
                  {`strokeWidth={1}`}
                </code>{" "}
                and set the icon’s colour from the parent. The default Lucide stroke is 2px, so override it everywhere — components, marketing, and social templates.
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
        </PageSection>
      </PageWithSidebar>
      <SiteFooter />
    </>
  );
}
