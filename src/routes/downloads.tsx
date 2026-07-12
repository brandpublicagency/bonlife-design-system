import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader, SiteFooter, PageHeader } from "@/components/bonlife/SiteChrome";

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

function Section({
  id,
  eyebrow,
  title,
  lead,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  lead?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-hairline py-16 sm:py-20">
      <div className="mb-10 max-w-2xl">
        <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-coral">
          {eyebrow}
        </div>
        <h2 className="mt-2 !text-[32px] !leading-[1.1] sm:!text-[36px]">{title}</h2>
        {lead ? (
          <p className="mt-3 text-[15px] leading-[1.65] text-muted-foreground">{lead}</p>
        ) : null}
      </div>
      {children}
    </section>
  );
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
      <div className={`flex h-44 items-center justify-center px-8 ${bgClass}`}>
        <img src={src} alt={label} className="max-h-16 max-w-[70%]" />
      </div>
      <div className="flex flex-1 flex-col gap-4 p-5">
        <div>
          <div className="font-display text-[15px] font-semibold text-navy">{label}</div>
          <p className="mt-1 text-[13px] leading-[1.55] text-muted-foreground">{caption}</p>
          <div className="mt-2 font-mono text-[11px] text-muted-foreground">{filename}</div>
        </div>
        <div className="mt-auto flex gap-2">
          <a
            href={src}
            download={filename}
            className="inline-flex flex-1 items-center justify-center rounded-full bg-navy px-4 py-2 font-display text-[12px] font-semibold text-white transition-colors hover:bg-navy/90"
          >
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
            className="inline-flex items-center justify-center rounded-full border border-hairline px-4 py-2 font-display text-[12px] font-semibold text-navy transition-colors hover:border-navy"
            aria-live="polite"
          >
            {copied ? "Copied ✓" : "Copy URL"}
          </button>
        </div>
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
          {copied ? "Copied ✓" : "Copy hex"}
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
      <div className="mb-4 font-display text-[13px] font-semibold uppercase tracking-[0.12em] text-navy/70">
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

function DriveSection({
  id,
  eyebrow,
  title,
  lead,
  buttonLabel,
  thumbs,
}: {
  id: string;
  eyebrow: string;
  title: string;
  lead: string;
  buttonLabel: string;
  thumbs: { url: string; alt: string }[];
}) {
  return (
    <Section id={id} eyebrow={eyebrow} title={title}>
      <div className="overflow-hidden rounded-2xl border border-hairline bg-surface">
        <div className="grid gap-8 p-8 md:grid-cols-[1.1fr_1fr] md:items-center">
          <div>
            <p className="max-w-lg text-[15px] leading-[1.65] text-muted-foreground">{lead}</p>
            <a
              href={DRIVE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-coral px-5 py-2.5 font-display text-[13px] font-semibold text-navy transition-colors hover:bg-coral/90"
            >
              {buttonLabel}
              <span aria-hidden>↗</span>
            </a>
            <div className="mt-3 font-mono text-[11px] text-muted-foreground">
              Google Drive · shared folder
            </div>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {thumbs.map((t) => (
              <div key={t.url} className="aspect-square overflow-hidden rounded-lg border border-hairline">
                <img src={t.url} alt={t.alt} className="h-full w-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

function DownloadsPage() {
  const logos: {
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
    {
      src: markCoral,
      filename: "bonlife-mark-coral.svg",
      label: "Mark — Coral",
      caption: "Standalone mark in accent coral.",
      bg: "light",
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
      bg: "coral",
    },
  ];

  const toc = [
    { id: "logos", label: "Logos" },
    { id: "colours", label: "Colours" },
    { id: "photography", label: "Photography" },
    { id: "gradients", label: "Gradients" },
  ];

  return (
    <>
      <SiteHeader />
      <PageHeader
        eyebrow="Downloads"
        title="Brand assets, ready to grab."
        lead="Logos download inline. Click a colour to copy its hex. Photography and gradients live in the shared Google Drive."
        toc={toc}
      />
      <main className="mx-auto max-w-[1200px] px-6 sm:px-8">
        <Section
          id="logos"
          eyebrow="01 · Logos"
          title="Wordmarks and marks"
          lead="Six SVGs cover every surface. Use the light wordmark on navy and photography; the dark wordmark on white and tint surfaces."
        >
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {logos.map((l) => (
              <LogoCard key={l.filename} {...l} />
            ))}
          </div>
        </Section>

        <Section
          id="colours"
          eyebrow="02 · Colours"
          title="Palette"
          lead="Click any swatch to copy its hex. Token names match the CSS variables in the design system."
        >
          <div className="space-y-10">
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
        </Section>

        <DriveSection
          id="photography"
          eyebrow="03 · Photography"
          title="Campaign photography"
          lead="High-resolution photography lives in the shared Drive because files are licensed per campaign and too large to ship with the design system. Open the folder to browse the full set."
          buttonLabel="Open photography folder"
          thumbs={[
            { url: photo1.url, alt: "Couple on sofa" },
            { url: photo2.url, alt: "Family studio portrait" },
            { url: photo3.url, alt: "Senior couple on beach" },
            { url: photo4.url, alt: "Celebration fist pump" },
          ]}
        />

        <DriveSection
          id="gradients"
          eyebrow="04 · Gradients"
          title="Gradient backgrounds"
          lead="Gradients ship as layered PSDs and hi-res JPGs alongside the photography — grab them from the same Drive folder."
          buttonLabel="Open gradients folder"
          thumbs={[
            { url: gradient1.url, alt: "Gradient 01" },
            { url: gradient2.url, alt: "Gradient 02" },
            { url: gradient3.url, alt: "Gradient 03" },
            { url: gradient4.url, alt: "Gradient 04" },
          ]}
        />
      </main>
      <SiteFooter />
    </>
  );
}
