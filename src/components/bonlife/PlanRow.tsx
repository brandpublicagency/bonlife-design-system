import * as React from "react";
import { cn } from "@/lib/utils";
import type { Category } from "./PlanCard";

const borderColor: Record<Category, string> = {
  funeral: "border-l-funeral",
  life: "border-l-life",
  savings: "border-l-savings",
  accident: "border-l-accident",
};

export interface PlanRowProps {
  category: Category;
  name: string;
  tagline?: string;
  price?: string;
  href?: string;
}

export function PlanRow({ category, name, tagline, price, href }: PlanRowProps) {
  const Tag: React.ElementType = href ? "a" : "div";
  return (
    <Tag
      href={href}
      className="flex flex-wrap items-center justify-between gap-4 border-b border-[#EEF0F2] px-1 py-[18px] no-underline transition-colors last:border-b-0 hover:bg-surface-tint"
    >
      <div
        className={cn(
          "min-w-[160px] flex-1 border-l-[3px] pl-3 font-display text-[15.5px] font-bold text-navy",
          borderColor[category],
        )}
      >
        {name}
      </div>
      {tagline ? (
        <div className="min-w-[220px] flex-[2] text-[12.5px] text-muted-foreground">
          {tagline}
        </div>
      ) : null}
      {price ? (
        <div className="whitespace-nowrap font-display text-[13.5px] font-bold text-navy">
          {price}
        </div>
      ) : null}
    </Tag>
  );
}
