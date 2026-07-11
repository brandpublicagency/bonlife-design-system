import * as React from "react";
import { SocialFrame, SocialLockup, SocialMark, type SocialFormat } from "./SocialFrame";
import { cn } from "@/lib/utils";

// Photography
import celebration from "@/assets/bonlife/photography/celebration-fistpump.jpg.asset.json";
import fatherDaughter from "@/assets/bonlife/photography/father-daughter-laughing.jpg.asset.json";
import motherChild from "@/assets/bonlife/photography/mother-child.jpg.asset.json";
import familyStudio from "@/assets/bonlife/photography/family-studio.jpg.asset.json";
import seniorWoman from "@/assets/bonlife/photography/senior-woman-portrait.jpg.asset.json";
import seniorSelfie from "@/assets/bonlife/photography/senior-couple-selfie.jpg.asset.json";
import gradient01 from "@/assets/bonlife/gradients/gradient-01.jpg.asset.json";

/* ================================================================
   1 · 48-HOUR CLAIM PROMISE — hero editorial (square)
   ================================================================ */
export function Template48HourClaim() {
  return (
    <SocialFrame
      format="square"
      title="Claim Promise"
      caption="Hero editorial · brand-first · use for launch and always-on trust posts."
    >
      <div className="relative h-full w-full bg-navy text-white">
        <img
          src={celebration.url}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/85 to-navy/20" />
        <div className="relative flex h-full w-full flex-col justify-between p-9">
          <div className="flex items-start justify-between">
            <SocialMark tone="white" />
            <span className="rounded-full bg-coral px-3 py-1 font-display text-[10px] font-bold uppercase tracking-[0.16em] text-navy">
              Promise
            </span>
          </div>
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-coral">
              Cover benefit paid in
            </div>
            <h2 className="mt-3 font-display text-[92px] font-bold leading-none tracking-[-0.05em] text-white">
              48<span className="text-coral">hrs</span>
            </h2>
            <p className="mt-3 max-w-[85%] text-[15px] leading-[1.45] text-white/85">
              When your family needs us most, we move fast. That is our
              standard, not our exception.
            </p>
          </div>
          <SocialLockup variant="light" />
        </div>
      </div>
    </SocialFrame>
  );
}

/* ================================================================
   2 · CATEGORY PROMO — Life Cover (square)
   ================================================================ */
export function TemplateLifeCover() {
  return (
    <SocialFrame
      format="square"
      title="Life Cover Promo"
      caption="Category = Life (purple). Product benefit + soft photography."
    >
      <div className="grid h-full w-full grid-rows-[1.05fr_0.95fr]">
        <div className="relative overflow-hidden">
          <img
            src={fatherDaughter.url}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-x-0 top-0 flex items-center justify-between p-6">
            <SocialMark tone="coral" />
            <span
              className="rounded-full px-3 py-1 font-display text-[10px] font-bold uppercase tracking-[0.16em] text-white"
              style={{ backgroundColor: "var(--category-life)" }}
            >
              Life Cover
            </span>
          </div>
        </div>
        <div
          className="relative flex flex-col justify-between p-8 text-white"
          style={{ backgroundColor: "var(--category-life)" }}
        >
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/70">
              From
            </div>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="font-display text-[52px] font-bold leading-none tracking-[-0.03em]">
                N$45
              </span>
              <span className="text-[13px] font-medium text-white/80">/ month</span>
            </div>
            <p className="mt-3 max-w-[90%] font-display text-[19px] font-semibold leading-[1.2] tracking-[-0.01em]">
              Protect the people who depend on you — for less than a loaf of
              bread a day.
            </p>
          </div>
          <SocialLockup variant="light" />
        </div>
      </div>
    </SocialFrame>
  );
}

/* ================================================================
   3 · CATEGORY PROMO — Funeral Cover (square)
   ================================================================ */
export function TemplateFuneralCover() {
  return (
    <SocialFrame
      format="square"
      title="Funeral Cover Promo"
      caption="Category = Funeral (deep teal). Warm portrait + dignified copy."
    >
      <div className="relative h-full w-full">
        <img
          src={familyStudio.url}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, transparent 30%, rgba(4,65,63,0.35) 55%, var(--category-funeral) 100%)",
          }}
        />
        <div className="relative flex h-full w-full flex-col justify-between p-9 text-white">
          <div className="flex items-start justify-between">
            <SocialMark tone="white" />
            <span
              className="rounded-full bg-white/95 px-3 py-1 font-display text-[10px] font-bold uppercase tracking-[0.16em]"
              style={{ color: "var(--category-funeral)" }}
            >
              Funeral Cover
            </span>
          </div>
          <div>
            <h3 className="max-w-[92%] font-display text-[38px] font-bold leading-[1.02] tracking-[-0.02em]">
              A dignified send-off is a
              <br />
              final act of love.
            </h3>
            <div className="mt-5 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-white/15 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] backdrop-blur">
                Up to N$50 000
              </span>
              <span className="rounded-full bg-white/15 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] backdrop-blur">
                Whole family
              </span>
              <span className="rounded-full bg-coral px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-navy">
                Paid in 48hrs
              </span>
            </div>
            <div className="mt-8">
              <SocialLockup variant="light" />
            </div>
          </div>
        </div>
      </div>
    </SocialFrame>
  );
}

/* ================================================================
   4 · TESTIMONIAL / QUOTE (square)
   ================================================================ */
export function TemplateTestimonial() {
  return (
    <SocialFrame
      format="square"
      title="Testimonial"
      caption="Editorial quote card. Sparse, honest, uses coral accent for the mark."
    >
      <div className="relative flex h-full w-full flex-col bg-surface p-9">
        <div className="flex items-center justify-between">
          <SocialMark tone="coral" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Real story · Windhoek
          </span>
        </div>
        <div className="flex-1 pt-8">
          <div className="font-display text-[96px] font-bold leading-[0.75] text-coral">
            &ldquo;
          </div>
          <blockquote className="mt-2 font-display text-[28px] font-semibold leading-[1.18] tracking-[-0.015em] text-navy">
            They called me back the same afternoon. Two days later my family
            had what they needed. No paperwork games.
          </blockquote>
        </div>
        <div className="flex items-end justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div
                className="h-10 w-10 rounded-full bg-cover bg-center ring-1 ring-hairline"
                style={{ backgroundImage: `url(${seniorWoman.url})` }}
              />
              <div>
                <div className="font-display text-[14px] font-semibold text-navy">
                  Selma N.
                </div>
                <div className="text-[11px] text-muted-foreground">
                  Cover benefit paid · March 2026
                </div>
              </div>
            </div>
          </div>
          <SocialLockup variant="dark" compact />
        </div>
      </div>
    </SocialFrame>
  );
}

/* ================================================================
   5 · STAT / AWARENESS — story format
   ================================================================ */
export function TemplateStatStory() {
  return (
    <SocialFrame
      format="story"
      title="Awareness Stat"
      caption="Story / Reel cover. Big-number typography, calm ground."
    >
      <div className="relative flex h-full w-full flex-col justify-between overflow-hidden bg-navy p-8 text-white">
        <img
          src={gradient01.url}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/40 via-transparent to-navy/95" />
        <div className="relative flex items-start justify-between">
          <SocialMark tone="white" />
          <span className="rounded-full bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] backdrop-blur">
            Did you know
          </span>
        </div>
        <div className="relative">
          <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-coral">
            Namibians without cover
          </div>
          <div className="mt-3 font-display text-[168px] font-bold leading-[0.85] tracking-[-0.05em]">
            7<span className="text-coral">.</span>2
            <span className="ml-2 align-super text-[42px] font-semibold tracking-normal text-white/70">
              out of 10
            </span>
          </div>
          <p className="mt-6 max-w-[88%] font-display text-[22px] font-semibold leading-[1.2] tracking-[-0.01em]">
            One SMS is all it takes to change that for your family.
          </p>
        </div>
        <div className="relative">
          <div className="mb-4 h-px w-full bg-white/20" />
          <SocialLockup variant="light" />
        </div>
      </div>
    </SocialFrame>
  );
}

/* ================================================================
   6 · ONELIFE LUMP SUM — story
   ================================================================ */
export function TemplateOneLifeStory() {
  return (
    <SocialFrame
      format="story"
      title="OneLife Lump Sum"
      caption='"Lump sum" wording reserved for OneLife product only.'
    >
      <div className="relative h-full w-full overflow-hidden">
        <img
          src={motherChild.url}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-navy" />
        <div className="relative flex h-full w-full flex-col justify-between p-8 text-white">
          <div className="flex items-center justify-between">
            <SocialMark tone="white" />
            <span
              className="rounded-full px-3 py-1 font-display text-[10px] font-bold uppercase tracking-[0.16em] text-white"
              style={{ backgroundColor: "var(--category-savings)" }}
            >
              OneLife
            </span>
          </div>
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-coral">
              One policy · one lump sum
            </div>
            <h3 className="mt-3 font-display text-[54px] font-bold leading-[0.98] tracking-[-0.03em]">
              A lump sum
              <br />
              when it&nbsp;matters.
            </h3>
            <p className="mt-4 max-w-[88%] text-[15px] leading-[1.5] text-white/85">
              OneLife pays a single, guaranteed lump sum — for school fees, a
              home, or starting again.
            </p>
            <div className="mt-6 flex gap-2">
              <span className="rounded-full bg-white/15 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] backdrop-blur">
                From N$120 / mo
              </span>
              <span className="rounded-full bg-coral px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-navy">
                Payout guaranteed
              </span>
            </div>
            <div className="mt-8">
              <SocialLockup variant="light" />
            </div>
          </div>
        </div>
      </div>
    </SocialFrame>
  );
}

/* ================================================================
   7 · SMS CALLBACK — bold typographic (square)
   ================================================================ */
export function TemplateSmsCallback() {
  return (
    <SocialFrame
      format="square"
      title="SMS Callback CTA"
      caption="No photography, no gradient — pure typographic push. Highest CTA weight."
    >
      <div className="relative flex h-full w-full flex-col justify-between bg-coral p-9 text-navy">
        <div className="flex items-start justify-between">
          <SocialMark tone="coral" />
          <div className="rounded-full border border-navy/25 bg-white/60 px-3 py-1 font-display text-[10px] font-bold uppercase tracking-[0.16em]">
            60 seconds
          </div>
        </div>
        <div>
          <div className="text-[12px] font-semibold uppercase tracking-[0.22em] text-navy/70">
            Step 1 → Step 2 → Done
          </div>
          <h2 className="mt-3 font-display text-[64px] font-bold leading-[0.92] tracking-[-0.04em]">
            SMS your
            <br />
            name to
          </h2>
          <div className="mt-3 flex items-end gap-3">
            <span className="font-display text-[136px] font-bold leading-none tracking-[-0.06em] text-navy">
              74448
            </span>
          </div>
          <p className="mt-4 max-w-[80%] text-[15px] leading-[1.45] text-navy/80">
            We call you back the same day. No forms. No commitment. Free from
            any Namibian network.
          </p>
        </div>
        <div className="border-t border-navy/15 pt-5">
          <SocialLockup variant="dark" />
        </div>
      </div>
    </SocialFrame>
  );
}

/* ================================================================
   8 · BRANCH / EVENT — landscape (link preview / Facebook cover)
   ================================================================ */
export function TemplateBranchEvent() {
  return (
    <SocialFrame
      format="landscape"
      title="Branch / Event"
      caption="1.91:1 for link previews, Facebook shares, WhatsApp cards."
    >
      <div className="relative grid h-full w-full grid-cols-[1.15fr_1fr] bg-surface">
        <div className="relative overflow-hidden">
          <img
            src={seniorSelfie.url}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute left-5 top-5">
            <SocialMark tone="coral" />
          </div>
        </div>
        <div className="flex flex-col justify-between bg-navy p-7 text-white">
          <div>
            <span className="rounded-full bg-coral px-3 py-1 font-display text-[10px] font-bold uppercase tracking-[0.16em] text-navy">
              Now open
            </span>
            <h3 className="mt-4 font-display text-[30px] font-bold leading-[1.05] tracking-[-0.02em]">
              20 branches
              <br />
              across Namibia.
            </h3>
            <p className="mt-3 max-w-[95%] text-[13px] leading-[1.5] text-white/75">
              Walk in, sit down, get answers. Find your closest Bonlife
              branch — Windhoek to Katima Mulilo.
            </p>
          </div>
          <SocialLockup variant="light" compact />
        </div>
      </div>
    </SocialFrame>
  );
}

/* ================================================================
   9 · PAYDAY REMINDER — portrait 4:5
   ================================================================ */
export function TemplatePaydayReminder() {
  return (
    <SocialFrame
      format="portrait"
      title="Payday Reminder"
      caption="4:5 portrait for feed. Monthly recurring — cycle through categories."
    >
      <div className="relative flex h-full w-full flex-col justify-between bg-surface-tint p-8">
        <div className="flex items-center justify-between">
          <SocialMark tone="coral" />
          <span className="rounded-full bg-navy px-3 py-1 font-display text-[10px] font-bold uppercase tracking-[0.16em] text-white">
            25th of the month
          </span>
        </div>
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-coral">
            Payday · check-in
          </div>
          <h3 className="mt-3 font-display text-[46px] font-bold leading-[1.02] tracking-[-0.03em] text-navy">
            Before you spend it — cover the people who count on you.
          </h3>
          <div
            className={cn(
              "mt-6 grid grid-cols-2 gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-white",
            )}
          >
            {[
              { label: "Funeral", color: "var(--category-funeral)" },
              { label: "Life", color: "var(--category-life)" },
              { label: "Savings", color: "var(--category-savings)" },
              { label: "Accident", color: "var(--category-accident)" },
            ].map((c) => (
              <div
                key={c.label}
                className="rounded-lg px-3 py-2.5"
                style={{ backgroundColor: c.color }}
              >
                {c.label}
              </div>
            ))}
          </div>
        </div>
        <div className="border-t border-hairline pt-5">
          <SocialLockup variant="dark" />
        </div>
      </div>
    </SocialFrame>
  );
}

export const SOCIAL_TEMPLATES = [
  { id: "claim", Component: Template48HourClaim, format: "square" as SocialFormat },
  { id: "life", Component: TemplateLifeCover, format: "square" as SocialFormat },
  { id: "funeral", Component: TemplateFuneralCover, format: "square" as SocialFormat },
  { id: "testimonial", Component: TemplateTestimonial, format: "square" as SocialFormat },
  { id: "stat", Component: TemplateStatStory, format: "story" as SocialFormat },
  { id: "onelife", Component: TemplateOneLifeStory, format: "story" as SocialFormat },
  { id: "sms", Component: TemplateSmsCallback, format: "square" as SocialFormat },
  { id: "branch", Component: TemplateBranchEvent, format: "landscape" as SocialFormat },
  { id: "payday", Component: TemplatePaydayReminder, format: "portrait" as SocialFormat },
];
