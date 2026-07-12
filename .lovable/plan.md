
# Spacing & padding audit — social templates

## What's off today

Reading through `SocialTemplates.tsx` and `SocialFrame.tsx`, the spacing is inconsistent template-to-template and doesn't respect the safe-area rules a real social render needs:

1. **Frame padding drifts.** Templates use `p-7`, `p-8`, `p-9` interchangeably. On a 1080×1080 render that's the difference between 28px and 36px of edge padding — visually obvious side-by-side.
2. **No safe area for platform chrome.** Instagram overlays a username strip (~top 88px on stories) and action rail (~right 60px). Story templates (`TemplateStatStory`, `TemplateOneLifeStory`) currently push content flush to those zones.
3. **Vertical rhythm is ad-hoc.** Gaps between kicker → headline → body → chips use random values (`mt-3`, `mt-4`, `mt-5`, `mt-6`, `mt-7`) instead of a scale. The eye reads it as "slightly wrong" without being able to name why.
4. **Lockup breathing room varies.** Some templates butt the SMS lockup right against the body copy (`Template48HourClaim`); others leave a huge gap (`TemplateOneLifeStory` `mt-8`).
5. **Chip clusters are cramped.** `gap-2` between pill badges reads dense at social-render scale; pills also have inconsistent internal padding (`px-3 py-1` vs `px-3 py-1.5`).
6. **Carousel step number crowds the kicker.** `TemplateHowItWorksCarousel` puts the giant numeral and the kicker on the same baseline with only `gap-4` — the kicker gets swallowed.
7. **Portrait `TemplatePaydayReminder` grid** uses `gap-2` between category tiles — too tight for the tile weight; tiles feel glued together.
8. **Landscape `TemplateBranchEvent`** uses `p-7` on the text half while the image half has no inset — asymmetric visual weight.

## The fix — one spacing scale, applied everywhere

Introduce a documented spacing scale for social canvases and refactor every template to it. No new components, no visual redesign — just consistent rhythm.

### 1. Canonical scale (add as comment block in `SocialFrame.tsx`)

```text
Frame padding      → p-10 (40px)      square/portrait/landscape default
Story frame        → px-8 pt-9 pb-10  (respects IG story safe area)
Section gap        → space-y-10       between hero block and lockup
Block gap          → mt-8             between major blocks (kicker→body group and CTA)
Element gap        → mt-4             kicker→headline, headline→paragraph
Tight gap          → mt-2             within a label pair
Chip gap           → gap-2.5          between pill badges
Chip padding       → px-3.5 py-1.5    all pills, uniformly
Lockup top rule    → pt-6             padding above the lockup divider
```

### 2. Per-template edits

- **`Template48HourClaim`** — `p-9` → `p-10`; tighten `mt-3` between kicker and 92pt figure to `mt-4`; add `pt-6` above lockup with a hairline `border-t border-white/10`.
- **`TemplateLifeCover`** — bottom panel `p-8` → `p-10`; kicker→price `mt-1` → `mt-2`; price→body `mt-3` → `mt-5`.
- **`TemplateFuneralCover`** — `p-9` → `p-10`; chip cluster `gap-2` → `gap-2.5`, uniform pill padding; lockup `mt-7` → `mt-8` with divider.
- **`TemplateTestimonial`** — `p-9` → `p-10`; giant quote → blockquote `mt-3` stays but blockquote → footer needs breathing room, wrap in `space-y-10` on the outer flex.
- **`TemplateStatStory`** — `p-8` → `px-8 pt-9 pb-10` (story safe area top); big-number → kicker gap tightened from `mt-3` (numerator) but numerator → sentence widened from `mt-6` → `mt-8`; remove ad-hoc `mb-4` on lockup rule, use `pt-6` pattern.
- **`TemplateOneLifeStory`** — `p-8` → `px-8 pt-9 pb-10`; kicker→headline `mt-3` → `mt-4`; body→chips `mt-6` stays; chips→lockup `mt-8` → move lockup into a `border-t border-white/15 pt-6` footer block.
- **`TemplateSmsCallback`** — `p-9` → `p-10`; step label→headline `mt-3` → `mt-4`; headline→74448 `mt-3` → `mt-5` (the number needs air); 74448→paragraph `mt-4` → `mt-6`.
- **`TemplateBranchEvent`** — right panel `p-7` → `p-10`; image side gets a `p-6` inset for the `SocialMark` (currently `left-5 top-5`, off-scale from the rest); text stack gap normalized.
- **`TemplatePaydayReminder`** — `p-8` → `p-10`; category grid `gap-2` → `gap-3`; tiles `py-2.5` → `py-3.5`; lockup rule uses standard `pt-6`.
- **`TemplateHowItWorksCarousel`**:
  - Cover slide: `p-9` → `p-10`, headline→body `mt-4` → `mt-6`.
  - Step slides: `p-9` → `p-10`; **stack the numeral above the kicker** instead of side-by-side (numeral gets its own line, kicker sits below at `mt-2`, headline at `mt-6`) — fixes the swallowed-kicker issue.
  - CTA slide: `p-9` → `p-10`; label→headline `mt-3` → `mt-4`; headline→74448 `mt-2` → `mt-4`; 74448→body `mt-4` → `mt-6`.

### 3. `SocialFrame` primitive touch-ups

- Bump the outer `figcaption` from `px-1` to `px-1` (unchanged) but increase the wrapper `gap-3` → `gap-4` so the label sits comfortably under the frame.
- `SocialCarousel` grid `gap-6` → `gap-8` so carousel panels breathe like the other template grids on `/social` (which use `gap-8`).
- Document the spacing scale as a header comment in `SocialFrame.tsx` so future templates inherit it.

## Out of scope

- No new templates, no color/type changes, no layout restructuring beyond the carousel step-slide numeral/kicker stacking fix.
- No changes to `/social` route grid gaps (already at `gap-8`).
- No dark-mode work.

## Verification

After the edits I'll open `/social` in the preview, screenshot the feed grid, the carousel row, the story pair, and the portrait/landscape row, and spot-check that:
- every square template has identical edge padding
- kicker→headline→body rhythm reads the same across all templates
- lockups sit on a consistent baseline distance from the bottom edge
- carousel step numerals no longer crowd their kickers
