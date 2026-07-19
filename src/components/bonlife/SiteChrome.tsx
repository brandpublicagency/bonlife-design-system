import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Linkedin, MessageCircle, Mail, Phone } from "lucide-react";
import wordmarkLight from "@/assets/bonlife/logos/bonlife-wordmark-light.svg";
import wordmarkDark from "@/assets/bonlife/logos/bonlife-wordmark-dark.svg";
import { NavDrawer } from "@/components/bonlife/NavDrawer";

export const SYSTEM_VERSION = "v2.4";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-hairline bg-surface/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between gap-4 px-6 sm:px-8">
        <Link to="/" className="flex min-w-0 items-center gap-2.5">
          <img src={wordmarkDark} alt="Bonlife" className="h-[22px] shrink-0" />
          <span className="hidden truncate rounded-full border border-hairline px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground sm:inline">
            Design System · {SYSTEM_VERSION}
          </span>
        </Link>
        <NavDrawer />
      </div>
    </header>
  );
}

const FOOTER_SYSTEM: { to: "/foundations" | "/components" | "/iconography" | "/social" | "/marketing"; label: string }[] = [
  { to: "/foundations", label: "Foundations" },
  { to: "/components", label: "Components" },
  { to: "/iconography", label: "Iconography" },
  { to: "/social", label: "Social templates" },
  { to: "/marketing", label: "Marketing kit" },
];

const FOOTER_RESOURCES: { to: "/downloads" | "/knowledge-base" | "/contact"; label: string }[] = [
  { to: "/downloads", label: "Downloads" },
  { to: "/knowledge-base", label: "Knowledge base" },
  { to: "/contact", label: "Contact" },
];

export function SiteFooter() {
  return (
    <footer className="mt-24 bg-navy text-white">
      <div className="mx-auto grid max-w-[1200px] gap-12 px-6 py-16 sm:px-8 md:grid-cols-[1.6fr_1fr_1fr_1.2fr]">
        <div>
          <img src={wordmarkLight} alt="Bonlife" className="mb-5 h-6" />
          <p className="max-w-[320px] text-[13.5px] leading-[1.7] text-white/70">
            Bonlife Assurance Namibia. 20 branches nationwide. SMS your name
            to 74448 and an advisor will call you back.
          </p>
          <div className="mt-6 flex items-center gap-2">
            <SocialIcon href="https://wa.me/264833371730" label="WhatsApp">
              <MessageCircle size={15} strokeWidth={1.5} />
            </SocialIcon>
            <SocialIcon href="https://facebook.com/bonlifenamibia" label="Facebook">
              <Facebook size={15} strokeWidth={1.5} />
            </SocialIcon>
            <SocialIcon href="https://instagram.com/bonlifenamibia" label="Instagram">
              <Instagram size={15} strokeWidth={1.5} />
            </SocialIcon>
            <SocialIcon href="https://linkedin.com/company/bonlife" label="LinkedIn">
              <Linkedin size={15} strokeWidth={1.5} />
            </SocialIcon>
          </div>
        </div>

        <FooterCol title="System">
          {FOOTER_SYSTEM.map((l) => (
            <li key={l.to}>
              <Link to={l.to} className="text-white/70 transition-colors hover:text-white">
                {l.label}
              </Link>
            </li>
          ))}
        </FooterCol>

        <FooterCol title="Resources">
          {FOOTER_RESOURCES.map((l) => (
            <li key={l.to}>
              <Link to={l.to} className="text-white/70 transition-colors hover:text-white">
                {l.label}
              </Link>
            </li>
          ))}
        </FooterCol>

        <FooterCol title="Contact">
          <li className="flex items-start gap-2 text-white/70">
            <Phone size={13} strokeWidth={1.5} className="mt-1 shrink-0 text-coral" />
            <a href="tel:+264833371730" className="hover:text-white">+264 83 337 1730</a>
          </li>
          <li className="flex items-start gap-2 text-white/70">
            <MessageCircle size={13} strokeWidth={1.5} className="mt-1 shrink-0 text-coral" />
            <span>SMS your name to <span className="font-mono text-white">74448</span></span>
          </li>
          <li className="flex items-start gap-2 text-white/70">
            <Mail size={13} strokeWidth={1.5} className="mt-1 shrink-0 text-coral" />
            <a href="mailto:info@bonlifenam.com" className="hover:text-white">info@bonlifenam.com</a>
          </li>
        </FooterCol>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-2 px-6 py-6 text-[11px] uppercase tracking-[0.14em] text-white/50 sm:px-8">
          <span>© 2026 Bonlife Assurance Namibia</span>
          <span className="flex items-center gap-4">
            <span>Design System · Version {SYSTEM_VERSION.replace("v", "")}</span>
            <Link to="/contact" className="hover:text-white">Get in touch</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-coral">
        {title}
      </div>
      <ul className="space-y-2.5 text-[13.5px]">{children}</ul>
    </div>
  );
}

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-white/80 transition-colors hover:border-coral hover:text-coral"
    >
      {children}
    </a>
  );
}

export function PageHeader({
  eyebrow,
  title,
  lead,
  meta,
  toc,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  meta?: React.ReactNode;
  toc?: { id: string; label: string }[];
}) {
  return (
    <section className="bg-surface">
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
        {meta ? (
          <div className="mt-6 text-[13px] text-navy/70">{meta}</div>
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
