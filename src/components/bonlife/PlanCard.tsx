import * as React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type Category = "funeral" | "life" | "savings" | "accident";

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

export interface PlanCardProps extends React.HTMLAttributes<HTMLDivElement> {
  category: Category;
  eyebrow?: string;
  title: string;
  cta?: string;
  href?: string;
  active?: boolean;
}

export function PlanCard({
  category,
  eyebrow,
  title,
  cta,
  href,
  active,
  className,
  ...props
}: PlanCardProps) {
  return (
    <div
      className={cn(
        "flex min-h-[200px] cursor-pointer flex-col justify-end rounded-[18px] p-9 transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(12,28,62,0.18)]",
        bg[category],
        active && "ring-[3px] ring-coral ring-offset-[3px] ring-offset-background",
        className,
      )}
      {...props}
    >
      <div className="mb-3.5 text-[11px] font-medium uppercase tracking-[0.13em] text-coral">
        {eyebrow ?? labels[category]}
      </div>
      <div className="mb-5 max-w-[290px] font-display text-[23px] font-bold leading-[1.22] text-white">
        {title}
      </div>
      {cta ? (
        <a
          href={href ?? "#"}
          className="inline-flex w-fit items-center gap-1.5 rounded-full bg-coral px-[18px] py-[9px] font-display text-[12.5px] font-bold text-navy no-underline transition-colors hover:bg-coral-hover"
        >
          {cta}
          <ArrowRight size={14} />
        </a>
      ) : null}
    </div>
  );
}
