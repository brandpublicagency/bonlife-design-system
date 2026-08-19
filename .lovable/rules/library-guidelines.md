# Bonlife Design System — Guidelines

## Components

The design system exports these components — import them from `@ws-pkww2p8xqxnopjvtkdh8/9d449797-2b4f-4c19-83b8-3d1678b3bc78` and compose them before building anything from scratch:

`Accordion`, `Badge`, `BonlifeToaster`, `Button`, `Card`, `Checkbox`, `Constants`, `Dialog`, `DownloadCard`, `IconButton`, `IconTile`, `Input`, `KbMarkdown`, `KbSection`, `KbUploadPanel`, `NavDrawer`, `PageHeader`, `PageSection`, `PageSidebar`, `PageWithSidebar`, `PlanCard`, `PlanRow`, `Radio`, `Select`, `SheetClose`, `SheetContent`, `SheetDescription`, `SheetFooter`, `SheetHeader`, `SheetOverlay`, `SheetPortal`, `SheetTitle`, `SheetTrigger`, `Sheet`, `SiteFooter`, `SiteHeader`, `SocialCarousel`, `SocialFrame`, `SocialLockup`, `SocialMark`, `SocialPageIndicator`, `Switch`, `TabsContent`, `TabsList`, `TabsTrigger`, `Tabs`, `TemplateBranchEvent`, `TemplateFuneralCover`, `TemplateHowItWorksCarousel`, `TemplateInstantCash`, `TemplateLifeCover`, `TemplateOneLifeStory`, `TemplatePaydayReminder`, `TemplateSmsCallback`, `TemplateStatStory`, `TemplateTestimonial`, `Tooltip`

Per-component details (import stanzas, props, variants, examples) live in `.lovable/rules/libraries/{slug}/components.md` — on disk, not auto-loaded. Read that file or the component source when the name alone isn't enough.

## Theme Files

The design system's theme is delivered through the following files. The author's original source files carry the full wiring the design system needs — variable declarations, framework-specific directives, provider objects, etc. — and are the canonical import target.

- `@ws-pkww2p8xqxnopjvtkdh8/9d449797-2b4f-4c19-83b8-3d1678b3bc78/styles.css` (source — preferred import)
- `@ws-pkww2p8xqxnopjvtkdh8/9d449797-2b4f-4c19-83b8-3d1678b3bc78/dist/tokens.css` (auto-generated flat list of CSS custom properties — a raw-values fallback only; does NOT carry framework-specific wiring that the source files above provide)

