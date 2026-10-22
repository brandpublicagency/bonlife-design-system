import { defineTool } from "@lovable.dev/mcp-js";
import { supabaseForUser } from "../supabase";
import { mergedPage } from "../site-ops";

export default defineTool({
  name: "get_brand_guidelines",
  title: "Bonlife brand guidelines summary",
  description:
    "One combined, current summary of the Bonlife brand: colours, typography, motion, voice and usage rules, key benefits, contact details, branches, payment options and asset links.",
  inputSchema: {},
  annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false },
  handler: async (_input, ctx) => {
    const sb = supabaseForUser(ctx);
    const [f, d, c, s, m] = await Promise.all([
      mergedPage(sb, "foundations"),
      mergedPage(sb, "downloads"),
      mergedPage(sb, "contact"),
      mergedPage(sb, "social"),
      mergedPage(sb, "marketing"),
    ]);
    const guidelines = {
      voice: {
        tone: "Warm, plain, benefit-led. N$ for money. Hyphens, never long dashes. British spelling (Colour). Never use 48-hour wording.",
        keyBenefitsInPriority: ["No medicals", "Instant cash"],
        categories: ["Funeral Cover", "Life Insurance", "Saving & Study Plans", "Accident & Disability Cover"],
        always: s.usage.always,
        never: s.usage.never,
      },
      colours: { primary: f.colourPrimary, categories: f.colourCategories, surfaces: f.colourSurfaces },
      typography: f.typography,
      motion: f.motion,
      photography: f.photography,
      marketingProofPoints: m.benefits.items,
      assetLinks: d.links,
      contact: { team: c.direct.people, headOffice: c.headOffice, channels: c.channels, branches: c.branches.list, payments: c.partners },
    };
    return {
      content: [{ type: "text", text: JSON.stringify(guidelines, null, 2) }],
      structuredContent: guidelines,
    };
  },
});
