import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowDown, ArrowUp, Loader2, Pencil, Trash2, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/bonlife/Button";

export type KbSectionRow = {
  id: string;
  slug: string;
  title: string;
  body_markdown: string;
  order_index: number;
  updated_at: string;
};

const markdownComponents = {
  h1: (p: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 {...p} className="mt-8 font-display text-[28px] font-semibold text-navy" />
  ),
  h2: (p: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 {...p} className="mt-8 font-display text-[22px] font-semibold text-navy" />
  ),
  h3: (p: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4 {...p} className="mt-6 font-display text-[17px] font-semibold text-navy" />
  ),
  p: (p: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p {...p} className="mt-4 text-[15px] leading-[1.7] text-navy/85" />
  ),
  a: (p: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a {...p} target="_blank" rel="noreferrer" className="text-coral underline underline-offset-2 hover:text-coral-hover" />
  ),
  ul: (p: React.HTMLAttributes<HTMLUListElement>) => (
    <ul {...p} className="mt-4 list-disc space-y-2 pl-6 text-[15px] leading-[1.7] text-navy/85" />
  ),
  ol: (p: React.HTMLAttributes<HTMLOListElement>) => (
    <ol {...p} className="mt-4 list-decimal space-y-2 pl-6 text-[15px] leading-[1.7] text-navy/85" />
  ),
  li: (p: React.LiHTMLAttributes<HTMLLIElement>) => <li {...p} className="pl-1" />,
  strong: (p: React.HTMLAttributes<HTMLElement>) => <strong {...p} className="font-semibold text-navy" />,
  hr: () => <hr className="my-8 border-hairline" />,
  code: (p: React.HTMLAttributes<HTMLElement>) => (
    <code {...p} className="rounded bg-surface-tint px-1.5 py-0.5 font-mono text-[12.5px] text-navy" />
  ),
  table: (p: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="mt-6 overflow-x-auto">
      <table {...p} className="w-full border-collapse text-[13.5px]" />
    </div>
  ),
  th: (p: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th {...p} className="border-b border-hairline bg-surface-tint px-3 py-2 text-left font-display font-semibold text-navy" />
  ),
  td: (p: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td {...p} className="border-b border-hairline px-3 py-2 align-top text-navy/85" />
  ),
  blockquote: (p: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote {...p} className="mt-4 border-l-2 border-coral bg-surface-tint px-4 py-2 text-navy/85" />
  ),
};

export function KbMarkdown({ children }: { children: string }) {
  return (
    <div className="[&>*:first-child]:mt-0">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
        {children}
      </ReactMarkdown>
    </div>
  );
}

export function KbSection({
  section,
  isFirst,
  isLast,
  busy,
  onSave,
  onDelete,
  onMove,
}: {
  section: KbSectionRow;
  isFirst: boolean;
  isLast: boolean;
  busy: boolean;
  onSave: (patch: { title: string; body_markdown: string }) => Promise<void>;
  onDelete: () => Promise<void>;
  onMove: (direction: "up" | "down") => Promise<void>;
}) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(section.title);
  const [body, setBody] = useState(section.body_markdown);
  const [saving, setSaving] = useState(false);

  return (
    <section
      id={section.slug}
      className="scroll-mt-24 rounded-2xl border border-hairline bg-surface p-6 sm:p-8"
    >
      <header className="mb-4 flex flex-wrap items-start justify-between gap-3 border-b border-hairline pb-4">
        <div className="min-w-0">
          <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-coral">
            #{section.slug}
          </div>
          {editing ? (
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-2 w-full min-w-[280px] rounded-md border border-hairline bg-surface-tint px-3 py-2 font-display text-[22px] font-semibold text-navy focus:border-navy focus:outline-none"
            />
          ) : (
            <h2 className="mt-1 font-display text-[26px] font-semibold text-navy sm:text-[30px]">
              {section.title}
            </h2>
          )}
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            aria-label="Move up"
            disabled={busy || isFirst}
            onClick={() => onMove("up")}
            className={cn(
              "inline-flex h-8 w-8 items-center justify-center rounded-md border border-hairline text-navy transition hover:bg-surface-tint disabled:opacity-30",
            )}
          >
            <ArrowUp size={14} />
          </button>
          <button
            type="button"
            aria-label="Move down"
            disabled={busy || isLast}
            onClick={() => onMove("down")}
            className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-hairline text-navy transition hover:bg-surface-tint disabled:opacity-30"
          >
            <ArrowDown size={14} />
          </button>
          {!editing && (
            <button
              type="button"
              aria-label="Edit section"
              onClick={() => setEditing(true)}
              className="inline-flex h-8 items-center gap-1.5 rounded-md border border-hairline px-3 text-[12.5px] font-semibold text-navy transition hover:bg-surface-tint"
            >
              <Pencil size={13} /> Edit
            </button>
          )}
          <button
            type="button"
            aria-label="Delete section"
            disabled={busy}
            onClick={() => {
              if (window.confirm(`Delete "${section.title}"? This cannot be undone.`)) {
                onDelete();
              }
            }}
            className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-hairline text-red-600 transition hover:bg-red-50 disabled:opacity-30"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </header>

      {editing ? (
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-navy/60">
              Markdown
            </div>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={24}
              className="w-full rounded-md border border-hairline bg-surface-tint p-3 font-mono text-[13px] leading-[1.55] text-navy focus:border-navy focus:outline-none"
            />
          </div>
          <div>
            <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-navy/60">
              Preview
            </div>
            <div className="rounded-md border border-hairline bg-white p-4">
              <KbMarkdown>{body || "_Nothing yet._"}</KbMarkdown>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2 md:col-span-2">
            <Button
              variant="primary"
              disabled={saving || !title.trim()}
              onClick={async () => {
                setSaving(true);
                try {
                  await onSave({ title: title.trim(), body_markdown: body });
                  setEditing(false);
                } finally {
                  setSaving(false);
                }
              }}
            >
              {saving ? <Loader2 size={14} className="animate-spin" /> : null}
              Save changes
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                setTitle(section.title);
                setBody(section.body_markdown);
                setEditing(false);
              }}
            >
              <X size={14} /> Cancel
            </Button>
          </div>
        </div>
      ) : (
        <KbMarkdown>{section.body_markdown || "_This section is empty. Click Edit to add content._"}</KbMarkdown>
      )}
    </section>
  );
}
