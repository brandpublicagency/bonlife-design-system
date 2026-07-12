import { createFileRoute } from "@tanstack/react-router";
import { queryOptions, useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Loader2, Plus, X } from "lucide-react";
import { PageHeader, SiteFooter, SiteHeader } from "@/components/bonlife/SiteChrome";
import { Button } from "@/components/bonlife/Button";
import { KbSection, type KbSectionRow } from "@/components/bonlife/KbSection";
import { KbUploadPanel } from "@/components/bonlife/KbUploadPanel";
import {
  createKbSection,
  deleteKbSection,
  extractKbDraftsFromUpload,
  listKbSections,
  reorderKbSection,
  updateKbSection,
} from "@/lib/kb.functions";

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
          "The Bonlife knowledge base — the single source of truth about who Bonlife is, what it sells, and how it talks. Editable inline. Import from PDF, Markdown or text.",
      },
      { property: "og:title", content: "Knowledge Base — Bonlife" },
      {
        property: "og:description",
        content:
          "The single source of truth about Bonlife. Edit sections inline, reorder them, and import new content from any file.",
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

function KnowledgeBasePage() {
  const qc = useQueryClient();
  const { data: sections } = useSuspenseQuery(kbSectionsQuery);
  const [adding, setAdding] = useState(false);

  const invalidate = () => qc.invalidateQueries({ queryKey: ["kb", "sections"] });

  const createMut = useMutation({
    mutationFn: (input: { title: string; body_markdown: string }) =>
      createKbSection({ data: input }),
    onSuccess: invalidate,
  });
  const updateMut = useMutation({
    mutationFn: (input: { id: string; title: string; body_markdown: string }) =>
      updateKbSection({ data: input }),
    onSuccess: invalidate,
  });
  const deleteMut = useMutation({
    mutationFn: (id: string) => deleteKbSection({ data: { id } }),
    onSuccess: invalidate,
  });
  const reorderMut = useMutation({
    mutationFn: (input: { id: string; direction: "up" | "down" }) =>
      reorderKbSection({ data: input }),
    onSuccess: invalidate,
  });

  const busy =
    createMut.isPending ||
    updateMut.isPending ||
    deleteMut.isPending ||
    reorderMut.isPending;

  const toc = sections.map((s) => ({ id: s.slug, label: s.title }));

  return (
    <>
      <SiteHeader />
      <PageHeader
        eyebrow="Knowledge Base"
        title="The single source of truth for Bonlife."
        lead="Everything a person, chatbot, or agency needs to understand Bonlife — the mission, the products, the voice, the branch network. Anyone with this link can edit, reorder, add, or import new sections."
        toc={[{ id: "import", label: "Import" }, ...toc]}
      />

      <main className="mx-auto max-w-[1200px] px-6 py-12 sm:px-8">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
          <div className="text-[13px] text-navy/70">
            {sections.length} {sections.length === 1 ? "section" : "sections"} · last updated{" "}
            {new Date(
              sections.reduce(
                (max, s) => (s.updated_at > max ? s.updated_at : max),
                sections[0]?.updated_at ?? new Date().toISOString(),
              ),
            ).toLocaleString()}
          </div>
          <Button variant="primary" onClick={() => setAdding(true)}>
            <Plus size={14} /> New section
          </Button>
        </div>

        <div className="grid gap-6">
          <KbUploadPanel
            onExtract={async (input) => {
              const { drafts } = await extractKbDraftsFromUpload({ data: input });
              return drafts;
            }}
            onAdd={async (draft) => {
              await createMut.mutateAsync(draft);
            }}
          />

          {adding && (
            <NewSectionForm
              busy={createMut.isPending}
              onCancel={() => setAdding(false)}
              onCreate={async (input) => {
                await createMut.mutateAsync(input);
                setAdding(false);
              }}
            />
          )}

          {sections.map((s, i) => (
            <KbSection
              key={s.id}
              section={s}
              isFirst={i === 0}
              isLast={i === sections.length - 1}
              busy={busy}
              onSave={async (patch) => {
                await updateMut.mutateAsync({ id: s.id, ...patch });
              }}
              onDelete={async () => {
                await deleteMut.mutateAsync(s.id);
              }}
              onMove={async (direction) => {
                await reorderMut.mutateAsync({ id: s.id, direction });
              }}
            />
          ))}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

function NewSectionForm({
  busy,
  onCancel,
  onCreate,
}: {
  busy: boolean;
  onCancel: () => void;
  onCreate: (input: { title: string; body_markdown: string }) => Promise<void>;
}) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  return (
    <section className="rounded-2xl border border-navy/20 bg-surface p-6 sm:p-8">
      <div className="mb-4 flex items-center justify-between border-b border-hairline pb-4">
        <h2 className="font-display text-[22px] font-semibold text-navy">New section</h2>
        <button
          type="button"
          aria-label="Cancel"
          onClick={onCancel}
          className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-hairline text-navy hover:bg-surface-tint"
        >
          <X size={14} />
        </button>
      </div>
      <label className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-navy/60">
        Title
      </label>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="e.g. Claims process"
        className="mt-2 w-full rounded-md border border-hairline bg-surface-tint px-3 py-2 font-display text-[18px] font-semibold text-navy focus:border-navy focus:outline-none"
      />
      <label className="mt-4 block text-[11px] font-semibold uppercase tracking-[0.14em] text-navy/60">
        Body (Markdown)
      </label>
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        rows={12}
        placeholder="Use Markdown — headings, lists, tables, links."
        className="mt-2 w-full rounded-md border border-hairline bg-surface-tint p-3 font-mono text-[13px] leading-[1.55] text-navy focus:border-navy focus:outline-none"
      />
      <div className="mt-4 flex items-center gap-2">
        <Button
          variant="primary"
          disabled={busy || !title.trim()}
          onClick={() => onCreate({ title: title.trim(), body_markdown: body })}
        >
          {busy ? <Loader2 size={14} className="animate-spin" /> : <Plus size={14} />}
          Create section
        </Button>
        <Button variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </section>
  );
}
