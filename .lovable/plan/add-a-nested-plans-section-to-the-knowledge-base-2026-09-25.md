# Add a nested Plans section to the Knowledge Base

## Outcome
Add **Plans** as the final numbered Knowledge Base section, with these separate empty child entries beneath it:

- Family Plan
- Prime Plan
- Senior Plan
- Legacy Plan
- OneLife Plan
- Cash Plan
- Savings Plan
- Study Plan
- LifeGuard Plan

The parent will receive the next main section number. Its children will use nested numbering in order, such as **10.1 Family Plan**, **10.2 Prime Plan**, and so on.

## Build

1. **Add real parent-child structure**
   - Add an optional parent reference to Knowledge Base sections.
   - Keep all current sections as top-level entries.
   - Limit nesting to one child level so the structure stays predictable.

2. **Create the final Plans group**
   - Add an empty top-level **Plans** section after every current section.
   - Add the nine empty plan entries as its children in the order listed above.
   - Keep titles free of typed numbers; numbering remains generated from position.

3. **Update public navigation and content**
   - Show **Plans** as the final main menu item with indented plan links below it.
   - Render each plan as its own content section beneath the Plans heading.
   - Use stable links for the parent and every individual plan.
   - Keep the existing Copy, Download, and Copy link actions available for each plan entry.

4. **Update the admin editor**
   - Group plan entries visually beneath Plans.
   - Allow each empty plan entry to be edited independently when full details are ready.
   - Keep reordering safe within the same level, preventing a child from accidentally becoming a top-level section.
   - Let future sections be assigned as top-level or as a child of Plans.

5. **Teach Opus the hierarchy**
   - Include parent and ordering information when Opus reads the full Knowledge Base.
   - Tell Opus to update the matching plan entry when uploaded or pasted content describes one of these plans.
   - Allow Opus to propose a new child under Plans only when the source clearly describes an additional plan.
   - Preserve the review-before-publish workflow.

6. **Update full exports**
   - List Plans and its children hierarchically in the Markdown and PDF contents.
   - Format child headings and numbering as 10.1, 10.2, and so on.
   - Keep each individual plan on a new PDF page, ready for its full details.

## Technical details
- Apply an additive database migration for a nullable self-referencing parent field and sibling ordering support; retain the existing public-read/admin-write access rules.
- Insert the Plans parent and empty child rows separately after the structure is available.
- Extend shared numbering helpers to return top-level and nested display numbers.
- Update the public Knowledge Base, admin editor, AI proposal schema, Markdown export, and PDF renderer to consume one shared hierarchy.

## Verification
- Confirm Plans is last and numbered after the existing final section.
- Confirm all nine plan entries appear only beneath Plans and have stable nested numbers.
- Confirm each empty entry can be edited and saved independently.
- Confirm Opus targets an existing plan entry instead of creating a duplicate.
- Download and inspect the complete PDF and Markdown exports for matching hierarchy, numbering, page breaks, links, and empty entries.
