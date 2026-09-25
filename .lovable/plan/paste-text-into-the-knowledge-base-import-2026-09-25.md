# Paste text into the Knowledge Base import

## Goal
Add a second import method inside the existing **Import** block so an admin can paste text for Claude Opus 5.5 to analyse against the entire current Knowledge Base.

## Interface
- Present two clear import choices in the same block: **Upload file** and **Paste text**.
- Add a large, readable text area for pasted notes, emails, product updates, policy wording, or other source material.
- Add an **Analyse pasted text** button with the same loading and error states as file analysis.
- Require meaningful non-empty text, show the pasted character count, and cap the input at the same safe text limit used for uploaded text files.
- Keep pasted text in place if analysis fails so nothing is lost; clear it only when the admin chooses to clear it or after a successful analysis.

## Analysis and review
- Extend the existing protected Opus analysis function to accept either a file or pasted text through a validated input shape.
- Send pasted text to Claude Opus 5.5 with the full current Knowledge Base and the same Bonlife content rules already used for file imports.
- Use the existing proposal flow unchanged: Opus decides whether to update existing sections or create correctly positioned new sections.
- Show the same grouped proposals, comparisons, position controls, individual actions, and apply-all actions before anything is published.
- Label the source as **Pasted text** in analysis messages and fallback proposals rather than pretending it was a file.

## Verification
- Confirm empty text cannot be submitted and oversized text gives a clear message.
- Test pasted text that updates an existing section and text that proposes a new section.
- Verify no Knowledge Base content changes until an admin explicitly applies a proposal.
- Confirm file uploads continue working exactly as before.
