# Knowledge Base: auto-numbering, smart placement, full download

## 1. Numbered, re-organised sections

Today the section numbers are typed by hand into the titles ("1. Who and what Bonlife is"). The newest section, "Bonlife 90: Online Quotes and Applications", has no number and sits at the very end.

What changes:
- Numbers are no longer typed into titles. The site adds them automatically from each section's position, so the page, the sidebar menu, the "Section N" labels and the downloads always match.
- A one-time clean-up removes the typed numbers from the current titles. "Introduction" stays first and has no number.
- Opus now suggests **where** each new section should go ("after section 3 - Products and services") instead of always adding it at the end. The review card shows the suggested position, and you can change it before adding.
- When a new section is added, every section after it moves down one place and is renumbered. The menu updates straight away.
- Moving sections up or down in the editor also renumbers everything automatically.
- Links to sections keep working after renumbering, because a section's link name no longer includes its number.

Existing section numbers stay the same: 1-8 as today, and Bonlife 90 becomes section 9 unless Opus or you place it somewhere else.

## 2. Download the full Knowledge Base

Two new buttons at the top of the public Knowledge Base page: **Download PDF** and **Download .md**.

- **PDF**: Bonlife-branded cover page (wordmark, title, version 2.4, date), a contents page, and each section starting on a new page with its number and title. Onest headings, Inter body text, navy and coral styling, tables and lists formatted, page numbers in the footer.
- **.md**: one file with a title, a contents list and every numbered section in order.
- Both are built from the live content, so they're always up to date.

## Technical details

- Display number = position among sections, skipping `introduction`. Helper `sectionNumber(sections, i)` used in `knowledge-base.tsx`, the `PageSidebar` items, the admin editor and the exports.
- Migration: strip the `^\d+\.\s*` prefix from `kb_sections.title`. Slugs stay as they are (so existing links still work). New slugs are generated from the unnumbered title.
- `ProposalSchema` adds `insert_after_section_id: string | null` for `create_new` (prompt: choose the logical position; numbers are automatic, never put numbers in titles). The server checks that id against real sections.
- `createKbSection` accepts an optional `insert_after_id`; a new server function shifts `order_index` by +1 for the following rows, then inserts. The KbUploadPanel card gets a "Position" select with the proposed position already chosen.
- PDF built in the browser with `@react-pdf/renderer` (lazy-loaded when you click the button, with the Onest/Inter fonts registered), turning Markdown into its blocks via the existing markdown parser tree. `.md` built as a Blob like the per-section download.
- Files are named `bonlife-knowledge-base-YYYY-MM-DD.pdf` / `.md`.
