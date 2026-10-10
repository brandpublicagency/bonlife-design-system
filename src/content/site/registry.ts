import { contactDefaults } from "./contact";

// Every page whose content can be edited (by admins and connected assistants).
// Add a page here once its defaults file exists and the page reads from useSiteContent.
export const SITE_PAGES = {
  contact: { title: "Contact", path: "/contact", defaults: contactDefaults },
} as const;

export type SitePageSlug = keyof typeof SITE_PAGES;
export const SITE_PAGE_SLUGS = Object.keys(SITE_PAGES) as SitePageSlug[];
