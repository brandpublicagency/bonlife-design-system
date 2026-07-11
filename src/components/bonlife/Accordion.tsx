import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
}

export function Accordion({
  items,
  className,
}: {
  items: AccordionItem[];
  className?: string;
}) {
  const [open, setOpen] = React.useState<string | null>(items[0]?.id ?? null);
  return (
    <div className={cn("divide-y divide-hairline border-y border-hairline", className)}>
      {items.map((item) => {
        const isOpen = open === item.id;
        return (
          <div key={item.id}>
            <button
              onClick={() => setOpen(isOpen ? null : item.id)}
              className="flex w-full items-center justify-between gap-4 py-5 text-left"
            >
              <span className="font-display text-base font-semibold text-navy">
                {item.title}
              </span>
              <ChevronDown
                size={20}
                className={cn(
                  "text-navy transition-transform duration-200",
                  isOpen && "rotate-180",
                )}
              />
            </button>
            {isOpen ? (
              <div className="pb-5 text-sm leading-6 text-muted-foreground">
                {item.content}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
