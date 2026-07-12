
# Downloads page

Add `/downloads` — a single hub for anyone who needs to grab brand assets. Logos download inline, colours copy-to-clipboard, photography and gradients link out to Google Drive.

## Route & nav

- New file `src/routes/downloads.tsx` with route-specific `head()` (title, description, og:*).
- Add "Downloads" to the primary nav in `src/components/bonlife/SiteChrome.tsx`, positioned after "Marketing Kit".

## Page structure

`PageHeader` (matching the pattern used on `/social` and `/foundations`) with a TOC linking to the four sections below.

### 1 · Logos

Card grid (2-col on md, 3-col on lg) covering all six SVGs in `src/assets/bonlife/logos/`:

- Wordmark — Dark (on dark) · `bonlife-wordmark-light.svg`
- Wordmark — Light (on light) · `bonlife-wordmark-dark.svg`
- Mark — Coral · `bonlife-mark-coral.svg`
- Mark — Navy · `bonlife-mark-navy.svg`
- Mark — Mint · `bonlife-mark-mint.svg`
- Mark — White · `bonlife-mark-white.svg`

Each card:
- Preview area with an appropriate background (navy for the "on dark" variants, surface-tint for the "on light" variants, coral for the mint mark to give it contrast).
- Filename + short caption ("Primary wordmark for dark backgrounds", etc.).
- Two buttons: **Download SVG** (anchor with `download` attribute pointing at the imported asset URL) and **Copy path** (writes the CDN/asset URL to clipboard).
- The SVGs are already committed as source files under `src/assets/bonlife/logos/`, so Vite's `?url` import produces a stable public URL that the browser can download directly. No extra tooling needed.

### 2 · Colours

Grouped swatch grid, click-to-copy hex. Groupings:

- **Brand** — Navy 900 `#0C1C3E`, Coral 500 `#FF876A`, Mint 400 `#01FBC0`.
- **Category** — Funeral `#04413F`, Life `#541467`, Savings `#0D2B90`, Accident `#A80A4D`.
- **State** — Error `#FF5F5F`, Success `#41FFB6`.
- **Surface & text** — Surface white `#FFFFFF`, Surface tint `#F7F8FB`, Surface muted `#EAEDF4`, Border hairline `#E1E4E9`, Gray 600 `#5B6472`.

Each swatch tile is a `<button>`:
- Large colour block using the raw hex (inline `style={{ background }}`, since the file lists literal hex — no token drift).
- Below the block: name, hex, and the CSS variable (e.g. `--coral-500`).
- On click: `navigator.clipboard.writeText(hex)` and flip the tile label to "Copied ✓" for ~1.4s via local state.
- Keyboard-accessible (native button, `aria-live="polite"` on the confirmation text).
- Right-click / long-press hint via `title="Click to copy hex"`.

Small `SwatchTile` component defined inside `downloads.tsx` (or `src/components/bonlife/SwatchTile.tsx` if it grows) with props `{ name, hex, token, textOn: "light" | "dark" }` to pick a legible label colour over each swatch.

### 3 · Photography

No files served from the page. Single hero card with:
- Short blurb explaining that photography lives in the shared Drive because it's high-res and licensed per campaign.
- Big primary button "Open photography folder" → the provided Drive URL (`target="_blank"`, `rel="noopener noreferrer"`).
- Small strip of 3-4 thumbnail previews from the existing `src/assets/bonlife/photography/*.jpg.asset.json` files so the section still reads visually.

### 4 · Gradients

Same pattern as Photography:
- Blurb: "Gradients ship as layered PSDs and hi-res JPGs — grab them from Drive."
- "Open gradients folder" button pointing to the same Drive URL (the folder holds both).
- Preview strip using `src/assets/bonlife/gradients/*.jpg.asset.json` (4 tiles).

## Interaction details

- Clipboard writes use `navigator.clipboard.writeText` with a `try/catch` fallback that selects a hidden textarea for older browsers.
- Toast-free: inline confirmation on each swatch/logo card keeps the page self-contained; no dependency on the Toast primitive.
- All external links (Drive) get `target="_blank"` + `rel="noopener noreferrer"`.

## Out of scope

- No new asset uploads, no Drive API integration, no zip-bundle downloader.
- No route-level auth (assets are public brand material).
- No changes to the token values in `src/styles.css` — the Downloads page reads the same hex values the design system already publishes.

## Verification

After building, open `/downloads` in the preview and confirm:
- every logo card downloads its SVG when clicked;
- swatch tiles copy their hex (verify via a Playwright script reading `navigator.clipboard`);
- both Drive buttons open the provided folder in a new tab;
- nav highlights "Downloads" when active.
