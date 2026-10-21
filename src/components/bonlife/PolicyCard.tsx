import * as React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { DecorRings } from "./DecorRings";
import type { Category } from "./PlanCard";

const bg: Record<Category, string> = {
  funeral: "bg-funeral",
  life: "bg-life",
  savings: "bg-savings",
  accident: "bg-accident",
};

const labels: Record<Category, string> = {
  funeral: "Funeral Cover",
  life: "Life Insurance",
  savings: "Saving & Study Plans",
  accident: "Accident & Disability Cover",
};

export interface PolicyCardFigure {
  label: string;
  value: React.ReactNode;
}

export interface PolicyCardProps extends React.HTMLAttributes<HTMLElement> {
  category: Category;
  /** Plan name, e.g. "Family Plan". */
  name: string;
  /** Policy number as stored; it is shown grouped for reading (2885 277 FSPN). */
  policyNumber: string;
  /** One to four figures, e.g. cover benefit and monthly premium. */
  figures?: PolicyCardFigure[];
  status?: string;
  /** Turns the card into a link. */
  href?: string;
  /** Footer action label when `href` is set. */
  actionLabel?: string;
}

function groupPolicyNumber(n: string) {
  const m = n.match(/^(\d{4})(\d+)([A-Z]*)$/i);
  return m ? [m[1], m[2], m[3]].filter(Boolean).join(" ") : n;
}

/**
 * A customer's own policy, drawn like a bank card on its category fill:
 * coral eyebrow, white Onest plan name, key figures, and the policy number
 * set like a card number in a lighter footer band. Category colour is
 * allowed here because the card identifies that category's plan.
 */
export function PolicyCard({
  category,
  name,
  policyNumber,
  figures = [],
  status = "Active",
  href,
  actionLabel = "View",
  className,
  ...props
}: PolicyCardProps) {
  const Tag = (href ? "a" : "div") as React.ElementType;
  return (
    <Tag
      href={href}
      className={cn(
        "relative flex flex-col overflow-hidden rounded-panel text-white no-underline shadow-[0_12px_32px_rgba(12,28,62,0.12)]",
        bg[category],
        href && "transition-transform duration-[160ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1",
        className,
      )}
      {...props}
    >
      <DecorRings tone="white" size={320} strength={0.16} className="-right-[110px] -top-[120px]" />
      <div className="relative flex flex-1 flex-col gap-5 p-6">
        <div className="flex items-center justify-between gap-3">
          <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-coral">
            {labels[category]}
          </span>
          {status ? (
            <span className="flex h-6 items-center rounded-full bg-white/15 px-2.5 text-[11px] font-semibold uppercase tracking-[0.08em]">
              {status}
            </span>
          ) : null}
        </div>
        <div className="font-display text-[28px] font-bold tracking-[-0.02em]">{name}</div>
        {figures.length ? (
          <div className="flex flex-wrap gap-x-8 gap-y-3">
            {figures.map((f) => (
              <div key={f.label}>
                <div className="text-xs text-on-category-muted">{f.label}</div>
                <div className="mt-0.5 font-display text-lg font-semibold">{f.value}</div>
              </div>
            ))}
          </div>
        ) : null}
      </div>
      <div className="relative flex items-center justify-between gap-3 border-t border-white/12 bg-white/8 px-6 py-4">
        <div>
          <div className="text-[11px] text-on-category-muted">Policy number</div>
          <div className="font-display text-base font-medium tracking-[0.12em]">
            {groupPolicyNumber(policyNumber)}
          </div>
        </div>
        {href ? (
          <span className="flex items-center gap-1.5 text-[13px] font-medium">
            {actionLabel}
            <ArrowRight size={18} strokeWidth={1} aria-hidden />
          </span>
        ) : null}
      </div>
    </Tag>
  );
}
