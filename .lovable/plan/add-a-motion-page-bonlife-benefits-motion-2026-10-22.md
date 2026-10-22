# Add a Motion page (Bonlife Benefits Motion)

## Goal
Add a new **Motion** page to the site, built from the uploaded Benefits Motion file, in the same style as the other pages, with a link in the menu.

## What the page shows
Laid out with the same left-hand menu as the other pages:
1. **Benefits module for the website** - the animated benefits block, with a switch between Set 1 (core benefits) and Set 2 (funeral add-ons) and a replay button.
2. **Social reel (9:16)** - vertical animated reel.
3. **Logo sting (16:9)** - wide logo animation.
4. **Vertical logo sting (9:16)**.
5. **Copy and motion spec** - copy rules, Set 1 and Set 2 wording, timing and easing.

## Content rules kept
- Key benefits order: Zero medicals first, then Instant cash. No "48-hour" wording, hyphens instead of long dashes, "Colour" spelling.
- Animations calm down for visitors who turn off motion on their device.
- Page headings and descriptions become editable by you and connected assistants, like the other pages.

## Technical details
- New route `src/routes/motion.tsx` with its own head() metadata; added to the drawer menu and footer.
- Port the HTML/CSS/JS from the zip into React components under `src/components/bonlife/motion/`, using existing design tokens and Onest/Inter (already loaded).
- Upload the four photos to Lovable Assets; reuse the existing Bonlife logo files.
- Add `src/content/site/motion.ts` defaults and register `motion` in `SITE_PAGES` so the connector can read and edit it.
- Verify with Playwright at desktop and phone widths: animations play, sets switch, no sideways scrolling.
