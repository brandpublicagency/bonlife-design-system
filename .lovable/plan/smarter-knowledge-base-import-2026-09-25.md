# Smarter Knowledge Base import

Upgrade the "Add sections from a file" tool on the admin Knowledge Base page so the AI reads the whole live Knowledge Base, then proposes edits to existing sections or new sections. You review each one before it goes live.

## What you will see
- Upload a PDF, Markdown or text file the same way you do now.
- The results come back in two groups:
  - **Updates to existing sections**: the current text and the proposed text shown side by side, with changed lines highlighted, plus a short note explaining what changed and why.
  - **New proposed sections**: a preview with a note on why the topic is new.
- Each proposal has its own button ("Apply update" or "Add section") and a "Discard" button. Each group also has an "Apply all" button.
- A section that was edited after the upload started gets flagged, so newer edits are never overwritten without you knowing.

## AI behaviour
- Reads every current section (title, slug, order and full text) before it looks at the upload.
- Adds new facts to the matching existing topic (for example Funeral Cover, Payment Methods or Brand Identity) and keeps all existing checked content.
- Only suggests a new section when the topic is genuinely not covered yet.
- Writes in the Bonlife voice: benefit-led, warm, concise, no jargon. Amounts use N$ and dashes are hyphens (no em dashes). "48-hour" wording is never pushed.
- Uses `google/gemini-2.5-pro` through Lovable AI, as you asked. Its availability is confirmed before the build starts. If it is not available, the build stops and asks you what to do instead.

## Technical details
- `src/lib/kb.functions.ts` `extractKbDraftsFromUpload`:
  - Loads the sections through the admin's own session (`context.supabase`), then sends them in the system prompt as reference text with an id for each section.
  - New strict output schema: `{ proposals: [{ action: "update_existing" | "create_new", section_id: string | null, slug: string | null, title, summary_of_changes, proposed_body_markdown }] }`. Nullable fields, no length limits in the schema, and caps stated in the prompt (up to 12 proposals).
  - Switches to `streamText` and reads `await result.output`, so long documents don't time out. Keeps the fallback for failed parsing.
  - Checks every `update_existing` id against the real sections. A proposal with an unknown id becomes `create_new`. Returns each target's current body and `updated_at` so the review screen can compare.
  - Replaces any em dashes with hyphens in the text the AI returns.
- `KbUploadPanel.tsx`: rewritten around proposals, with a grouped layout, a line-by-line diff (using the small `diff` package) and per-item and "Apply all" actions.
- `admin.knowledge-base.tsx`: passes in `onApplyUpdate` (calls `updateKbSection`) and `onCreate` (calls `createKbSection`), then refreshes the section list after each one.
- Error messages for 402, 429 and 403 are kept and shown in the panel.
