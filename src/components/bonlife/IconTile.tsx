import { useEffect, useRef, useState } from "react";
import { Download, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type IconEntry = {
  name: string;
  label: string;
  Icon: LucideIcon;
};

export function serializeIcon(svg: SVGSVGElement): string {
  const clone = svg.cloneNode(true) as SVGSVGElement;
  clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  clone.setAttribute("stroke-width", "1");
  clone.setAttribute("fill", "none");
  // strip runtime-only attrs
  clone.removeAttribute("style");
  clone
    .querySelectorAll<SVGElement>("*")
    .forEach((el) => el.removeAttribute("style"));
  return new XMLSerializer().serializeToString(clone);
}

export function downloadIcon(svg: SVGSVGElement, filename: string) {
  const source = `<?xml version="1.0" encoding="UTF-8"?>\n${serializeIcon(svg)}`;
  const blob = new Blob([source], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export function IconTile({
  entry,
  dark = false,
}: {
  entry: IconEntry;
  dark?: boolean;
}) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const svg = el.querySelector("svg");
    if (!svg) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // measure and set per-child dash lengths
    svg.querySelectorAll<SVGGeometryElement>("path,line,circle,polyline,polygon,rect,ellipse").forEach((n) => {
      let len = 0;
      try {
        len = typeof n.getTotalLength === "function" ? n.getTotalLength() : 0;
      } catch {
        len = 0;
      }
      if (!len) {
        const bb = n.getBBox();
        len = (bb.width + bb.height) * 2 || 80;
      }
      n.style.setProperty("--len", String(len));
    });

    if (reduce) {
      setDrawn(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setDrawn(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const { Icon, label, name } = entry;

  return (
    <div
      ref={wrapRef}
      className={cn(
        "group relative flex aspect-square flex-col rounded-2xl border p-4 transition-[transform,box-shadow,background,border-color] duration-200 hover:-translate-y-[3px] focus-within:ring-2 focus-within:ring-coral focus-within:ring-offset-2",
        dark
          ? "border-white/10 bg-navy text-white hover:border-white/25 hover:shadow-[0_12px_32px_rgba(0,0,0,0.35)] focus-within:ring-offset-navy"
          : "border-hairline bg-surface text-navy hover:border-navy/20 hover:shadow-[0_12px_32px_rgba(12,28,62,0.10)] focus-within:ring-offset-surface",
      )}
    >
      <div
        className={cn(
          "flex flex-1 items-center justify-center [&_svg_*]:transition-[stroke-dashoffset] [&_svg_*]:duration-[650ms] [&_svg_*]:ease-[cubic-bezier(0.16,1,0.3,1)]",
          drawn
            ? "[&_svg_*]:[stroke-dashoffset:0]"
            : "[&_svg_*]:[stroke-dasharray:var(--len)] [&_svg_*]:[stroke-dashoffset:var(--len)]",
        )}
      >
        <Icon strokeWidth={1} size={44} aria-hidden />
      </div>
      <div className="mt-3 h-9 text-center">
        <div className="font-display text-[12.5px] font-semibold leading-tight">{label}</div>
      </div>
      <button
        type="button"
        aria-label={`Download ${label} icon as SVG`}
        onClick={() => {
          const svg = wrapRef.current?.querySelector("svg");
          if (svg) downloadIcon(svg, `bonlife-icon-${name}.svg`);
        }}
        className={cn(
          "absolute bottom-2 right-2 inline-flex h-7 w-7 items-center justify-center rounded-full opacity-40 transition-opacity hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-none group-hover:opacity-100",
          dark ? "bg-white/10 text-white hover:bg-white/20" : "bg-surface-tint text-navy hover:bg-surface-muted",
        )}
      >
        <Download size={13} strokeWidth={1.5} />
      </button>
    </div>
  );
}
