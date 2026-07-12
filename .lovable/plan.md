
# Iconography section

Add an "Iconography" section to `/foundations` and a matching "Icons" block on `/downloads`, using Lucide (`lucide-react` — already in the stack) with 1px strokes, draw-in animation on scroll, and per-icon SVG download. No new deps.

## Proposed icon set — REVIEW BEFORE BUILD

Grouped to match Bonlife's real product terminology (from the marketing kit, plan cards, category tokens):

**Product categories** (mirrors the four category identifiers already tokenised — Funeral, Life, Savings, Accident)
- Funeral cover → `HeartHandshake`
- Life cover → `ShieldCheck`
- Savings plan → `PiggyBank`
- Accident cover → `Ambulance`
- Family plan → `Users`
- Retirement / senior → `Sunrise`

**Customer actions / flows**
- Get a quote → `FileText`
- Claim → `ClipboardCheck`
- Pay premium → `CreditCard`
- Beneficiary → `UserPlus`
- Branch locator → `MapPin`
- Callback (SMS 74448) → `MessageSquare`

**Shared utility**
- Contact / phone → `Phone`
- Email → `Mail`
- Search → `Search`
- Download → `Download`
- Chevron / navigation → `ChevronRight`
- Confirmation → `Check`

If any label is off-brand (e.g. Bonlife may use "Funeral plan" vs "Funeral cover", or a different word for "Accident"), flag it in the review — labels are trivial to swap, but the icon-to-concept mapping is what needs sign-off.

## Route & nav

- New `src/routes/iconography.tsx` for the full gallery, added to `SiteHeader` nav after "Foundations".
- The section will also appear inline on `/foundations` as an anchor block (`#icons` added to its TOC) with a short summary + link to the full `/iconography` page — matches how Logos/Gradients/Photography behave today.
- A compact "Icons" section added to `/downloads` between Logos and Colours with per-icon download buttons.

## Component: `IconTile`

Lives in `src/components/bonlife/IconTile.tsx`. Renders one Lucide icon inside a card that reuses `Card` (`variant="outline"`, `hoverable`) so the hover-lift matches every other card in the system — no second lift pattern.

- `strokeWidth={1}` on the Lucide component (overrides default 2).
- Stroke colour = `currentColor`; tile sets `text-navy` in light mode, `text-white` on any dark surface (dark hero bands already use `text-white`, so `currentColor` handles both without a second colour variable).
- Label under the icon: display name + optional caption.
- Download button (icon-only, reuses `IconButton` `variant="ghost"` with `Download` icon) that serialises the rendered SVG to a Blob and triggers a `<a download>` click.

### Draw-in animation

Per-icon `IntersectionObserver` (threshold 0.4, `once: true`). On intersect:

```
svg path, svg line, svg circle, svg polyline, svg rect {
  stroke-dasharray: var(--len);
  stroke-dashoffset: var(--len);
  transition: stroke-dashoffset 600ms cubic-bezier(0.16, 1, 0.3, 1);
}
.drawn * { stroke-dashoffset: 0; }
```

`--len` is computed once on mount by iterating SVG children and calling `getTotalLength()` per path; the resulting length is set as a CSS var on each child. Falls back gracefully for children without `getTotalLength` (rects/circles get their computed perimeter). Icons above the fold animate on mount instead of waiting for scroll.

Respects `prefers-reduced-motion: reduce` — skips the transition, renders fully drawn immediately.

## Download approach

**Per-icon download only. No zip, no new dependency.**

- Rationale: keeps the bundle clean (no JSZip), matches the "download SVG / copy path" pattern already used by the Logos section on `/downloads`, and users typically want one or two icons at a time. The full curated set is small enough that per-icon clicks are acceptable.
- Implementation: read the mounted `<svg>` node, clone it, ensure `xmlns` + `stroke-width="1"` are set on the root, `new Blob([serialized], { type: "image/svg+xml" })`, `URL.createObjectURL`, temp `<a download="bonlife-<slug>.svg">`, revoke URL.
- Copy-SVG button (secondary) that writes the same serialised string to the clipboard using the existing `copyText` helper from `downloads.tsx` (lifted into `src/lib/copyText.ts` so both routes share it).

## Dark mode handling

The design system doesn't ship a global dark-mode toggle, but several sections render on the navy hero (`bg-navy text-white`). Icons in those contexts pick up `text-white` automatically via `currentColor`, so 1px strokes stay visible.

For the `/iconography` gallery we'll add a small preview toggle (light / dark) that flips the tile background between `bg-surface-tint` and `bg-navy` so reviewers can confirm contrast. Stroke stays 1px in both — no separate weight for dark mode, but we note in copy that 1px is the design intent and readers on retina displays are the acceptance bar.

## Verification

- `/iconography` renders all groups; each icon draws in on scroll; hover lifts match other cards; light/dark toggle shows both surfaces.
- Download button on any icon saves `bonlife-<name>.svg` containing `stroke-width="1"` and no fills.
- Nav highlights "Iconography" when active.
- `bunx tsgo --noEmit` passes.

## Open questions before I build

1. Is the icon-to-category mapping above right for Bonlife's actual product names? (Funeral cover, Life cover, Savings plan, Accident cover, Family plan, Retirement — any renames?)
2. Any additional flows I've missed (e.g. group scheme, funeral pre-arrangement, corporate)?
3. Confirm per-icon download (no zip) is fine — happy to swap to JSZip if you want a "Download all" button, but that adds a dep.
