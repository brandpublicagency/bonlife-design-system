import * as React from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  asChild?: boolean;
}

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-display font-semibold transition-[background,transform,color] duration-150 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-[0.97] disabled:opacity-45 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-coral focus-visible:outline-offset-2";

const variants: Record<Variant, string> = {
  primary: "bg-navy text-white hover:bg-navy-700",
  secondary: "bg-coral text-navy hover:bg-coral-hover",
  ghost: "bg-transparent text-navy hover:bg-surface-muted",
  outline: "bg-transparent text-navy border border-hairline hover:bg-surface-tint",
};

const sizes: Record<Size, string> = {
  sm: "text-[12.5px] px-[18px] py-2",
  md: "text-sm px-6 py-[11px]",
  lg: "text-base px-[30px] py-[14px]",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    />
  ),
);
Button.displayName = "Button";
