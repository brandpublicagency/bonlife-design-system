import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export function Dialog({
  open,
  onOpenChange,
  title,
  description,
  children,
  className,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
}) {
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onOpenChange(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onOpenChange]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-navy/60 animate-in fade-in duration-200"
        onClick={() => onOpenChange(false)}
      />
      <div
        className={cn(
          "relative w-full max-w-lg rounded-xl bg-surface p-8 shadow-[0_12px_32px_rgba(12,28,62,0.12)] animate-in fade-in zoom-in-95 duration-200",
          className,
        )}
      >
        <button
          onClick={() => onOpenChange(false)}
          aria-label="Close"
          className="absolute right-4 top-4 rounded-full p-1.5 text-navy hover:bg-surface-muted"
        >
          <X size={18} />
        </button>
        {title ? (
          <h3 className="mb-2 font-display text-2xl font-bold text-navy">
            {title}
          </h3>
        ) : null}
        {description ? (
          <p className="mb-6 text-sm text-muted-foreground">{description}</p>
        ) : null}
        {children}
      </div>
    </div>
  );
}
