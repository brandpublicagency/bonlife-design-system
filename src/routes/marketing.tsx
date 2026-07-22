import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { HeartPulse, Banknote, MapPin } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/bonlife/SiteChrome";
import { Button } from "@/components/bonlife/Button";
import { Card } from "@/components/bonlife/Card";
import { PlanCard, type Category } from "@/components/bonlife/PlanCard";
import { PlanRow } from "@/components/bonlife/PlanRow";
import familyStudio from "@/assets/bonlife/photography/family-studio.jpg.asset.json";

export const Route = createFileRoute("/marketing")({
  head: () => ({
    meta: [
      { title: "Marketing Kit - Bonlife Design System" },
      {
        name: "description",
        content:
          "A demonstrative bonlifenam.com homepage built from real Bonlife plans, copy, and Namibian photography.",
      },
      { property: "og:title", content: "Marketing Kit - Bonlife Design System" },
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
    cta: "Compare Funeral Cover",
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
    cta: "Compare Saving & Study Plans",
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
        <div className="mx-auto grid max-w-[1200px] items-center gap-12 px-6 py-20 sm:px-8 md:grid-cols-[1.1fr_0.9fr] md:py-24">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/80">
              For every Namibian family
            </div>
            <h1 className="mt-5 !text-[52px] !leading-[1.02] text-white sm:!text-[64px]">
              N$1,000 Instant Cash, same day.
            </h1>
            <p className="mt-6 max-w-[480px] text-[16px] leading-[1.65] text-white/75">
              A grieving family cannot wait weeks. Every Bonlife funeral plan
              pays a cover benefit fast, with N$1,000 Instant Cash the same day
              a claim is approved.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button variant="secondary" size="lg">Get a quote</Button>
              <Button variant="ghost" size="lg" className="border border-white/20 text-white hover:bg-white/10">
                SMS your name to 74448
              </Button>
            </div>
          </div>
          <img
            src={familyStudio.url}
            alt="Namibian family"
            className="h-[420px] w-full rounded-xl object-cover object-[center_25%] shadow-[0_30px_80px_rgba(0,0,0,0.4)]"
          />
        </div>
      </section>

      {/* Category grid */}
      <section className="mx-auto max-w-[1200px] px-6 pt-20 sm:px-8">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-coral">
              Our plans
            </div>
            <h2 className="mt-2 !text-[36px]">Find the right cover</h2>
          </div>
          <p className="text-[13px] text-muted-foreground">
            Click a category to see its plans below.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
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
      <section className="mx-auto max-w-[1200px] px-6 pt-12 sm:px-8">
        <div className="mb-4 flex items-baseline justify-between">
          <h3 className="!m-0 !text-[20px]">Available plans</h3>
          <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            {cat.rows.length} plan{cat.rows.length > 1 ? "s" : ""}
          </span>
        </div>
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
      <section className="mx-auto max-w-[1200px] px-6 py-20 sm:px-8">
        <div className="mb-8">
          <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-coral">
            Why Bonlife
          </div>
          <h2 className="mt-2 !text-[36px]">The proof points that matter.</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {[
            { Icon: Banknote, title: "N$1,000 Instant Cash", text: "Paid the same day a funeral claim is approved. Money in hand when it matters." },
            { Icon: HeartPulse, title: "No medicals", text: "Sign up without medical exams. Cover starts fast, paperwork stays light." },
            { Icon: MapPin, title: "20 branches", text: "Real people across Namibia, plus WhatsApp and SMS." },
          ].map(({ Icon, title, text }) => (
            <Card key={title} variant="flat" className="p-7">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-coral/15 text-coral-hover">
                <Icon size={20} />
              </div>
              <h4 className="mt-4 !text-[18px]">{title}</h4>
              <p className="mt-2 text-[14px] leading-[1.65] text-muted-foreground">
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
