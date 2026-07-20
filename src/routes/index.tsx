import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  Palette,
  Component,
  Sparkles,
  Share2,
  Megaphone,
  Download,
  BookOpen,
  PencilRuler,
  Building2,
  Rocket,
} from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/bonlife/SiteChrome";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Bonlife Design System - for designers, suppliers and partners" },
      {
        name: "description",
        content:
          "The single place to find Bonlife's logos, colours, typography, components, icons, social templates and brand facts.",
      },
      {
        property: "og:title",
        content: "Bonlife Design System - for designers, suppliers and partners",
      },
      {
        property: "og:description",
        content:
          "The single place to find Bonlife's logos, colours, typography, components, icons, social templates and brand facts.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

type SectionLink =
  | "/foundations"
  | "/components"
  | "/iconography"
  | "/social"
  | "/marketing"
  | "/downloads"
  | "/knowledge-base";

function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* Cover */}
      <section>
        <div className="mx-auto max-w-[1200px] px-6 pb-16 pt-20 sm:px-8 md:pb-20 md:pt-28">
          <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-coral">
            Bonlife Design System · v2.4
          </div>
          <h1 className="mt-5 max-w-[900px] !text-[44px] !leading-[1.05] tracking-[-0.025em] text-navy sm:!text-[56px]">
            The design system for everyone building Bonlife.
          </h1>
          <p className="mt-6 max-w-[640px] text-[17px] leading-[1.6] text-muted-foreground">
            One place for designers, suppliers, agencies and internal teams to
            find Bonlife's logos, colours, typography, components, icons,
            social templates and brand facts - all traceable to the knowledge
            base.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              to="/foundations"
              className="inline-flex items-center gap-2 rounded-full bg-navy px-5 py-3 font-display text-[14px] font-semibold text-white transition-colors hover:bg-navy/90"
            >
              Get started <ArrowRight size={16} />
            </Link>
            <Link
              to="/downloads"
              className="inline-flex items-center gap-2 rounded-full border border-hairline bg-white px-5 py-3 font-display text-[14px] font-semibold text-navy transition-colors hover:border-navy/40"
            >
              <Download size={16} /> Download assets
            </Link>
          </div>
        </div>
      </section>

      {/* Get started - by audience */}
      <section className="bg-surface">
        <div className="mx-auto max-w-[1200px] px-6 py-16 sm:px-8">
          <div className="mb-8">
            <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-coral">
              Get started
            </div>
            <h2 className="mt-2 !text-[28px] !leading-[1.15] text-navy">
              Pick your starting point.
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <AudienceCard
              Icon={PencilRuler}
              audience="Designers"
              body="Foundations, components and iconography with tokens ready to use."
              primary={{ to: "/foundations", label: "Foundations" }}
              secondary={{ to: "/components", label: "Components" }}
            />
            <AudienceCard
              Icon={Building2}
              audience="Suppliers & print"
              body="Logos, colours and fonts in the formats you need to produce work."
              primary={{ to: "/downloads", label: "Downloads" }}
              secondary={{ to: "/foundations", label: "Colour tokens" }}
            />
            <AudienceCard
              Icon={Rocket}
              audience="Marketing & social"
              body="Ready-made post templates and a demo homepage composition."
              primary={{ to: "/social", label: "Social templates" }}
              secondary={{ to: "/marketing", label: "Marketing kit" }}
            />
          </div>
        </div>
      </section>

      {/* Browse the system */}
      <section>
        <div className="mx-auto max-w-[1200px] px-6 py-20 sm:px-8">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-coral">
                Browse the system
              </div>
              <h2 className="mt-2 !text-[32px] !leading-[1.1] text-navy">
                Everything inside Bonlife.
              </h2>
            </div>
            <p className="max-w-sm text-[14px] leading-[1.65] text-muted-foreground">
              Seven sections, each one self-contained. Deep-link any tile -
              they're all shareable URLs.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <SystemTile
              to="/foundations"
              Icon={Palette}
              title="Foundations"
              body="Colour, typography, spacing, radius, motion."
              items={["Onest + Inter", "Navy + coral", "Token reference"]}
            />
            <SystemTile
              to="/components"
              Icon={Component}
              title="Components"
              body="Buttons, cards, plan rows, forms, dialogs."
              items={["17 components", "Semantic tokens", "Live previews"]}
            />
            <SystemTile
              to="/iconography"
              Icon={Sparkles}
              title="Iconography"
              body="1px Lucide set plus category and benefit glyphs."
              items={["Product categories", "Value-added benefits", "SVG downloads"]}
            />
            <SystemTile
              to="/social"
              Icon={Share2}
              title="Social templates"
              body="Posts, stories and carousels ready for campaigns."
              items={["9 templates", "Multi-slide carousel", "Standard ratios"]}
            />
            <SystemTile
              to="/marketing"
              Icon={Megaphone}
              title="Marketing kit"
              body="A plausible bonlifenam.com built from real plans."
              items={["Demo homepage", "Real copy", "Plan composition"]}
            />
            <SystemTile
              to="/downloads"
              Icon={Download}
              title="Downloads"
              body="Logos, colours, fonts, photography and gradients."
              items={["SVG logos", "Copy-to-clipboard hex", "Google Drive assets"]}
            />
            <SystemTile
              to="/knowledge-base"
              Icon={BookOpen}
              title="Knowledge base"
              body="The single source of truth for Bonlife brand facts."
              items={["Products & pricing", "Voice & tone", "Claims process"]}
              wide
            />
          </div>
        </div>
      </section>

      {/* What's new */}
      <section className="bg-surface">
        <div className="mx-auto max-w-[1200px] px-6 py-16 sm:px-8">
          <div className="grid gap-10 md:grid-cols-[280px_1fr]">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-coral">
                What's new
              </div>
              <h2 className="mt-2 !text-[28px] !leading-[1.15] text-navy">
                Recent updates.
              </h2>
              <p className="mt-4 text-[13px] leading-[1.65] text-muted-foreground">
                A short changelog of what changed in the system.
              </p>
            </div>
            <ul className="divide-y divide-hairline">
              {CHANGELOG.map((entry) => (
                <li key={entry.title} className="py-5 first:pt-0 last:pb-0">
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    <span className="font-display text-[11px] font-semibold uppercase tracking-[0.14em] text-navy/60">
                      {entry.date}
                    </span>
                    <Link
                      to={entry.to}
                      className="group inline-flex items-center gap-1.5 font-display text-[16px] font-semibold text-navy hover:text-coral"
                    >
                      {entry.title}
                      <ArrowUpRight
                        size={14}
                        className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </Link>
                  </div>
                  <p className="mt-1.5 max-w-[640px] text-[14px] leading-[1.6] text-muted-foreground">
                    {entry.body}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

function AudienceCard({
  Icon,
  audience,
  body,
  primary,
  secondary,
}: {
  Icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
  audience: string;
  body: string;
  primary: { to: SectionLink; label: string };
  secondary: { to: SectionLink; label: string };
}) {
  return (
    <div className="flex h-full flex-col rounded-xl border border-hairline bg-white p-6">
      <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-coral bg-white text-coral">
        <Icon size={18} strokeWidth={1.5} />
      </div>
      <div className="mt-4 font-display text-[11px] font-semibold uppercase tracking-[0.14em] text-navy/60">
        {audience}
      </div>
      <p className="mt-2 flex-1 text-[14px] leading-[1.6] text-muted-foreground">
        {body}
      </p>
      <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
        <Link
          to={primary.to}
          className="inline-flex items-center gap-1.5 font-display text-[13px] font-semibold text-navy hover:text-coral"
        >
          {primary.label} <ArrowRight size={13} />
        </Link>
        <Link
          to={secondary.to}
          className="font-display text-[13px] font-medium text-muted-foreground hover:text-navy"
        >
          {secondary.label}
        </Link>
      </div>
    </div>
  );
}

function SystemTile({
  to,
  Icon,
  title,
  body,
  items,
  wide = false,
}: {
  to: SectionLink;
  Icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
  title: string;
  body: string;
  items: string[];
  wide?: boolean;
}) {
  return (
    <Link
      to={to}
      className={`group flex h-full flex-col rounded-xl border border-hairline bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-navy/30 hover:shadow-[0_10px_30px_-15px_rgba(15,27,61,0.25)] ${
        wide ? "sm:col-span-2 lg:col-span-3" : ""
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-navy/5 text-navy">
          <Icon size={18} strokeWidth={1.5} />
        </div>
        <ArrowUpRight
          size={16}
          className="text-navy/30 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-coral"
        />
      </div>
      <h3 className="mt-5 font-display text-[19px] font-semibold text-navy">
        {title}
      </h3>
      <p className="mt-2 flex-1 text-[14px] leading-[1.6] text-muted-foreground">
        {body}
      </p>
      <ul className="mt-5 flex flex-wrap gap-1.5 border-t border-hairline pt-4">
        {items.map((item) => (
          <li
            key={item}
            className="rounded-full bg-surface px-2.5 py-1 text-[11px] font-medium text-navy/70"
          >
            {item}
          </li>
        ))}
      </ul>
    </Link>
  );
}

const CHANGELOG: Array<{
  date: string;
  title: string;
  body: string;
  to: SectionLink;
}> = [
  {
    date: "Apr 2025",
    title: "Social templates",
    body: "Nine post templates plus a five-slide 'How Bonlife works' carousel.",
    to: "/social",
  },
  {
    date: "Jun 2025",
    title: "Knowledge base with admin",
    body: "Single source of truth for brand facts. Import from PDFs, admin-only editing.",
    to: "/knowledge-base",
  },
  {
    date: "Nov 2025",
    title: "Downloads page",
    body: "Logos as SVG, colour swatches with click-to-copy hex, plus font and asset links.",
    to: "/downloads",
  },
  {
    date: "Jul 2026",
    title: "Iconography overhaul",
    body: "Sticky sidebar layout, unified utility bar and a Google Drive link for the full icon set.",
    to: "/iconography",
  },
];
