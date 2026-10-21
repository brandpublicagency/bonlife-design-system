import * as React from "react";
import { cn } from "@/lib/utils";

type RingTone = "mint" | "white" | "navy";

const strokes: Record<RingTone, string> = {
  mint: "var(--mint-400)",
  white: "#FFFFFF",
  navy: "var(--navy-900)",
};

export interface DecorRingsProps extends React.SVGAttributes<SVGSVGElement> {
  /** Ring colour. Mint belongs on navy-900 only; white on category fills; navy on light surfaces. */
  tone?: RingTone;
  /** Outer diameter in px. */
  size?: number;
  /** Number of concentric rings. */
  rings?: number;
  /** Opacity of the innermost ring; each outer ring fades further. */
  strength?: number;
}

/**
 * Thin concentric 1px rings - the portal's decorative motif for navy and
 * category surfaces. Position it absolutely inside a `relative overflow-hidden`
 * parent and let it bleed off an edge. Always decorative (aria-hidden).
 */
export function DecorRings({
  tone = "mint",
  size = 320,
  rings = 3,
  strength = 0.3,
  className,
  ...props
}: DecorRingsProps) {
  const c = size / 2;
  const step = (c - 4) / (rings + 1);
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      aria-hidden
      className={cn("pointer-events-none absolute", className)}
      {...props}
    >
      {Array.from({ length: rings }, (_, i) => (
        <circle
          key={i}
          cx={c}
          cy={c}
          r={step * (i + 2)}
          stroke={strokes[tone]}
          strokeOpacity={Math.max(strength * (1 - i / (rings + 0.5)), 0.04)}
          strokeWidth={1}
        />
      ))}
    </svg>
  );
}
