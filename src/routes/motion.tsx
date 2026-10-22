import { createFileRoute } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";
import { SiteHeader, SiteFooter, PageHeader } from "@/components/bonlife/SiteChrome";
import { useSiteContent, loadSitePage } from "@/hooks/use-site-content";

const TITLE = "Motion - Bonlife Design System";
const DESC =
  "Bonlife benefits motion: website benefits module, social reel, logo stings and the copy and motion spec.";

export const Route = createFileRoute("/motion")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  loader: ({ context }) => loadSitePage(context, "motion"),
  component: MotionPage,
});

function MotionPage() {
  const c = useSiteContent("motion");
  return (
    <>
      <SiteHeader />
      <PageHeader eyebrow={c.header.eyebrow} title={c.header.title} lead={c.header.lead} />
      <main className="mx-auto w-full max-w-[1280px] px-4 pb-20 sm:px-8">
        <div className="mb-3 flex justify-end">
          <a
            href="/motion/benefits.html"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-hairline bg-surface px-4 py-2 text-[13px] font-semibold text-navy hover:border-navy"
          >
            {c.viewer.open_label} <ExternalLink size={14} strokeWidth={1.5} />
          </a>
        </div>
        <iframe
          src="/motion/benefits.html"
          title="Bonlife benefits motion"
          className="block h-[85vh] min-h-[640px] w-full rounded-3xl border border-hairline bg-surface-tint"
        />
      </main>
      <SiteFooter />
    </>
  );
}
