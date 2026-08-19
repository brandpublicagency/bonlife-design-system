---
description: "Brand assets shipped by the Bonlife Design System design system (logos, icons, illustrations, photography, fonts, videos) with exact import paths. Read before adding any logo, icon, illustration, image, video, or font to the app: use these real assets instead of placeholders, stock photos, or generated images."
---

# Bonlife Design System — Assets

These files are copied into `src/design-system/{slug}/assets/` in this project — never generate, placeholder, or substitute an asset that exists here.

Raw files import directly, e.g. `import logo from "@/design-system/{slug}/assets/logos/logo.svg"`.
R2 pointer files (`.asset.json`) are imported as JSON — use the `url` property, e.g. `import hero from "@/design-system/{slug}/assets/hero.png.asset.json"` then `<img src={hero.url} />`.
The full machine-readable catalog lives in this library's `design-system.json` (`assets` array).

## Images

- `@/design-system/{slug}/assets/bonlife/gradients/gradient-01.jpg.asset.json` (jpg, R2 pointer)
- `@/design-system/{slug}/assets/bonlife/gradients/gradient-02.jpg.asset.json` (jpg, R2 pointer)
- `@/design-system/{slug}/assets/bonlife/gradients/gradient-03.jpg.asset.json` (jpg, R2 pointer)
- `@/design-system/{slug}/assets/bonlife/gradients/gradient-04.png.asset.json` (png, R2 pointer)
- `@/design-system/{slug}/assets/bonlife/logos/bonlife-mark-coral.svg.asset.json` (svg, R2 pointer)
- `@/design-system/{slug}/assets/bonlife/logos/bonlife-mark-mint.svg.asset.json` (svg, R2 pointer)
- `@/design-system/{slug}/assets/bonlife/logos/bonlife-mark-navy.svg.asset.json` (svg, R2 pointer)
- `@/design-system/{slug}/assets/bonlife/logos/bonlife-mark-white.svg.asset.json` (svg, R2 pointer)
- `@/design-system/{slug}/assets/bonlife/logos/bonlife-wordmark-dark.svg` (svg)
- `@/design-system/{slug}/assets/bonlife/logos/bonlife-wordmark-light.svg` (svg)
- `@/design-system/{slug}/assets/bonlife/photography/celebration-fistpump.jpg.asset.json` (jpg, R2 pointer)
- `@/design-system/{slug}/assets/bonlife/photography/couple-sofa.jpg.asset.json` (jpg, R2 pointer)
- `@/design-system/{slug}/assets/bonlife/photography/family-full-length.jpg.asset.json` (jpg, R2 pointer)
- `@/design-system/{slug}/assets/bonlife/photography/family-studio.jpg.asset.json` (jpg, R2 pointer)
- `@/design-system/{slug}/assets/bonlife/photography/father-daughter-laughing.jpg.asset.json` (jpg, R2 pointer)
- `@/design-system/{slug}/assets/bonlife/photography/father-daughter.jpg.asset.json` (jpg, R2 pointer)
- `@/design-system/{slug}/assets/bonlife/photography/mother-child.jpg.asset.json` (jpg, R2 pointer)
- `@/design-system/{slug}/assets/bonlife/photography/senior-couple-beach.jpg.asset.json` (jpg, R2 pointer)
- `@/design-system/{slug}/assets/bonlife/photography/senior-couple-selfie.jpg.asset.json` (jpg, R2 pointer)
- `@/design-system/{slug}/assets/bonlife/photography/senior-woman-portrait.jpg.asset.json` (jpg, R2 pointer)

