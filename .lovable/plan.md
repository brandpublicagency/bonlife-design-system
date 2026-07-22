## What's missing on `/contact`

Current `PARTNERS` list (contact.tsx L75-85) has: Cash at branch, Debit order, EFT, NamPost, Woermann & Brock, "Shoprite / Checkers / USave" (bundled), MobiPay, PayToday, Model.

Missing vs. your list: **Airtime City**, and the retailers should be **split into separate cards** (Checkers, Shoprite, USave). Also missing the note that Bonlife 90 now supports **card payments**.

## Changes

### 1. `src/routes/contact.tsx` - Payment partners section

- Rewrite `PARTNERS` into two logical groups shown on the page:
  - **Payment methods**: Debit Order, Cash, EFT, Card (via Bonlife 90 - new).
  - **Where to pay**: NamPost, MobiPay, PayToday, USave, Checkers, Shoprite, Model, Airtime City, Woermann & Brock.
- Update section lead to mention "now including card payments on Bonlife 90".
- Render as two subgroups (small eyebrow "Methods" / "Where to pay") using the same card grid.

### 2. Partner card icon restyle (L346-352)

Replace the current `bg-coral/10` chip with:
- Default: `border border-coral bg-transparent text-coral`
- Hover (card-level `group` hover): `bg-coral border-coral text-white`
- Icon stays `Handshake` at 1.5 stroke.

Add `group` to the card wrapper and `transition-colors` to the icon chip so hover on the whole card triggers the swap.

### 3. Knowledge Base update

The KB lives in the `kb_sections` DB table (public source of truth). I'll update the "Buy / pay" content in the relevant section via a SQL update so the change appears immediately on `/knowledge-base`:

- Find the section that currently contains the "Payment is by debit order or cash..." sentence (currently in the "Customer journey / Buy" area).
- Replace the payment sentence with:
  > **Payment methods:** Debit Order, Cash, EFT, and now by card on Bonlife 90.
  > **Where to pay:** NamPost, MobiPay, PayToday, USave, Checkers, Shoprite, Model, Airtime City, Woermann & Brock.
- Also update the earlier "Accessibility" bullet (L44 of the seed) equivalent in the DB to include Airtime City and card-on-Bonlife-90.

I will not touch `src/content/bonlife-knowledge-base.md` (historical seed only, per project memory).

## Technical notes

- Icon color swap uses Tailwind `group-hover:` classes only - no JS state.
- KB update runs as a single `UPDATE kb_sections SET body_markdown = ... WHERE slug = ...` after I read the current row to confirm the exact section and preserve surrounding markdown.
- No schema changes, no new components.
