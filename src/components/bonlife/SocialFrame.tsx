import * as React from "react";
import { cn } from "@/lib/utils";
import wordmarkLight from "@/assets/bonlife/logos/bonlife-wordmark-light.svg";
import wordmarkDark from "@/assets/bonlife/logos/bonlife-wordmark-dark.svg";

/* -------------------------------------------------------------------
 * SOCIAL SPACING SCALE — apply consistently across all templates.
 *
 *   Frame padding    → p-10 (40px)       square / portrait / landscape default
 *   Story frame      → px-8 pt-9 pb-10   respects IG story safe area
 *   Section gap      → space-y-10        hero block ↔ lockup
 *   Block gap        → mt-8              between major blocks
 *   Element gap      → mt-4              kicker→headline, headline→body
 *   Tight gap        → mt-2              inside a label pair
 *   Chip gap         → gap-2.5           between pill badges
 *   Chip padding     → px-3.5 py-1.5     uniform pill sizing
 *   Lockup rule      → border-t … pt-6   padding above the lockup divider
 * ------------------------------------------------------------------- */




export type SocialFormat = "square" | "story" | "landscape" | "portrait";

const RATIOS: Record<SocialFormat, string> = {
  square: "aspect-square",           // 1:1  — 1080×1080
  story: "aspect-[9/16]",             // 9:16 — 1080×1920
  portrait: "aspect-[4/5]",           // 4:5  — 1080×1350
  landscape: "aspect-[1.91/1]",       // 1.91:1 — link preview
};

const LABEL: Record<SocialFormat, string> = {
  square: "1:1 · Feed",
  story: "9:16 · Story / Reel",
  portrait: "4:5 · Portrait",
  landscape: "1.91:1 · Link",
};

/** A framed, exportable social canvas. `children` fills the canvas edge-to-edge. */
export function SocialFrame({
  format,
  title,
  caption,
  children,
  className,
}: {
  format: SocialFormat;
  title: string;
  caption?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <figure className={cn("flex flex-col gap-3", className)}>
      <div
        className={cn(
          "relative w-full overflow-hidden rounded-[20px] bg-surface shadow-[0_20px_60px_-24px_rgba(12,28,62,0.35),0_4px_12px_-6px_rgba(12,28,62,0.15)] ring-1 ring-hairline",
          RATIOS[format],
        )}
      >
        {children}
      </div>
      <figcaption className="flex items-center justify-between px-1">
        <span className="font-display text-[13px] font-semibold text-navy">{title}</span>
        <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          {LABEL[format]}
        </span>
      </figcaption>
      {caption ? (
        <p className="px-1 text-[12px] leading-relaxed text-muted-foreground">{caption}</p>
      ) : null}
    </figure>
  );
}

/** Bottom lockup: wordmark + SMS line. Use inside a template. */
export function SocialLockup({
  variant = "light",
  compact = false,
}: {
  variant?: "light" | "dark";
  compact?: boolean;
}) {
  const isLight = variant === "light"; // light lockup = for dark backgrounds
  return (
    <div className="flex items-end justify-between gap-4">
      <img
        src={isLight ? wordmarkLight : wordmarkDark}
        alt="Bonlife"
        className={compact ? "h-4" : "h-5"}
      />
      <div className={cn("text-right", isLight ? "text-white/85" : "text-navy/75")}>
        <div className="text-[9px] font-semibold uppercase tracking-[0.18em]">
          SMS your name
        </div>
        <div className="font-display text-[13px] font-bold tracking-tight">to 74448</div>
      </div>
    </div>
  );
}

/** Small page indicator for carousel slides (e.g. "02 / 05"). */
export function SocialPageIndicator({
  index,
  total,
  tone = "light",
}: {
  index: number;
  total: number;
  tone?: "light" | "dark";
}) {
  const pad = (n: number) => String(n).padStart(2, "0");
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3 py-1 font-display text-[10px] font-bold uppercase tracking-[0.18em] backdrop-blur",
        tone === "light"
          ? "bg-white/15 text-white ring-1 ring-white/25"
          : "bg-navy/8 text-navy ring-1 ring-navy/15",
      )}
    >
      <span>{pad(index)}</span>
      <span className={tone === "light" ? "text-white/45" : "text-navy/40"}>/</span>
      <span className={tone === "light" ? "text-white/60" : "text-navy/55"}>{pad(total)}</span>
    </div>
  );
}

/** A multi-slide carousel built on SocialFrame. Renders slides in a responsive
 *  grid so every panel is exportable individually at native ratio. */
export function SocialCarousel({
  title,
  caption,
  format = "square",
  slides,
  className,
}: {
  title: string;
  caption?: string;
  format?: SocialFormat;
  slides: { id: string; label?: string; render: (ctx: { index: number; total: number }) => React.ReactNode }[];
  className?: string;
}) {
  const total = slides.length;
  return (
    <section className={cn("flex flex-col gap-5", className)}>
      <header className="flex flex-wrap items-end justify-between gap-3 px-1">
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-coral">
            Carousel · {total} slides
          </div>
          <div className="mt-1 font-display text-[15px] font-semibold text-navy">{title}</div>
        </div>
        <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          Swipe →
        </div>
      </header>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {slides.map((s, i) => (
          <SocialFrame
            key={s.id}
            format={format}
            title={`${String(i + 1).padStart(2, "0")} · ${s.label ?? "Slide"}`}
          >
            {s.render({ index: i + 1, total })}
          </SocialFrame>
        ))}
      </div>
      {caption ? (
        <p className="px-1 text-[12px] leading-relaxed text-muted-foreground">{caption}</p>
      ) : null}
    </section>
  );
}


/** Small mark badge (used top-left on some templates). */
export function SocialMark({ tone = "coral" }: { tone?: "coral" | "white" }) {
  return (
    <div
      className={cn(
        "inline-flex h-9 items-center gap-2 rounded-full pl-1.5 pr-3 backdrop-blur-md",
        tone === "coral"
          ? "bg-white/95 text-navy"
          : "bg-white/15 text-white ring-1 ring-white/25",
      )}
    >
      <span
        className={cn(
          "flex h-6 w-6 items-center justify-center rounded-full font-display text-[13px] font-bold leading-none",
          tone === "coral" ? "bg-coral text-navy" : "bg-coral text-navy",
        )}
      >
        b
      </span>
      <span className="font-display text-[11px] font-bold uppercase tracking-[0.16em]">
        Bonlife
      </span>
    </div>
  );
}

