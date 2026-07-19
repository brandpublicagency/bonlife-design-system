## Goals

Fix the three concrete issues on `/iconography`:
1. The Download banner sits flush against the page header and its left edge doesn't align with the rest of the page grid.
2. In dark mode, body text inside the Download and Preview-surface bars is unreadable (dark text on dark surface).
3. The wrapping TOC pills below the page header look messy.

Replace the pills with a sticky sidebar and tighten the content column.

## Layout

Two-column layout inside a single `max-w-[1200px]` container so left edges align:

```text
+--------------------------------------------------------+
| SiteHeader                                             |
+--------------------------------------------------------+
| PageHeader (eyebrow, title, lead)  — no TOC pills      |
+--------------------------------------------------------+
| [ Sidebar (sticky)      ] [ Content column           ] |
| - Category nav           - Utility bar (download +    |
|   (anchor links, active   preview toggle, unified)    |
|   state via IntersectionObserver)                     |
|                          - Group sections             |
+--------------------------------------------------------+
| SiteFooter                                             |
```

- Sidebar: ~240px, sticky at `top-24`, hidden below `md`. Lists all 8 groups with active-state highlight and a small category icon.
- On mobile: sidebar collapses into a single horizontal scroll strip above the content (no wrapping).

## Fixes to the header/download seam

- Add a spacer (`pt-10`) between `PageHeader` and the utility bar so it no longer touches the header.
- Merge the current "Download the full icon set" banner and the "Preview surface" toggle into a **single utility bar** at the top of the content column, aligned to the same grid as the group cards.
- Utility bar always uses light surface tokens (`bg-surface`, `text-navy`, `text-muted-foreground`) regardless of the preview toggle — the toggle only affects the group cards below, not the chrome. This fixes the dark-mode unreadable text.

## Group sections

- Keep grouped structure but tighten:
  - Remove the outer wrapping `<section>` extra vertical padding (`py-12 sm:py-14` → `py-8`).
  - Reduce category-header icon chip from `h-14 w-14` to `h-11 w-11`.
  - Title from 28/32px to 22/24px; single-line lead beside it.
  - Grid remains 2/3/4 cols; unchanged tile component.
- Add `id` anchors kept as-is so sidebar links continue to scroll-jump.

## Files

- `src/routes/iconography.tsx` — rewrite layout, drop TOC prop from `PageHeader`, add sidebar + unified utility bar, tighten `GroupHeader`.
- `src/components/bonlife/SiteChrome.tsx` — only if `PageHeader` requires the `toc` prop; make it optional (no visual change to other pages).

No changes to `ICON_GROUPS`, `IconTile`, or download logic.

## Out of scope

- Icon set contents, stroke rules, download behavior, other pages.
