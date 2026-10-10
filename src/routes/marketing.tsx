import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { HeartPulse, Banknote, MapPin } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/bonlife/SiteChrome";
import { Button } from "@/components/bonlife/Button";
import { Card } from "@/components/bonlife/Card";
import { PlanCard, type Category } from "@/components/bonlife/PlanCard";
import { PlanRow } from "@/components/bonlife/PlanRow";
import { useSiteContent, loadSitePage } from "@/hooks/use-site-content";
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
  loader: ({ context }) => loadSitePage(context, "marketing"),
  component: MarketingPage,
});

const BENEFIT_ICONS = [Banknote, HeartPulse, MapPin];

function MarketingPage() {
  const c = useSiteContent("marketing");
  const PLANS = c.plans;
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
              {c.hero.eyebrow}
            </div>
            <h1 className="mt-5 !text-[52px] !leading-[1.02] text-white sm:!text-[64px]">
              {c.hero.title}
            </h1>
            <p className="mt-6 max-w-[480px] text-[16px] leading-[1.65] text-white/75">
              {c.hero.lead}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button variant="secondary" size="lg">{c.hero.primaryCta}</Button>
              <Button variant="ghost" size="lg" className="border border-white/20 text-white hover:bg-white/10">
                {c.hero.secondaryCta}
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
              {c.plansIntro.eyebrow}
            </div>
            <h2 className="mt-2 !text-[36px]">{c.plansIntro.title}</h2>
          </div>
          <p className="text-[13px] text-muted-foreground">
            {c.plansIntro.note}
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
          <h3 className="!m-0 !text-[20px]">{c.plansIntro.listTitle}</h3>
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
            {c.benefits.eyebrow}
          </div>
          <h2 className="mt-2 !text-[36px]">{c.benefits.title}</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {c.benefits.items.map(({ title, text }, i) => {
            const Icon = BENEFIT_ICONS[i % BENEFIT_ICONS.length];
            return (
            <Card key={title} variant="flat" className="p-7">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-coral/15 text-coral-hover">
                <Icon size={20} />
              </div>
              <h4 className="mt-4 !text-[18px]">{title}</h4>
              <p className="mt-2 text-[14px] leading-[1.65] text-muted-foreground">
                {text}
              </p>
            </Card>
          );
          })}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
