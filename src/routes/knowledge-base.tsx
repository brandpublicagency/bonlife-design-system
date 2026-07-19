import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { Check, Copy, Download, ShieldCheck } from "lucide-react";
import { PageHeader, SiteFooter, SiteHeader } from "@/components/bonlife/SiteChrome";
import { PageSidebar, PageWithSidebar } from "@/components/bonlife/PageSidebar";
import { KbMarkdown, type KbSectionRow } from "@/components/bonlife/KbSection";
import { listKbSections } from "@/lib/kb.functions";
import { getMyAdminStatus } from "@/lib/admin.functions";
import { useSession } from "@/hooks/use-auth";
import { useHydrated } from "@/hooks/use-hydrated";

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
      { title: "Knowledge Base — Bonlife" },
      {
        name: "description",
        content:
          "The Bonlife knowledge base — the single source of truth about who Bonlife is, what it sells, and how it talks.",
      },
      { property: "og:title", content: "Knowledge Base — Bonlife" },
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
        lead="Everything a person, chatbot, or agency needs to understand Bonlife — the mission, the products, the voice, the branch network."
        meta={meta}
      />

      <PageWithSidebar
        sidebar={
          <PageSidebar
            label="Contents"
            items={sections.map((s) => ({ id: s.slug, label: s.title }))}
          />
        }
      >
        {sections.map((s) => (
          <PageSection
            key={s.id}
            id={s.slug}
            eyebrow={`#${s.slug}`}
            title={s.title}
            bodyClassName="pt-4"
          >
            <div className="rounded-2xl border border-hairline bg-surface p-6 sm:p-8">
              <KbMarkdown>{s.body_markdown || "_This section is empty._"}</KbMarkdown>
            </div>
          </PageSection>
        ))}
      </PageWithSidebar>
      <SiteFooter />
    </>
  );
}
