## Goal

- Split the KB into a **public read-only view** at `/knowledge-base` and an **admin backend** at `/admin/knowledge-base` (import + edit + reorder + delete + add).
- Add **email/password auth** with a **user_roles / admin** model. First signup becomes admin; admins can invite/promote from the backend.
- Simplify site nav: single **menu icon → slide-out drawer**.
- Replace the KB cover pill row with a **short single-line metadata summary**; keep TOC as a sticky sidebar on the page.

## 1. Auth + roles (Lovable Cloud)

Migration:
- `app_role` enum: `admin`, `user`.
- `public.user_roles(id, user_id → auth.users, role app_role, created_at, unique(user_id, role))` + GRANTs (`authenticated`, `service_role`).
- `has_role(_user_id uuid, _role app_role)` SECURITY DEFINER function.
- RLS on `user_roles`:
  - SELECT: `auth.uid() = user_id OR has_role(auth.uid(),'admin')`.
  - INSERT/DELETE: `has_role(auth.uid(),'admin')` only.
- Trigger `on_auth_user_created` → if `user_roles` is empty, first confirmed user gets `admin`; otherwise no automatic role.
- Tighten `kb_sections` RLS: SELECT stays public (`anon`+`authenticated`); INSERT/UPDATE/DELETE restricted to `has_role(auth.uid(),'admin')`.
- `configure_auth`: email/password, disable email confirmation (so first-user-admin works instantly), enable leaked-password protection.

## 2. Routes

Public (SSR):
- `/knowledge-base` — read-only. Sticky left-sidebar TOC, right column renders markdown sections. Cover replaced with single-line metadata (`{n} sections · updated {relative time}`). No pills, no edit UI, no import panel. If viewer is admin, show a small "Edit in backend" link.
- `/auth` — email/password sign-in + sign-up form. Sign-up allowed (needed for first-user-admin and admin-invited teammates).

Protected (`_authenticated/` layout, integration-managed):
- `/admin/knowledge-base` — full editor: import panel, add section, inline edit, reorder, delete. Also an "Admins" panel listing `user_roles` admins and a form to promote a signed-up user by email (server fn resolves email → user id via `supabaseAdmin`, inserts `user_roles`).
- Guarded by admin check in loader (server fn `requireAdmin`). Non-admin signed-in users see an "Ask an existing admin to promote your account" screen.

## 3. Server functions

`src/lib/kb.functions.ts`:
- `listKbSections` — public, unchanged.
- `createKbSection` / `updateKbSection` / `deleteKbSection` / `reorderKbSection` / `extractKbDraftsFromUpload` — add `.middleware([requireSupabaseAuth])` + admin check via `has_role` RPC; throw on non-admin.

`src/lib/admin.functions.ts` (new):
- `getMyAdminStatus` — returns `{ isAdmin }`.
- `listAdmins` — admin-only, joins `user_roles` + auth email via `supabaseAdmin` (loaded inside handler).
- `promoteUserByEmail({ email })` — admin-only; resolves user, inserts `user_roles`.
- `revokeAdmin({ userId })` — admin-only; guards against removing the last admin.

## 4. Navigation redesign

`SiteChrome.tsx`:
- Header keeps logo + version chip on the left. Right side becomes a single `Menu` icon button that opens a slide-out drawer (shadcn Sheet, right side).
- Drawer lists the existing nav items (Overview, Foundations, Iconography, Components, Social, Marketing Kit, Knowledge Base, Downloads) as large tap targets with active state, plus a divider and an **Admin** section (Sign in / Backend / Sign out) driven by session + `isAdmin`.
- Applies to every page, all viewports (per user answer).

## 5. KB cover + layout

- Replace `PageHeader` `toc` prop usage on `/knowledge-base` with a small metadata line under the lead: `12 sections · updated 3 days ago` (relative time formatted with `Intl.RelativeTimeFormat` computed client-side to avoid SSR/locale mismatch, wrapped in `useHydrated` to prevent hydration errors — also fixes the current `toLocaleString` hydration warning).
- Page body becomes two columns on `lg+`: sticky TOC (section titles as anchor links) on the left, markdown sections on the right. Stacked on mobile with a native `<details>` jump menu.
- Admin backend reuses the same two-column layout but adds the edit controls, import panel, and admin management panel.

## 6. Files

New:
- `supabase/migrations/…_admin_roles_and_kb_lockdown.sql`
- `src/routes/auth.tsx`
- `src/routes/_authenticated/admin.knowledge-base.tsx`
- `src/lib/admin.functions.ts`
- `src/components/bonlife/NavDrawer.tsx`
- `src/components/bonlife/KbTocSidebar.tsx`

Edited:
- `src/routes/knowledge-base.tsx` — strip editing/import; add sidebar TOC + metadata line.
- `src/components/bonlife/SiteChrome.tsx` — drawer nav, drop pill TOC usage from `PageHeader` (or keep prop optional for other pages).
- `src/lib/kb.functions.ts` — admin gate on mutations.
- `src/routes/__root.tsx` — ensure `onAuthStateChange` invalidation is wired (per integration guidance).

Untouched: existing overview, foundations, iconography, components, social, marketing, downloads routes (only their nav rendering changes via `SiteHeader`).

## 7. Verification

- Migration runs; `kb_sections` writes fail for anon (verified via read_query + attempted insert through anon key).
- Sign up first account → becomes admin automatically; second signup has no role and sees the "ask an admin" screen.
- `/knowledge-base` shows content read-only for everyone, no import/edit UI, no pills, sidebar TOC works.
- `/admin/knowledge-base` reachable only when signed in as admin; edit/add/delete/reorder/import all work.
- Drawer nav opens on all pages; active state reflects current route; sign in/out flows update the drawer.
- No hydration warnings on `/knowledge-base`.
