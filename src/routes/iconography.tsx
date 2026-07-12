import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader, SiteFooter, PageHeader } from "@/components/bonlife/SiteChrome";
import { IconTile } from "@/components/bonlife/IconTile";
import { ICON_GROUPS } from "@/lib/bonlife-icons";
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

function IconographyPage() {
  const [dark, setDark] = useState(false);

  const toc = ICON_GROUPS.map((g) => ({ id: g.id, label: g.title }));

  return (
    <>
      <SiteHeader />
      <PageHeader
        eyebrow="Iconography"
        title="One thin line, three groups."
        lead="Bonlife icons are Lucide at 1px stroke — outlined, never filled. Stroke inherits colour from the surface it sits on, so a single set covers light and dark. Hover any tile to download the SVG."
        toc={toc}
      />

      <main className="mx-auto max-w-[1200px] px-6 sm:px-8">
        <section className="flex flex-wrap items-center justify-between gap-4 border-b border-hairline py-6">
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
        </section>

        {ICON_GROUPS.map((group, i) => (
          <section
            key={group.id}
            id={group.id}
            className="scroll-mt-24 border-t border-hairline py-16 first:border-t-0 sm:py-20"
          >
            <div className="mb-8 max-w-2xl">
              <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-coral">
                {String(i + 1).padStart(2, "0")} · {group.title}
              </div>
              <h2 className="mt-2 !text-[32px] !leading-[1.1] sm:!text-[36px]">
                {group.title}
              </h2>
              <p className="mt-3 text-[15px] leading-[1.65] text-muted-foreground">
                {group.lead}
              </p>
            </div>
            <div
              className={cn(
                "rounded-3xl p-6 sm:p-8",
                dark ? "bg-navy" : "bg-surface-tint",
              )}
            >
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                {group.icons.map((entry) => (
                  <IconTile key={entry.name} entry={entry} dark={dark} />
                ))}
              </div>
            </div>
          </section>
        ))}

        <section className="border-t border-hairline py-14">
          <div className="rounded-2xl border border-hairline bg-surface p-6 text-[13px] leading-[1.65] text-muted-foreground sm:p-8">
            <div className="font-display text-[13px] font-semibold uppercase tracking-[0.14em] text-coral">
              Usage
            </div>
            <p className="mt-3">
              Use <code className="rounded bg-surface-tint px-1.5 py-0.5 font-mono text-[12px] text-navy">strokeWidth={1}</code>{" "}
              on every Lucide icon in product. Stroke colour is inherited via{" "}
              <code className="rounded bg-surface-tint px-1.5 py-0.5 font-mono text-[12px] text-navy">currentColor</code>{" "}
              — set text colour on the parent, not the icon. On dark surfaces the same
              icons render in white without a second weight; retina displays are the
              acceptance bar.
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
