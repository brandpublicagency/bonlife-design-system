# Let assistants read and edit every page

## Goal
Connected AI assistants can read and edit the content of every page: Home, Foundations, Components, Iconography, Marketing, Social, Downloads, Contact, plus the Knowledge Base. Reading needs a connected Bonlife account. Editing needs an admin account. Today that's only you.

## What becomes editable
- **Text:** headings, descriptions, button labels, captions, eyebrows.
- **Brand facts:** colour names and values, font names and download links, version number.
- **Contact:** brand team, phone numbers, emails, addresses, social links, payment methods and payment locations.
- **Lists:** plan categories, key benefits, changelog dates, social template copy, marketing copy, download links (Google Drive, Adobe XD).
- **Not editable:** page layout and visual design, icons, and how the components behave. Those stay built into the site, so an assistant can't break how a page looks.

## How it works
1. Content from each page moves into storage, one record per page. The text stays exactly as it reads today, so nothing changes visually.
2. Each page loads its content from storage. If anything is missing, it falls back to today's built-in text, so a page can never go blank.
3. New assistant tools:
   - `list_pages`: every page and its editable fields.
   - `get_page`: full content of one page.
   - `get_brand_guidelines`: one combined summary of colours, type, voice, contact details and key benefits.
   - `update_page`: change one or more fields on a page. Admins only. Changes go live straight away.
   - `revert_page_field`: put a field back to its original built-in value.
   - The 8 Knowledge Base tools stay as they are.
4. Assistants follow the same house rules: hyphens instead of long dashes, "Colour", the four category names, no 48-hour messaging. The update tool removes long dashes automatically.

## Stages (one page at a time, checked after each)
1. Storage and tools set up, then Contact and Downloads.
2. Foundations and Home.
3. Marketing and Social templates.
4. Components and Iconography (text only).
5. Full check at desktop and mobile, then a test edit made through the assistant tools.

## Security
- Only signed-in admins can write. Everyone can read, since the site is already public.
- No sign-up. Your account (leroux.g@bonlifenam.com) is the only account, and it's the admin.

## Technical details
- New table `site_pages(slug text pk, content jsonb, updated_at)`. RLS: public SELECT; INSERT/UPDATE/DELETE only when `has_role(auth.uid(),'admin')`. Grants included.
- `src/content/site-defaults/<page>.ts` holds typed defaults. Page loaders call `ensureQueryData` against a public server fn that deep-merges the DB content over the defaults.
- The MCP tools live in `src/lib/mcp/tools/`, use `supabaseForUser`, and validate field paths against the default schema. Manifest regenerated, version 0.3.0, and you republish afterwards.
