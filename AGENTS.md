<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->
- Page content lives in `src/content/site/<page>.ts` defaults; `site_pages` stores sparse admin overrides merged via `useSiteContent` - so pages never go blank and assistants can only change content, not layout.
- Knowledge Base deletion uses an ON DELETE RESTRICT parent foreign key and an editor-side server precheck; the UI shows the nested-section count, while explicit MCP subtree deletion removes children first, so headings cannot silently cascade-delete content.
