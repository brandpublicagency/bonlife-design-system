import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { Check, Copy, Download, FileText, Link as LinkIcon, Loader2, ShieldCheck } from "lucide-react";
import { PageHeader, SiteFooter, SiteHeader } from "@/components/bonlife/SiteChrome";
import { PageSidebar, PageWithSidebar } from "@/components/bonlife/PageSidebar";
import { KbMarkdown, type KbSectionRow } from "@/components/bonlife/KbSection";
import { listKbSections } from "@/lib/kb.functions";
import { getMyAdminStatus } from "@/lib/admin.functions";
import { useSession } from "@/hooks/use-auth";
import { useHydrated } from "@/hooks/use-hydrated";
import { displayTitle, orderKbSections, sectionDisplayNumbers } from "@/lib/kb-hierarchy";
import { buildFullKbMarkdown, downloadBlob, kbExportFilename } from "@/lib/kb-export";

const kbSectionsQuery = queryOptions({
  queryKey: ["kb", "sections"],
  queryFn: async () => {
    const { sections } = await listKbSections();
    return sections as KbSectionRow[];
  },
});

export const Route = createFileRoute("/knowledge-base")({
  head: () => ({
    meta: [
      { title: "Knowledge Base - Bonlife" },
      {
        name: "description",
        content:
          "The Bonlife knowledge base - the single source of truth about who Bonlife is, what it sells, and how it talks.",
      },
      { property: "og:title", content: "Knowledge Base - Bonlife" },
      {
        property: "og:description",
        content:
          "The single source of truth about Bonlife: mission, products, voice, branch network.",
      },
      { property: "og:url", content: "/knowledge-base" },
    ],
    links: [{ rel: "canonical", href: "/knowledge-base" }],
  }),
  loader: ({ context }) =>
    context.queryClient?.ensureQueryData(kbSectionsQuery) ?? undefined,
  component: KnowledgeBasePage,
  errorComponent: KbErrorPage,
  notFoundComponent: () => (
    <div className="p-16 text-center text-navy/70">Not found</div>
  ),
});

function KbErrorPage({ error }: { error: Error }) {
  return (
    <>
      <SiteHeader />
      <div className="mx-auto max-w-[720px] px-6 py-24 text-center">
        <h1 className="font-display text-[24px] font-semibold text-navy">
          The knowledge base could not load
        </h1>
        <p className="mt-3 text-[14px] text-navy/70">{error.message}</p>
      </div>
    </>
  );
}

function relativeTime(iso: string): string {
  const then = new Date(iso).getTime();
  const now = Date.now();
  const diffSec = Math.round((then - now) / 1000);
  const abs = Math.abs(diffSec);
  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
  if (abs < 60) return rtf.format(Math.round(diffSec), "second");
  if (abs < 3600) return rtf.format(Math.round(diffSec / 60), "minute");
  if (abs < 86400) return rtf.format(Math.round(diffSec / 3600), "hour");
  if (abs < 86400 * 30) return rtf.format(Math.round(diffSec / 86400), "day");
  if (abs < 86400 * 365) return rtf.format(Math.round(diffSec / (86400 * 30)), "month");
  return rtf.format(Math.round(diffSec / (86400 * 365)), "year");
}

function KnowledgeBasePage() {
  const { data: sections } = useSuspenseQuery(kbSectionsQuery);
  const hydrated = useHydrated();
  const { session } = useSession();
  const { data: adminData } = useQuery({
    queryKey: ["me", "isAdmin", session?.user.id ?? "anon"],
    queryFn: () => getMyAdminStatus(),
    enabled: !!session,
  });
  const isAdmin = !!adminData?.isAdmin;
  const orderedSections = orderKbSections(sections);
  const nums = sectionDisplayNumbers(orderedSections);

  const latest = sections.reduce(
    (max, s) => (s.updated_at > max ? s.updated_at : max),
    sections[0]?.updated_at ?? new Date().toISOString(),
  );

  const meta = (
    <span suppressHydrationWarning>
      {sections.length} {sections.length === 1 ? "section" : "sections"}
      {hydrated ? ` · updated ${relativeTime(latest)}` : ""}
      {isAdmin ? (
        <>
          {" · "}
          <Link
            to="/admin/knowledge-base"
            className="inline-flex items-center gap-1 font-semibold text-coral hover:text-coral-hover"
          >
            <ShieldCheck size={12} /> Edit in backend
          </Link>
        </>
      ) : null}
    </span>
  );

  return (
    <>
      <SiteHeader />
      <PageHeader
        eyebrow="Knowledge Base"
        title="The single source of truth for Bonlife."
        lead="Everything a person, chatbot, or agency needs to understand Bonlife - the mission, the products, the voice, the branch network."
        meta={meta}
      />

      <PageWithSidebar
        sidebar={
          <PageSidebar
            label="Contents"
             items={orderedSections.map((section) => ({
               id: section.slug,
               label: displayTitle(section.title, nums.get(section.id)),
               depth: section.parent_id ? 1 : 0,
             }))}
          />
        }
      >
         <FullDownloadBar sections={orderedSections} />
         {orderedSections.map((section) => (
           <KbSectionCard key={section.id} section={section} number={nums.get(section.id)} />
        ))}
      </PageWithSidebar>
      <SiteFooter />
    </>
  );
}

function KbSectionCard({ section, number }: { section: KbSectionRow; number: string | null | undefined }) {
  const [copied, setCopied] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(section.body_markdown);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* ignore */
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(
        `https://brand.bonlifenam.com/knowledge-base#${section.slug}`,
      );
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 1500);
    } catch {
      /* ignore */
    }
  };

  const handleDownload = () => {
    const blob = new Blob([`# ${displayTitle(section.title, number)}\n\n${section.body_markdown}`], {
      type: "text/markdown;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${section.slug}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <section id={section.slug} className={`scroll-mt-24 pb-12 sm:pb-16 ${section.parent_id ? "ml-4 sm:ml-10" : ""}`}>
      <div className="rounded-2xl border border-hairline bg-surface p-6 sm:p-10">
        <div className="min-w-0">
          <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-coral">
            {number != null ? `Section ${number}` : "Introduction"}
          </div>
          <h2 className="mt-3 font-display !text-[32px] !leading-[1.1] font-semibold text-navy sm:!text-[36px]">
            {section.title}
          </h2>
        </div>
        <hr className="my-8 border-hairline" />
        <KbMarkdown>{section.body_markdown || "_This section is empty._"}</KbMarkdown>
        <div className="mt-8 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex h-9 items-center gap-1.5 rounded-full border border-hairline px-3.5 text-[12.5px] font-semibold text-navy transition hover:bg-surface-tint"
            aria-label="Copy section markdown"
          >
            {copied ? <Check size={13} /> : <Copy size={13} />}
            {copied ? "Copied" : "Copy"}
          </button>
          <button
            type="button"
            onClick={handleDownload}
            className="inline-flex h-9 items-center gap-1.5 rounded-full border border-hairline px-3.5 text-[12.5px] font-semibold text-navy transition hover:bg-surface-tint"
            aria-label="Download section as markdown"
          >
            <Download size={13} /> Download
          </button>
          <button
            type="button"
            onClick={handleCopyLink}
            className="inline-flex h-9 items-center gap-1.5 rounded-full border border-hairline px-3.5 text-[12.5px] font-semibold text-navy transition hover:bg-surface-tint"
            aria-label="Copy section link"
          >
            {linkCopied ? <Check size={13} /> : <LinkIcon size={13} />}
            {linkCopied ? "Copied" : "Copy link"}
          </button>
        </div>
      </div>
    </section>
  );
}

function FullDownloadBar({ sections }: { sections: KbSectionRow[] }) {
  const [busy, setBusy] = useState(false);
  const btn =
    "inline-flex h-9 items-center gap-1.5 rounded-full border border-hairline px-3.5 text-[12.5px] font-semibold text-navy transition hover:bg-surface-tint disabled:opacity-50";
  const downloadPdf = async () => {
    setBusy(true);
    try {
      const { renderKbPdf } = await import("@/lib/kb-pdf");
      downloadBlob(await renderKbPdf(sections), kbExportFilename("pdf"));
    } finally {
      setBusy(false);
    }
  };
  const downloadMd = () =>
    downloadBlob(
      new Blob([buildFullKbMarkdown(sections)], { type: "text/markdown;charset=utf-8" }),
      kbExportFilename("md"),
    );
  return (
    <div className="mb-8 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-hairline bg-surface p-5">
      <div className="text-[13.5px] text-navy/75">
        <span className="font-semibold text-navy">Full Knowledge Base</span> - every section in one file.
      </div>
      <div className="flex flex-wrap gap-2">
        <button type="button" onClick={downloadPdf} disabled={busy} className={btn}>
          {busy ? <Loader2 size={13} className="animate-spin" /> : <FileText size={13} />} Download PDF
        </button>
        <button type="button" onClick={downloadMd} className={btn}>
          <Download size={13} /> Download .md
        </button>
      </div>
    </div>
  );
}
