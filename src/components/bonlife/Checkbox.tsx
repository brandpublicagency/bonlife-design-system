import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, className, id, ...props }, ref) => {
    const inputId = id ?? React.useId();
    return (
      <label
        htmlFor={inputId}
        className="inline-flex cursor-pointer items-center gap-2.5 text-sm text-navy"
      >
        <span className="relative inline-flex h-5 w-5 items-center justify-center rounded-[6px] border border-hairline bg-surface transition-colors peer-checked:bg-navy">
          <input
            id={inputId}
            ref={ref}
            type="checkbox"
            className={cn("peer absolute inset-0 cursor-pointer opacity-0", className)}
            {...props}
          />
          <Check
            size={14}
            className="pointer-events-none hidden text-white peer-checked:block"
            strokeWidth={3}
          />
          <span className="pointer-events-none absolute inset-0 rounded-[6px] border border-hairline peer-checked:border-navy peer-checked:bg-navy peer-focus-visible:outline-2 peer-focus-visible:outline-coral peer-focus-visible:outline-offset-2" />
          <Check
            size={14}
            className="pointer-events-none relative z-10 hidden text-white peer-checked:block"
            strokeWidth={3}
          />
        </span>
        {label}
      </label>
    );
  },
);
Checkbox.displayName = "Checkbox";
