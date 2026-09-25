import { auth, defineMcp } from "@lovable.dev/mcp-js";
import listSections from "./tools/list-sections";
import getSection from "./tools/get-section";
import updateSection from "./tools/update-section";

const projectRef = import.meta.env["VITE_SUPABASE_PROJECT_ID"] ?? "project-ref-unset";

export default defineMcp({
  name: "bonlife-design-system",
  title: "Bonlife Design System",
  version: "0.1.0",
  instructions:
    "Tools for the Bonlife Knowledge Base, the single source of truth about Bonlife. Use list_kb_sections to see the contents, get_kb_section to read a section, and update_kb_section (admins only) to edit one.",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [listSections, getSection, updateSection],
});
