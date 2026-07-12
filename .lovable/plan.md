Add a prominent Adobe XD Developer link to the Downloads page so the design system source files are easy to find.

## Proposed approach
- Create a new section near the top of the Downloads page, placed before the Logos section so it reads as the primary source of truth.
- Reuse the existing card style from the Drive sections (rounded-2xl, border, bg-surface, grid layout on md+) for visual consistency.
- Left side: short heading/eyebrow, one-line description of what the XD link contains, and the external link button styled as a primary-ish button matching the existing "Open folder" buttons.
- Right side: a small thumbnail/preview treatment. Since we cannot embed a live XD preview, use a simple branded placeholder tile or icon mark within the same card grid pattern.
- Link opens in a new tab with `target="_blank" rel="noopener noreferrer"` and uses the provided URL: https://xd.adobe.com/view/47817079-994c-4681-9f8b-78fea6abfd3a-12d2/grid
- Add a new entry to the page TOC so in-page navigation is consistent with the other sections.

## Files touched
- `src/routes/downloads.tsx` only.

## Verification
- The new section appears on /downloads, matches the existing card layout, and the link opens the correct Adobe XD URL.
- TOC includes the new section anchor.
- Typecheck passes.