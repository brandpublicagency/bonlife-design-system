import { useRef, useState } from "react";
import { FileUp, Loader2, Plus, Sparkles, X } from "lucide-react";
import { Button } from "@/components/bonlife/Button";
import { KbMarkdown } from "@/components/bonlife/KbSection";

type Draft = { title: string; body_markdown: string };

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

export function KbUploadPanel({
  onExtract,
  onAdd,
}: {
  onExtract: (input: { filename: string; mimeType: string; base64: string }) => Promise<Draft[]>;
  onAdd: (draft: Draft) => Promise<void>;
}) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filename, setFilename] = useState<string | null>(null);
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const [addingIdx, setAddingIdx] = useState<number | null>(null);

  async function handleFile(file: File) {
    setError(null);
    setDrafts([]);
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
      if (!list.length) setError("No sections could be extracted from this file.");
      setDrafts(list);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Extraction failed.";
      if (/402/.test(msg)) setError("AI credits exhausted. Add credits in workspace settings and try again.");
      else if (/429/.test(msg)) setError("Rate limited. Wait a moment and try again.");
      else setError(msg);
    } finally {
      setBusy(false);
    }
  }

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
            Drop a PDF, Markdown, or text file (up to 20 MB). Lovable AI reads it and proposes
            sections you can add straight into the knowledge base.
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
          <Button
            variant="outline"
            disabled={busy}
            onClick={() => inputRef.current?.click()}
          >
            {busy ? <Loader2 size={14} className="animate-spin" /> : <FileUp size={14} />}
            {busy ? "Extracting…" : "Choose file"}
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

      {drafts.length > 0 && (
        <div className="mt-6">
          <div className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-navy/60">
            <Sparkles size={12} /> Proposed additions ({drafts.length})
          </div>
          <div className="grid gap-3">
            {drafts.map((d, i) => (
              <article
                key={`${d.title}-${i}`}
                className="rounded-xl border border-hairline bg-surface p-4"
              >
                <header className="flex flex-wrap items-start justify-between gap-3 border-b border-hairline pb-3">
                  <h3 className="font-display text-[16px] font-semibold text-navy">
                    {d.title}
                  </h3>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="primary"
                      disabled={addingIdx !== null}
                      onClick={async () => {
                        setAddingIdx(i);
                        try {
                          await onAdd(d);
                          setDrafts((prev) => prev.filter((_, idx) => idx !== i));
                        } finally {
                          setAddingIdx(null);
                        }
                      }}
                    >
                      {addingIdx === i ? (
                        <Loader2 size={12} className="animate-spin" />
                      ) : (
                        <Plus size={12} />
                      )}
                      Add to KB
                    </Button>
                    <button
                      type="button"
                      aria-label="Discard"
                      onClick={() => setDrafts((prev) => prev.filter((_, idx) => idx !== i))}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-hairline text-navy transition hover:bg-surface-tint"
                    >
                      <X size={14} />
                    </button>
                  </div>
                </header>
                <div className="mt-3 max-h-[280px] overflow-y-auto pr-1">
                  <KbMarkdown>{d.body_markdown}</KbMarkdown>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
