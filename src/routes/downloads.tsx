import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader, SiteFooter, PageHeader } from "@/components/bonlife/SiteChrome";
import { PageSidebar, PageWithSidebar } from "@/components/bonlife/PageSidebar";
import { PageSection } from "@/components/bonlife/PageSection";
import { DownloadCard } from "@/components/bonlife/DownloadCard";
import {
  LayoutTemplate,
  Star,
  Type as TypeIcon,
  Palette,
  Sparkles,
  ImageIcon,
  Waves,
  Check,
  Copy,
  Download,
  ArrowUpRight,
} from "lucide-react";

import wordmarkLight from "@/assets/bonlife/logos/bonlife-wordmark-light.svg";
import wordmarkDark from "@/assets/bonlife/logos/bonlife-wordmark-dark.svg";
import markCoral from "@/assets/bonlife/logos/bonlife-mark-coral.svg";
import markNavy from "@/assets/bonlife/logos/bonlife-mark-navy.svg";
import markMint from "@/assets/bonlife/logos/bonlife-mark-mint.svg";
import markWhite from "@/assets/bonlife/logos/bonlife-mark-white.svg";

import photo1 from "@/assets/bonlife/photography/couple-sofa.jpg.asset.json";
import photo2 from "@/assets/bonlife/photography/family-studio.jpg.asset.json";
import photo3 from "@/assets/bonlife/photography/senior-couple-beach.jpg.asset.json";
import photo4 from "@/assets/bonlife/photography/celebration-fistpump.jpg.asset.json";

import gradient1 from "@/assets/bonlife/gradients/gradient-01.jpg.asset.json";
import gradient2 from "@/assets/bonlife/gradients/gradient-02.jpg.asset.json";
import gradient3 from "@/assets/bonlife/gradients/gradient-03.jpg.asset.json";
import gradient4 from "@/assets/bonlife/gradients/gradient-04.png.asset.json";

const DRIVE_URL =
  "https://drive.google.com/drive/folders/1-BYSNul3hlWG1B3lqOxtEZlwSy2L5_nI?usp=sharing";
const ICON_DRIVE_URL =
  "https://drive.google.com/drive/folders/1W_OspNdCrFBoq3R7HFNPhk7XqzecMOsU?usp=sharing";
const XD_URL =
  "https://xd.adobe.com/view/47817079-994c-4681-9f8b-78fea6abfd3a-12d2/grid";
const ONEST_URL = "https://fonts.google.com/specimen/Onest";
const INTER_URL = "https://fonts.google.com/specimen/Inter";

export const Route = createFileRoute("/downloads")({
  head: () => ({
    meta: [
      { title: "Downloads — Bonlife Design System" },
      {
        name: "description",
        content:
          "Download Bonlife logos, copy brand colours, and grab photography and gradients from the shared Drive.",
      },
      { property: "og:title", content: "Downloads — Bonlife Design System" },
      {
        property: "og:description",
        content:
          "One place for Bonlife logos, colours, photography and gradients.",
      },
      { property: "og:url", content: "/downloads" },
    ],
    links: [{ rel: "canonical", href: "/downloads" }],
  }),
  component: DownloadsPage,
});

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    try {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      return true;
    } catch {
      return false;
    }
  }
}

type LogoBg = "navy" | "light" | "coral" | "mint";

function LogoCard({
  src,
  filename,
  label,
  caption,
  bg,
}: {
  src: string;
  filename: string;
  label: string;
  caption: string;
  bg: LogoBg;
}) {
  const [copied, setCopied] = useState(false);
  const bgClass =
    bg === "navy"
      ? "bg-navy"
      : bg === "coral"
        ? "bg-coral"
        : bg === "mint"
          ? "bg-[color:var(--mint-400)]"
          : "bg-surface-tint";
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-hairline bg-surface">
      <div className={`flex h-44 items-center justify-center rounded-t-2xl px-8 ${bgClass}`}>
        <img src={src} alt={label} className="max-h-16 max-w-[70%]" />
      </div>
      <div className="flex flex-1 flex-col gap-4 p-5">
        <div>
          <div className="font-display text-[15px] font-semibold text-navy">{label}</div>
          <p className="mt-1 text-[13px] leading-[1.55] text-muted-foreground">{caption}</p>
          <div className="mt-2 font-mono text-[11px] text-muted-foreground">{filename}</div>
        </div>
        <div className="mt-auto flex flex-wrap gap-2">
          <a
            href={src}
            download={filename}
            className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-navy px-[18px] py-2 font-display text-[12.5px] font-semibold text-white transition-colors hover:bg-navy-700"
          >
            <Download size={13} />
            Download SVG
          </a>
          <button
            type="button"
            onClick={async () => {
              const abs = new URL(src, window.location.origin).toString();
              const ok = await copyText(abs);
              if (ok) {
                setCopied(true);
                setTimeout(() => setCopied(false), 1400);
              }
            }}
            className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full border border-hairline px-[18px] py-2 font-display text-[12.5px] font-semibold text-navy transition-colors hover:bg-surface-tint"
            aria-live="polite"
          >
            {copied ? <Check size={13} /> : <Copy size={13} />}
            {copied ? "Copied" : "Copy URL"}
          </button>
        </div>
      </div>
    </div>
  );
}

function MarkRow({
  src,
  filename,
  label,
  caption,
  bg,
}: {
  src: string;
  filename: string;
  label: string;
  caption: string;
  bg: LogoBg;
}) {
  const [copied, setCopied] = useState(false);
  const bgClass =
    bg === "navy"
      ? "bg-navy"
      : bg === "coral"
        ? "bg-coral"
        : bg === "mint"
          ? "bg-[color:var(--mint-400)]"
          : "bg-surface-tint";
  return (
    <div className="flex flex-col items-stretch gap-5 overflow-hidden rounded-2xl border border-hairline bg-surface p-5 sm:flex-row sm:items-center sm:gap-6">
      <div
        className={`flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl ${bgClass}`}
      >
        <img src={src} alt={label} className="max-h-14 max-w-[70%]" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="font-display text-[16px] font-semibold text-navy">{label}</div>
        <p className="mt-1 text-[13px] leading-[1.55] text-muted-foreground">{caption}</p>
        <div className="mt-1 font-mono text-[11px] text-muted-foreground">{filename}</div>
      </div>
      <div className="flex shrink-0 flex-wrap gap-2 sm:flex-nowrap">
        <a
          href={src}
          download={filename}
          className="inline-flex items-center justify-center gap-1.5 rounded-full bg-navy px-[18px] py-2 font-display text-[12.5px] font-semibold text-white transition-colors hover:bg-navy-700"
        >
          <Download size={13} />
          Download SVG
        </a>
        <button
          type="button"
          onClick={async () => {
            const abs = new URL(src, window.location.origin).toString();
            const ok = await copyText(abs);
            if (ok) {
              setCopied(true);
              setTimeout(() => setCopied(false), 1400);
            }
          }}
          className="inline-flex items-center justify-center gap-1.5 rounded-full border border-hairline px-[18px] py-2 font-display text-[12.5px] font-semibold text-navy transition-colors hover:bg-surface-tint"
          aria-live="polite"
        >
          {copied ? <Check size={13} /> : <Copy size={13} />}
          {copied ? "Copied" : "Copy URL"}
        </button>
      </div>
    </div>
  );
}

function SwatchTile({
  name,
  hex,
  token,
  textOn,
}: {
  name: string;
  hex: string;
  token: string;
  textOn: "light" | "dark";
}) {
  const [copied, setCopied] = useState(false);
  const labelColor = textOn === "light" ? "text-white" : "text-navy";
  const subColor = textOn === "light" ? "text-white/70" : "text-navy/60";
  return (
    <button
      type="button"
      title="Click to copy hex"
      onClick={async () => {
        const ok = await copyText(hex);
        if (ok) {
          setCopied(true);
          setTimeout(() => setCopied(false), 1400);
        }
      }}
      className="group flex h-40 w-full flex-col justify-between overflow-hidden rounded-2xl border border-hairline p-4 text-left transition-transform hover:-translate-y-0.5"
      style={{ background: hex }}
    >
      <div className={`flex items-center justify-between font-display text-[13px] font-semibold ${labelColor}`}>
        <span>{name}</span>
        <span
          className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] transition-opacity ${
            textOn === "light" ? "border-white/40 text-white" : "border-navy/30 text-navy"
          } ${copied ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
          aria-live="polite"
        >
          {copied ? "Copied" : "Copy hex"}
        </span>
      </div>
      <div className={`space-y-0.5 ${labelColor}`}>
        <div className="font-mono text-[15px] font-semibold uppercase tracking-wide">{hex}</div>
        <div className={`font-mono text-[11px] ${subColor}`}>{token}</div>
      </div>
    </button>
  );
}

function SwatchGroup({
  title,
  swatches,
}: {
  title: string;
  swatches: { name: string; hex: string; token: string; textOn: "light" | "dark" }[];
}) {
  return (
    <div>
      <div className="mb-3 font-display text-[12px] font-semibold uppercase tracking-[0.12em] text-navy/70">
        {title}
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {swatches.map((s) => (
          <SwatchTile key={s.hex + s.name} {...s} />
        ))}
      </div>
    </div>
  );
}

function DownloadsPage() {
  const wordmarks: {
    src: string;
    filename: string;
    label: string;
    caption: string;
    bg: LogoBg;
  }[] = [
    {
      src: wordmarkLight,
      filename: "bonlife-wordmark-light.svg",
      label: "Wordmark — Light",
      caption: "Primary wordmark for use on dark backgrounds.",
      bg: "navy",
    },
    {
      src: wordmarkDark,
      filename: "bonlife-wordmark-dark.svg",
      label: "Wordmark — Dark",
      caption: "Primary wordmark for use on light backgrounds.",
      bg: "light",
    },
  ];

  const marks: {
    src: string;
    filename: string;
    label: string;
    caption: string;
    bg: LogoBg;
  }[] = [
    {
      src: markCoral,
      filename: "bonlife-mark-coral.svg",
      label: "Mark — Coral",
      caption: "Standalone mark in accent coral.",
      bg: "coral",
    },
    {
      src: markNavy,
      filename: "bonlife-mark-navy.svg",
      label: "Mark — Navy",
      caption: "Standalone mark in anchor navy.",
      bg: "light",
    },
    {
      src: markMint,
      filename: "bonlife-mark-mint.svg",
      label: "Mark — Mint",
      caption: "Mint mark reserved for high-contrast dark surfaces.",
      bg: "navy",
    },
    {
      src: markWhite,
      filename: "bonlife-mark-white.svg",
      label: "Mark — White",
      caption: "Reversed mark for photography and coloured surfaces.",
      bg: "navy",
    },
  ];


  const toc = [
    { id: "design-system", label: "Design system", icon: LayoutTemplate },
    { id: "logos", label: "Logos", icon: Star },
    { id: "fonts", label: "Fonts", icon: TypeIcon },
    { id: "colours", label: "Colours", icon: Palette },
    { id: "icons", label: "Icons", icon: Sparkles },
    { id: "photography", label: "Photography", icon: ImageIcon },
    { id: "gradients", label: "Gradients", icon: Waves },
  ];

  return (
    <>
      <SiteHeader />
      <PageHeader
        eyebrow="Downloads"
        title="Brand assets, ready to grab."
        lead="Logos, fonts, and icons download inline or from Google Fonts / Drive. Click a colour to copy its hex. Photography and gradients live in the shared Google Drive."
      />
      <PageWithSidebar sidebar={<PageSidebar label="Downloads" items={toc} />}>
        <PageSection
          id="design-system"
          eyebrow="Design system"
          title="Adobe XD source"
          lead="The full Bonlife Design System lives in Adobe XD. Inspect components, copy assets, and download everything from the developer link."
        >
          <DownloadCard
            title="Adobe XD developer view"
            description="Open the XD source to inspect spacing, typography, components, and every asset in the system. Suppliers and designers should use this as the master reference."
            meta="Adobe XD · developer view"
            preview={
              <div className="flex aspect-square items-center justify-center overflow-hidden rounded-2xl border border-hairline bg-navy p-6">
                <img src={wordmarkLight} alt="Bonlife wordmark" className="max-h-16 max-w-[80%]" />
              </div>
            }
            actions={[
              {
                type: "link",
                label: "Open Adobe XD",
                variant: "secondary",
                href: XD_URL,
                icon: <ArrowUpRight size={13} />,
              },
            ]}
          />
        </PageSection>

        <PageSection
          id="logos"
          eyebrow="01 · Logos"
          title="Wordmarks and marks"
          lead="Six SVGs cover every surface. Use the light wordmark on navy and photography; the dark wordmark on white and tint surfaces."
        >
          <div className="space-y-5">
            <div className="grid gap-5 md:grid-cols-2">
              {wordmarks.map((l) => (
                <LogoCard key={l.filename} {...l} />
              ))}
            </div>
            <div className="grid gap-3">
              {marks.map((m) => (
                <MarkRow key={m.filename} {...m} />
              ))}
            </div>
          </div>
        </PageSection>

        <PageSection
          id="fonts"
          eyebrow="02 · Fonts"
          title="Typefaces"
          lead="Onest carries display type; Inter carries body copy. Both are free on Google Fonts."
        >
          <div className="grid gap-5 md:grid-cols-2">
            <DownloadCard
              title="Onest"
              description="Display headings and bold UI labels. Tight tracking, geometric, confident."
              meta="Google Fonts · open source"
              actions={[
                {
                  type: "link",
                  label: "Open on Google Fonts",
                  variant: "secondary",
                  href: ONEST_URL,
                  icon: <ArrowUpRight size={13} />,
                },
              ]}
            />
            <DownloadCard
              title="Inter"
              description="Body copy, captions, and interface text. Clean, readable, extensive weights."
              meta="Google Fonts · open source"
              actions={[
                {
                  type: "link",
                  label: "Open on Google Fonts",
                  variant: "secondary",
                  href: INTER_URL,
                  icon: <ArrowUpRight size={13} />,
                },
              ]}
            />
          </div>
        </PageSection>

        <PageSection
          id="colours"
          eyebrow="03 · Colours"
          title="Palette"
          lead="Click any swatch to copy its hex. Token names match the CSS variables in the design system."
        >
          <DownloadCard
            title="Colour tokens"
            description="Brand, category, state, and surface colours. Click a swatch to copy its hex to the clipboard."
            meta="Click to copy · CSS variables in src/styles.css"
          >
            <div className="space-y-8">
              <SwatchGroup
                title="Brand"
                swatches={[
                  { name: "Navy 900", hex: "#0C1C3E", token: "--navy-900", textOn: "light" },
                  { name: "Coral 500", hex: "#FF876A", token: "--coral-500", textOn: "dark" },
                  { name: "Mint 400", hex: "#01FBC0", token: "--mint-400", textOn: "dark" },
                ]}
              />
              <SwatchGroup
                title="Category"
                swatches={[
                  { name: "Funeral", hex: "#04413F", token: "--category-funeral", textOn: "light" },
                  { name: "Life", hex: "#541467", token: "--category-life", textOn: "light" },
                  { name: "Savings", hex: "#0D2B90", token: "--category-savings", textOn: "light" },
                  { name: "Accident", hex: "#A80A4D", token: "--category-accident", textOn: "light" },
                ]}
              />
              <SwatchGroup
                title="State"
                swatches={[
                  { name: "Error", hex: "#FF5F5F", token: "--state-error", textOn: "light" },
                  { name: "Success", hex: "#41FFB6", token: "--state-success", textOn: "dark" },
                ]}
              />
              <SwatchGroup
                title="Surface & text"
                swatches={[
                  { name: "Surface white", hex: "#FFFFFF", token: "--surface-white", textOn: "dark" },
                  { name: "Surface tint", hex: "#F7F8FB", token: "--surface-tint", textOn: "dark" },
                  { name: "Surface muted", hex: "#EAEDF4", token: "--surface-muted", textOn: "dark" },
                  { name: "Border hairline", hex: "#E1E4E9", token: "--border-hairline", textOn: "dark" },
                  { name: "Gray 600", hex: "#5B6472", token: "--gray-600", textOn: "light" },
                ]}
              />
            </div>
          </DownloadCard>
        </PageSection>

        <PageSection
          id="icons"
          eyebrow="04 · Icons"
          title="Icon library"
          lead="The full Bonlife icon set lives in the shared Drive folder. Download individual SVGs from the Iconography page, or grab the complete set from Drive."
        >
          <DownloadCard
            title="Icon library"
            description="Curated Lucide glyphs, category icons, and custom SVGs. Use the Iconography page to browse, or download the full set from the Drive folder."
            meta="Google Drive · shared folder"
            preview={
              <div className="flex aspect-square items-center justify-center overflow-hidden rounded-lg border border-hairline bg-navy">
                <Sparkles className="h-12 w-12 text-white" />
              </div>
            }
            actions={[
              {
                type: "link",
                label: "Open icon folder",
                variant: "secondary",
                href: ICON_DRIVE_URL,
                icon: <ArrowUpRight size={13} />,
              },
              {
                type: "link",
                label: "Browse iconography",
                variant: "outline",
                href: "/iconography",
                external: false,
              },
            ]}
          />
        </PageSection>

        <PageSection
          id="photography"
          eyebrow="05 · Photography"
          title="Campaign photography"
          lead="High-resolution photography lives in the shared Drive because files are licensed per campaign and too large to ship with the design system."
        >
          <DownloadCard
            title="Campaign photography"
            description="Open the folder to browse the full set of licensed campaign photography."
            meta="Google Drive · shared folder"
            preview={
              <div className="grid grid-cols-2 gap-2">
                {[
                  { url: photo1.url, alt: "Couple on sofa" },
                  { url: photo2.url, alt: "Family studio portrait" },
                  { url: photo3.url, alt: "Senior couple on beach" },
                  { url: photo4.url, alt: "Celebration fist pump" },
                ].map((p, i) => (
                  <div
                    key={i}
                    className="aspect-square overflow-hidden rounded-lg border border-hairline"
                  >
                    <img src={p.url} alt={p.alt} className="h-full w-full object-cover" />
                  </div>
                ))}
              </div>
            }
            actions={[
              {
                type: "link",
                label: "Open photography folder",
                variant: "secondary",
                href: DRIVE_URL,
                icon: <ArrowUpRight size={13} />,
              },
            ]}
          />
        </PageSection>

        <PageSection
          id="gradients"
          eyebrow="06 · Gradients"
          title="Gradient backgrounds"
          lead="Gradients ship as layered PSDs and hi-res JPGs alongside the photography — grab them from the same Drive folder."
        >
          <DownloadCard
            title="Gradient backgrounds"
            description="Grab layered PSDs and hi-res JPGs from the same shared Drive folder as the photography."
            meta="Google Drive · shared folder"
            preview={
              <div className="grid grid-cols-2 gap-2">
                {[
                  { url: gradient1.url, alt: "Gradient 01" },
                  { url: gradient2.url, alt: "Gradient 02" },
                  { url: gradient3.url, alt: "Gradient 03" },
                  { url: gradient4.url, alt: "Gradient 04" },
                ].map((g, i) => (
                  <div
                    key={i}
                    className="aspect-square overflow-hidden rounded-lg border border-hairline"
                  >
                    <img src={g.url} alt={g.alt} className="h-full w-full object-cover" />
                  </div>
                ))}
              </div>
            }
            actions={[
              {
                type: "link",
                label: "Open gradients folder",
                variant: "secondary",
                href: DRIVE_URL,
                icon: <ArrowUpRight size={13} />,
              },
            ]}
          />
        </PageSection>
      </PageWithSidebar>
      <SiteFooter />
    </>
  );
}
