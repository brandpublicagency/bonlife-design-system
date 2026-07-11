import { Link } from "@tanstack/react-router";
import wordmarkLight from "@/assets/bonlife/logos/bonlife-wordmark-light.svg";
import wordmarkDark from "@/assets/bonlife/logos/bonlife-wordmark-dark.svg";

export function SiteHeader() {
  const items = [
    { to: "/", label: "Overview" },
    { to: "/foundations", label: "Foundations" },
    { to: "/components", label: "Components" },
    { to: "/marketing", label: "Marketing Kit" },
  ] as const;
  return (
    <header className="sticky top-0 z-40 border-b border-hairline bg-surface/85 backdrop-blur">
      <div className="mx-auto flex h-[68px] max-w-[1200px] items-center justify-between px-8">
        <Link to="/" className="flex items-center gap-2">
          <img src={wordmarkDark} alt="Bonlife" className="h-6" />
          <span className="hidden text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground sm:inline">
            Design System
          </span>
        </Link>
        <nav className="flex items-center gap-1">
          {items.map((it) => (
            <Link
              key={it.to}
              to={it.to}
              className="rounded-full px-3.5 py-2 font-display text-[13px] font-semibold text-navy transition-colors hover:bg-surface-muted"
              activeProps={{ className: "bg-navy text-white hover:bg-navy" }}
              activeOptions={{ exact: true }}
            >
              {it.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-24 bg-navy px-8 py-12 text-white">
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-start justify-between gap-6">
        <div>
          <img src={wordmarkLight} alt="Bonlife" className="mb-3 h-5" />
          <p className="max-w-[320px] text-[12.5px] leading-[1.7] text-white/70">
            Bonlife Assurance Namibia. 20 branches nationwide. SMS your name to
            74448 and we will call you back.
          </p>
        </div>
        <p className="text-[12.5px] text-white/60">
          Design system — visual foundations, component library, and marketing
          patterns.
        </p>
      </div>
    </footer>
  );
}
