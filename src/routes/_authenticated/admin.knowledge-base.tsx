import { createFileRoute, Link } from "@tanstack/react-router";
import { queryOptions, useMutation, useQueryClient, useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";
import { ArrowLeft, Loader2, Plus, ShieldOff, Trash2, UserPlus, X } from "lucide-react";
import { SiteFooter, SiteHeader } from "@/components/bonlife/SiteChrome";
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
import {
  getMyAdminStatus,
  listAdmins,
  promoteUserByEmail,
  revokeAdmin,
} from "@/lib/admin.functions";

const kbSectionsQuery = queryOptions({
  queryKey: ["kb", "sections"],
  queryFn: async () => {
    const { sections } = await listKbSections();
    return sections as KbSectionRow[];
  },
});

export const Route = createFileRoute("/_authenticated/admin/knowledge-base")({
  head: () => ({
    meta: [
      { title: "KB Backend — Bonlife" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminKbPage,
});

function AdminKbPage() {
  const qc = useQueryClient();
  const adminStatus = useQuery({
    queryKey: ["me", "isAdmin"],
    queryFn: () => getMyAdminStatus(),
  });

  if (adminStatus.isLoading) {
    return (
      <>
        <SiteHeader />
        <div className="flex min-h-[60vh] items-center justify-center">
          <Loader2 className="animate-spin text-navy/60" size={20} />
        </div>
      </>
    );
  }

  if (!adminStatus.data?.isAdmin) {
    return (
      <>
        <SiteHeader />
        <main className="mx-auto max-w-[560px] px-6 py-24 text-center">
          <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-coral">
            Restricted
          </div>
          <h1 className="mt-3 font-display text-[32px] font-semibold text-navy">
            You're signed in — but not an admin yet
          </h1>
          <p className="mt-4 text-[15px] leading-[1.6] text-navy/70">
            Ask an existing admin to promote your account. They can do it from
            this page under <span className="font-semibold">Admins</span>.
          </p>
          <div className="mt-8">
            <Link
              to="/knowledge-base"
              className="inline-flex items-center gap-2 rounded-full bg-navy px-5 py-2.5 font-display text-[13px] font-semibold text-white hover:bg-navy-700"
            >
              <ArrowLeft size={14} /> Back to the Knowledge Base
            </Link>
          </div>
        </main>
        <SiteFooter />
      </>
    );
  }

  return <AdminEditor qc={qc} />;
}

function AdminEditor({ qc }: { qc: ReturnType<typeof useQueryClient> }) {
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

  return (
    <>
      <SiteHeader />

      <section className="border-b border-hairline bg-surface">
        <div className="mx-auto max-w-[1200px] px-6 py-14 sm:px-8">
          <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-coral">
            Backend · Admin only
          </div>
          <h1 className="mt-3 font-display text-[40px] font-semibold leading-[1.05] text-navy sm:text-[52px]">
            Knowledge Base editor
          </h1>
          <p className="mt-4 max-w-2xl text-[15px] leading-[1.6] text-navy/70">
            Add, edit, reorder, and delete sections. Import content from PDF,
            Markdown, or text files. Everything you publish here appears on the
            public <Link to="/knowledge-base" className="text-coral underline underline-offset-2">Knowledge Base</Link> page.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <Button variant="primary" onClick={() => setAdding(true)}>
              <Plus size={14} /> New section
            </Button>
            <Link
              to="/knowledge-base"
              className="inline-flex items-center gap-2 rounded-full border border-hairline bg-surface-tint px-5 py-2.5 font-display text-[13px] font-semibold text-navy hover:bg-surface"
            >
              View public page
            </Link>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-6 py-12 sm:px-8">
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

          <AdminsPanel />
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

function AdminsPanel() {
  const qc = useQueryClient();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const admins = useQuery({
    queryKey: ["admins"],
    queryFn: () => listAdmins(),
  });

  const promote = useMutation({
    mutationFn: (em: string) => promoteUserByEmail({ data: { email: em } }),
    onSuccess: (res) => {
      setEmail("");
      setSuccess(`Promoted ${res.email} to admin.`);
      setError(null);
      qc.invalidateQueries({ queryKey: ["admins"] });
    },
    onError: (e) => {
      setError(e instanceof Error ? e.message : "Failed to promote user");
      setSuccess(null);
    },
  });

  const revoke = useMutation({
    mutationFn: (userId: string) => revokeAdmin({ data: { userId } }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admins"] }),
    onError: (e) => setError(e instanceof Error ? e.message : "Failed to revoke"),
  });

  return (
    <section className="rounded-2xl border border-hairline bg-surface-tint p-6 sm:p-8">
      <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-coral">
        Admins
      </div>
      <h2 className="mt-1 font-display text-[22px] font-semibold text-navy">
        Manage who can edit the knowledge base
      </h2>
      <p className="mt-2 max-w-xl text-[13.5px] leading-[1.6] text-navy/70">
        To add a new admin, ask them to sign up at <Link to="/auth" className="text-coral underline">/auth</Link> first,
        then enter their email below.
      </p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (email.trim()) promote.mutate(email.trim());
        }}
        className="mt-5 flex flex-wrap items-end gap-2"
      >
        <label className="flex-1 min-w-[240px]">
          <span className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-navy/60">
            Email
          </span>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="teammate@bonlifenam.com"
            className="mt-1.5 w-full rounded-md border border-hairline bg-surface px-3 py-2 text-[14px] text-navy focus:border-navy focus:outline-none"
          />
        </label>
        <Button type="submit" variant="primary" disabled={promote.isPending}>
          {promote.isPending ? <Loader2 size={14} className="animate-spin" /> : <UserPlus size={14} />}
          Promote to admin
        </Button>
      </form>

      {error ? (
        <div className="mt-3 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-[13px] text-red-700">
          {error}
        </div>
      ) : null}
      {success ? (
        <div className="mt-3 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-[13px] text-emerald-800">
          {success}
        </div>
      ) : null}

      <div className="mt-6">
        <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-navy/50">
          Current admins {admins.data ? `(${admins.data.admins.length})` : ""}
        </div>
        {admins.isLoading ? (
          <div className="text-[13px] text-navy/60"><Loader2 size={12} className="mr-1 inline animate-spin" /> Loading…</div>
        ) : (
          <ul className="grid gap-2">
            {admins.data?.admins.map((a) => (
              <li
                key={a.user_id}
                className="flex items-center justify-between rounded-lg border border-hairline bg-surface px-4 py-2.5 text-[13.5px]"
              >
                <span className="text-navy">{a.email ?? a.user_id}</span>
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm(`Revoke admin from ${a.email ?? a.user_id}?`)) {
                      revoke.mutate(a.user_id);
                    }
                  }}
                  disabled={revoke.isPending}
                  className="inline-flex items-center gap-1 rounded-md border border-hairline px-2.5 py-1 text-[12px] font-semibold text-navy/70 hover:border-red-300 hover:text-red-700 disabled:opacity-40"
                >
                  <ShieldOff size={12} /> Revoke
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

// Keep this import used to avoid warning on optional Trash2 (used above in KbSection).
void Trash2;
