import { auth, defineMcp } from "@lovable.dev/mcp-js";
import listSections from "./tools/list-sections";
import getSection from "./tools/get-section";
import getFullKb from "./tools/get-full-kb";
import searchKb from "./tools/search-kb";
import createSection from "./tools/create-section";
import updateSection from "./tools/update-section";
import moveSection from "./tools/move-section";
import deleteSection from "./tools/delete-section";

const projectRef = import.meta.env["VITE_SUPABASE_PROJECT_ID"] ?? "project-ref-unset";

export default defineMcp({
  name: "bonlife-design-system",
  title: "Bonlife Design System",
  version: "0.2.0",
  instructions:
    "Full control of the Bonlife Knowledge Base, the single source of truth about Bonlife. Read with list_kb_sections, get_full_kb, get_kb_section and search_kb. Admins can add (create_kb_section), edit (update_kb_section), reorder or re-nest (move_kb_section) and delete (delete_kb_section) sections; changes publish immediately. Sections are numbered automatically, so never put numbers in titles. Plans is a parent section; individual plans are its children. Write in the Bonlife voice: warm, plain, benefit-led, N$ for money, hyphens not em dashes, never '48-hour' wording. Confirm with the user before deleting.",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [listSections, getFullKb, getSection, searchKb, createSection, updateSection, moveSection, deleteSection],
});
