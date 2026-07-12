import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
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
    <div className="mb-8 grid gap-6 border-b border-hairline pb-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:items-end">
      <div className="flex min-w-0 items-center gap-4">
        <div
          ref={iconWrapRef}
          className={cn(
            "group/cat relative grid h-14 w-14 shrink-0 place-items-center rounded-2xl border",
            dark
              ? "border-white/15 bg-white/5 text-white"
              : "border-hairline bg-surface-tint text-navy",
          )}
        >
          <Icon strokeWidth={1} size={28} aria-hidden />
          <button
            type="button"
            aria-label={`Download ${group.title} category icon as SVG`}
            onClick={() => {
              const svg = iconWrapRef.current?.querySelector("svg");
              if (svg) downloadIcon(svg, `bonlife-category-${group.id}.svg`);
            }}
            className={cn(
              "absolute -bottom-2 -right-2 inline-flex h-7 w-7 items-center justify-center rounded-full border shadow-sm opacity-0 transition-opacity focus-visible:opacity-100 focus-visible:outline-none group-hover/cat:opacity-100",
              dark
                ? "border-white/20 bg-navy text-white hover:bg-navy-700"
                : "border-hairline bg-surface text-navy hover:bg-surface-tint",
            )}
          >
            <Download size={13} strokeWidth={1.5} />
          </button>
        </div>
        <div className="min-w-0">
          <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-coral">
            {String(index + 1).padStart(2, "0")} · Category
          </div>
          <h2 className="mt-1 !text-[28px] !leading-[1.1] sm:!text-[32px]">
            {group.title}
          </h2>
        </div>
      </div>
      <p className="text-[14.5px] leading-[1.6] text-muted-foreground md:pl-6">
        {group.lead}
      </p>
    </div>
  );
}

function IconographyPage() {
  const [dark, setDark] = useState(false);

  const toc = ICON_GROUPS.map((g) => ({ id: g.id, label: g.title }));

  return (
    <>
      <SiteHeader />
      <PageHeader
        eyebrow="Iconography"
        title="One thin line, eight groups."
        lead="Bonlife icons are Lucide at 1px stroke — outlined, never filled. Stroke inherits colour from the surface it sits on, so a single set covers light and dark. Hover any tile to download the SVG."
        toc={toc}
      />

      <main className="mx-auto max-w-[1200px] px-6 sm:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-hairline py-5">
          <div className="text-[13px] leading-[1.6] text-muted-foreground">
            <span className="font-display font-semibold text-navy">Preview surface.</span>{" "}
            Toggle the background to confirm 1px strokes read well on both.
          </div>
          <div
            role="tablist"
            aria-label="Preview surface"
            className="inline-flex items-center gap-1 rounded-full border border-hairline bg-surface-tint p-1"
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
                  "rounded-full px-4 py-1.5 font-display text-[12px] font-semibold transition-colors",
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
            className="scroll-mt-24 py-12 sm:py-14"
          >
            <div
              className={cn(
                "rounded-3xl p-6 ring-1 sm:p-8",
                dark
                  ? "bg-navy ring-white/10"
                  : "bg-surface-tint ring-hairline",
              )}
            >
              <GroupHeader index={i} group={group} dark={dark} />
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                {group.icons.map((entry) => (
                  <IconTile key={entry.name} entry={entry} dark={dark} />
                ))}
              </div>
            </div>
          </section>
        ))}

        <section className="border-t border-hairline py-14">
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
      </main>
      <SiteFooter />
    </>
  );
}
