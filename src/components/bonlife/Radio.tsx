import * as React from "react";
import { cn } from "@/lib/utils";

export interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
}

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ label, className, id, ...props }, ref) => {
    const inputId = id ?? React.useId();
    return (
      <label
        htmlFor={inputId}
        className="group inline-flex cursor-pointer items-center gap-2.5 text-sm text-navy"
      >
        <span className="relative inline-flex h-5 w-5 items-center justify-center">
          <input
            id={inputId}
            ref={ref}
            type="radio"
            className={cn("peer absolute inset-0 cursor-pointer opacity-0", className)}
            {...props}
          />
          <span className="h-5 w-5 rounded-full border border-hairline bg-surface transition-colors peer-checked:border-navy peer-focus-visible:outline-2 peer-focus-visible:outline-coral peer-focus-visible:outline-offset-2" />
          <span className="absolute h-2.5 w-2.5 scale-0 rounded-full bg-navy transition-transform peer-checked:scale-100" />
        </span>
        {label}
      </label>
    );
  },
);
Radio.displayName = "Radio";
