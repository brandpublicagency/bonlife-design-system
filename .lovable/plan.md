## Goal

Remove every "48-hour claims" heading, CTA, box, and template across the design-system pages and swap in two real Bonlife benefits from the knowledge base:

- **N$1,000 Instant Cash** — paid the same day a funeral claim is approved.
- **No medicals, easy sign-up** — enroll without medical exams.

The knowledge base seed file (`src/content/bonlife-knowledge-base.md`) and the live KB in the database stay untouched — they remain the source of truth for real Bonlife facts.

## Files to change

### `src/routes/marketing.tsx`
- Hero H1 (line 93): `Claims paid within 48 hours.` → `N$1,000 Instant Cash, same day.`
- Benefits grid (line 173): the `48-hour claims` card → `Instant Cash` card with `Clock4` swapped for `Wallet` (or `Banknote`), body: "N$1,000 paid the same day a funeral claim is approved. Money in hand when it matters."
- If a second benefit slot in the same section still reads generically, add a `No medicals` card (icon `HeartPulse` or `ShieldCheck`) with body: "Sign up without medical exams. Cover starts fast, paperwork stays light."

### `src/routes/components.tsx`
- Card body (line 262): "Approved claims are paid within 48 hours..." → "N$1,000 Instant Cash paid the same day a funeral claim is approved."
- Accordion Q&A (line 283): rewrite the "How do I claim?" answer to drop the 48-hour phrasing: "SMS your name to 74448 or walk into any of our 20 branches. Approved funeral claims get N$1,000 Instant Cash the same day."
- Tooltip + Button (line 318): tooltip → "N$1,000 Instant Cash on the day a funeral claim is approved"; button label → `Instant Cash`. Add a sibling example demonstrating the `No medicals` benefit as a second `Tooltip`/`Button` pair so the design-system page shows both new benefits in use.

### `src/routes/foundations.tsx`
- H1 typography sample (line 178): `Claims paid within 48 hours.` → `N$1,000 Instant Cash, same day.` (keeps the same character-length feel for the type spec).

### `src/routes/social.tsx`
- Lead paragraph (line 75): drop "48-hour promise"; replace with "Every template honours the Instant Cash promise, the 74448 SMS line, and the four category colours."
- Rename the imported template `Template48HourClaim` → `TemplateInstantCash` (update the import on line 4, the JSX usage on line 95, and the entry in `SOCIAL_TEMPLATES` on line 643 / `id: "claim"`).

### `src/components/bonlife/SocialTemplates.tsx`
- Rename `Template48HourClaim` → `TemplateInstantCash` and update the section-header comment (line 26) to `1 · INSTANT CASH PROMISE — hero editorial (square)`.
- Inside that template:
  - Badge/pill "Paid in 48hrs" (line 172) → `Same-day cash`.
  - Body copy (line 208 area) rewrite to remove "Two days later" — replace with a same-day narrative: "They called me back the same afternoon. By evening the N$1,000 Instant Cash was in my account, and my family could breathe."
- Second template footer copy (line 619): "48-hour cover benefit, guaranteed." → "No medicals. Cover starts fast, guaranteed."

## Out of scope (intentionally untouched)

- `src/content/bonlife-knowledge-base.md`
- Live KB rows in the database (`/knowledge-base` and `/admin/knowledge-base`)
- Any auth, routing, or backend logic

## Verification

- `rg -i "48[- ]?hour|48h|two days|two-day" src/routes src/components` returns zero matches.
- Preview `/marketing`, `/components`, `/foundations`, `/social` — hero, benefits grid, tooltip demo, typography sample, and social template all show the new Instant Cash / No-medicals messaging with no layout regressions.
- Build passes (no unused-import warnings from the renamed social template).
