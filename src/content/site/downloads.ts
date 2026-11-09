type Swatch = { name: string; hex: string; cmyk?: string; token: string; textOn: string };

export const downloadsDefaults = {
  header: {
    eyebrow: "Downloads",
    title: "Brand assets, ready to grab.",
    lead: "Logos, fonts, and icons download inline or from Google Fonts / Drive. Click a colour to copy its hex. Photography lives in the shared Google Drive.",
  },
  links: {
    adobeXd: "https://xd.adobe.com/view/275ada2c-3189-49e8-9024-75ad70e49fcc-7209/grid",
    photographyDrive: "https://drive.google.com/drive/folders/1-BYSNul3hlWG1B3lqOxtEZlwSy2L5_nI?usp=sharing",
    iconDrive: "https://drive.google.com/drive/folders/1W_OspNdCrFBoq3R7HFNPhk7XqzecMOsU?usp=sharing",
    onest: "https://fonts.google.com/specimen/Onest",
    inter: "https://fonts.google.com/specimen/Inter",
  },
  designSystem: {
    title: "Adobe XD source",
    lead: "The full Bonlife Design System lives in Adobe XD. Inspect components, copy assets, and download everything from the developer link.",
    cardTitle: "Adobe XD developer view",
    cardDescription: "Open the XD source to inspect spacing, typography, components, and every asset in the system. Suppliers and designers should use this as the master reference.",
  },
  logos: {
    title: "Wordmarks and marks",
    lead: "Six SVGs cover every surface. Use the light wordmark on navy and photography; the dark wordmark on white and tint surfaces.",
    wordmarkLight: { label: "Wordmark - Light", caption: "Primary wordmark for use on dark backgrounds." },
    wordmarkDark: { label: "Wordmark - Dark", caption: "Primary wordmark for use on light backgrounds." },
    markCoral: { label: "Mark - Coral", caption: "Standalone mark in accent coral." },
    markNavy: { label: "Mark - Navy", caption: "Standalone mark in anchor navy." },
    markMint: { label: "Mark - Mint", caption: "Mint mark reserved for high-contrast dark surfaces." },
    markWhite: { label: "Mark - White", caption: "Reversed mark for photography and coloured surfaces." },
  },
  fonts: {
    title: "Typefaces",
    lead: "Onest carries display type; Inter carries body copy. Both are free on Google Fonts.",
    onestDescription: "Display headings and bold UI labels. Tight tracking, geometric, confident.",
    interDescription: "Body copy, captions, and interface text. Clean, readable, extensive weights.",
  },
  colours: {
    title: "Palette",
    lead: "Click any swatch to copy its hex. CMYK values are calculated for print - request a printed proof, especially for Mint and Success, which are brighter than print can reproduce.",
    cardDescription: "Brand, category, state, and surface colours. Click a swatch to copy its hex to the clipboard.",
    brand: [
      { name: "Navy 900", hex: "#0C1C3E", cmyk: "C81 M55 Y0 K76", token: "--navy-900", textOn: "light" },
      { name: "Coral 500", hex: "#FF876A", cmyk: "C0 M47 Y58 K0", token: "--coral-500", textOn: "dark" },
      { name: "Mint 400", hex: "#01FBC0", cmyk: "C100 M0 Y24 K2", token: "--mint-400", textOn: "dark" },
    ] as Swatch[],
    category: [
      { name: "Funeral Cover", hex: "#04413F", cmyk: "C94 M0 Y3 K75", token: "--category-funeral", textOn: "light" },
      { name: "Life Insurance", hex: "#541467", cmyk: "C18 M81 Y0 K60", token: "--category-life", textOn: "light" },
      { name: "Saving & Study Plans", hex: "#0D2B90", cmyk: "C91 M70 Y0 K44", token: "--category-savings", textOn: "light" },
      { name: "Accident & Disability Cover", hex: "#A80A4D", cmyk: "C0 M94 Y54 K34", token: "--category-accident", textOn: "light" },
    ] as Swatch[],
    state: [
      { name: "Error", hex: "#FF5F5F", cmyk: "C0 M63 Y63 K0", token: "--state-error", textOn: "light" },
      { name: "Success", hex: "#41FFB6", cmyk: "C75 M0 Y29 K0", token: "--state-success", textOn: "dark" },
    ] as Swatch[],
    surface: [
      { name: "Surface white", hex: "#FFFFFF", cmyk: "C0 M0 Y0 K0", token: "--surface-white", textOn: "dark" },
      { name: "Surface tint", hex: "#F7F8FB", cmyk: "C2 M1 Y0 K2", token: "--surface-tint", textOn: "dark" },
      { name: "Surface muted", hex: "#EAEDF4", cmyk: "C4 M3 Y0 K4", token: "--surface-muted", textOn: "dark" },
      { name: "Border hairline", hex: "#E1E4E9", cmyk: "C3 M2 Y0 K9", token: "--border-hairline", textOn: "dark" },
      { name: "Gray 600", hex: "#5B6472", cmyk: "C20 M12 Y0 K55", token: "--gray-600", textOn: "light" },
    ] as Swatch[],
  },
  icons: {
    title: "Icon library",
    lead: "The full Bonlife icon set lives in the shared Drive folder. Download individual SVGs from the Iconography page, or grab the complete set from Drive.",
    cardDescription: "Curated Lucide glyphs, category icons, and custom SVGs. Use the Iconography page to browse, or download the full set from the Drive folder.",
  },
  photography: {
    title: "Campaign photography",
    lead: "High-resolution photography lives in the shared Drive because files are licensed per campaign and too large to ship with the design system.",
    cardDescription: "Open the folder to browse the full set of licensed campaign photography.",
  },
};
