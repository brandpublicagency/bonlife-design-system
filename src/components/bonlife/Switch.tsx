import * as React from "react";
import { cn } from "@/lib/utils";

export interface SwitchProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
}

export const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ label, className, id, ...props }, ref) => {
    const inputId = id ?? React.useId();
    return (
      <label
        htmlFor={inputId}
        className="inline-flex cursor-pointer items-center gap-3 text-sm text-navy"
      >
        <span className="relative inline-block h-6 w-11">
          <input
            id={inputId}
            ref={ref}
            type="checkbox"
            className={cn("peer absolute inset-0 cursor-pointer opacity-0", className)}
            {...props}
          />
          <span className="absolute inset-0 rounded-full bg-surface-muted transition-colors peer-checked:bg-navy peer-focus-visible:outline-2 peer-focus-visible:outline-coral peer-focus-visible:outline-offset-2" />
          <span className="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow-[0_1px_3px_rgba(12,28,62,0.25)] transition-transform duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)] peer-checked:translate-x-5" />
        </span>
        {label}
      </label>
    );
  },
);
Switch.displayName = "Switch";
