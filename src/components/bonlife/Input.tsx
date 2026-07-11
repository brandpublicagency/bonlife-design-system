import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, hint, error, className, id, ...props }, ref) => {
    const inputId = id ?? React.useId();
    return (
      <div className="flex flex-col gap-1.5">
        {label ? (
          <label
            htmlFor={inputId}
            className="font-display text-[13px] font-semibold text-navy"
          >
            {label}
          </label>
        ) : null}
        <input
          id={inputId}
          ref={ref}
          className={cn(
            "h-11 rounded-md border bg-surface px-4 text-sm text-navy placeholder:text-muted-foreground",
            "focus-visible:outline-2 focus-visible:outline-coral focus-visible:outline-offset-2",
            error
              ? "border-error focus-visible:outline-error"
              : "border-hairline",
            className,
          )}
          aria-invalid={!!error}
          {...props}
        />
        {error ? (
          <span className="text-xs text-error">{error}</span>
        ) : hint ? (
          <span className="text-xs text-muted-foreground">{hint}</span>
        ) : null}
      </div>
    );
  },
);
Input.displayName = "Input";
