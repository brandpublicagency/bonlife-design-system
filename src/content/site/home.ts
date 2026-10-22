export const homeDefaults = {
  cover: {
    eyebrow: "Bonlife Design System · v2.5",
    title: "The design system for everyone building Bonlife.",
    lead: "One place for designers, suppliers, agencies and internal teams to find Bonlife's logos, colours, typography, components, icons, social templates and brand facts - all traceable to the knowledge base.",
    primaryCta: "Get started",
    secondaryCta: "Download assets",
  },
  audiences: {
    eyebrow: "Get started",
    title: "Pick your starting point.",
    designers: { audience: "Designers", body: "Foundations, components and iconography with tokens ready to use." },
    suppliers: { audience: "Suppliers & print", body: "Logos, colours and fonts in the formats you need to produce work." },
    marketing: { audience: "Marketing & social", body: "Ready-made post templates and a demo homepage composition." },
  },
  browse: {
    eyebrow: "Browse the system",
    title: "Everything inside Bonlife.",
    lead: "Seven sections, each one self-contained. Deep-link any tile - they're all shareable URLs.",
    foundations: { body: "Colour, typography, spacing, radius, motion.", items: ["Onest + Inter", "Navy + coral", "Token reference"] },
    components: { body: "Buttons, cards, plan rows, forms, dialogs.", items: ["17 components", "Semantic tokens", "Live previews"] },
    iconography: { body: "1px Lucide set plus category and benefit glyphs.", items: ["Product categories", "Value-added benefits", "SVG downloads"] },
    social: { body: "Posts, stories and carousels ready for campaigns.", items: ["9 templates", "Multi-slide carousel", "Standard ratios"] },
    marketing: { body: "A plausible bonlifenam.com built from real plans.", items: ["Demo homepage", "Real copy", "Plan composition"] },
    downloads: { body: "Logos, colours, fonts and photography.", items: ["SVG logos", "Copy-to-clipboard hex", "Google Drive assets"] },
    knowledgeBase: { body: "The single source of truth for Bonlife brand facts.", items: ["Products & pricing", "Voice & tone", "Claims process"] },
  },
  changelog: {
    eyebrow: "What's new",
    title: "Recent updates.",
    lead: "A short changelog of what changed in the system.",
    entries: [
      { date: "Apr 2025", title: "Social templates", body: "Nine post templates plus a five-slide 'How Bonlife works' carousel.", to: "/social" },
      { date: "Jun 2025", title: "Knowledge base with admin", body: "Single source of truth for brand facts. Import from PDFs, admin-only editing.", to: "/knowledge-base" },
      { date: "Nov 2025", title: "Downloads page", body: "Logos as SVG, colour swatches with click-to-copy hex, plus font and asset links.", to: "/downloads" },
      { date: "Jul 2026", title: "Iconography overhaul", body: "Sticky sidebar layout, unified utility bar and a Google Drive link for the full icon set.", to: "/iconography" },
    ],
  },
};
