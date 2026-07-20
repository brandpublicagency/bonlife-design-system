import { cn } from "@/lib/utils";
import { Button } from "@/components/bonlife/Button";
import { ArrowUpRight } from "lucide-react";

export type DownloadCardAction =
  | {
      type: "button";
      label: string;
      variant?: "primary" | "secondary" | "outline";
      onClick: () => void;
      icon?: React.ReactNode;
      stateLabel?: string;
    }
  | {
      type: "link";
      label: string;
      variant?: "primary" | "secondary" | "outline";
      href: string;
      external?: boolean;
      download?: string;
      icon?: React.ReactNode;
    };

export type DownloadCardProps = {
  title?: string;
  description?: React.ReactNode;
  meta?: string;
  preview?: React.ReactNode;
  actions?: DownloadCardAction[];
  children?: React.ReactNode;
  className?: string;
  bodyClassName?: string;
};

const actionBase =
  "inline-flex items-center justify-center gap-1.5 rounded-full font-display text-[12.5px] font-semibold transition-[background,transform,color] duration-150 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-[0.97]";

const actionVariants = {
  primary: "bg-navy text-white hover:bg-navy-700 px-[18px] py-2",
  secondary: "bg-coral text-navy hover:bg-coral-hover px-[18px] py-2",
  outline:
    "bg-transparent text-navy border border-hairline hover:bg-surface-tint px-[18px] py-2",
};

function ActionItem({ action }: { action: DownloadCardAction }) {
  const classes = cn(actionBase, actionVariants[action.variant ?? "primary"]);
  const icon = action.icon ?? (action.type === "link" && action.external !== false ? <ArrowUpRight size={13} /> : null);

  if (action.type === "link") {
    return (
      <a
        href={action.href}
        className={classes}
        target={action.external !== false ? "_blank" : undefined}
        rel={action.external !== false ? "noopener noreferrer" : undefined}
        download={action.download}
      >
        {action.label}
        {icon}
      </a>
    );
  }

  return (
    <Button
      variant={action.variant === "outline" ? "outline" : action.variant === "secondary" ? "secondary" : "primary"}
      size="sm"
      onClick={action.onClick}
    >
      {action.label}
      {action.icon}
    </Button>
  );
}

export function DownloadCard({
  title,
  description,
  meta,
  preview,
  actions,
  children,
  className,
  bodyClassName,
}: DownloadCardProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-hairline bg-surface",
        className,
      )}
    >
      <div
        className={cn(
          "grid gap-6 p-6 sm:p-8",
          preview && "md:grid-cols-[1fr_220px] md:items-start",
          bodyClassName,
        )}
      >
        <div className="flex flex-col">
          {title ? (
            <h3 className="font-display text-[18px] font-semibold text-navy">
              {title}
            </h3>
          ) : null}
          {description ? (
            <p
              className={cn(
                "max-w-xl text-[14px] leading-[1.6] text-muted-foreground",
                title && "mt-1.5",
              )}
            >
              {description}
            </p>
          ) : null}
          {children ? (
            <div className={cn((title || description) && "mt-5")}>
              {children}
            </div>
          ) : null}
          {actions && actions.length > 0 ? (
            <div className="mt-5 flex flex-wrap items-center gap-2">
              {actions.map((action, i) => (
                <ActionItem key={i} action={action} />
              ))}
            </div>
          ) : null}
          {meta ? (
            <div className="mt-3 font-mono text-[11px] text-muted-foreground">
              {meta}
            </div>
          ) : null}
        </div>
        {preview ? (
          <div className="shrink-0">{preview}</div>
        ) : null}
      </div>
    </div>
  );
}
