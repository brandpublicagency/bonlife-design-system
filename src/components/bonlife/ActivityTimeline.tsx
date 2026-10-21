import * as React from "react";
import { cn } from "@/lib/utils";

export type ActivityTone = "default" | "coral" | "error" | "success" | "upcoming";

export interface ActivityItem {
  id: string;
  /** A Lucide icon element, drawn at strokeWidth 1. */
  icon: React.ReactNode;
  title: string;
  /** Date and context, e.g. "October 2026 - missed payment". */
  meta?: string;
  /** Right-aligned figure, e.g. an amount. */
  amount?: React.ReactNode;
  tone?: ActivityTone;
  href?: string;
}

const dots: Record<ActivityTone, string> = {
  default: "bg-surface-muted text-navy",
  coral: "bg-coral-50 text-navy",
  error: "bg-error-50 text-error",
  success: "bg-funeral-50 text-funeral",
  upcoming: "border border-dashed border-dash-line text-muted-foreground",
};

/**
 * Vertical activity feed for a policy: round icon dots joined by a hairline,
 * newest first. `upcoming` draws a dashed dot for something that has not
 * happened yet. Error tone pairs the icon with words - never colour alone.
 */
export function ActivityTimeline({
  items,
  className,
}: {
  items: ActivityItem[];
  className?: string;
}) {
  return (
    <ol className={cn("m-0 flex list-none flex-col p-0 text-navy", className)}>
      {items.map((item, i) => {
        const last = i === items.length - 1;
        const tone = item.tone ?? "default";
        const body = (
          <div className="flex flex-1 justify-between gap-3 pt-1.5" style={{ paddingBottom: last ? 4 : 18 }}>
            <div>
              <div className={cn("text-sm font-semibold", tone === "upcoming" && "text-muted-foreground")}>
                {item.title}
              </div>
              {item.meta ? <div className="mt-0.5 text-xs text-muted-foreground">{item.meta}</div> : null}
            </div>
            {item.amount ? (
              <div className="whitespace-nowrap font-display text-sm font-semibold">{item.amount}</div>
            ) : null}
          </div>
        );
        return (
          <li key={item.id} className="flex gap-3.5">
            <div className="flex flex-col items-center">
              <span
                className={cn(
                  "box-border flex size-9 shrink-0 items-center justify-center rounded-full [&_svg]:size-[18px]",
                  dots[tone],
                )}
                aria-hidden
              >
                {item.icon}
              </span>
              {last ? null : <span className="min-h-4 w-px flex-1 bg-hairline" />}
            </div>
            {item.href ? (
              <a href={item.href} className="flex flex-1 text-navy no-underline hover:text-navy-700">
                {body}
              </a>
            ) : (
              body
            )}
          </li>
        );
      })}
    </ol>
  );
}
