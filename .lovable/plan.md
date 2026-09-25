# Full Knowledge Base control for connected assistants

Connected assistants (ChatGPT, Claude, etc.) get full control of the Knowledge Base: read, add, edit, move, and delete. The other pages stay as they are. Anyone who connects can read. Only admin accounts can make changes.

## What assistants will be able to do

Read (any connected account):
- **List sections**: every section with its number, title, and parent (existing tool).
- **Read a section**: full text, by slug or id (existing tool, now also accepts id).
- **Read the whole Knowledge Base**: every section's full text in one call, useful for understanding context before editing.
- **Search**: find sections that contain a word or phrase.

Write (admins only; changes go live immediately):
- **Add a section**: new top-level section, or a new plan under Plans, placed after a chosen section. Numbers update automatically.
- **Edit a section**: change the title and/or text (existing tool, now also accepts id).
- **Move a section**: up or down among its siblings, or move it under a different parent (e.g. into Plans) or back to the top level.
- **Delete a section**: removes it permanently. If the section has child sections (like Plans), the assistant must confirm with a flag before deleting it and its children, so nothing disappears by accident.

## Safeguards
- Every change runs as the signed-in person, so the existing admin-only database rules still apply. Non-admins get a clear "admins only" message.
- Titles lose any typed numbers ("3. Products" becomes "Products"), same as the site's own editor.
- Em dashes become hyphens, same as the Bonlife AI import.
- Each tool is labelled read-only or destructive, so assistants ask before deleting.

## Technical details
- New MCP tools in `src/lib/mcp/tools/`: `get_full_kb`, `search_kb`, `create_kb_section`, `move_kb_section`, `delete_kb_section`. Existing `get_kb_section` and `update_kb_section` accept `slug` or `id`.
- Shared helpers in `src/lib/mcp/kb-ops.ts` reuse the placement and ordering logic from `kb.functions.ts` (`slugify`, unique slug, sibling_order shifting). They run through `supabaseForUser`, so RLS enforces `has_role(admin)`. There is no service-role client.
- To move a section to a new parent, update `parent_id` + `sibling_order`. The existing DB trigger already blocks deeper nesting and parents becoming children.
- To delete a parent, delete its children first, then the parent (only when `include_children: true`).
- Update the server instructions, then regenerate the manifest. Republish afterwards so the live connector serves the new tools.
