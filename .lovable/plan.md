## Goal

Turn the uploaded `Bonlife_Design_System.zip` into a live TanStack Start design-system site inside this project: brand tokens applied globally, fonts loaded, assets available, and a browsable showcase of foundations, components, and the marketing-site UI kit.

## What ships

**1. Foundations wired into the app**
- Load Onest + Inter via `<link>` in `src/routes/__root.tsx` (Tailwind v4 rule — no CSS `@import` of remote URLs).
- Rewrite `src/styles.css` to embed Bonlife color, typography, spacing, radius, shadow, and motion tokens (converted to oklch where needed), then map them into shadcn's semantic tokens via `@theme inline`:
  - `--primary` → navy `#0C1C3E`, `--accent`/CTA → coral `#FF876A`
  - `--background` → surface tint, `--card` → white, `--muted` → `#EAEDF4`
  - `--border` → `#E1E4E9`, `--destructive` → `#FF5F5F`
  - Category colors as `--color-funeral / life / savings / accident` (custom theme tokens → `bg-funeral`, etc.)
  - Radius scale to `--radius-*`; friendly 20px default.
- Default body font Inter, headings Onest with the exact tracking/weight scale from `tokens/typography.css`.

**2. Assets**
- Copy `assets/logos/*`, `assets/gradients/*`, `assets/photography/*` from the zip into `src/assets/bonlife/` so they can be imported normally.

**3. Component library (React + Tailwind, using our tokens)**
Rebuild the 17 components from the zip (`.jsx` are references) as typed TSX in `src/components/bonlife/`:
- core: `Button`, `IconButton`, `Icon` (lucide-react wrapper)
- forms: `Input`, `Select`, `Checkbox`, `Radio`, `Switch`
- data-display: `Badge`, `Card`, `PlanCard`, `PlanRow`
- navigation: `Tabs`, `Accordion`
- overlay: `Dialog`, `Toast`, `Tooltip` (thin wrappers around existing shadcn primitives, restyled with Bonlife tokens; add `sonner` for Toast if not present)

**4. Showcase routes**
File-based routes under `src/routes/`, each with proper `head()` metadata:
- `/` — Bonlife DS landing: brand intro, quick nav to sections, hero using a gradient asset.
- `/foundations` — colors (primary, category, semantic, surfaces), typography scale, spacing, radius/shadow, motion, logos, gradients, photography.
- `/components` — live examples of every component above with variants and code-adjacent labels.
- `/marketing` — the `ui_kits/marketing-site` demo rebuilt as a TanStack route: header, hero, four category cards (Funeral / Life / Accident / Savings), plan lists per category using `PlanRow`, footer. Copy comes verbatim from the knowledge base rules in `readme.md` (48-hour claims, "SMS your name to 74448", `N$` currency, no em dashes, "cover benefit" wording, "lump sum" only for OneLife).
- Replace the current placeholder `src/routes/index.tsx`.

**5. Metadata & polish**
- Real `head()` per route: title like "Bonlife Design System — Foundations", matching descriptions, og/twitter tags. No `Lovable App` defaults.
- Root shell keeps `<Outlet />`, error/not-found boundaries retained.

## Out of scope
- No backend, auth, or Lovable Cloud — this is a static, presentation-only build.
- No recreation of the live bonlifenam.com beyond the demo marketing page in the kit.
- No new photography or logo generation — only the assets provided in the zip are used.

## Technical notes
- Fonts: `<link rel="preconnect">` + Google Fonts `Onest:wght@500..800` and `Inter:wght@300..600` in root head.
- Category colors registered in `@theme inline` so `bg-funeral text-funeral-foreground` utilities work.
- `oklch(from ...)` derived ramps from `tokens/colors.css` preserved.
- Icons: install `lucide-react` if not present.
- Toasts: install `sonner` if not present.
