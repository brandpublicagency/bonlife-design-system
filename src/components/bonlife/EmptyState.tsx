import * as React from "react";
import { cn } from "@/lib/utils";

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  /** A Lucide icon element, drawn at strokeWidth 1. */
  icon: React.ReactNode;
  title: string;
  /** Say plainly why it is empty and what the customer can do instead. */
  body?: React.ReactNode;
  /** Buttons: one primary, at most one more. */
  actions?: React.ReactNode;
}

/**
 * Honest empty state inside a dashed well: what is missing, why, and the next
 * step (usually WhatsApp or a statement). Never a dead end.
 */
export function EmptyState({ icon, title, body, actions, className, ...props }: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-3 rounded-lg border border-dashed border-dash-line px-6 py-10 text-center text-navy",
        className,
      )}
      {...props}
    >
      <span
        className="flex size-16 items-center justify-center rounded-full border border-hairline bg-surface-tint [&_svg]:size-7"
        aria-hidden
      >
        {icon}
      </span>
      <div className="font-display text-[17px] font-semibold">{title}</div>
      {body ? <p className="m-0 max-w-[520px] text-sm leading-[1.55] text-muted-foreground">{body}</p> : null}
      {actions ? <div className="mt-1.5 flex flex-wrap justify-center gap-2.5">{actions}</div> : null}
    </div>
  );
}
