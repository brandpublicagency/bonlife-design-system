Ship a fully-public, cloud-backed Knowledge Base page at `/knowledge-base` that is the single source of truth for Bonlife content. Anyone with the link can read, edit, add, reorder, and delete sections, and can upload PDF / MD / TXT files to have Lovable AI extract structured section drafts for one-click insertion.

## 1. Backend (Lovable Cloud)

Enable Lovable Cloud, then a single migration creates:

- `public.kb_sections`
  - `id uuid pk default gen_random_uuid()`
  - `slug text unique not null` (used for TOC anchors)
  - `title text not null`
  - `body_markdown text not null default ''`
  - `order_index int not null default 0`
  - `created_at timestamptz default now()`, `updated_at timestamptz default now()`
- Trigger: `updated_at` on update.
- GRANTs: `SELECT, INSERT, UPDATE, DELETE` to `anon` and `authenticated`; `ALL` to `service_role`.
- RLS enabled with permissive policies for `anon` + `authenticated` on all four verbs (matches "fully public"). Include a memory note that these open policies are intentional.
- Seed: split `src/content/bonlife-knowledge-base.md` on top-level `##` headings and insert one row per section in original order.

## 2. Page: `src/routes/knowledge-base.tsx`

- Route added to the site header nav.
- Head metadata: "Knowledge Base — Bonlife", clear description.
- Two-column layout on desktop (sticky TOC left, content right); stacked on mobile with a jump-menu.
- Data via TanStack Query (`useSuspenseQuery` in component, `ensureQueryData` in loader — public read through server publishable client so SSR works).
- Rendering: `react-markdown` + `remark-gfm` (add deps) styled to match the Bonlife type scale.
- TOC: generated from `title`/`slug` of every section, ordered by `order_index`; smooth-scroll to `#slug`.
- Per-section controls (inline, no auth gate): Edit (opens textarea + live preview), Save, Cancel, Delete (confirm dialog), Move up, Move down.
- Top-right "Add section" button opens a form (title + markdown body) → inserts at end.
- All writes go through server functions (list below).

## 3. Upload & extraction

- Panel at the top of the page: "Import from file" — drag/drop or file input, accepts `.pdf`, `.md`, `.markdown`, `.txt`. 20 MB cap.
- Server function `extractKbDraftsFromUpload` receives `{ filename, mimeType, base64 }`:
  - For text/markdown: decode and pass as text.
  - For PDF: forward as a `file` content block to Lovable AI Gateway (`google/gemini-2.5-flash`) with the real MIME type.
  - Prompt returns an array of `{ title, body_markdown }` chunks aligned with the Bonlife voice; no schema bounds, limits described in prompt, clamped in code, `NoObjectGeneratedError` guarded with fallback text parse.
- Response rendered as a "Proposed additions" list: each card shows title + markdown preview + `Add to KB` / `Discard`. `Add` calls `createKbSection`.
- Errors (429 rate-limit, 402 credits, 400 unsupported) surfaced in the panel.

## 4. Server functions (`src/lib/kb.functions.ts`)

Client-safe module; all handlers use `createServerFn`. All are unauthenticated (public writes) — noted with a comment tying the decision to the memory rule.

- `listKbSections` (GET) — server publishable client, ordered by `order_index`.
- `createKbSection` (POST) — `{ title, body_markdown }` → slugified `slug`, appended at max(order_index)+1.
- `updateKbSection` (POST) — `{ id, title?, body_markdown? }`.
- `deleteKbSection` (POST) — `{ id }`.
- `reorderKbSection` (POST) — `{ id, direction: 'up' | 'down' }` swaps `order_index` with neighbour.
- `extractKbDraftsFromUpload` (POST) — described above; returns `{ drafts: [{ title, body_markdown }] }`.

AI helper `src/lib/ai-gateway.server.ts` created per the Gateway knowledge (`createLovableAiGatewayProvider`, no structured-output flag — Gemini).

## 5. Dependencies

- `bun add react-markdown remark-gfm ai @ai-sdk/openai-compatible zod`
- No PDF parsing library (Gemini handles PDFs natively via file content blocks).

## 6. Memory

- `mem://features/knowledge-base` — "Public /knowledge-base is the SSOT. Fully public read/write/delete; open RLS on `kb_sections` is intentional. Seeded from `src/content/bonlife-knowledge-base.md` on first migration; the markdown file is now a historical seed only — future edits happen through the page."
- `mem://index.md` — add pointer + Core note.

## 7. Files touched

- `src/routes/knowledge-base.tsx` (new)
- `src/lib/kb.functions.ts` (new)
- `src/lib/ai-gateway.server.ts` (new)
- `src/components/bonlife/SiteChrome.tsx` (add nav link)
- `src/components/bonlife/KbSection.tsx`, `KbEditor.tsx`, `KbUploadPanel.tsx` (new)
- Supabase migration (new)
- `package.json` (deps)
- `mem://index.md`, `mem://features/knowledge-base` (new)

## 8. Verification

- Cloud enabled; migration runs; table + seed rows present.
- `/knowledge-base` renders every section from the seed with TOC anchors working.
- Inline edit → save persists (refresh confirms).
- Add / delete / reorder work.
- Upload a small PDF and a `.md` file — drafts appear; Add inserts a new section.
- Typecheck passes; overview page and existing routes unchanged.
