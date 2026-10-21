import * as React from "react";
import { cn } from "@/lib/utils";
import { DecorRings } from "./DecorRings";

export interface AppNavItemProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /** A Lucide icon element, drawn at strokeWidth 1. */
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  /** Small count pill on the right. */
  count?: number;
  /** `attention` fills the count in state-error (e.g. a payment due); otherwise muted, or navy when active. */
  countTone?: "muted" | "attention";
  /** Screen-reader text for the count, e.g. "1 payment due". */
  countLabel?: string;
}

/**
 * Portal sidebar item: an icon tile and a label. The active item sits on
 * surface-tint with a coral icon tile; the rest show a white hairline tile.
 * Stack inside a <nav> with a 4px gap.
 */
export function AppNavItem({
  icon,
  label,
  active,
  count,
  countTone = "muted",
  countLabel,
  className,
  ...props
}: AppNavItemProps) {
  return (
    <a
      aria-current={active ? "page" : undefined}
      className={cn(
        "flex min-h-[52px] items-center gap-3 rounded-2xl px-2.5 py-2 text-sm no-underline transition-colors duration-[160ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-surface-tint focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral",
        active
          ? "bg-surface-tint font-semibold text-navy shadow-[0_1px_2px_rgba(12,28,62,0.06)]"
          : "font-medium text-muted-foreground",
        className,
      )}
      {...props}
    >
      <span
        className={cn(
          "box-border flex size-9 shrink-0 items-center justify-center rounded-md text-navy [&_svg]:size-5",
          active ? "bg-coral" : "border border-hairline bg-surface",
        )}
        aria-hidden
      >
        {icon}
      </span>
      <span className="flex-1">{label}</span>
      {count ? (
        <span
          aria-label={countLabel}
          className={cn(
            "flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[11px] font-semibold",
            countTone === "attention"
              ? "bg-error text-navy"
              : active
                ? "bg-navy text-white"
                : "bg-surface-muted text-navy",
          )}
        >
          {count}
        </span>
      ) : null}
    </a>
  );
}

export interface HelpCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  body?: React.ReactNode;
  /** Usually a white pill link to WhatsApp. */
  action?: React.ReactNode;
  /** A Lucide icon element for the coral tile. */
  icon?: React.ReactNode;
}

/** Navy "Need help?" card with mint rings, pinned to the bottom of the portal sidebar. */
export function HelpCard({
  title = "Need help?",
  body = "WhatsApp us, call, or visit one of our 20 branches.",
  action,
  icon,
  className,
  ...props
}: HelpCardProps) {
  return (
    <div className={cn("relative flex flex-col gap-3 overflow-hidden rounded-lg bg-navy p-5", className)} {...props}>
      <DecorRings tone="mint" size={180} strength={0.35} className="-right-[60px] -top-[60px]" />
      {icon ? (
        <span className="relative flex size-9 items-center justify-center rounded-md bg-coral text-navy [&_svg]:size-5" aria-hidden>
          {icon}
        </span>
      ) : null}
      <div className="relative">
        <div className="font-display text-base font-semibold text-white">{title}</div>
        <div className="mt-1 text-[13px] leading-normal text-on-inverse-muted">{body}</div>
      </div>
      {action ? <div className="relative">{action}</div> : null}
    </div>
  );
}
