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
  component: ContactPage,
});

const TOC = [
  { id: "direct", label: "Get in touch", icon: User },
  { id: "head-office", label: "Head office", icon: Building2 },
  { id: "channels", label: "Direct methods", icon: MessageCircle },
  { id: "branches", label: "Branches", icon: MapPin },
  { id: "partners", label: "Payment partners", icon: Handshake },
];

const BRANCHES: { name: string; phone: string; address: string }[] = [
  { name: "Windhoek (Head Office)", phone: "+264 61 250 339", address: "73 John Meinert Street, Windhoek" },
  { name: "Katutura", phone: "+264 61 250 551", address: "6 Kalie Roodt Street, Windhoek" },
  { name: "Goreangab Mall", phone: "+264 83 337 1730", address: "Dam Beach Street, Katutura, Windhoek" },
  { name: "Eenhana", phone: "+264 83 337 1737", address: "Erf 258, Unit 6, Eenhana" },
  { name: "Gobabis", phone: "+264 83 377 7107", address: "Church Street, Shop 6, Gobabis" },
  { name: "Karibib", phone: "+264 83 377 7128", address: "Erf 345, Unit 3, Main Road, Karibib" },
  { name: "Keetmanshoop", phone: "+264 83 377 7103", address: "Erf 835, Hampi Plichta Avenue, Keetmanshoop" },
  { name: "Khorixas", phone: "+264 67 332 244", address: "Erf 4255 Ext.1, Shop 2, Khorixas" },
  { name: "Lüderitz", phone: "+264 83 377 7101", address: "Erf 280, Bismarck Street, Lüderitz" },
  { name: "Mariental", phone: "+264 83 377 7105", address: "Erf 1117, Dr. Sam Nujoma Ave, Shop 11, Mariental" },
  { name: "Omuthiya", phone: "+264 83 377 7100", address: "Erf 450, Shop 3, Omuthiya" },
  { name: "Ondangwa", phone: "+264 83 377 7113", address: "Main Road, Erf 5780, Shop 7, Ondangwa" },
  { name: "Oshakati", phone: "+264 83 377 7115", address: "Mandume Ndemufayo Rd, Unit 28, Oshakati" },
  { name: "Otjiwarongo", phone: "+264 83 377 7109", address: "Hage Geingob Street, Otjiwarongo" },
  { name: "Outapi", phone: "+264 83 377 7119", address: "Tsandi Road R/B 123, Shop No. 2, Outapi" },
  { name: "Rehoboth", phone: "+264 83 337 1738/9", address: "Erf 1240, Church Street, Office 1, Rehoboth" },
  { name: "Rundu", phone: "+264 83 334 1901", address: "Markus Siwarongo Str, Shop 4, Rundu" },
  { name: "Swakopmund", phone: "+264 83 337 1736", address: "Erf 3289, Grootfontein Street, Swakopmund" },
  { name: "Tsumeb", phone: "+264 83 377 7124", address: "Erf 1304, Shop 3, Tsumeb" },
  { name: "Walvis Bay", phone: "+264 83 377 7121", address: "CNR Sam Nujoma Ave and 12th Rd, Walvis Bay" },
];

const PAYMENT_METHODS: { name: string; note: string }[] = [
  { name: "Debit order", note: "Set up once, run monthly" },
  { name: "Cash", note: "At any Bonlife branch" },
  { name: "EFT", note: "From any Namibian bank" },
  { name: "Card", note: "New - on Bonlife 90" },
];

const PAYMENT_LOCATIONS: { name: string; note: string }[] = [
  { name: "NamPost", note: "Nationwide post-office network" },
  { name: "MobiPay", note: "Mobile wallet payment" },
  { name: "PayToday", note: "Mobile payment app" },
  { name: "USave", note: "In-store payment" },
  { name: "Checkers", note: "In-store payment" },
  { name: "Shoprite", note: "In-store payment" },
  { name: "Model", note: "Retail payment network" },
  { name: "Airtime City", note: "Retail payment network" },
  { name: "Woermann & Brock", note: "In-store payment" },
];



function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(`Design system enquiry - ${name || "no name"}`);
    const body = encodeURIComponent(`${message}\n\n-\n${name}\n${email}`);
    window.location.href = `mailto:info@bonlifenam.com?subject=${subject}&body=${body}`;
  }

  return (
    <>
      <SiteHeader />
      <PageHeader
        eyebrow="Contact"
        title="Talk to a real person at Bonlife."
        lead="Direct details, the head office, every fast contact method, all 20 branches, and where you can pay a policy."
      />

      <PageWithSidebar sidebar={<PageSidebar label="Contact" items={TOC} />}>
        <PageSection
          id="direct"
          eyebrow="01 · Direct"
          title="Get in touch."
          lead="Send a message and it lands with the design-system owner. For policies or claims, use the contact methods below."
        >
          <div className="grid gap-6 md:grid-cols-[1fr_1.1fr]">
            <div className="rounded-2xl border border-hairline bg-surface p-6">
              <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-coral">
                Owner
              </div>
              <div className="mt-2 font-display text-[20px] font-semibold text-navy">
                Bonlife Brand team
              </div>
              <p className="mt-1 text-[13.5px] text-muted-foreground">
                Design system enquiries, brand approvals, asset requests.
              </p>
              <div className="mt-5 space-y-5">
                <div>
                  <div className="font-display text-[15px] font-semibold text-navy">
                    LeRoux Germishuizen
                  </div>
                  <div className="text-[11px] text-muted-foreground">
                    Chief Marketing & Advertising Officer
                  </div>
                  <ul className="mt-2 space-y-1.5 text-[13.5px]">
                    <li className="flex items-center gap-2.5 text-navy">
                      <Mail size={14} strokeWidth={1.5} className="text-coral" />
                      <a href="mailto:leroux.g@bonlifenam.com" className="hover:text-coral">
                        leroux.g@bonlifenam.com
                      </a>
                    </li>
                    <li className="flex items-center gap-2.5 text-navy">
                      <Phone size={14} strokeWidth={1.5} className="text-coral" />
                      <a href="tel:+264814152857" className="hover:text-coral">
                        +264 81 415 2857
                      </a>
                    </li>
                  </ul>
                </div>
                <div>
                  <div className="font-display text-[15px] font-semibold text-navy">
                    Marius Lwaanda
                  </div>
                  <div className="text-[11px] text-muted-foreground">Marketing Operations</div>
                  <ul className="mt-2 space-y-1.5 text-[13.5px]">
                    <li className="flex items-center gap-2.5 text-navy">
                      <Mail size={14} strokeWidth={1.5} className="text-coral" />
                      <a href="mailto:marius.l@bonlifenam.com" className="hover:text-coral">
                        marius.l@bonlifenam.com
                      </a>
                    </li>
                    <li className="flex items-center gap-2.5 text-navy">
                      <Phone size={14} strokeWidth={1.5} className="text-coral" />
                      <a href="tel:+264815953880" className="hover:text-coral">
                        +264 81 595 3880
                      </a>
                    </li>
                  </ul>
                </div>
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

        <PageSection
          id="head-office"
          eyebrow="02 · Head office"
          title="Bonlife Assurance Namibia."
          lead="Head office is in Windhoek. Walk in during business hours or call ahead."
        >
          <div className="grid gap-4 md:grid-cols-3">
            <InfoCard icon={MapPin} title="Address">
              73 John Meinert Street
              <br />
              Windhoek, Namibia
            </InfoCard>
            <InfoCard icon={Phone} title="Telephone">
              <a href="tel:+26461250339" className="hover:text-coral">
                +264 61 250 339
              </a>
            </InfoCard>
            <InfoCard icon={Mail} title="Email">
              <a href="mailto:info@bonlifenam.com" className="hover:text-coral">
                info@bonlifenam.com
              </a>
            </InfoCard>
          </div>
        </PageSection>

        <PageSection
          id="channels"
          eyebrow="03 · Direct methods"
          title="Fastest ways to reach Bonlife."
          lead="Customer Support Centre is open six days a week. WhatsApp is the quickest for a call-back."
        >
          <div className="grid gap-4 md:grid-cols-3">
            <ChannelCard
              icon={MessageCircle}
              title="WhatsApp"
              value="+264 83 337 1730"
              href="https://wa.me/264833371730"
              cta="Open WhatsApp"
              accent="mint"
            />
            <ChannelCard
              icon={MessageCircle}
              title="SMS"
              value="Text your name to 74448"
              href="sms:74448"
              cta="Send SMS"
              accent="coral"
            />
            <ChannelCard
              icon={Phone}
              title="Call"
              value="+264 83 337 1730"
              href="tel:+264833371730"
              cta="Call now"
              accent="navy"
            />
          </div>

          <div className="mt-6 grid gap-4 rounded-2xl border border-hairline bg-surface p-6 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-coral">
                Also on
              </div>
              <div className="mt-1 font-display text-[16px] font-semibold text-navy">
                Follow Bonlife
              </div>
              <p className="mt-1 text-[13px] text-muted-foreground">
                WhatsApp, social channels and career updates.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <SocialLink href="https://wa.me/264818550027" label="WhatsApp" icon={MessageCircle} />
              <SocialLink href="https://www.facebook.com/BonlifeNAM/" label="Facebook" icon={Facebook} />
              <SocialLink href="https://instagram.com/bonlife.namibia" label="Instagram" icon={Instagram} />
              <SocialLink href="https://www.tiktok.com/@bonlife.namibia" label="TikTok" icon={TikTokIcon} />
              <SocialLink href="https://x.com/bonlife_namibia" label="X" icon={XIcon} />
              <SocialLink href="https://www.linkedin.com/company/bonlife-namibia/" label="LinkedIn" icon={Linkedin} />
            </div>
          </div>
        </PageSection>

        <PageSection
          id="branches"
          eyebrow="04 · Branches"
          title="Twenty branches, one Namibia."
          lead="Every branch takes cash payments and can answer plan questions."
        >
          <div className="overflow-hidden rounded-2xl border border-hairline bg-surface">
            <div className="grid divide-y divide-hairline">
              {BRANCHES.map((b) => (
                <div
                  key={b.name}
                  className="grid gap-2 px-5 py-4 sm:grid-cols-[minmax(0,1.2fr)_minmax(0,1.8fr)_auto] sm:items-center sm:gap-6"
                >
                  <div className="font-display text-[14px] font-semibold text-navy">
                    {b.name}
                  </div>
                  <div className="text-[13px] leading-[1.5] text-muted-foreground">
                    {b.address}
                  </div>
                  <a
                    href={`tel:${b.phone.replace(/[^+\d]/g, "")}`}
                    className="justify-self-start font-mono text-[12.5px] font-semibold text-navy hover:text-coral sm:justify-self-end"
                  >
                    {b.phone}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </PageSection>

        <PageSection
          id="partners"
          eyebrow="05 · Payment partners"
          title="Every way to pay a policy."
          lead="Bonlife premiums can be paid across all major Namibian channels - now including card payments on Bonlife 90."
        >
          <div className="space-y-8">
            <div>
              <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-navy/60">
                Payment methods
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {PAYMENT_METHODS.map((p) => (
                  <PartnerCard key={p.name} name={p.name} note={p.note} />
                ))}
              </div>
            </div>
            <div>
              <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-navy/60">
                Where to pay
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {PAYMENT_LOCATIONS.map((p) => (
                  <PartnerCard key={p.name} name={p.name} note={p.note} />
                ))}
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
