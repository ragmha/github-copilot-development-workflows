# Step 5: Open the pull request

## Goal

Turn the tested local change into a GitHub Pull Request linked to the feature issue.

## Do this

1. Create a branch for the feature.
2. Commit the test and implementation together.
3. Open a pull request that includes:
   - linked issue,
   - acceptance criteria checklist,
   - red/green test evidence,
   - screenshots or release-note output if useful,
   - risk notes.
4. If MCP is available, ask Copilot to summarize the issue and PR context. If not, use:

```bash
gh issue view
gh pr view
```

## Validation

The PR should tell one coherent story: issue -> failing test -> implementation -> green checks.

Why this matters in GitHub: the pull request becomes the delivery artifact, not just a code upload.

## Reflect

Could another maintainer approve this PR without reading your private Copilot conversation?
