type Swatch = { name: string; hex: string; cmyk?: string; token: string; textOn: string };

export const foundationsDefaults = {
  header: {
    eyebrow: "Foundations",
    title: "The tokens beneath every Bonlife surface.",
    lead: "Color, type, spacing, motion, logos and photography - all traced back to the brand book, no invented values.",
  },
  colourPrimary: {
    title: "Navy anchor, warm coral accent.",
    lead: "Bonlife is not a pastel-insurance brand - it reads corporate-serious first, friendly second. Navy owns text and chrome; coral owns CTAs and highlights against it.",
    swatches: [
      { name: "Navy 900", hex: "#0C1C3E", cmyk: "C81 M55 Y0 K76", token: "--navy-900", textOn: "light" },
      { name: "Coral 500", hex: "#FF876A", cmyk: "C0 M47 Y58 K0", token: "--coral-500", textOn: "dark" },
      { name: "Mint 400", hex: "#01FBC0", cmyk: "C100 M0 Y24 K2", token: "--mint-400", textOn: "dark" },
    ] as Swatch[],
  },
  colourCategories: {
    title: "Four plans, four colours.",
    lead: "Each product category owns a saturated identifier colour. Use it to tint plan cards and badges for its own category - never as a general UI colour.",
    swatches: [
      { name: "Funeral Cover", hex: "#04413F", cmyk: "C94 M0 Y3 K75", token: "--category-funeral", textOn: "light" },
      { name: "Life Insurance", hex: "#541467", cmyk: "C18 M81 Y0 K60", token: "--category-life", textOn: "light" },
      { name: "Saving & Study Plans", hex: "#0D2B90", cmyk: "C91 M70 Y0 K44", token: "--category-savings", textOn: "light" },
      { name: "Accident & Disability Cover", hex: "#A80A4D", cmyk: "C0 M94 Y54 K34", token: "--category-accident", textOn: "light" },
    ] as Swatch[],
  },
  colourSurfaces: {
    title: "Two near-whites, two states.",
    lead: "Surface tint sits under navy text; muted fills cards and inputs. Semantic red and mint cover error and success only - never decorative.",
    swatches: [
      { name: "Surface", hex: "#FFFFFF", cmyk: "C0 M0 Y0 K0", token: "--surface-white", textOn: "dark" },
      { name: "Tint", hex: "#F7F8FB", cmyk: "C2 M1 Y0 K2", token: "--surface-tint", textOn: "dark" },
      { name: "Muted", hex: "#EAEDF4", cmyk: "C4 M3 Y0 K4", token: "--surface-muted", textOn: "dark" },
      { name: "Error", hex: "#FF5F5F", cmyk: "C0 M63 Y63 K0", token: "--state-error", textOn: "light" },
      { name: "Success", hex: "#41FFB6", cmyk: "C75 M0 Y29 K0", token: "--state-success", textOn: "dark" },
    ] as Swatch[],
  },
  typography: {
    title: "Onest for display, Inter for body.",
    lead: "Bold Onest with tight negative tracking on headings loosens to 0 by H5. Inter carries everything long-form. No serif, no script, no display faces.",
    headings: [
      { tag: "H1", size: "60 / -0.03em / 700", text: "N$1,000 Instant Cash, same day." },
      { tag: "H2", size: "48 / -0.02em / 700", text: "Two Pockets. One Plan." },
      { tag: "H3", size: "32 / -0.02em / 700", text: "Start early. Study further." },
      { tag: "H4", size: "25 / -0.02em / 600", text: "Speed is respect." },
      { tag: "H5", size: "18 / 0 / 600", text: "Family Plan" },
      { tag: "H6", size: "14 / 0 / 600", text: "COVER BENEFIT" },
    ],
    bodyLarge: "A grieving family cannot wait weeks. Every Bonlife funeral plan pays a cover benefit fast.",
    body: "Start early, study further. Give them every chance.",
    bodySmall: "SMS your name to 74448.",
    onestUrl: "https://fonts.google.com/specimen/Onest",
    interUrl: "https://fonts.google.com/specimen/Inter",
  },
  spacing: { title: "4px base, generous rhythm." },
  radius: { title: "Friendly, trust-first." },
  motion: {
    title: "Calm, never showy.",
    durations: [
      { name: "instant", ms: "100ms", use: "presses" },
      { name: "fast", ms: "160ms", use: "hovers" },
      { name: "base", ms: "240ms", use: "menus, toasts" },
      { name: "slow", ms: "400ms", use: "modals" },
    ],
  },
  logos: { title: "Wordmark and mark lockups." },
  photography: {
    title: "Warm, candid, Namibian.",
    lead: "Real portraiture - multi-generational, hugging, laughing, often looking at camera. Full-bleed or generously cropped. Never behind heavy dark overlays.",
  },
};
