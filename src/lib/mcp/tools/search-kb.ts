import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseForUser } from "../supabase";
import { allRows, sectionJson } from "../kb-ops";

export default defineTool({
  name: "search_kb",
  title: "Search the Knowledge Base",
  description: "Find sections whose title or text contains a word or phrase (case-insensitive), with a short snippet.",
  inputSchema: { query: z.string().trim().min(2).max(200).describe("Word or phrase to find.") },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ query }, ctx) => {
    const q = query.toLowerCase();
    const matches = (await allRows(supabaseForUser(ctx)))
      .filter((r) => r.title.toLowerCase().includes(q) || r.body_markdown.toLowerCase().includes(q))
      .map((r) => {
        const i = r.body_markdown.toLowerCase().indexOf(q);
        const snippet = i < 0 ? "" : r.body_markdown.slice(Math.max(0, i - 80), i + q.length + 80).replace(/\s+/g, " ");
        return { ...sectionJson(r), snippet };
      });
    const text = matches.length
      ? matches.map((m) => `- ${m.title} (${m.slug}): ${m.snippet}`).join("\n")
      : `No sections mention "${query}".`;
    return { content: [{ type: "text", text }], structuredContent: { matches } };
  },
});
