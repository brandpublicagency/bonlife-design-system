Add a new "Benefits" category to the Bonlife icon library covering both value-added benefits (Onyama MeatFeast, Grocery, Tombstone, Casket, Veggie, Transportation) and key benefits (No medical tests, Premium waiver, Fast claims, Full family cover, Instant cash, Accidental death cover).

## What changes
- **`src/lib/bonlife-icons.ts`** — add two new groups so downloads and previews are consistent with the rest of the library:
  - `value-added` — "Value-added benefits": Onyama MeatFeast (Utensils), Grocery Benefit (ShoppingCart), Tombstone (Mountain), Casket (Package), Veggie Benefit (Carrot), Transportation (Car). Category icon: `Gift`.
  - `key-benefits` — "Key benefits": No medical tests (Stethoscope with a slash — use `HeartOff` or `ClipboardX`), Premium waiver (`ShieldOff` or `PauseCircle`), Fast claims 48h (`Timer`), Full family cover (`Users2`), Instant cash / E-Wallet (`Smartphone` + rand — use `Wallet` variant or `Zap`), Accidental death cover (`CarFront` or `AlertTriangle`). Category icon: `Sparkles`.
- Chosen Lucide glyphs (finalized):
  - Value-added: `Utensils`, `ShoppingCart`, `Mountain`, `Package`, `Carrot`, `Car`
  - Key benefits: `Stethoscope` (no medical tests), `ShieldOff` (premium waiver), `Timer` (fast claims), `Users2` (full family), `Zap` (instant cash), `CarFront` (accidental death)
  - Category icons: `Gift` (value-added), `Sparkles` (key benefits)
- The `/iconography` page auto-renders new groups from `ICON_GROUPS`, including per-icon and per-category SVG download and the TOC entry — no changes needed to `iconography.tsx`.

## Files touched
- `src/lib/bonlife-icons.ts` only.

## Verification
- `/iconography` shows two new sections with correct titles, leads, category icons, and all listed benefit icons.
- Per-icon and per-category downloads work.
- Typecheck passes.
