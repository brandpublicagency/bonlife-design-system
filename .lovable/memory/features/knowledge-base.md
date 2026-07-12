---
name: Knowledge Base
description: Public read-only KB at /knowledge-base + admin-only backend at /admin/knowledge-base gated by user_roles=admin
type: feature
---
The Bonlife Knowledge Base is split:
- `/knowledge-base` — fully public, read-only. Sticky sidebar TOC + markdown sections. No edit/import UI. RLS: SELECT open to anon+authenticated.
- `/admin/knowledge-base` — admin-only editor under `_authenticated/`. Add/edit/delete/reorder sections, import from PDF/MD/TXT via Lovable AI Gateway, manage admins (promote by email / revoke). RLS on kb_sections restricts INSERT/UPDATE/DELETE to `has_role(auth.uid(),'admin')`.

Auth: email/password only, auto-confirm on. The first signup automatically becomes admin (trigger `grant_first_user_admin` on `auth.users`). Additional admins are invited by an existing admin from the backend (`promoteUserByEmail` resolves email→user via supabaseAdmin).

Roles table: `public.user_roles(user_id, role app_role)` with `has_role(user_id, role)` SECURITY DEFINER helper. Never store roles on profiles.

Nav: single Menu icon → slide-out Sheet drawer on every page (`NavDrawer.tsx`). Drawer shows the admin section (Sign in / Backend link if admin / Sign out) driven by `useSession` + `getMyAdminStatus`.
