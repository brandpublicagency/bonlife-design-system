The Downloads page currently mixes three different visual treatments: grid cards (logos, fonts, colours), large two-column promo cards (Adobe XD, icons, photography, gradients), and different button styles. This makes the page feel uneven for suppliers and designers.

Plan: introduce a shared `DownloadCard` component and apply one container style across every section.

Changes:

1. Create a reusable `DownloadCard` component
   - White surface (`bg-surface`), rounded-2xl, `border-hairline`.
   - Consistent internal padding and spacing.
   - Optional header (title + description), optional preview area (image/thumbnail/grid), and a standardized action bar at the bottom.
   - Action bar supports one primary action (navy pill) and one secondary action (outline pill).
   - Meta line (e.g. "Google Drive · shared folder", "SVG · 12 KB") in small monospace text.

2. Refactor each section to use the same card pattern
   - Adobe XD: single `DownloadCard` with preview image.
   - Logos: keep the grid of six logo cards, but restyle each card to match the new `DownloadCard` shell (white surface, rounded-2xl, hairline border, navy Download + outline Copy URL actions).
   - Fonts: convert the two font cards to `DownloadCard`s with external-link actions.
   - Colours: wrap the swatch groups in a single `DownloadCard`, or keep the colourful swatches as clickable tiles inside a consistent white container. Keep the click-to-copy hex behaviour.
   - Icons: single `DownloadCard` linking to the icon Drive folder, with an icon preview.
   - Photography: single `DownloadCard` with the 4 thumbnail previews and Drive link.
   - Gradients: single `DownloadCard` with the 4 gradient thumbnails and Drive link.

3. Standardize button hierarchy
   - Primary action: navy pill (`bg-navy text-white`). Used for downloads, copy actions, and file downloads.
   - Secondary action: outline pill (`border-hairline text-navy`). Used for copy URL, copy hex, alternate formats.
   - External link action: coral pill (`bg-coral text-navy`). Used for Google Fonts, Google Drive, Adobe XD links.
   - Remove mixed button styles so every section reads the same.

4. Section container consistency
   - Every `PageSection` on Downloads renders either a single `DownloadCard` or a grid of `DownloadCard`s.
   - No section uses a custom one-off wrapper.

5. Responsive behaviour
   - Cards stack cleanly on mobile.
   - Thumbnail grids inside cards stay 2×2 or 4-column depending on density.
   - Action buttons remain reachable and readable at small sizes.

6. Technical notes
   - No new dependencies.
   - No backend or database changes.
   - Only `src/routes/downloads.tsx` and a new `src/components/bonlife/DownloadCard.tsx` are modified/created.
   - Existing assets and copy stay the same.

After this change, the page will read as one coherent directory of downloadable assets rather than a collection of different UI patterns.