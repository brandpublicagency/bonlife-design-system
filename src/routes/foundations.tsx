import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader, SiteFooter, PageHeader } from "@/components/bonlife/SiteChrome";
import { PageSidebar, PageWithSidebar } from "@/components/bonlife/PageSidebar";
import { PageSection } from "@/components/bonlife/PageSection";
import { useSiteContent, loadSitePage } from "@/hooks/use-site-content";
import {
  Palette,
  Type as TypeIcon,
  Ruler,
  Square,
  Zap,
  Star,
  ImageIcon,
} from "lucide-react";
import markNavyAsset from "@/assets/bonlife/logos/bonlife-mark-navy.svg.asset.json";
import markCoralAsset from "@/assets/bonlife/logos/bonlife-mark-coral.svg.asset.json";
import markMintAsset from "@/assets/bonlife/logos/bonlife-mark-mint.svg.asset.json";
import markWhiteAsset from "@/assets/bonlife/logos/bonlife-mark-white.svg.asset.json";
const markNavy = markNavyAsset.url;
const markCoral = markCoralAsset.url;
const markMint = markMintAsset.url;
const markWhite = markWhiteAsset.url;
import wordmarkDark from "@/assets/bonlife/logos/bonlife-wordmark-dark.svg";
import p1 from "@/assets/bonlife/photography/family-studio.jpg.asset.json";
import p2 from "@/assets/bonlife/photography/couple-sofa.jpg.asset.json";
import p3 from "@/assets/bonlife/photography/celebration-fistpump.jpg.asset.json";
import p4 from "@/assets/bonlife/photography/mother-child.jpg.asset.json";
import p5 from "@/assets/bonlife/photography/senior-couple-beach.jpg.asset.json";
import p6 from "@/assets/bonlife/photography/father-daughter-laughing.jpg.asset.json";

export const Route = createFileRoute("/foundations")({
  head: () => ({
    meta: [
      { title: "Foundations - Bonlife Design System" },
      {
        name: "description",
        content:
          "Bonlife colour palette, typography, spacing, radius, motion, logos and photography.",
      },
      { property: "og:title", content: "Foundations - Bonlife Design System" },
      {
        property: "og:description",
        content:
          "Bonlife colour palette, typography, spacing, radius, motion, logos and photography.",
      },
      { property: "og:url", content: "/foundations" },
    ],
    links: [{ rel: "canonical", href: "/foundations" }],
  }),
  loader: ({ context }) => loadSitePage(context, "foundations"),
  component: FoundationsPage,
});

const TOC = [
  { id: "color", label: "Colour", icon: Palette },
  { id: "type", label: "Typography", icon: TypeIcon },
  { id: "spacing", label: "Spacing", icon: Ruler },
  { id: "radius", label: "Radius & shadow", icon: Square },
  { id: "motion", label: "Motion", icon: Zap },
  { id: "logos", label: "Logos", icon: Star },
  { id: "photography", label: "Photography", icon: ImageIcon },
];



function Swatch({
  color,
  name,
  hex,
  token,
  fg = "white",
}: {
  color: string;
  name: string;
  hex: string;
  token: string;
  fg?: "white" | "navy";
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-hairline bg-surface">
      <div
        className="flex h-28 items-end p-4"
        style={{ background: color, color: fg === "white" ? "#fff" : "#0C1C3E" }}
      >
        <span className="font-display text-[13px] font-semibold">{name}</span>
      </div>
      <div className="flex items-center justify-between gap-2 border-t border-hairline px-4 py-2.5">
        <span className="font-mono text-[11px] uppercase tracking-wider text-navy">
          {hex}
        </span>
        <span className="truncate font-mono text-[10.5px] text-muted-foreground">
          {token}
        </span>
      </div>
    </div>
  );
}

function FoundationsPage() {
  const c = useSiteContent("foundations");
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <PageHeader
        eyebrow={c.header.eyebrow}
        title={c.header.title}
        lead={c.header.lead}
      />

      <PageWithSidebar sidebar={<PageSidebar label="Foundations" items={TOC} />}>


      <PageSection
        id="color"
        eyebrow="Colour · Primary"
        title={c.colourPrimary.title}
        lead={c.colourPrimary.lead}
      >
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {c.colourPrimary.swatches.map((w) => (
            <Swatch key={w.name} color={w.hex} name={w.name} hex={w.hex} token={w.token} fg={w.textOn === "dark" ? "navy" : "white"} />
          ))}
        </div>
      </PageSection>

      <PageSection
        eyebrow="Colour · Categories"
        title={c.colourCategories.title}
        lead={c.colourCategories.lead}
      >
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          {c.colourCategories.swatches.map((w) => (
            <Swatch key={w.name} color={w.hex} name={w.name} hex={w.hex} token={w.token} fg={w.textOn === "dark" ? "navy" : "white"} />
          ))}
        </div>
      </PageSection>

      <PageSection
        eyebrow="Colour · Surfaces & semantic"
        title={c.colourSurfaces.title}
        lead={c.colourSurfaces.lead}
      >
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {c.colourSurfaces.swatches.map((w) => (
            <Swatch key={w.name} color={w.hex} name={w.name} hex={w.hex} token={w.token} fg={w.textOn === "dark" ? "navy" : "white"} />
          ))}
        </div>
      </PageSection>

      <PageSection
        id="type"
        eyebrow="Typography"
        title={c.typography.title}
        lead={c.typography.lead}
      >
        <div className="overflow-hidden rounded-xl border border-hairline bg-surface">
          {c.typography.headings.map((r) => {
            const Tag = r.tag.toLowerCase() as "h1";
            return (
              <div
                key={r.tag}
                className="grid grid-cols-[60px_1fr_auto] items-baseline gap-6 border-b border-hairline px-6 py-5 last:border-b-0"
              >
                <span className="font-mono text-[11px] font-semibold uppercase text-muted-foreground">
                  {r.tag}
                </span>
                <Tag className="!m-0 truncate">{r.text}</Tag>
                <span className="hidden font-mono text-[10.5px] text-muted-foreground md:inline">
                  {r.size}
                </span>
              </div>
            );
          })}
          <div className="space-y-3 border-t border-hairline p-6">
            <div className="grid grid-cols-[60px_1fr] items-baseline gap-6">
              <span className="font-mono text-[11px] font-semibold uppercase text-muted-foreground">Body L</span>
              <p className="!m-0 text-lg leading-[1.65]">{c.typography.bodyLarge}</p>
            </div>
            <div className="grid grid-cols-[60px_1fr] items-baseline gap-6">
              <span className="font-mono text-[11px] font-semibold uppercase text-muted-foreground">Body</span>
              <p className="!m-0 text-base leading-[1.6]">{c.typography.body}</p>
            </div>
            <div className="grid grid-cols-[60px_1fr] items-baseline gap-6">
              <span className="font-mono text-[11px] font-semibold uppercase text-muted-foreground">Body S</span>
              <p className="!m-0 text-sm leading-[1.55] text-muted-foreground">{c.typography.bodySmall}</p>
            </div>
          </div>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <a
            href={c.typography.onestUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between rounded-xl border border-hairline bg-surface p-5 transition-colors hover:border-coral/40"
          >
            <div>
              <div className="font-display text-[16px] font-semibold text-navy">Onest</div>
              <div className="mt-0.5 text-[12.5px] text-muted-foreground">Download on Google Fonts</div>
            </div>
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-coral text-navy transition-transform group-hover:scale-105" aria-hidden>↗</span>
          </a>
          <a
            href={c.typography.interUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between rounded-xl border border-hairline bg-surface p-5 transition-colors hover:border-coral/40"
          >
            <div>
              <div className="font-display text-[16px] font-semibold text-navy">Inter</div>
              <div className="mt-0.5 text-[12.5px] text-muted-foreground">Download on Google Fonts</div>
            </div>
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-coral text-navy transition-transform group-hover:scale-105" aria-hidden>↗</span>
          </a>
        </div>
      </PageSection>

      <PageSection id="spacing" eyebrow="Spacing" title={c.spacing.title}>
        <div className="rounded-xl border border-hairline bg-surface p-8">
          <div className="flex flex-wrap items-end gap-6">
            {[
              { s: 4, t: "--space-1" },
              { s: 8, t: "--space-2" },
              { s: 12, t: "--space-3" },
              { s: 16, t: "--space-4" },
              { s: 24, t: "--space-6" },
              { s: 32, t: "--space-8" },
              { s: 48, t: "--space-12" },
              { s: 64, t: "--space-16" },
            ].map(({ s, t }) => (
              <div key={s} className="text-center">
                <div className="mx-auto bg-coral" style={{ width: s, height: s }} />
                <div className="mt-2 font-mono text-[11px] font-semibold text-navy">
                  {s}
                </div>
                <div className="font-mono text-[10px] text-muted-foreground">
                  {t}
                </div>
              </div>
            ))}
          </div>
        </div>
      </PageSection>

      <PageSection id="radius" eyebrow="Radius & shadow" title={c.radius.title}>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          {[
            { name: "sm", size: "8px", cls: "rounded-sm" },
            { name: "md", size: "12px", cls: "rounded-md" },
            { name: "lg", size: "20px", cls: "rounded-lg" },
            { name: "xl", size: "28px", cls: "rounded-xl" },
          ].map((r) => (
            <div key={r.name} className="rounded-xl border border-hairline bg-surface p-5">
              <div
                className={`h-24 bg-navy ${r.cls}`}
                style={{ boxShadow: "var(--shadow-md)" }}
              />
              <div className="mt-4 flex items-baseline justify-between">
                <span className="font-display text-[13px] font-semibold text-navy">
                  {r.name}
                </span>
                <span className="font-mono text-[11px] text-muted-foreground">
                  {r.size}
                </span>
              </div>
            </div>
          ))}
        </div>
      </PageSection>

      <PageSection id="motion" eyebrow="Motion" title={c.motion.title}>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          {c.motion.durations.map((m) => (
            <div key={m.name} className="rounded-xl border border-hairline bg-surface p-6">
              <div className="font-mono text-[11px] font-semibold uppercase tracking-wider text-coral">
                {m.name}
              </div>
              <div className="mt-2 font-display text-[32px] font-bold leading-none text-navy">
                {m.ms}
              </div>
              <div className="mt-2 text-[12.5px] text-muted-foreground">
                {m.use}
              </div>
            </div>
          ))}
        </div>
      </PageSection>

      <PageSection id="logos" eyebrow="Logos" title={c.logos.title}>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <div className="flex h-32 items-center justify-center rounded-xl border border-hairline bg-surface p-6">
            <img src={wordmarkDark} alt="Wordmark dark" className="max-h-8" />
          </div>
          <div className="flex h-32 items-center justify-center rounded-xl bg-navy p-6">
            <img src={markWhite} alt="Mark white" className="max-h-14" />
          </div>
          <div className="flex h-32 items-center justify-center rounded-xl border border-hairline bg-surface p-6">
            <img src={markNavy} alt="Mark navy" className="max-h-14" />
          </div>
          <div className="flex h-32 items-center justify-center rounded-xl border border-hairline bg-surface p-6">
            <img src={markCoral} alt="Mark coral" className="max-h-14" />
          </div>
          <div className="flex h-32 items-center justify-center rounded-xl bg-navy p-6">
            <img src={markMint} alt="Mark mint" className="max-h-14" />
          </div>
        </div>
      </PageSection>


      <PageSection
        id="photography"
        eyebrow="Photography"
        title={c.photography.title}
        lead={c.photography.lead}
      >
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {[p1, p2, p3, p4, p5, p6].map((p, i) => (
            <div key={i} className="aspect-[4/3] overflow-hidden rounded-xl">
              <img src={p.url} alt="" className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.03]" />
            </div>
          ))}
        </div>
      </PageSection>
      </PageWithSidebar>

      <SiteFooter />
    </div>
  );
}
