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
    <header className="sticky top-0 z-40 border-b border-hairline bg-surface/80 backdrop-blur-md">
      <div className="mx-auto grid h-16 max-w-[1200px] grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-6 sm:px-8">
        <Link to="/" className="flex min-w-0 items-center gap-2.5">
          <img src={wordmarkDark} alt="Bonlife" className="h-[22px] shrink-0" />
          <span className="hidden truncate rounded-full border border-hairline px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground sm:inline">
            Design System · v0.1
          </span>
        </Link>
        <nav className="flex items-center gap-1">
          {items.map((it) => (
            <Link
              key={it.to}
              to={it.to}
              className="relative rounded-md px-3 py-2 font-display text-[13px] font-semibold text-navy/70 transition-colors hover:text-navy"
              activeProps={{
                className:
                  "text-navy after:absolute after:bottom-[-19px] after:left-3 after:right-3 after:h-[2px] after:bg-coral",
              }}
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
    <footer className="mt-24 bg-navy px-6 py-14 text-white sm:px-8">
      <div className="mx-auto grid max-w-[1200px] gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <img src={wordmarkLight} alt="Bonlife" className="mb-4 h-6" />
          <p className="max-w-[340px] text-[13px] leading-[1.7] text-white/70">
            Bonlife Assurance Namibia. 20 branches nationwide. SMS your name to
            74448 and we will call you back.
          </p>
        </div>
        <div>
          <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-coral">
            System
          </div>
          <ul className="space-y-2 text-[13px] text-white/70">
            <li><Link to="/foundations" className="hover:text-white">Foundations</Link></li>
            <li><Link to="/components" className="hover:text-white">Components</Link></li>
            <li><Link to="/marketing" className="hover:text-white">Marketing Kit</Link></li>
          </ul>
        </div>
        <div>
          <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-coral">
            Colophon
          </div>
          <p className="text-[13px] leading-[1.7] text-white/70">
            Built from the Bonlife brand book and knowledge base — Onest &amp;
            Inter, navy anchor, coral accent, four category identifiers.
          </p>
        </div>
      </div>
      <div className="mx-auto mt-10 flex max-w-[1200px] items-center justify-between border-t border-white/10 pt-6 text-[11px] uppercase tracking-[0.14em] text-white/50">
        <span>© 2026 Bonlife Assurance Namibia</span>
        <span>Windhoek · +264 61 000 000</span>
      </div>
    </footer>
  );
}

export function PageHeader({
  eyebrow,
  title,
  lead,
  toc,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  toc?: { id: string; label: string }[];
}) {
  return (
    <section className="border-b border-hairline bg-surface">
      <div className="mx-auto max-w-[1200px] px-6 py-16 sm:px-8 sm:py-20">
        <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-coral">
          {eyebrow}
        </div>
        <h1 className="mt-3 !text-[44px] !leading-[1.05] sm:!text-[56px]">
          {title}
        </h1>
        {lead ? (
          <p className="mt-5 max-w-2xl text-lg leading-[1.6] text-muted-foreground">
            {lead}
          </p>
        ) : null}
        {toc && toc.length ? (
          <div className="mt-8 flex flex-wrap gap-2">
            {toc.map((t) => (
              <a
                key={t.id}
                href={`#${t.id}`}
                className="rounded-full border border-hairline bg-surface-tint px-3.5 py-1.5 font-display text-[12px] font-semibold text-navy/80 transition-colors hover:border-navy hover:text-navy"
              >
                {t.label}
              </a>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
