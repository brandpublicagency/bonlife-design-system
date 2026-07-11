import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Clock4, Banknote, MapPin } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/bonlife/SiteChrome";
import { Button } from "@/components/bonlife/Button";
import { Card } from "@/components/bonlife/Card";
import { PlanCard, type Category } from "@/components/bonlife/PlanCard";
import { PlanRow } from "@/components/bonlife/PlanRow";
import familyStudio from "@/assets/bonlife/photography/family-studio.jpg.asset.json";

export const Route = createFileRoute("/marketing")({
  head: () => ({
    meta: [
      { title: "Marketing Kit — Bonlife Design System" },
      {
        name: "description",
        content:
          "A demonstrative bonlifenam.com homepage built from real Bonlife plans, copy, and Namibian photography.",
      },
      { property: "og:title", content: "Marketing Kit — Bonlife Design System" },
      {
        property: "og:description",
        content:
          "A demonstrative bonlifenam.com homepage built from real Bonlife plans, copy, and photography.",
      },
      { property: "og:image", content: familyStudio.url },
      { property: "og:url", content: "/marketing" },
    ],
    links: [{ rel: "canonical", href: "/marketing" }],
  }),
  component: MarketingPage,
});

const PLANS: Record<
  Category,
  {
    title: string;
    cta: string;
    rows: { name: string; tagline: string; price: string }[];
  }
> = {
  funeral: {
    title: "Protection your family can count on.",
    cta: "Compare Funeral Plans",
    rows: [
      { name: "Family Plan", tagline: "Ages 18-65 · Main life, spouse, children", price: "From N$85/m" },
      { name: "Prime Plan", tagline: "Ages 18-60 · N$25,000 or N$50,000 cover", price: "From N$120/m" },
      { name: "Senior Plan", tagline: "Ages 65-84 · Individual, flexible cover", price: "From N$160/m" },
      { name: "Legacy Plan", tagline: "Ages 65-84 · Bundled casket, tombstone, grocery", price: "From N$210/m" },
    ],
  },
  life: {
    title: "A lump sum that protects what you've built.",
    cta: "Compare Life Insurance",
    rows: [
      { name: "OneLife Plan", tagline: "Lump sum, up to N$1,000,000 cover", price: "From N$240/m" },
      { name: "Cash Plan", tagline: "Smaller, flexible cash payout", price: "From N$95/m" },
    ],
  },
  savings: {
    title: "Grow it steadily, for the years that matter.",
    cta: "Compare Saving Plans",
    rows: [
      { name: "Savings Plan", tagline: "Structured savings, flexible term", price: "From N$100/m" },
      { name: "Study Plan", tagline: "Education-focused, matures at enrolment age", price: "From N$150/m" },
    ],
  },
  accident: {
    title: "Cash support when the unexpected happens.",
    cta: "Compare LifeGuard",
    rows: [
      { name: "LifeGuard Plan", tagline: "Accident and disability cash benefit", price: "From N$75/m" },
    ],
  },
};

function MarketingPage() {
  const [active, setActive] = React.useState<Category>("funeral");
  const cat = PLANS[active];

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* Hero */}
      <section className="bg-navy">
        <div className="mx-auto grid max-w-[1200px] items-center gap-12 px-8 py-20 md:grid-cols-[1.1fr_0.9fr]">
          <div>
            <h1 className="!text-[52px] !leading-[1.05] text-white">
              Claims paid within 48 hours.
            </h1>
            <p className="mt-6 max-w-[480px] text-[16px] leading-[1.65] text-white/75">
              A grieving family cannot wait weeks. Every Bonlife funeral plan
              pays a cover benefit fast, with N$1,000 Instant Cash the same day
              a claim is approved.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button variant="secondary" size="lg">Get a quote</Button>
              <Button variant="ghost" size="lg" className="text-white hover:bg-white/10">
                SMS your name to 74448
              </Button>
            </div>
          </div>
          <img
            src={familyStudio.url}
            alt="Namibian family"
            className="h-[380px] w-full rounded-xl object-cover object-[center_25%]"
          />
        </div>
      </section>

      {/* Category grid */}
      <section className="mx-auto max-w-[1200px] px-8 pt-16">
        <h2 className="mb-8">Find the right cover</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {(Object.keys(PLANS) as Category[]).map((k) => (
            <PlanCard
              key={k}
              category={k}
              title={PLANS[k].title}
              cta={PLANS[k].cta}
              active={active === k}
              onClick={() => setActive(k)}
            />
          ))}
        </div>
      </section>

      {/* Plan list */}
      <section className="mx-auto max-w-[1200px] px-8 pt-10">
        <Card variant="outline" className="px-8 py-2">
          {cat.rows.map((r) => (
            <PlanRow
              key={r.name}
              category={active}
              name={r.name}
              tagline={r.tagline}
              price={r.price}
            />
          ))}
        </Card>
      </section>

      {/* Benefits */}
      <section className="mx-auto max-w-[1200px] px-8 py-16">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { Icon: Clock4, title: "48-hour claims", text: "Approved claims are paid within two days. Speed is respect." },
            { Icon: Banknote, title: "N$1,000 Instant Cash", text: "Same-day cash on approved funeral claims." },
            { Icon: MapPin, title: "20 branches", text: "Real people across Namibia, plus WhatsApp and SMS." },
          ].map(({ Icon, title, text }) => (
            <Card key={title} variant="flat" className="p-8">
              <Icon size={26} className="text-coral-hover" />
              <h4 className="mt-3 !text-[17px]">{title}</h4>
              <p className="mt-1.5 text-[13.5px] leading-[1.6] text-muted-foreground">
                {text}
              </p>
            </Card>
          ))}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
