import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader, SiteFooter, PageHeader } from "@/components/bonlife/SiteChrome";
import { PageSidebar, PageWithSidebar } from "@/components/bonlife/PageSidebar";
import { PageSection } from "@/components/bonlife/PageSection";
import { DownloadCard } from "@/components/bonlife/DownloadCard";
import { useSiteContent, loadSitePage } from "@/hooks/use-site-content";
import {
  LayoutTemplate,
  Star,
  Type as TypeIcon,
  Palette,
  Sparkles,
  ImageIcon,
  Check,
  Copy,
  Download,
  ArrowUpRight,
} from "lucide-react";

import wordmarkLight from "@/assets/bonlife/logos/bonlife-wordmark-light.svg";
import wordmarkDark from "@/assets/bonlife/logos/bonlife-wordmark-dark.svg";
import markCoralAsset from "@/assets/bonlife/logos/bonlife-mark-coral.svg.asset.json";
import markNavyAsset from "@/assets/bonlife/logos/bonlife-mark-navy.svg.asset.json";
import markMintAsset from "@/assets/bonlife/logos/bonlife-mark-mint.svg.asset.json";
import markWhiteAsset from "@/assets/bonlife/logos/bonlife-mark-white.svg.asset.json";
const markCoral = markCoralAsset.url;
const markNavy = markNavyAsset.url;
const markMint = markMintAsset.url;
const markWhite = markWhiteAsset.url;

import photo1 from "@/assets/bonlife/photography/couple-sofa.jpg.asset.json";
import photo2 from "@/assets/bonlife/photography/family-studio.jpg.asset.json";
import photo3 from "@/assets/bonlife/photography/senior-couple-beach.jpg.asset.json";
import photo4 from "@/assets/bonlife/photography/celebration-fistpump.jpg.asset.json";


export const Route = createFileRoute("/downloads")({
  head: () => ({
    meta: [
      { title: "Downloads - Bonlife Design System" },
      {
        name: "description",
        content:
          "Download Bonlife logos, copy brand colours, and grab photography from the shared Drive.",
      },
      { property: "og:title", content: "Downloads - Bonlife Design System" },
      {
        property: "og:description",
        content:
          "One place for Bonlife logos, colours and photography.",
      },
      { property: "og:url", content: "/downloads" },
    ],
    links: [{ rel: "canonical", href: "/downloads" }],
  }),
  loader: ({ context }) => loadSitePage(context, "downloads"),
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
}: {
  src: string;
  filename: string;
  label: string;
  caption: string;
  bg?: LogoBg;
}) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="flex flex-col items-stretch gap-5 overflow-hidden rounded-2xl border border-hairline bg-surface p-5 sm:flex-row sm:items-center sm:gap-6">
      <img
        src={src}
        alt={label}
        className="h-24 w-24 shrink-0 overflow-hidden rounded-2xl object-cover"
      />
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

type SwatchT = { name: string; hex: string; token: string; textOn: "light" | "dark" };

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
  const c = useSiteContent("downloads");
  const L = c.logos;
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
      label: L.wordmarkLight.label,
      caption: L.wordmarkLight.caption,
      bg: "navy",
    },
    {
      src: wordmarkDark,
      filename: "bonlife-wordmark-dark.svg",
      label: L.wordmarkDark.label,
      caption: L.wordmarkDark.caption,
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
      label: L.markCoral.label,
      caption: L.markCoral.caption,
      bg: "coral",
    },
    {
      src: markNavy,
      filename: "bonlife-mark-navy.svg",
      label: L.markNavy.label,
      caption: L.markNavy.caption,
      bg: "light",
    },
    {
      src: markMint,
      filename: "bonlife-mark-mint.svg",
      label: L.markMint.label,
      caption: L.markMint.caption,
      bg: "navy",
    },
    {
      src: markWhite,
      filename: "bonlife-mark-white.svg",
      label: L.markWhite.label,
      caption: L.markWhite.caption,
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
  ];

  return (
    <>
      <SiteHeader />
      <PageHeader
        eyebrow={c.header.eyebrow}
        title={c.header.title}
        lead={c.header.lead}
      />
      <PageWithSidebar sidebar={<PageSidebar label="Downloads" items={toc} />}>
        <PageSection
          id="design-system"
          eyebrow="Design system"
          title={c.designSystem.title}
          lead={c.designSystem.lead}
        >
          <DownloadCard
            title={c.designSystem.cardTitle}
            description={c.designSystem.cardDescription}
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
                href: c.links.adobeXd,
                icon: <ArrowUpRight size={13} />,
              },
            ]}
          />
        </PageSection>

        <PageSection
          id="logos"
          eyebrow="01 · Logos"
          title={c.logos.title}
          lead={c.logos.lead}
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
          title={c.fonts.title}
          lead={c.fonts.lead}
        >
          <div className="grid gap-5 md:grid-cols-2">
            <DownloadCard
              title="Onest"
              description={c.fonts.onestDescription}
              meta="Google Fonts · open source"
              actions={[
                {
                  type: "link",
                  label: "Open on Google Fonts",
                  variant: "secondary",
                  href: c.links.onest,
                  icon: <ArrowUpRight size={13} />,
                },
              ]}
            />
            <DownloadCard
              title="Inter"
              description={c.fonts.interDescription}
              meta="Google Fonts · open source"
              actions={[
                {
                  type: "link",
                  label: "Open on Google Fonts",
                  variant: "secondary",
                  href: c.links.inter,
                  icon: <ArrowUpRight size={13} />,
                },
              ]}
            />
          </div>
        </PageSection>

        <PageSection
          id="colours"
          eyebrow="03 · Colours"
          title={c.colours.title}
          lead={c.colours.lead}
        >
          <DownloadCard
            title="Colour tokens"
            description={c.colours.cardDescription}
            meta="Click to copy · CSS variables in src/styles.css"
          >
            <div className="space-y-8">
              <SwatchGroup
                title="Brand"
                swatches={c.colours.brand as SwatchT[]}
              />
              <SwatchGroup
                title="Category"
                swatches={c.colours.category as SwatchT[]}
              />
              <SwatchGroup
                title="State"
                swatches={c.colours.state as SwatchT[]}
              />
              <SwatchGroup
                title="Surface & text"
                swatches={c.colours.surface as SwatchT[]}
              />
            </div>
          </DownloadCard>
        </PageSection>

        <PageSection
          id="icons"
          eyebrow="04 · Icons"
          title={c.icons.title}
          lead={c.icons.lead}
        >
          <DownloadCard
            title="Icon library"
            description={c.icons.cardDescription}
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
                href: c.links.iconDrive,
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
          title={c.photography.title}
          lead={c.photography.lead}
        >
          <DownloadCard
            title="Campaign photography"
            description={c.photography.cardDescription}
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
                href: c.links.photographyDrive,
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
