import * as React from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  "aria-label": string;
}

const sizes: Record<Size, string> = {
  sm: "h-8 w-8",
  md: "h-10 w-10",
  lg: "h-12 w-12",
};

const variants: Record<Variant, string> = {
  primary: "bg-navy text-white hover:bg-navy-700",
  secondary: "bg-coral text-navy hover:bg-coral-hover",
  ghost: "bg-transparent text-navy hover:bg-surface-muted",
};

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ variant = "ghost", size = "md", className, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center rounded-full transition-colors duration-150 active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-coral focus-visible:outline-offset-2 disabled:opacity-45",
        sizes[size],
        variants[variant],
        className,
      )}
      {...props}
    />
  ),
);
IconButton.displayName = "IconButton";
