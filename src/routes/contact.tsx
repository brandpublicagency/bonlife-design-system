import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Building2,
  Facebook,
  Handshake,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  User,
} from "lucide-react";
import { SiteHeader, SiteFooter, PageHeader } from "@/components/bonlife/SiteChrome";
import { PageSidebar, PageWithSidebar } from "@/components/bonlife/PageSidebar";
import { PageSection } from "@/components/bonlife/PageSection";
import { Input } from "@/components/bonlife/Input";
import { Button } from "@/components/bonlife/Button";
import { useSiteContent, loadSitePage } from "@/hooks/use-site-content";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact - Bonlife Design System" },
      {
        name: "description",
        content:
          "Get in touch with Bonlife. Direct details, head office, WhatsApp, SMS, call, email, branches and policy payment partners.",
      },
      { property: "og:title", content: "Contact - Bonlife Design System" },
      {
        property: "og:description",
        content:
          "Direct contact, 20 branches nationwide, and every way to pay a Bonlife policy.",
      },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  loader: ({ context }) => loadSitePage(context, "contact"),
  component: ContactPage,
});

const TOC = [
  { id: "direct", label: "Get in touch", icon: User },
  { id: "head-office", label: "Head office", icon: Building2 },
  { id: "channels", label: "Direct methods", icon: MessageCircle },
  { id: "branches", label: "Branches", icon: MapPin },
  { id: "partners", label: "Payment partners", icon: Handshake },
];

function tel(v: string) {
  return `tel:${v.replace(/[^+\d]/g, "")}`;
}
function wa(v: string) {
  return `https://wa.me/${v.replace(/\D/g, "")}`;
}

function ContactPage() {
  const c = useSiteContent("contact");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(`Design system enquiry - ${name || "no name"}`);
    const body = encodeURIComponent(`${message}\n\n-\n${name}\n${email}`);
    window.location.href = `mailto:${c.direct.formEmail}?subject=${subject}&body=${body}`;
  }

  return (
    <>
      <SiteHeader />
      <PageHeader eyebrow={c.header.eyebrow} title={c.header.title} lead={c.header.lead} />

      <PageWithSidebar sidebar={<PageSidebar label="Contact" items={TOC} />}>
        <PageSection id="direct" eyebrow="01 · Direct" title={c.direct.title} lead={c.direct.lead}>
          <div className="grid gap-6 md:grid-cols-[1fr_1.1fr]">
            <div className="rounded-2xl border border-hairline bg-surface p-6">
              <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-coral">
                {c.direct.teamLabel}
              </div>
              <div className="mt-2 font-display text-[20px] font-semibold text-navy">
                {c.direct.teamName}
              </div>
              <p className="mt-1 text-[13.5px] text-muted-foreground">{c.direct.teamNote}</p>
              <div className="mt-5 space-y-5">
                {c.direct.people.map((p) => (
                  <div key={p.name}>
                    <div className="font-display text-[15px] font-semibold text-navy">{p.name}</div>
                    <div className="text-[11px] text-muted-foreground">{p.role}</div>
                    <ul className="mt-2 space-y-1.5 text-[13.5px]">
                      <li className="flex items-center gap-2.5 text-navy">
                        <Mail size={14} strokeWidth={1.5} className="text-coral" />
                        <a href={`mailto:${p.email}`} className="hover:text-coral">{p.email}</a>
                      </li>
                      <li className="flex items-center gap-2.5 text-navy">
                        <Phone size={14} strokeWidth={1.5} className="text-coral" />
                        <a href={tel(p.phone)} className="hover:text-coral">{p.phone}</a>
                      </li>
                    </ul>
                  </div>
                ))}
              </div>
            </div>
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-hairline bg-surface p-6"
            >
              <div className="grid gap-4">
                <Input
                  label="Your name"
                  placeholder="Aina Nangolo"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  maxLength={100}
                />
                <Input
                  label="Email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  maxLength={255}
                />
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="contact-msg"
                    className="font-display text-[13px] font-semibold text-navy"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-msg"
                    rows={5}
                    maxLength={1000}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="What can we help with?"
                    className="rounded-md border border-hairline bg-surface px-4 py-3 text-sm text-navy placeholder:text-muted-foreground focus-visible:outline-2 focus-visible:outline-coral focus-visible:outline-offset-2"
                  />
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[11.5px] text-muted-foreground">
                    Opens your email client.
                  </span>
                  <Button type="submit" variant="secondary" size="md">
                    Send message <Send size={14} strokeWidth={1.5} />
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </PageSection>

        <PageSection id="head-office" eyebrow="02 · Head office" title={c.headOffice.title} lead={c.headOffice.lead}>
          <div className="grid gap-4 md:grid-cols-3">
            <InfoCard icon={MapPin} title="Address">
              {c.headOffice.addressLine1}
              <br />
              {c.headOffice.addressLine2}
            </InfoCard>
            <InfoCard icon={Phone} title="Telephone">
              <a href={tel(c.headOffice.phone)} className="hover:text-coral">{c.headOffice.phone}</a>
            </InfoCard>
            <InfoCard icon={Mail} title="Email">
              <a href={`mailto:${c.headOffice.email}`} className="hover:text-coral">{c.headOffice.email}</a>
            </InfoCard>
          </div>
        </PageSection>

        <PageSection id="channels" eyebrow="03 · Direct methods" title={c.channels.title} lead={c.channels.lead}>
          <div className="grid gap-4 md:grid-cols-3">
            <ChannelCard icon={MessageCircle} title="WhatsApp" value={c.channels.whatsapp} href={wa(c.channels.whatsapp)} cta="Open WhatsApp" accent="mint" />
            <ChannelCard icon={MessageCircle} title="SMS" value={c.channels.smsText} href={`sms:${c.channels.smsNumber}`} cta="Send SMS" accent="coral" />
            <ChannelCard icon={Phone} title="Call" value={c.channels.call} href={tel(c.channels.call)} cta="Call now" accent="navy" />
          </div>

          <div className="mt-6 grid gap-4 rounded-2xl border border-hairline bg-surface p-6 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-coral">Also on</div>
              <div className="mt-1 font-display text-[16px] font-semibold text-navy">{c.channels.followTitle}</div>
              <p className="mt-1 text-[13px] text-muted-foreground">{c.channels.followNote}</p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <SocialLink href={c.channels.social.whatsapp} label="WhatsApp" icon={MessageCircle} />
              <SocialLink href={c.channels.social.facebook} label="Facebook" icon={Facebook} />
              <SocialLink href={c.channels.social.instagram} label="Instagram" icon={Instagram} />
              <SocialLink href={c.channels.social.tiktok} label="TikTok" icon={TikTokIcon} />
              <SocialLink href={c.channels.social.x} label="X" icon={XIcon} />
              <SocialLink href={c.channels.social.linkedin} label="LinkedIn" icon={Linkedin} />
            </div>
          </div>
        </PageSection>

        <PageSection id="branches" eyebrow="04 · Branches" title={c.branches.title} lead={c.branches.lead}>
          <div className="overflow-hidden rounded-2xl border border-hairline bg-surface">
            <div className="grid divide-y divide-hairline">
              {c.branches.list.map((b) => (
                <div key={b.name} className="grid gap-2 px-5 py-4 sm:grid-cols-[minmax(0,1.2fr)_minmax(0,1.8fr)_auto] sm:items-center sm:gap-6">
                  <div className="font-display text-[14px] font-semibold text-navy">{b.name}</div>
                  <div className="text-[13px] leading-[1.5] text-muted-foreground">{b.address}</div>
                  <a href={tel(b.phone)} className="justify-self-start font-mono text-[12.5px] font-semibold text-navy hover:text-coral sm:justify-self-end">
                    {b.phone}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </PageSection>

        <PageSection id="partners" eyebrow="05 · Payment partners" title={c.partners.title} lead={c.partners.lead}>
          <div className="space-y-8">
            <div>
              <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-navy/60">Payment methods</div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {c.partners.methods.map((p) => <PartnerCard key={p.name} name={p.name} note={p.note} />)}
              </div>
            </div>
            <div>
              <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-navy/60">Where to pay</div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {c.partners.locations.map((p) => <PartnerCard key={p.name} name={p.name} note={p.note} />)}
              </div>
            </div>
          </div>
        </PageSection>
      </PageWithSidebar>

      <SiteFooter />
    </>
  );
}

function PartnerCard({ name, note }: { name: string; note: string }) {
  return (
    <div className="group rounded-2xl border border-hairline bg-surface p-5 transition-colors">
      <div className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-coral bg-transparent text-coral transition-colors group-hover:border-coral group-hover:bg-coral group-hover:text-white">
        <Handshake size={15} strokeWidth={1.5} />
      </div>
      <div className="mt-3 font-display text-[15px] font-semibold text-navy">
        {name}
      </div>
      <div className="mt-1 text-[12.5px] text-muted-foreground">{note}</div>
    </div>
  );
}

function InfoCard({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-hairline bg-surface p-6">
      <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-navy/5 text-navy">
        <Icon size={16} strokeWidth={1.5} />
      </div>
      <div className="mt-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-coral">
        {title}
      </div>
      <div className="mt-1.5 text-[14px] leading-[1.6] text-navy">{children}</div>
    </div>
  );
}

function ChannelCard({
  icon: Icon,
  title,
  value,
  href,
  cta,
  accent,
}: {
  icon: React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;
  title: string;
  value: string;
  href: string;
  cta: string;
  accent: "coral" | "navy" | "mint";
}) {
  const chipCls =
    accent === "coral"
      ? "bg-coral text-navy"
      : accent === "mint"
        ? "bg-[color:var(--mint-400)] text-navy"
        : "bg-navy text-white";
  return (
    <div className="flex flex-col rounded-2xl border border-hairline bg-surface p-6">
      <div className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${chipCls}`}>
        <Icon size={16} strokeWidth={1.5} />
      </div>
      <div className="mt-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-coral">
        {title}
      </div>
      <div className="mt-1 flex-1 font-display text-[17px] font-semibold text-navy">
        {value}
      </div>
      <a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        className="mt-5 inline-flex w-fit items-center gap-1.5 rounded-full bg-navy px-4 py-2 font-display text-[12.5px] font-semibold text-white transition-colors hover:bg-navy/90"
      >
        {cta}
      </a>
    </div>
  );
}

function SocialLink({
  href,
  label,
  icon: Icon,
}: {
  href: string;
  label: string;
  icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-hairline text-navy transition-colors hover:border-coral hover:text-coral"
    >
      <Icon size={15} strokeWidth={1.5} />
    </a>
  );
}

function TikTokIcon({ size = 24, strokeWidth = 1.5 }: { size?: number; strokeWidth?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 12a4 4 0 1 0 4 4V4c.5 3 2.5 5 5 5" />
    </svg>
  );
}

function XIcon({ size = 24, strokeWidth = 1.5 }: { size?: number; strokeWidth?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 4l16 16" />
      <path d="M20 4L4 20" />
    </svg>
  );
}
