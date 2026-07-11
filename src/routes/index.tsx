import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/bonlife/SiteChrome";
import { Button } from "@/components/bonlife/Button";
import { Badge } from "@/components/bonlife/Badge";
import { Card } from "@/components/bonlife/Card";
import markCoral from "@/assets/bonlife/logos/bonlife-mark-coral.svg";
import gradient from "@/assets/bonlife/gradients/gradient-01.jpg.asset.json";
import familyStudio from "@/assets/bonlife/photography/family-studio.jpg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Bonlife Design System — Overview" },
      {
        name: "description",
        content:
          "The visual foundations, component library, and marketing patterns for Bonlife Assurance Namibia.",
      },
      { property: "og:title", content: "Bonlife Design System" },
      {
        property: "og:description",
        content:
          "Colors, typography, components and marketing patterns for Bonlife Assurance Namibia.",
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
      <section className="relative overflow-hidden">
        <img
          src={gradient.url}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-95"
        />
        <div className="relative mx-auto grid max-w-[1200px] items-center gap-12 px-8 py-24 md:grid-cols-[1.15fr_0.85fr]">
          <div className="text-white">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em] backdrop-blur">
              <img src={markCoral} alt="" className="h-3.5" />
              Bonlife Design System
            </div>
            <h1 className="text-white">
              A design system for a Namibian family friend.
            </h1>
            <p className="mt-6 max-w-[520px] text-lg leading-[1.65] text-white/80">
              Colors, typography, and components for Bonlife Assurance Namibia.
              Built for a brand that leads with warmth, keeps its jargon out,
              and pays claims within 48 hours.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/components">
                <Button variant="secondary" size="lg">
                  Browse components <ArrowRight size={16} />
                </Button>
              </Link>
              <Link to="/foundations">
                <Button
                  variant="ghost"
                  size="lg"
                  className="text-white hover:bg-white/10"
                >
                  See the foundations
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative">
            <img
              src={familyStudio.url}
              alt="Namibian family portrait"
              className="aspect-[4/5] w-full rounded-xl object-cover object-[center_25%] shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
            />
          </div>
        </div>
      </section>

      {/* Sections */}
      <section className="mx-auto max-w-[1200px] px-8 py-24">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <Badge tone="coral">Inside the system</Badge>
            <h2 className="mt-3">Three surfaces, one voice.</h2>
          </div>
          <p className="hidden max-w-sm text-sm text-muted-foreground md:block">
            Every token, component and page traces back to the Bonlife brand
            book and knowledge base — nothing invented, nothing decorative.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          <SectionCard
            to="/foundations"
            eyebrow="01 · Foundations"
            title="Color, type, spacing, motion"
            body="Navy anchor, coral accent, four category colors, Onest + Inter, and a friendly 8/12/20/28 radius scale."
          />
          <SectionCard
            to="/components"
            eyebrow="02 · Components"
            title="17 building blocks"
            body="Buttons, inputs, plan cards, dialogs and tooltips — every one built from the brand tokens."
          />
          <SectionCard
            to="/marketing"
            eyebrow="03 · Marketing Kit"
            title="A demo bonlifenam.com"
            body="A plausible homepage assembled from the real plans, real copy, and real Namibian photography."
          />
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
}: {
  to: "/foundations" | "/components" | "/marketing";
  eyebrow: string;
  title: string;
  body: string;
}) {
  return (
    <Link to={to} className="group">
      <Card variant="outline" hoverable className="h-full p-8">
        <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-coral">
          {eyebrow}
        </div>
        <h4 className="mt-3">{title}</h4>
        <p className="mt-3 text-sm leading-[1.6] text-muted-foreground">
          {body}
        </p>
        <div className="mt-6 inline-flex items-center gap-1.5 font-display text-[13px] font-semibold text-navy transition-transform group-hover:translate-x-1">
          Open <ArrowRight size={14} />
        </div>
      </Card>
    </Link>
  );
}
