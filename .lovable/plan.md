
## Goal

Replace the current brand-pitch home page with a utility-first system index in the spirit of atlassian.design — the page a supplier or designer lands on and immediately knows what's inside, where to start, and where to download assets.

## What goes away

On `src/routes/index.tsx`:
- The dark scrim hero with brand copy ("N$1,000 Instant Cash, same day.").
- The "Numbers we design around" stats strip.
- The "How this brand behaves" principles band (Trust first / No medical tests / Never hide the fine print / Jargon out).
- The plan-color preview row.

These are brand marketing, not system navigation. The same information already lives in `/marketing` (demo) and `/knowledge-base` (source of truth), so nothing is lost.

## New home page structure

1. **Cover** — minimal, Atlassian-like:
   - Small eyebrow: "Bonlife Design System · v0.1"
   - H1: "The design system for everyone building Bonlife."
   - One-line lead: who it's for (designers, suppliers, agencies, internal teams) and what's inside.
   - Two primary actions: "Get started" (→ Foundations) and "Download assets" (→ Downloads).

2. **Get started strip** — three short cards for the three audiences:
   - Designers → Foundations + Components
   - Suppliers / print & signage → Downloads (logos, colors, fonts)
   - Marketing / social → Social templates + Marketing kit
   Each card is a direct link.

3. **Browse the system** — the main body, an Atlassian-style bento/grid directory of every section, each tile with icon, title, one-line description, and a small "What's inside" list:
   - Foundations — color, type, spacing, motion
   - Components — buttons, cards, plan rows, forms
   - Iconography — 1px Lucide set + category glyphs
   - Social templates — posts, stories, carousels
   - Marketing kit — demo homepage composition
   - Downloads — logos, colors, fonts, photography, gradients
   - Knowledge base — single source of truth for brand facts

4. **What's new** — short changelog list (3–5 entries) pulling from recent system updates (iconography redesign, downloads page, KB with admin, etc.). Static for now; easy to extend later.

5. **Footer** — keep the existing footer but tighten the colophon copy so it reads like a system credit line, not marketing.

## Visual language

- Light surface, generous whitespace, Atlassian-style calm.
- Navy for headings, coral only as a small accent (eyebrow, hover underlines, tile icons).
- Tiles: soft border, subtle hover lift, no gradients, no photography on the home page.
- Type: Onest for headings at restrained sizes (no oversized display), Inter for body.
- No stats, no testimonials, no brand principles — that content belongs in `/knowledge-base` and `/marketing`.

## Files touched

- `src/routes/index.tsx` — full rewrite to the structure above.
- `src/components/bonlife/NavDrawer.tsx` — no change needed; drawer already lists all sections.
- No changes to `/foundations`, `/components`, `/iconography`, `/social`, `/marketing`, `/downloads`, `/knowledge-base`, or any tokens.
- Update `head()` title/description on `index.tsx` to "Bonlife Design System — for designers, suppliers and partners."

## Out of scope

- No changes to brand voice content anywhere else.
- No new backend, no new components library entries — this is a presentation change to one route.
