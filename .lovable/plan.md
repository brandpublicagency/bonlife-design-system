## 1. Remove section dividers (all pages)

- `PageSidebar.tsx`, `foundations.tsx`, `components.tsx`, `downloads.tsx`, `iconography.tsx`, `knowledge-base.tsx`, `social.tsx`: drop `border-t border-hairline` on `Section` wrappers and any inter-section hairlines. Keep card borders — remove only the horizontal dividers between sections/boxes the user pointed to.
- Increase vertical rhythm between sections (`py-16` → `py-20`) so the removed dividers don't collapse spacing.

## 2. Sidebar / content alignment

Goal: when a sidebar item is clicked, the sidebar label ("Foundations") and the section eyebrow ("COLOR · PRIMARY") sit on the same baseline as the content top.

- `PageWithSidebar`: change grid to `md:grid-cols-[220px_minmax(0,1fr)]` with `md:gap-16` (more left padding on the body block).
- `PageSidebar`: the desktop sidebar heading currently uses a smaller uppercase style. Match it to the section eyebrow — same font, size (`text-[11px]`), tracking (`0.14em`), color `text-coral`, and place at the same `sticky top-24` offset used by `scroll-mt-24` sections so top-of-viewport aligns.
- Add `pt-0` to the content column and remove any leading `mb-6` on mobile pill strip that pushes the first eyebrow down on desktop.

## 3. COLOR → COLOUR

Replace across guideline copy only (eyebrows, headings, body). Keep CSS tokens (`--color-*`, `text-color`, etc.) unchanged.

Files: `foundations.tsx` (3 eyebrows), `downloads.tsx` (Colours section), `components.tsx`, `index.tsx`, `iconography.tsx`, `knowledge-base.tsx` seeded copy in DB is left alone (single source of truth stays as-is unless user asks).

## 4. Footer improvement

Rewrite `SiteFooter` in `SiteChrome.tsx`:

- Four-column layout: brand + short tagline / System links / Resources (Downloads, Iconography, Knowledge Base) / Contact (SMS 74448, +264 83 337 1730, [info@bonlifenam.com](mailto:info@bonlifenam.com)).
- Add small social row (WhatsApp, Facebook, Instagram, LinkedIn) using Lucide icons.
- Bottom bar: © 2026 Bonlife Assurance Namibia · Version 2.4 · link to /contact.
- Warmer spacing (`py-16`), subtle top hairline only, coral eyebrows kept.

## 5. Drawer navigation redesign

Rework `NavDrawer.tsx` to feel native to the system:

- Replace the plain nav list with a **two-section layout**: eyebrow "Navigate" then grouped items — *System* (Overview, Foundations, Iconography, Components), *Kits* (Social, Marketing, Downloads), *Content* (Knowledge Base, Contact).
- Each item: Lucide icon + label + short helper caption (e.g. "Colour, type, motion"), matching the sidebar tile style used on `/`.
- Active state uses `bg-surface-tint` + coral left border (not solid navy fill), matching PageSidebar.
- Drawer header shows the wordmark + "Design System · v2.4" pill (same as SiteHeader).
- Footer of drawer: SMS 74448 + auth block, restyled.

## 6. Version bump

`SiteHeader` pill: "Design System · v0.1" → "Design System · v2.4". Same string in the drawer header and footer.

## 7. New `/contact` page

New file `src/routes/contact.tsx` using `PageWithSidebar` + `PageSidebar` (matching pattern), sections:

1. **Get in touch** — direct details block (name, role, email, phone) + a contact form (name, email, message) using existing `Input` / `Button` bonlife components. Form is presentational (submits to a `mailto:` for now; no backend added unless requested).
2. **Head office** — address card for Bonlife Assurance Namibia, Windhoek, map placeholder, opening hours.
3. **Direct contact methods** — three cards: WhatsApp / SMS / Call, all pointing to +264 83 337 1730, plus email `info@bonlifenam.com`, plus social links row.
4. **Branches** — grid of 20 Namibian branches (placeholder list with name + town + phone; content can be filled from KB later).
5. **Policy payment partners** — logos/list grid (NamPost, Standard Bank, FNB, Bank Windhoek, Checkers, Shoprite as placeholders — user can correct).

Register in `NavDrawer` under Content, and link from the new footer.

## Technical notes

- No backend changes. Contact form is client-only (mailto) — a real submission endpoint can be added later.
- `routeTree.gen.ts` regenerates automatically when `src/routes/contact.tsx` is added.
- Sidebar alignment fix relies on matching the eyebrow's typographic block exactly; verified in Playwright screenshot after the change.

## Open question

For section 5 (Payment partners) and section 4 (Branches list), do you want me to use placeholder data now and you'll send the real list, or should I pull what's in the Knowledge Base?

## Bonlife Branches (20)


| Branch                 | Telephone          | Address                                          |
| ---------------------- | ------------------ | ------------------------------------------------ |
| Windhoek (Head Office) | +264 61 250 339    | 73 John Meinert Street, Windhoek                 |
| Katutura               | +264 61 250 551    | 6 Kalie Roodt Street, Windhoek                   |
| Goreangab Mall         | +264 83 337 1730   | Dam Beach Street, Katutura, Windhoek             |
| Eenhana                | +264 83 337 1737   | Erf 258, Unit 6, Eenhana                         |
| Gobabis                | +264 83 377 7107   | Church Street, Shop 6, Gobabis                   |
| Karibib                | +264 83 377 7128   | Erf 345, Unit 3, Main Road, Karibib              |
| Keetmanshoop           | +264 83 377 7103   | Erf 835, Hampi Plichta Avenue, Keetmanshoop      |
| Khorixas               | +264 67 332 244    | Erf 4255 Ext.1, Shop 2, Khorixas                 |
| Lüderitz               | +264 83 377 7101   | Erf 280, Bismarck Street, Lüderitz               |
| Mariental              | +264 83 377 7105   | Erf 1117, Dr. Sam Nujoma Ave, Shop 11, Mariental |
| Omuthiya               | +264 83 377 7100   | Erf 450, Shop 3, Omuthiya                        |
| Ondangwa               | +264 83 377 7113   | Main Road, Erf 5780, Shop 7, Ondangwa            |
| Oshakati               | +264 83 377 7115   | Mandume Ndemufayo Rd, Unit 28, Oshakati          |
| Otjiwarongo            | +264 83 377 7109   | Hage Geingob Street, Otjiwarongo                 |
| Outapi                 | +264 83 377 7119   | Tsandi Road R/B 123, Shop No. 2, Outapi          |
| Rehoboth               | +264 83 337 1738/9 | Erf 1240, Church Street, Office 1, Rehoboth      |
| Rundu                  | +264 83 334 1901   | Markus Siwarongo Str, Shop 4, Rundu              |
| Swakopmund             | +264 83 337 1736   | Erf 3289, Grootfontein Street, Swakopmund        |
| Tsumeb                 | +264 83 377 7124   | Erf 1304, Shop 3, Tsumeb                         |
| Walvis Bay             | +264 83 377 7121   | CNR Sam Nujoma Ave and 12th Rd, Walvis Bay       |


## Payment partners: 

- Cash at any Bonlife branch
- Debit Order
- EFT
- NAMPOST
- Woermann & Brock
- Shoprite / Checkers / USave
- Mobipay
- Paytoday
- Model