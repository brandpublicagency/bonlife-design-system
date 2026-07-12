
# Category headers + iconography UI polish

Two changes to `/iconography`.

## 1 · Category-level icons

Each category group gets its own header icon that sits next to the group title, so the page reads as a hierarchy (category → plans) instead of a flat list of tiles.

Category → icon mapping (all Lucide, 1px):

- Funeral cover → `Flower2` (soft botanical, matches memorial tone without leaning morbid)
- Life insurance → `HeartPulse`
- Savings & education plans → `Wallet`
- Accident & disability cover → `ShieldAlert`
- Customer actions → `MousePointer2`
- Contact & support → `Headphones`
- Social → `AtSign`
- Shared utility → `LayoutGrid`

Data model change in `src/lib/bonlife-icons.ts`: add optional `Icon: LucideIcon` and short `caption` to each `IconGroup`. Existing plan/utility tiles are untouched.

If any of the four product-category icons feel off (especially Funeral — Flower2 vs. an alternative like `Sprout` or `Sun`), flag before build and I'll swap. The mapping is easy to change; the layout work is what takes real time.

## 2 · Layout & alignment improvements

Current issues visible on the page:
- Group title, eyebrow and lead sit in a narrow left column while the tile grid stretches full width — the eye has no anchor line between the two.
- Tile grid jumps between 2 / 3 / 4 / 6 columns depending on breakpoint, so tile size shifts unpredictably; the LifeGuard-only group leaves a huge empty rail.
- Download button appears on hover only, which reads as "missing" on first scan.
- Preview surface toggle sits in a floating strip disconnected from the groups below.

Fixes:

**Section header layout** — Two-column header on `md+`: left column holds the new category icon in a rounded tile (48px, matches `PlanCard`'s icon treatment) + eyebrow + title; right column holds the lead copy aligned to the baseline of the title. Stacks to single column on mobile. Adds a thin bottom border under the header before the tile grid so the grouping is visually contained.

**Consistent tile sizing** — Grid becomes `grid-cols-2 sm:grid-cols-3 md:grid-cols-4` (drop the 6-col breakpoint). Tile aspect ratio locked to a square via `aspect-square`, so single-icon groups (LifeGuard) still render at a natural size instead of stretching. Icon size stays 44px.

**Tile refinements**
- Icon centred vertically in the top ~60% of the tile, label anchored to a fixed bottom band so labels align across the row regardless of icon shape.
- Persistent lightweight download affordance: replace the hover-only floating button with a subtle bottom-right chevron download glyph that's always visible at 40% opacity and goes to 100% on hover/focus. Keeps the tile clean but stops "hidden download" complaints.
- Focus ring on the whole tile (keyboard users currently can't tell where the download button is until it becomes visible).

**Page rhythm**
- Section vertical padding trimmed from `py-16 sm:py-20` to `py-12 sm:py-14` — the tile card already provides its own breathing room, so the outer padding was doubling up.
- Preview toggle moves into a sticky-ish strip directly under the `PageHeader`, styled as a `Badge`-adjacent chip cluster (matches the TOC chip style at the top).
- Group container gets `rounded-3xl` and a subtle inset border on light mode (`ring-1 ring-hairline`) so the tile-wrapper feels intentional on white surface, not just a background swatch.

**Usage footer**
- Moved into a two-column card that pairs the `strokeWidth={1}` rule with a live example (a couple of icons rendered at 1px vs 2px) so the rule reads at a glance.

## Files touched

- `src/lib/bonlife-icons.ts` — add `Icon` + `caption` to `IconGroup`; import 8 new Lucide glyphs.
- `src/routes/iconography.tsx` — new `GroupHeader` sub-component, restructured section layout, tile grid breakpoint change, updated usage footer.
- `src/components/bonlife/IconTile.tsx` — persistent download affordance + focus ring; label alignment tweak.

## Out of scope

- No changes to `/downloads`, `/foundations` or `SiteChrome`.
- No new tokens in `src/styles.css`.
- No new dependencies.

## Verification

- Each of the 8 groups shows its category icon in the header.
- Tile columns stay consistent (2/3/4) across breakpoints; single-icon Accident group renders one square tile flush-left, not stretched.
- Download button is visible without hover; keyboard focus lands on the tile before the download control.
- `bunx tsgo --noEmit` passes.
