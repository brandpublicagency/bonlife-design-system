import * as React from "react";
import { cn } from "@/lib/utils";

export interface QuickActionProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /** A Lucide icon element, drawn at strokeWidth 1. */
  icon: React.ReactNode;
  label: string;
  /** The one action that matters most on the page gets a coral icon dot. Use once per grid. */
  primary?: boolean;
}

/**
 * Tile link for a portal's quick-actions grid (Pay by card, Get my
 * certificate, Start a claim...). Lay out with
 * `grid-template-columns: repeat(auto-fill, minmax(150px, 1fr))`.
 */
export function QuickAction({ icon, label, primary, className, ...props }: QuickActionProps) {
  return (
    <a
      className={cn(
        "flex min-h-28 flex-col justify-between gap-3 rounded-[18px] border border-hairline bg-surface-tint p-4 text-navy no-underline transition-[box-shadow,border-color] duration-[160ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-surface hover:shadow-[0_12px_32px_rgba(12,28,62,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2",
        className,
      )}
      {...props}
    >
      <span
        className={cn(
          "flex size-10 items-center justify-center rounded-full [&_svg]:size-5",
          primary ? "bg-coral" : "border border-hairline bg-surface",
        )}
        aria-hidden
      >
        {icon}
      </span>
      <span className="text-sm font-semibold">{label}</span>
    </a>
  );
}
