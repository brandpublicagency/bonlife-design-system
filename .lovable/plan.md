# Fix Knowledge Base layout and spacing

## Problem

On the public Knowledge Base page, section content (screenshot: Products and services, Senior/Legacy Plan) runs past the right edge of the screen and is cut off mid-word. Spacing inside the section cards also feels loose and uneven.

## Steps

1. **Diagnose the overflow in the live preview**
   - Open `/knowledge-base` in the browser and measure `document.documentElement.scrollWidth` vs the window width.
   - Walk the DOM to find the element(s) wider than the viewport (likely suspects: the section card, a long unbroken link/line in the Markdown, or the sidebar grid column).
   - The grid already uses `minmax(0,1fr)` + `min-w-0`, so the diagnosis step confirms what actually overflows before changing CSS.

2. **Fix the overflow at the source** in `src/routes/knowledge-base.tsx` / `src/components/bonlife/KbSection.tsx` / `PageSidebar.tsx`:
   - Add `break-words` (and `overflow-wrap: anywhere` on links) to the Markdown paragraph/list/link renderers so long text wraps instead of pushing the card wide.
   - Ensure the section card and content column can shrink (`min-w-0` on the card, `overflow-x: clip` guard on the page body if a stray element is responsible).

3. **Tighten card spacing and typography** (per the screenshot):
   - Reduce the heading sizes slightly (`32/36px` -> `28/32px`) and the `my-8` divider gap to `my-6`.
   - Even out rhythm: consistent `mt-4` paragraphs, `mt-6` before "Key benefits" lists, tighter bullet spacing.
   - Keep the eyebrow ("Section 3") aligned with the heading as on other pages.

4. **Verify** in the browser at desktop and mobile widths: no horizontal scrollbar, no clipped text, sections render cleanly.

## Technical details

- Files touched: `src/routes/knowledge-base.tsx`, `src/components/bonlife/KbSection.tsx` (Markdown component classNames), possibly `src/components/bonlife/PageSidebar.tsx`.
- No content or database changes; presentation only.
- Same wrap guards apply to the admin editor preview since it shares `KbMarkdown`.
