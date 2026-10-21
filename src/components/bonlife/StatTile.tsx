import * as React from "react";
import { cn } from "@/lib/utils";

export interface StatTileProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  value: React.ReactNode;
  /** One short line under the value: context, never a second number. */
  caption?: React.ReactNode;
  /** A Lucide icon element, drawn at strokeWidth 1. */
  icon?: React.ReactNode;
  /** `attention` outlines the tile in state-error and adds a dot before the label. */
  tone?: "default" | "attention";
  /** Icon tile fill: navy with a mint stroke (default) or coral for the tile that leads to an action. */
  iconTone?: "navy" | "coral";
}

/**
 * Compact at-a-glance figure for portal dashboards: label, value, caption and
 * an icon tile on the right. Lay several out in a wrapping row.
 */
export function StatTile({
  label,
  value,
  caption,
  icon,
  tone = "default",
  iconTone = "navy",
  className,
  ...props
}: StatTileProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-3 rounded-lg border bg-surface px-5 py-[18px] text-navy shadow-[0_1px_2px_rgba(12,28,62,0.06)]",
        tone === "attention" ? "border-error" : "border-hairline",
        className,
      )}
      {...props}
    >
      <div className="min-w-0">
        <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
          {tone === "attention" ? <span className="size-2 rounded-full bg-error" aria-hidden /> : null}
          {label}
        </div>
        <div className="mt-1.5 font-display text-[22px] font-bold tracking-[-0.01em]">{value}</div>
        {caption ? <div className="mt-0.5 text-xs text-muted-foreground">{caption}</div> : null}
      </div>
      {icon ? (
        <span
          className={cn(
            "flex size-12 shrink-0 items-center justify-center rounded-[14px] [&_svg]:size-[22px]",
            iconTone === "coral" ? "bg-coral text-navy" : "bg-navy text-mint",
          )}
          aria-hidden
        >
          {icon}
        </span>
      ) : null}
    </div>
  );
}
