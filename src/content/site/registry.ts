import { contactDefaults } from "./contact";
import { downloadsDefaults } from "./downloads";
import { foundationsDefaults } from "./foundations";
import { homeDefaults } from "./home";
import { marketingDefaults } from "./marketing";
import { socialDefaults } from "./social";
import { componentsDefaults } from "./components";
import { iconographyDefaults } from "./iconography";

// Every page whose content can be edited (by admins and connected assistants).
// Stored edits are sparse overrides merged over these built-in defaults.
export const SITE_PAGES = {
  home: { title: "Home", path: "/", defaults: homeDefaults },
  foundations: { title: "Foundations (brand guidelines)", path: "/foundations", defaults: foundationsDefaults },
  components: { title: "Components", path: "/components", defaults: componentsDefaults },
  iconography: { title: "Iconography", path: "/iconography", defaults: iconographyDefaults },
  marketing: { title: "Marketing kit", path: "/marketing", defaults: marketingDefaults },
  social: { title: "Social templates", path: "/social", defaults: socialDefaults },
  downloads: { title: "Downloads", path: "/downloads", defaults: downloadsDefaults },
  contact: { title: "Contact", path: "/contact", defaults: contactDefaults },
} as const;

export type SitePageSlug = keyof typeof SITE_PAGES;
export const SITE_PAGE_SLUGS = Object.keys(SITE_PAGES) as SitePageSlug[];
