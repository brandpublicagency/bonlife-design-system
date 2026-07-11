import * as React from "react";
import { cn } from "@/lib/utils";

type Tone =
  | "neutral"
  | "navy"
  | "coral"
  | "success"
  | "error"
  | "funeral"
  | "life"
  | "savings"
  | "accident";

const tones: Record<Tone, string> = {
  neutral: "bg-surface-muted text-navy",
  navy: "bg-navy text-white",
  coral: "bg-coral text-navy",
  success: "bg-success text-navy",
  error: "bg-error text-white",
  funeral: "bg-funeral text-white",
  life: "bg-life text-white",
  savings: "bg-savings text-white",
  accident: "bg-accident text-white",
};

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: Tone;
}

export function Badge({ tone = "neutral", className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-[5px] text-[11.5px] font-medium uppercase leading-tight tracking-[0.06em]",
        tones[tone],
        className,
      )}
      {...props}
    />
  );
}
