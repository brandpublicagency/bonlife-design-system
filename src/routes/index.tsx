import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Stethoscope, Banknote, MapPin, Sparkles } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/bonlife/SiteChrome";
import { Button } from "@/components/bonlife/Button";
import { Card } from "@/components/bonlife/Card";
import { PlanCard } from "@/components/bonlife/PlanCard";
import markCoral from "@/assets/bonlife/logos/bonlife-mark-coral.svg";
import gradient from "@/assets/bonlife/gradients/gradient-01.jpg.asset.json";
import familyStudio from "@/assets/bonlife/photography/family-studio.jpg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Bonlife Design System" },
      {
        name: "description",
        content:
          "The visual foundations, component library, and marketing patterns for Bonlife Namibia.",
      },
      { property: "og:title", content: "Bonlife Design System" },
      {
        property: "og:description",
        content:
          "The visual foundations, component library, and marketing patterns for Bonlife Namibia.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* Hero */}
      <section className="relative overflow-hidden bg-navy">
        <img
          src={gradient.url}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover opacity-70"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-b from-navy/40 via-navy/55 to-navy/85"
        />
        <div className="relative mx-auto grid max-w-[1200px] items-center gap-12 px-6 pb-24 pt-20 sm:px-8 md:grid-cols-[1.15fr_0.85fr] md:pt-28">
          <div className="text-white">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] backdrop-blur">
              <img src={markCoral} alt="" className="h-3.5" />
              Bonlife Design System
            </div>
            <h1 className="mt-6 max-w-[620px] !text-[52px] !leading-[1.02] tracking-[-0.03em] text-white sm:!text-[68px]">
              The visual system behind a Namibian family friend.
            </h1>
            <p className="mt-6 max-w-[520px] text-[17px] leading-[1.6] text-white/80">
              Colors, typography and components for Bonlife Assurance Namibia.
              Built for a brand that leads with warmth, keeps its jargon out,
              and shows up in person through 20 branches across Namibia.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link to="/components">
                <Button variant="secondary" size="lg">
                  Browse components <ArrowRight size={16} />
                </Button>
              </Link>
              <Link to="/foundations">
                <Button
                  variant="ghost"
                  size="lg"
                  className="border border-white/25 bg-white/5 text-white hover:bg-white/15"
                >
                  See the foundations
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -left-6 -top-6 hidden h-full w-full rounded-xl border border-white/15 md:block" />
            <img
              src={familyStudio.url}
              alt="Namibian family portrait"
              className="relative aspect-[4/5] w-full rounded-xl object-cover object-[center_25%] shadow-[0_30px_80px_rgba(0,0,0,0.45)]"
            />
          </div>
        </div>

        {/* Stats strip */}
        <div className="relative border-t border-white/10 bg-navy/40 backdrop-blur">
          <div className="mx-auto grid max-w-[1200px] grid-cols-2 divide-white/10 px-6 sm:px-8 md:grid-cols-4 md:divide-x">
            {[
              { k: "Zero", v: "Medical tests" },
              { k: "N$1,000", v: "Instant Cash" },
              { k: "20", v: "Namibian branches" },
              { k: "4", v: "Plan categories" },
            ].map((s, i) => (
              <div
                key={s.k}
                className={`py-5 ${i >= 2 ? "md:pl-8" : ""} ${
                  i > 0 ? "md:pl-8" : ""
                }`}
              >
                <div className="font-display text-[26px] font-bold tracking-[-0.02em] text-white">
                  {s.k}
                </div>
                <div className="mt-0.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/60">
                  {s.v}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sections */}
      <section className="mx-auto max-w-[1200px] px-6 py-20 sm:px-8">
        <div className="mb-10 grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-coral">
              Inside the system
            </div>
            <h2 className="mt-2 !text-[40px] !leading-[1.08]">
              Three surfaces, one voice.
            </h2>
          </div>
          <p className="max-w-sm text-[14px] leading-[1.65] text-muted-foreground">
            Every token, component and page traces back to the Bonlife brand
            book and knowledge base — nothing invented, nothing decorative.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          <SectionCard
            to="/foundations"
            eyebrow="01 · Foundations"
            title="Color, type, spacing, motion"
            body="Navy anchor, coral accent, four category colors, Onest + Inter, and a friendly 8/12/20/28 radius scale."
            count="9 sections"
          />
          <SectionCard
            to="/components"
            eyebrow="02 · Components"
            title="17 building blocks"
            body="Buttons, inputs, plan cards, dialogs and tooltips — every one built from the brand tokens."
            count="17 components"
          />
          <SectionCard
            to="/marketing"
            eyebrow="03 · Marketing Kit"
            title="A demo bonlifenam.com"
            body="A plausible homepage assembled from the real plans, real copy, and real Namibian photography."
            count="1 screen"
          />
        </div>
      </section>

      {/* Plan color preview */}
      <section className="mx-auto max-w-[1200px] px-6 pb-20 sm:px-8">
        <div className="mb-10">
          <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-coral">
            Plan categories
          </div>
          <h2 className="mt-2 !text-[40px] !leading-[1.08]">
            Four products, four identifiers.
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-[1.65] text-muted-foreground">
            Each Bonlife plan category owns a saturated color used only within
            its own category — funeral green, life plum, savings royal, accident
            magenta.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          <PlanCard category="funeral" title="Funeral Cover" cta="Explore" />
          <PlanCard category="life" title="Life Insurance" cta="Explore" />
          <PlanCard category="savings" title="Saving &amp; Education" cta="Explore" />
          <PlanCard category="accident" title="Accident &amp; Disability" cta="Explore" />
        </div>
      </section>

      {/* Principles */}
      <section className="border-t border-hairline bg-surface">
        <div className="mx-auto max-w-[1200px] px-6 py-20 sm:px-8">
          <div className="mb-10">
            <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-coral">
              How this brand behaves
            </div>
            <h2 className="mt-2 !text-[40px] !leading-[1.08]">
              Trust first, warmth always.
            </h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {[
              {
                Icon: Stethoscope,
                title: "No medical tests",
                body: "A short questionnaire, no health examinations — cover is accessible to every Namibian, regardless of medical history.",
              },
              {
                Icon: Banknote,
                title: "Never hide the fine print",
                body: "Waiting periods, exclusions and lapse rules are plain and up front — hiding them is a trust failure.",
              },
              {
                Icon: Sparkles,
                title: "Jargon out",
                body: "If a smart 15-year-old would not understand it, we rewrite it. Short sentences, hyphens only, no emoji.",
              },
            ].map(({ Icon, title, body }) => (
              <div
                key={title}
                className="rounded-xl border border-hairline bg-surface-tint p-7"
              >
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-coral/15 text-coral-hover">
                  <Icon size={20} />
                </div>
                <h4 className="mt-4 !text-[19px]">{title}</h4>
                <p className="mt-2 text-[14px] leading-[1.65] text-muted-foreground">
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

function SectionCard({
  to,
  eyebrow,
  title,
  body,
  count,
}: {
  to: "/foundations" | "/components" | "/marketing";
  eyebrow: string;
  title: string;
  body: string;
  count: string;
}) {
  return (
    <Link to={to} className="group block">
      <Card variant="outline" hoverable className="flex h-full flex-col p-7">
        <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-coral">
          {eyebrow}
        </div>
        <h4 className="mt-3 !text-[22px]">{title}</h4>
        <p className="mt-3 flex-1 text-[14px] leading-[1.6] text-muted-foreground">
          {body}
        </p>
        <div className="mt-6 flex items-center justify-between border-t border-hairline pt-4">
          <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-navy/60">
            {count}
          </span>
          <span className="inline-flex items-center gap-1.5 font-display text-[13px] font-semibold text-navy transition-transform group-hover:translate-x-1">
            Open <ArrowRight size={14} />
          </span>
        </div>
      </Card>
    </Link>
  );
}
