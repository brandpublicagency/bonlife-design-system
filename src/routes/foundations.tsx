import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader, SiteFooter, PageHeader } from "@/components/bonlife/SiteChrome";
import { PageSidebar, PageWithSidebar } from "@/components/bonlife/PageSidebar";
import { PageSection } from "@/components/bonlife/PageSection";
import {
  Palette,
  Type as TypeIcon,
  Ruler,
  Square,
  Zap,
  Star,
  Waves,
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
import g1 from "@/assets/bonlife/gradients/gradient-01.jpg.asset.json";
import g2 from "@/assets/bonlife/gradients/gradient-02.jpg.asset.json";
import g3 from "@/assets/bonlife/gradients/gradient-03.jpg.asset.json";
import g4 from "@/assets/bonlife/gradients/gradient-04.png.asset.json";
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
          "Bonlife color palette, typography, spacing, radius, motion, logos, gradients and photography.",
      },
      { property: "og:title", content: "Foundations - Bonlife Design System" },
      {
        property: "og:description",
        content:
          "Bonlife color palette, typography, spacing, radius, motion, logos, gradients and photography.",
      },
      { property: "og:url", content: "/foundations" },
    ],
    links: [{ rel: "canonical", href: "/foundations" }],
  }),
  component: FoundationsPage,
});

const TOC = [
  { id: "color", label: "Colour", icon: Palette },
  { id: "type", label: "Typography", icon: TypeIcon },
  { id: "spacing", label: "Spacing", icon: Ruler },
  { id: "radius", label: "Radius & shadow", icon: Square },
  { id: "motion", label: "Motion", icon: Zap },
  { id: "logos", label: "Logos", icon: Star },
  { id: "gradients", label: "Gradients", icon: Waves },
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
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <PageHeader
        eyebrow="Foundations"
        title="The tokens beneath every Bonlife surface."
        lead="Color, type, spacing, motion, logos and photography - all traced back to the brand book, no invented values."
      />

      <PageWithSidebar sidebar={<PageSidebar label="Foundations" items={TOC} />}>


      <PageSection
        id="color"
        eyebrow="Colour · Primary"
        title="Navy anchor, warm coral accent."
        lead="Bonlife is not a pastel-insurance brand - it reads corporate-serious first, friendly second. Navy owns text and chrome; coral owns CTAs and highlights against it."
      >
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          <Swatch color="#0C1C3E" name="Navy 900" hex="#0C1C3E" token="--navy-900" />
          <Swatch color="#FF876A" name="Coral 500" hex="#FF876A" token="--coral-500" fg="navy" />
          <Swatch color="#01FBC0" name="Mint 400" hex="#01FBC0" token="--mint-400" fg="navy" />
        </div>
      </PageSection>

      <PageSection
        eyebrow="Colour · Categories"
        title="Four plans, four colours."
        lead="Each product category owns a saturated identifier colour. Use it to tint plan cards and badges for its own category - never as a general UI colour."
      >
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          <Swatch color="#04413F" name="Funeral" hex="#04413F" token="--category-funeral" />
          <Swatch color="#541467" name="Life" hex="#541467" token="--category-life" />
          <Swatch color="#0D2B90" name="Savings" hex="#0D2B90" token="--category-savings" />
          <Swatch color="#A80A4D" name="Accident" hex="#A80A4D" token="--category-accident" />
        </div>
      </PageSection>

      <PageSection
        eyebrow="Colour · Surfaces & semantic"
        title="Two near-whites, two states."
        lead="Surface tint sits under navy text; muted fills cards and inputs. Semantic red and mint cover error and success only - never decorative."
      >
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          <Swatch color="#FFFFFF" name="Surface" hex="#FFFFFF" token="--surface-white" fg="navy" />
          <Swatch color="#F7F8FB" name="Tint" hex="#F7F8FB" token="--surface-tint" fg="navy" />
          <Swatch color="#EAEDF4" name="Muted" hex="#EAEDF4" token="--surface-muted" fg="navy" />
          <Swatch color="#FF5F5F" name="Error" hex="#FF5F5F" token="--state-error" />
          <Swatch color="#41FFB6" name="Success" hex="#41FFB6" token="--state-success" fg="navy" />
        </div>
      </PageSection>

      <PageSection
        id="type"
        eyebrow="Typography"
        title="Onest for display, Inter for body."
        lead="Bold Onest with tight negative tracking on headings loosens to 0 by H5. Inter carries everything long-form. No serif, no script, no display faces."
      >
        <div className="overflow-hidden rounded-xl border border-hairline bg-surface">
          {[
            { tag: "H1", size: "60 / -0.03em / 700", text: "N$1,000 Instant Cash, same day." },
            { tag: "H2", size: "48 / -0.02em / 700", text: "Two Pockets. One Plan." },
            { tag: "H3", size: "32 / -0.02em / 700", text: "Start early. Study further." },
            { tag: "H4", size: "25 / -0.02em / 600", text: "Speed is respect." },
            { tag: "H5", size: "18 / 0 / 600", text: "Family Plan" },
            { tag: "H6", size: "14 / 0 / 600", text: "COVER BENEFIT" },
          ].map((r) => {
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
              <p className="!m-0 text-lg leading-[1.65]">A grieving family cannot wait weeks. Every Bonlife funeral plan pays a cover benefit fast.</p>
            </div>
            <div className="grid grid-cols-[60px_1fr] items-baseline gap-6">
              <span className="font-mono text-[11px] font-semibold uppercase text-muted-foreground">Body</span>
              <p className="!m-0 text-base leading-[1.6]">Start early, study further. Give them every chance.</p>
            </div>
            <div className="grid grid-cols-[60px_1fr] items-baseline gap-6">
              <span className="font-mono text-[11px] font-semibold uppercase text-muted-foreground">Body S</span>
              <p className="!m-0 text-sm leading-[1.55] text-muted-foreground">SMS your name to 74448.</p>
            </div>
          </div>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <a
            href="https://fonts.google.com/specimen/Onest"
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
            href="https://fonts.google.com/specimen/Inter"
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

      <PageSection id="spacing" eyebrow="Spacing" title="4px base, generous rhythm.">
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

      <PageSection id="radius" eyebrow="Radius & shadow" title="Friendly, trust-first.">
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

      <PageSection id="motion" eyebrow="Motion" title="Calm, never showy.">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          {[
            { name: "instant", ms: "100ms", use: "presses" },
            { name: "fast", ms: "160ms", use: "hovers" },
            { name: "base", ms: "240ms", use: "menus, toasts" },
            { name: "slow", ms: "400ms", use: "modals" },
          ].map((m) => (
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

      <PageSection id="logos" eyebrow="Logos" title="Wordmark and mark lockups.">
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
        id="gradients"
        eyebrow="Gradients"
        title="Noise gradients for hero moments."
        lead="Grain-textured blends of brand and category colors. A tool for hero and marketing surfaces, never the default state of a card, and never behind body text without a scrim."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[g1, g2, g3, g4].map((g, i) => (
            <div key={i} className="aspect-[4/3] overflow-hidden rounded-xl">
              <img src={g.url} alt="" className="h-full w-full object-cover" />
            </div>
          ))}
        </div>
      </PageSection>

      <PageSection
        id="photography"
        eyebrow="Photography"
        title="Warm, candid, Namibian."
        lead="Real portraiture - multi-generational, hugging, laughing, often looking at camera. Full-bleed or generously cropped. Never behind heavy dark overlays."
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
