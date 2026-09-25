import { useRef, useState } from "react";
import { diffLines } from "diff";
import {
  Check,
  FileUp,
  Loader2,
  PenLine,
  Plus,
  Sparkles,
  X,
} from "lucide-react";
import { Button } from "@/components/bonlife/Button";
import { KbMarkdown } from "@/components/bonlife/KbSection";
import { numberedTitle, sectionNumbers } from "@/lib/kb-numbering";

export type KbProposal = {
  action: "update_existing" | "create_new";
  section_id: string | null;
  slug: string | null;
  insert_after_section_id: string | null;
  title: string;
  summary_of_changes: string;
  proposed_body_markdown: string;
  current_body_markdown: string | null;
  current_updated_at: string | null;
};

const ACCEPT = ".pdf,.md,.markdown,.txt,application/pdf,text/plain,text/markdown";
const MAX_BYTES = 20 * 1024 * 1024;

async function fileToBase64(file: File): Promise<string> {
  const buf = await file.arrayBuffer();
  let binary = "";
  const bytes = new Uint8Array(buf);
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode.apply(null, Array.from(bytes.subarray(i, i + chunk)));
  }
  return btoa(binary);
}

function DiffView({ current, proposed }: { current: string; proposed: string }) {
  const parts = diffLines(current, proposed);
  return (
    <div className="max-h-[320px] overflow-y-auto rounded-md border border-hairline bg-surface-tint p-3 font-mono text-[12px] leading-[1.55]">
      {parts.map((part, i) => {
        if (part.added) {
          return (
            <div key={i} className="whitespace-pre-wrap bg-emerald-50 text-emerald-800">
              {part.value}
            </div>
          );
        }
        if (part.removed) {
          return (
            <div key={i} className="whitespace-pre-wrap bg-red-50 text-red-700 line-through">
              {part.value}
            </div>
          );
        }
        return (
          <div key={i} className="whitespace-pre-wrap text-navy/60">
            {part.value}
          </div>
        );
      })}
    </div>
  );
}

export function KbUploadPanel({
  onExtract,
  onApplyUpdate,
  onCreate,
  sections = [],
}: {
  sections?: { id: string; slug: string; title: string }[];
  onExtract: (input: {
    filename: string;
    mimeType: string;
    base64: string;
  }) => Promise<KbProposal[]>;
  onApplyUpdate: (input: {
    id: string;
    title: string;
    body_markdown: string;
  }) => Promise<void>;
  onCreate: (input: {
    title: string;
    body_markdown: string;
    insert_after_id?: string | null;
  }) => Promise<void>;
}) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filename, setFilename] = useState<string | null>(null);
  const [proposals, setProposals] = useState<KbProposal[]>([]);
  const [applyingKey, setApplyingKey] = useState<string | null>(null);
  const [applyingAll, setApplyingAll] = useState(false);

  async function handleFile(file: File) {
    setError(null);
    setProposals([]);
    if (file.size > MAX_BYTES) {
      setError("File is over 20 MB. Please upload a smaller file.");
      return;
    }
    setFilename(file.name);
    setBusy(true);
    try {
      const base64 = await fileToBase64(file);
      const list = await onExtract({
        filename: file.name,
        mimeType: file.type || "application/octet-stream",
        base64,
      });
      if (!list.length) setError("No changes or new sections could be proposed from this file.");
      setProposals(list);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Extraction failed.";
      if (/402/.test(msg))
        setError("AI credits exhausted. Add credits in workspace settings and try again.");
      else if (/429/.test(msg)) setError("Rate limited. Wait a moment and try again.");
      else setError(msg);
    } finally {
      setBusy(false);
    }
  }

  const updates = proposals.filter((p) => p.action === "update_existing");
  const news = proposals.filter((p) => p.action === "create_new");

  async function applyOne(p: KbProposal, key: string) {
    setApplyingKey(key);
    try {
      if (p.action === "update_existing" && p.section_id) {
        await onApplyUpdate({
          id: p.section_id,
          title: p.title,
          body_markdown: p.proposed_body_markdown,
        });
      } else {
        await onCreate({
          title: p.title,
          body_markdown: p.proposed_body_markdown,
          insert_after_id: p.insert_after_section_id,
        });
      }
      setProposals((prev) => prev.filter((x) => x !== p));
    } finally {
      setApplyingKey(null);
    }
  }

  async function applyAll(list: KbProposal[]) {
    setApplyingAll(true);
    try {
      for (const p of list) {
        if (p.action === "update_existing" && p.section_id) {
          await onApplyUpdate({
            id: p.section_id,
            title: p.title,
            body_markdown: p.proposed_body_markdown,
          });
        } else {
          await onCreate({
          title: p.title,
          body_markdown: p.proposed_body_markdown,
          insert_after_id: p.insert_after_section_id,
        });
        }
        setProposals((prev) => prev.filter((x) => x !== p));
      }
    } finally {
      setApplyingAll(false);
    }
  }

  const nums = sectionNumbers(sections);
  const anyBusy = applyingKey !== null || applyingAll;

  return (
    <section
      id="import"
      className="scroll-mt-24 rounded-2xl border border-dashed border-navy/25 bg-surface-tint p-6 sm:p-8"
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-coral">
            Import
          </div>
          <h2 className="mt-1 font-display text-[22px] font-semibold text-navy">
            Add sections from a file
          </h2>
          <p className="mt-2 max-w-xl text-[13.5px] leading-[1.6] text-navy/70">
            Drop a PDF, Markdown, or text file (up to 20 MB). Lovable AI reads the
            whole knowledge base alongside your file, then proposes updates to
            existing sections or brand-new sections - you review each one before
            anything is published.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <input
            ref={inputRef}
            type="file"
            accept={ACCEPT}
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) void handleFile(f);
              e.target.value = "";
            }}
          />
          <Button variant="outline" disabled={busy} onClick={() => inputRef.current?.click()}>
            {busy ? <Loader2 size={14} className="animate-spin" /> : <FileUp size={14} />}
            {busy ? "Reading…" : "Choose file"}
          </Button>
        </div>
      </div>

      {filename ? (
        <div className="mt-4 text-[12.5px] text-navy/70">
          <span className="font-semibold text-navy">File:</span> {filename}
        </div>
      ) : null}
      {error ? (
        <div className="mt-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-[13px] text-red-700">
          {error}
        </div>
      ) : null}

      {proposals.length > 0 && (
        <div className="mt-6 grid gap-6">
          {updates.length > 0 && (
            <div>
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-navy/60">
                  <PenLine size={12} /> Updates to existing sections ({updates.length})
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  disabled={anyBusy}
                  onClick={() => void applyAll(updates)}
                >
                  {applyingAll ? (
                    <Loader2 size={12} className="animate-spin" />
                  ) : (
                    <Check size={12} />
                  )}
                  Apply all updates
                </Button>
              </div>
              <div className="grid gap-3">
                {updates.map((p, i) => {
                  const key = `u-${p.section_id ?? i}`;
                  return (
                    <article key={key} className="rounded-xl border border-hairline bg-surface p-4">
                      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-hairline pb-3">
                        <div className="min-w-0">
                          <h3 className="font-display text-[16px] font-semibold text-navy">
                            {p.title}
                          </h3>
                          <p className="mt-1 text-[12.5px] leading-[1.5] text-navy/60">
                            {p.summary_of_changes}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="primary"
                            disabled={anyBusy}
                            onClick={() => void applyOne(p, key)}
                          >
                            {applyingKey === key ? (
                              <Loader2 size={12} className="animate-spin" />
                            ) : (
                              <Check size={12} />
                            )}
                            Apply update
                          </Button>
                          <button
                            type="button"
                            aria-label="Discard"
                            onClick={() => setProposals((prev) => prev.filter((x) => x !== p))}
                            className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-hairline text-navy transition hover:bg-surface-tint"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      </header>
                      <div className="mt-3">
                        <DiffView
                          current={p.current_body_markdown ?? ""}
                          proposed={p.proposed_body_markdown}
                        />
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          )}

          {news.length > 0 && (
            <div>
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-navy/60">
                  <Sparkles size={12} /> New proposed sections ({news.length})
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  disabled={anyBusy}
                  onClick={() => void applyAll(news)}
                >
                  {applyingAll ? (
                    <Loader2 size={12} className="animate-spin" />
                  ) : (
                    <Check size={12} />
                  )}
                  Add all
                </Button>
              </div>
              <div className="grid gap-3">
                {news.map((p, i) => {
                  const key = `n-${i}`;
                  return (
                    <article key={key} className="rounded-xl border border-hairline bg-surface p-4">
                      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-hairline pb-3">
                        <div className="min-w-0">
                          <h3 className="font-display text-[16px] font-semibold text-navy">
                            {p.title}
                          </h3>
                          <p className="mt-1 text-[12.5px] leading-[1.5] text-navy/60">
                            {p.summary_of_changes}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="primary"
                            disabled={anyBusy}
                            onClick={() => void applyOne(p, key)}
                          >
                            {applyingKey === key ? (
                              <Loader2 size={12} className="animate-spin" />
                            ) : (
                              <Plus size={12} />
                            )}
                            Add section
                          </Button>
                          <button
                            type="button"
                            aria-label="Discard"
                            onClick={() => setProposals((prev) => prev.filter((x) => x !== p))}
                            className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-hairline text-navy transition hover:bg-surface-tint"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      </header>
                      <label className="mt-3 flex flex-wrap items-center gap-2 text-[12px] font-semibold text-navy/70">
                        Position
                        <select
                          value={p.insert_after_section_id ?? ""}
                          onChange={(e) => {
                            const v = e.target.value || null;
                            setProposals((prev) =>
                              prev.map((x) => (x === p ? { ...x, insert_after_section_id: v } : x)),
                            );
                          }}
                          className="rounded-md border border-hairline bg-surface-tint px-2 py-1 text-[12.5px] font-normal text-navy"
                        >
                          <option value="">At the end</option>
                          {sections.map((s, si) => (
                            <option key={s.id} value={s.id}>
                              After {numberedTitle(s.title, nums[si])}
                            </option>
                          ))}
                        </select>
                      </label>
                      <div className="mt-3 max-h-[280px] overflow-y-auto pr-1">
                        <KbMarkdown>{p.proposed_body_markdown}</KbMarkdown>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
