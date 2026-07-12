Reorder the Key benefits icon group by importance, add "20 Branches across Namibia", de-emphasize the 48-hour framing on the overview (index) page, and commit the uploaded knowledge base for future reference.

## 1. Icon library — `src/lib/bonlife-icons.ts`
Reorder the `key-benefits` group and add a Branches icon (reuse existing `MapPin`, no new import needed):

1. No medical tests — `Stethoscope`
2. Instant cash benefit — `Zap`
3. Optional premium waiver — `ShieldOff`
4. 20 Branches across Namibia — `MapPin` (name: `branches-namibia`)
5. Full family cover — `Users2`
6. Accidental death cover — `CarFront`
7. Fast claims — `Timer` (moved to last, kept in the set)

Update the group `lead` so it no longer opens on "fast claims / 48 hours" — reframe around "no medical tests, instant cash, family cover and a national branch network."

## 2. Overview page — `src/routes/index.tsx`
Replace every "48 hours" mention on the overview page with something else. Specifically:

- Hero paragraph (line 62): change "and pays claims within 48 hours." → "…and shows up in person through 20 branches across Namibia."
- Stats strip (line 95): replace `{ k: "48h", v: "Claim payout" }` with `{ k: "No", v: "Medical tests" }`, so the four stats become **No / Medical tests · N$1,000 / Instant Cash · 20 / Namibian branches · 4 / Plan categories**.
- Principles card (line 196–199): replace the "Speed is respect / Approved claims paid within 48 hours" card with a "No medical tests" card (Icon: `Stethoscope`, body: "A short questionnaire, no health examinations — cover is accessible to every Namibian, regardless of medical history.").

Leave `foundations.tsx`, `marketing.tsx`, `components.tsx`, `social.tsx`, and `SocialTemplates.tsx` alone — the user scoped this to the overview page.

## 3. Save the knowledge base
- Create `src/content/bonlife-knowledge-base.md` with the exact contents of the uploaded file (copy from `/mnt/user-uploads/The_Bonlife_Knowledge_Base_2026.md`). Not imported anywhere — it's a reference source for future pages and agents.

## Files touched
- `src/lib/bonlife-icons.ts`
- `src/routes/index.tsx`
- `src/content/bonlife-knowledge-base.md` (new)

## Verification
- `/iconography` Key benefits section shows the seven icons in the new order with "20 Branches across Namibia" in slot 4.
- `/` (overview) contains no "48 hour" / "48h" strings; stats strip and principles read as above.
- Typecheck passes.
