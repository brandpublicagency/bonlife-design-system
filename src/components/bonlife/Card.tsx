import * as React from "react";
import { cn } from "@/lib/utils";

type Variant = "shadow" | "outline" | "flat";

const variants: Record<Variant, string> = {
  shadow: "bg-surface shadow-[0_4px_16px_rgba(12,28,62,0.08)]",
  outline: "bg-surface border border-hairline",
  flat: "bg-surface-tint",
};

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: Variant;
  hoverable?: boolean;
}

export function Card({
  variant = "shadow",
  hoverable,
  className,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-lg text-navy",
        variants[variant],
        hoverable &&
          "transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(12,28,62,0.12)]",
        className,
      )}
      {...props}
    />
  );
}
