Goal: when any sidebar item is active/scrolled-to, the small coral eyebrow (e.g. `02 • Fonts`) sits on the same baseline as the sidebar page label (`Downloads`), and the big heading below it has a slightly larger gap.

Current state observed
- The Downloads section header is pushed 64px below the top of its `section` because `Section` uses `py-12 sm:py-16` on the wrapper.
- The sticky sidebar label sits at `top-24` (96px from viewport), so the section eyebrow ends up ~64px lower than the label.
- Each page with a sidebar repeats its own `Section` / `Spec` / `article` header, so the offset is inconsistent.

What we will build
1. A shared `PageSection` component in `src/components/bonlife/PageSection.tsx` that every sidebar page uses.
   - Outer `<section id>` is `scroll-mt-24 pt-0 pb-12 sm:pb-16` (no top padding, so the eyebrow is flush with the section top).
   - Header block contains the eyebrow at the very top, the title below with `mt-3` (increased from the current `mt-2`), and an optional lead with `mt-3`.
   - Body wrapper adds `pt-10 sm:pt-12` after the heading, so content stays visually separated from the heading without pushing the eyebrow down.
   - Supports an optional `headerAction` slot for counts/badges (needed on the Components page).
2. Keep `PageSidebar` sticky top at `top-24` and keep the page label at the top of the sticky container with no extra top offset.

Per-page changes
- `src/routes/downloads.tsx` — replace the local `Section` with `PageSection`.
- `src/routes/foundations.tsx` — replace the local `Section` with `PageSection`.
- `src/routes/social.tsx` — replace the local `Section` with `PageSection`.
- `src/routes/contact.tsx` — replace the local `Section` with `PageSection`.
- `src/routes/components.tsx` — refactor `Spec` into `PageSection` (no eyebrow, title + count as `headerAction`). The existing dotted preview box becomes the body content.
- `src/routes/iconography.tsx` — move the group header out of the rounded card so the eyebrow is flush with the sidebar label; the dark/light icon grid card becomes the body.
- `src/routes/knowledge-base.tsx` — remove the top padding from each `<article>` so the `#slug` eyebrow and title align with the label, and move the article body padding to the content area below the header.

Verification
- After the change, scroll to any section on any sidebar page and check that the eyebrow’s top edge matches the sidebar label’s top edge within a few pixels.
- Run `bunx tsc --noEmit` to confirm no type errors from the refactor.

Open question: I will use `mt-3` (12px) between the eyebrow and the heading. If you want a bigger gap (e.g. 16px), let me know and I will update it.