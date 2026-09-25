# Refine the full Knowledge Base PDF

## Goal
Make the plain, unbranded PDF more compact, readable, and structurally faithful to the Knowledge Base markdown. Keep the current no-cover-page format and start every Knowledge Base section on a new page.

## Changes

1. **Tighten the typography**
   - Reduce the base body, heading, contents, table, code, and page-number sizes throughout.
   - Keep a clear hierarchy between the document title, numbered section titles, subheadings, and body text.
   - Use a restrained readable line height suitable for chatbot reference documents.

2. **Improve headings and emphasis**
   - Render markdown headings at distinct sizes with consistent space before and after them.
   - Preserve bold markdown in paragraphs, lists, and tables so important focuses remain visibly bold.
   - Keep heading text with the first lines beneath it where possible to avoid stranded headings.

3. **Fix numbering, bullets, and line breaks**
   - Keep the Introduction unnumbered and number all following sections from their actual Knowledge Base order.
   - Preserve ordered-list numbering, including each list's starting number.
   - Use clean round bullets for unordered lists instead of hyphens.
   - Preserve explicit markdown line breaks and paragraph boundaries.
   - Improve nested list indentation and spacing so list levels are easy to follow.

4. **Improve page spacing and flow**
   - Reduce page margins slightly to use the page more efficiently without making it cramped.
   - Apply consistent paragraph, list, heading, quote, table, and divider spacing.
   - Prevent list items, table rows, and short content groups from splitting awkwardly where possible.
   - Keep page numbering subtle and consistent.

5. **Verify the exported document**
   - Download the full live Knowledge Base PDF.
   - Render every PDF page to images and inspect section numbering, bullets, bold text, line breaks, page starts, clipping, and whitespace.
   - Correct any visible formatting issues, then repeat the visual check on affected pages.

## Technical details
- Update only the browser-side PDF renderer in `src/lib/kb-pdf.tsx`; the live Knowledge Base content and Markdown download remain unchanged.
- Continue using the existing automatic numbering helper and markdown parser.
- Keep the document monochrome, selectable, searchable, and free of logos or decorative branding.
