import * as React from "react";
import { cn } from "@/lib/utils";

type ProgressTone = "navy" | "coral" | "funeral" | "error";

const fills: Record<ProgressTone, string> = {
  navy: "bg-navy",
  coral: "bg-coral",
  funeral: "bg-funeral",
  error: "bg-error",
};

const strokes: Record<ProgressTone, string> = {
  navy: "var(--navy-900)",
  coral: "var(--coral-500)",
  funeral: "var(--category-funeral)",
  error: "var(--state-error)",
};

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 0-100. */
  value: number;
  tone?: ProgressTone;
  size?: "sm" | "md";
  /** Required: what the bar measures, read out by screen readers. */
  label: string;
}

/**
 * Slim pill progress bar on a muted track - waiting periods, allocations,
 * loyalty journeys. Coral for something still counting up, funeral green
 * for something complete on a Funeral Cover policy, error for missed payments.
 */
export function ProgressBar({ value, tone = "navy", size = "md", label, className, ...props }: ProgressBarProps) {
  const v = Math.min(100, Math.max(0, value));
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(v)}
      className={cn("w-full rounded-full bg-surface-muted", size === "sm" ? "h-1" : "h-2", className)}
      {...props}
    >
      <div className={cn("h-full rounded-full", fills[tone])} style={{ width: `${v}%` }} />
    </div>
  );
}

export interface StatusRingProps extends React.SVGAttributes<SVGSVGElement> {
  value: number;
  max: number;
  /** Big centre text; defaults to "value/max". */
  centre?: string;
  /** Small word under the centre text, e.g. "missed". */
  caption?: string;
  tone?: ProgressTone;
  size?: number;
  /** Required: the full sentence a screen reader hears. */
  label: string;
}

/** Ring gauge for a count out of a limit, e.g. 1 of 3 missed premiums before lapse. */
export function StatusRing({
  value,
  max,
  centre,
  caption,
  tone = "error",
  size = 96,
  label,
  className,
  ...props
}: StatusRingProps) {
  const r = size / 2 - 8;
  const circ = 2 * Math.PI * r;
  const dash = (Math.min(value, max) / max) * circ;
  const c = size / 2;
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      role="img"
      aria-label={label}
      className={cn("shrink-0", className)}
      {...props}
    >
      <circle cx={c} cy={c} r={r} fill="none" stroke="var(--surface-muted)" strokeWidth={8} />
      <circle
        cx={c}
        cy={c}
        r={r}
        fill="none"
        stroke={strokes[tone]}
        strokeWidth={8}
        strokeLinecap="round"
        strokeDasharray={`${dash} ${circ}`}
        transform={`rotate(-90 ${c} ${c})`}
      />
      <text x={c} y={caption ? c - 2 : c + 7} textAnchor="middle" fontFamily="var(--font-display)" fontWeight={700} fontSize={size * 0.23} fill="var(--navy-900)">
        {centre ?? `${value}/${max}`}
      </text>
      {caption ? (
        <text x={c} y={c + 14} textAnchor="middle" fontFamily="var(--font-body)" fontSize={10} fill="var(--gray-600)">
          {caption}
        </text>
      ) : null}
    </svg>
  );
}
