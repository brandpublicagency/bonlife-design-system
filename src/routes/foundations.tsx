import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/bonlife/SiteChrome";
import { Badge } from "@/components/bonlife/Badge";
import { Card } from "@/components/bonlife/Card";
import markNavy from "@/assets/bonlife/logos/bonlife-mark-navy.svg";
import markCoral from "@/assets/bonlife/logos/bonlife-mark-coral.svg";
import markMint from "@/assets/bonlife/logos/bonlife-mark-mint.svg";
import markWhite from "@/assets/bonlife/logos/bonlife-mark-white.svg";
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
      { title: "Foundations — Bonlife Design System" },
      {
        name: "description",
        content:
          "Bonlife color palette, typography, spacing, radius, motion, logos, gradients and photography.",
      },
      { property: "og:title", content: "Foundations — Bonlife Design System" },
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

function Section({
  eyebrow,
  title,
  children,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-hairline py-20 first:border-t-0">
      <div className="mx-auto max-w-[1200px] px-8">
        <Badge tone="coral">{eyebrow}</Badge>
        <h2 className="mt-3">{title}</h2>
        {intro ? (
          <p className="mt-4 max-w-2xl text-base leading-[1.65] text-muted-foreground">
            {intro}
          </p>
        ) : null}
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}

function Swatch({
  color,
  name,
  hex,
  fg = "white",
}: {
  color: string;
  name: string;
  hex: string;
  fg?: "white" | "navy";
}) {
  return (
    <div>
      <div
        className="flex h-32 items-end rounded-xl p-4"
        style={{ background: color, color: fg === "white" ? "#fff" : "#0C1C3E" }}
      >
        <span className="font-display text-sm font-semibold">{name}</span>
      </div>
      <div className="mt-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {hex}
      </div>
    </div>
  );
}

function FoundationsPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <Section
        eyebrow="Color · Primary"
        title="Navy anchor, warm coral accent."
        intro="Bonlife is not a pastel-insurance brand — it reads corporate-serious first, friendly second. Navy owns text and chrome; coral owns CTAs and highlights against it."
      >
        <div className="grid gap-6 md:grid-cols-3">
          <Swatch color="#0C1C3E" name="Navy 900" hex="#0C1C3E" />
          <Swatch color="#FF876A" name="Coral 500" hex="#FF876A" fg="navy" />
          <Swatch color="#01FBC0" name="Mint 400" hex="#01FBC0" fg="navy" />
        </div>
      </Section>

      <Section
        eyebrow="Color · Categories"
        title="Four plans, four colors."
        intro="Each product category owns a saturated identifier color. Use it to tint plan cards and badges for their own category — never as a general UI color."
      >
        <div className="grid gap-6 md:grid-cols-4">
          <Swatch color="#04413F" name="Funeral" hex="#04413F" />
          <Swatch color="#541467" name="Life" hex="#541467" />
          <Swatch color="#0D2B90" name="Savings" hex="#0D2B90" />
          <Swatch color="#A80A4D" name="Accident" hex="#A80A4D" />
        </div>
      </Section>

      <Section
        eyebrow="Color · Surfaces & semantic"
        title="Two near-whites, two states."
        intro="Surface tint sits under navy text; muted fills cards and inputs. Semantic red and mint cover error and success only — never decorative."
      >
        <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-5">
          <Swatch color="#FFFFFF" name="Surface" hex="#FFFFFF" fg="navy" />
          <Swatch color="#F7F8FB" name="Tint" hex="#F7F8FB" fg="navy" />
          <Swatch color="#EAEDF4" name="Muted" hex="#EAEDF4" fg="navy" />
          <Swatch color="#FF5F5F" name="Error" hex="#FF5F5F" />
          <Swatch color="#41FFB6" name="Success" hex="#41FFB6" fg="navy" />
        </div>
      </Section>

      <Section
        eyebrow="Typography"
        title="Onest for display, Inter for body."
        intro="Bold Onest with tight negative tracking on headings loosens to 0 by H5. Inter carries everything long-form. No serif, no script, no display faces."
      >
        <Card variant="outline" className="divide-y divide-hairline p-0">
          {[
            { tag: "H1", size: "60 / -0.03em / 700", text: "Claims paid within 48 hours." },
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
                className="flex items-baseline justify-between gap-6 p-6"
              >
                <Tag className="!m-0">{r.text}</Tag>
                <div className="hidden text-right text-[11px] font-medium uppercase tracking-wider text-muted-foreground md:block">
                  {r.tag} · {r.size}
                </div>
              </div>
            );
          })}
          <div className="p-6">
            <p className="font-body text-lg leading-[1.65]">
              Body Large — A grieving family cannot wait weeks. Every Bonlife
              funeral plan pays a cover benefit fast.
            </p>
            <p className="mt-3 font-body text-base leading-[1.6]">
              Body — Start early, study further. Give them every chance.
            </p>
            <p className="mt-3 font-body text-sm leading-[1.5] text-muted-foreground">
              Body Small — SMS your name to 74448.
            </p>
          </div>
        </Card>
      </Section>

      <Section eyebrow="Spacing" title="4px base, generous rhythm.">
        <div className="flex flex-wrap items-end gap-4">
          {[4, 8, 12, 16, 24, 32, 48, 64].map((s) => (
            <div key={s} className="text-center">
              <div className="bg-coral" style={{ width: s, height: s }} />
              <div className="mt-2 text-[11px] font-medium text-muted-foreground">
                {s}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Radius & shadow" title="Friendly, trust-first.">
        <div className="grid gap-6 md:grid-cols-4">
          {[
            { name: "sm · 8", cls: "rounded-sm" },
            { name: "md · 12", cls: "rounded-md" },
            { name: "lg · 20", cls: "rounded-lg" },
            { name: "xl · 28", cls: "rounded-xl" },
          ].map((r) => (
            <div key={r.name}>
              <div
                className={`h-24 bg-navy ${r.cls}`}
                style={{ boxShadow: "var(--shadow-md)" }}
              />
              <div className="mt-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                {r.name}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Motion" title="Calm, never showy.">
        <div className="grid gap-4 md:grid-cols-4">
          {[
            { name: "instant", ms: "100ms", use: "presses" },
            { name: "fast", ms: "160ms", use: "hovers" },
            { name: "base", ms: "240ms", use: "menus, toasts" },
            { name: "slow", ms: "400ms", use: "modals" },
          ].map((m) => (
            <Card key={m.name} variant="outline" className="p-6">
              <div className="font-display text-xs font-semibold uppercase tracking-wider text-coral">
                {m.name}
              </div>
              <div className="mt-2 font-display text-3xl font-bold text-navy">
                {m.ms}
              </div>
              <div className="mt-1 text-xs text-muted-foreground">{m.use}</div>
            </Card>
          ))}
        </div>
      </Section>

      <Section eyebrow="Logos" title="Wordmark and mark lockups.">
        <div className="grid gap-6 md:grid-cols-4">
          <Card variant="outline" className="flex h-32 items-center justify-center p-6">
            <img src={wordmarkDark} alt="Wordmark dark" className="max-h-8" />
          </Card>
          <Card
            variant="outline"
            className="flex h-32 items-center justify-center bg-navy p-6"
          >
            <img src={markWhite} alt="Mark white" className="max-h-14" />
          </Card>
          <Card variant="outline" className="flex h-32 items-center justify-center p-6">
            <img src={markNavy} alt="Mark navy" className="max-h-14" />
          </Card>
          <Card variant="outline" className="flex h-32 items-center justify-center p-6">
            <img src={markCoral} alt="Mark coral" className="max-h-14" />
          </Card>
          <Card
            variant="outline"
            className="flex h-32 items-center justify-center bg-navy p-6"
          >
            <img src={markMint} alt="Mark mint" className="max-h-14" />
          </Card>
        </div>
      </Section>

      <Section
        eyebrow="Gradients"
        title="Noise gradients for hero moments."
        intro="Grain-textured blends of brand and category colors. A tool for hero and marketing surfaces, never the default state of a card, and never behind body text without a scrim."
      >
        <div className="grid gap-6 md:grid-cols-4">
          {[g1, g2, g3, g4].map((g, i) => (
            <div key={i} className="aspect-[4/3] overflow-hidden rounded-xl">
              <img src={g.url} alt="" className="h-full w-full object-cover" />
            </div>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Photography"
        title="Warm, candid, Namibian."
        intro="Real portraiture — multi-generational, hugging, laughing, often looking at camera. Full-bleed or generously cropped. Never place photography behind heavy dark overlays."
      >
        <div className="grid gap-4 md:grid-cols-3">
          {[p1, p2, p3, p4, p5, p6].map((p, i) => (
            <div key={i} className="aspect-[4/3] overflow-hidden rounded-xl">
              <img src={p.url} alt="" className="h-full w-full object-cover" />
            </div>
          ))}
        </div>
      </Section>

      <SiteFooter />
    </div>
  );
}
