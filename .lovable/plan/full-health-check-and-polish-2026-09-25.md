# Full health check and polish

The site currently builds cleanly with no recorded errors. This plan checks every page and feature end to end, fixes anything broken, and makes safe improvements. No content or design direction changes.

## 1. Check every page works
- Open each page (Home, Foundations, Components, Iconography, Marketing, Social, Downloads, Contact, Knowledge Base, Sign in, Admin Knowledge Base) at desktop (1280px), your laptop size (1107px) and mobile (390px).
- Look for: errors, broken images, text cut off, sideways scrolling, broken links, sidebar jumping to the wrong section.

## 2. Check key features
- Copy colour, SVG icon downloads, logo and font downloads, Google Drive / Adobe XD links.
- Menu drawer opens, closes, highlights the current page.
- Knowledge Base: section Copy / Download / Copy link, full PDF and .md downloads, nested Plans numbering.
- Admin: sign-in, editing a section, reordering, import (upload + paste) reaching Bonlife AI.

## 3. Security and backend
- Run the security scan and database checks; fix real issues only (the open Knowledge Base access stays as intended).

## 4. Optimise and improve
- Speed: lazy-load large photos, confirm the PDF tool only loads when downloading, trim unused packages.
- Page titles and share descriptions: make sure each page has its own.
- Accessibility: labels on icon-only buttons, readable contrast, keyboard use of the drawer.
- Consistency sweep for standing rules: no em dashes, "Colour" spelling, category names, no 48-hour messaging, "Bonlife AI" wording.

## 5. Report
- Short list of what was found, what was fixed, and anything that needs your input (e.g. full plan details still empty).

## Technical details
- Playwright scripts under /tmp/browser; section ids use `[id="..."]` selectors.
- Security scanner + database linter; `rg` sweeps for `—`, `Color`, `48`, `Lovable AI`.
- Head metadata audit across all routes; check `loading="lazy"` on imagery and dynamic import of `kb-pdf`.
