
## Goal

Apply the iconography-style sticky sidebar to every content page that currently uses either header pills or an older sidebar/TOC, so navigation is consistent across the system.

## Pages in scope

Replace/upgrade the section nav on:

- `/foundations` — currently header pills (`toc` on `PageHeader`)
- `/components` — has an older left TOC (grouped, no active state, no mobile version)
- `/downloads` — no side nav today; sections exist and warrant one
- `/knowledge-base` — has a sticky TOC that predates the icon pattern
- `/social` — no side nav today; sections exist and warrant one

Out of scope:

- `/iconography` — already the reference.
- `/marketing` — a single demo homepage, no sectioned nav.
- `/` (home) — no sections.
- `/auth` and `/admin/*` — utility, no sections.

## The pattern (shared component)

Extract the iconography pattern into `src/components/bonlife/PageSidebar.tsx` so every page consumes the same layout:

- **Mobile**: horizontal scrollable pill strip above the content, active pill navy-filled.
- **Desktop (`md+`)**: 220px sticky column, top-24, with an uppercase "Sections" (or per-page label) header and vertical rounded rows. Each row shows an optional Lucide icon (1px stroke, size 16), the section label, and a right-aligned two-digit index. Active row: `border-hairline bg-surface-tint text-navy`; inactive: `text-navy/60 hover:bg-surface-tint hover:text-navy`.
- **Active tracking**: IntersectionObserver with `rootMargin: "-120px 0px -60% 0px"` (same as iconography) picks the topmost visible section id.
- **Grouped variant**: accepts either a flat `items` list or a `groups` list (label + items) so `/components` keeps its Core / Layout / Forms / Product / Navigation / Overlay grouping.

API sketch:

```
type Item = { id: string; label: string; icon?: LucideIcon };
type Props =
  | { label?: string; items: Item[]; groups?: never }
  | { label?: string; groups: { label: string; items: Item[] }[]; items?: never };
```

The component owns the observer, active state, and both mobile+desktop rendering. Pages just supply the section metadata and wrap their content in the same `grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-10` layout.

Iconography itself keeps its inline implementation for now (no refactor needed for this request) — the shared component matches its markup so it's a drop-in.

## Per-page changes

### /foundations
- Drop the `toc={TOC}` prop on `PageHeader` (removes the header pills).
- Wrap the existing `Section` list in the sidebar layout. Reuse `TOC` for the sidebar items; the ids already exist on the sections.

### /components
- Delete the current `aside` markup.
- Feed `GROUPS` straight into `PageSidebar` via its `groups` prop.

### /downloads
- Build the items array from the existing section ids: `design-system`, `logos`, `fonts`, `colours`, `icons`, `photography`, `gradients`.
- Wrap the `<main>` content in the sidebar layout.

### /knowledge-base
- Replace the current TOC aside with `PageSidebar`. Sections are already generated from `kb_sections.slug`. Public read-only page — no behavioural change beyond the nav styling.

### /social
- Add ids for existing sections (`feed`, `carousel`, `story`, `portrait`, `link`, `usage`) to the sidebar items list and wrap in the layout.

## Files touched

- New: `src/components/bonlife/PageSidebar.tsx`
- Edit: `src/routes/foundations.tsx`, `src/routes/components.tsx`, `src/routes/downloads.tsx`, `src/routes/knowledge-base.tsx`, `src/routes/social.tsx`
- Edit: `src/components/bonlife/SiteChrome.tsx` — no functional change needed; `PageHeader`'s `toc` prop stays supported but goes unused on foundations.

No token, backend, or content changes. This is a nav-presentation refactor.
