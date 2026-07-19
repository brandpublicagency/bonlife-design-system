import { cn } from "@/lib/utils";

export type PageSectionProps = {
  id?: string;
  eyebrow?: string;
  title?: string;
  lead?: React.ReactNode;
  headerAction?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  bodyClassName?: string;
};

export function PageSection({
  id,
  eyebrow,
  title,
  lead,
  headerAction,
  children,
  className,
  bodyClassName,
}: PageSectionProps) {
  const hasHeader = eyebrow || title || lead || headerAction;

  return (
    <section
      id={id}
      className={cn("scroll-mt-24 pt-0 pb-12 sm:pb-16", className)}
    >
      {hasHeader ? (
        <header className="max-w-3xl">
          {eyebrow ? (
            <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-coral">
              {eyebrow}
            </div>
          ) : null}
          {title ? (
            <div
              className={cn(
                "flex flex-wrap items-baseline justify-between gap-4",
                eyebrow && "mt-3",
              )}
            >
              <h2 className="!text-[32px] !leading-[1.1] sm:!text-[36px]">
                {title}
              </h2>
              {headerAction ? (
                <div className="shrink-0">{headerAction}</div>
              ) : null}
            </div>
          ) : null}
          {lead ? (
            <p
              className={cn(
                "text-[15px] leading-[1.65] text-muted-foreground",
                (eyebrow || title) && "mt-3",
              )}
            >
              {lead}
            </p>
          ) : null}
        </header>
      ) : null}
      <div className={cn("pt-10 sm:pt-12", bodyClassName)}>{children}</div>
    </section>
  );
}
