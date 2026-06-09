# Step 2: Give Copilot the app context

## Goal

Make Copilot useful by grounding it in Release Radar's current behavior before asking it to write code.

## Do this

1. Read `.github/copilot-instructions.md`.
2. Ask Copilot to summarize:
   - what Release Radar does,
   - how `buildReleaseDraft` groups PRs,
   - which behavior is missing for the risk-section feature,
   - which commands prove the change works.
3. Paste the useful summary into the issue under `## Copilot context`.
4. If repository instructions are missing durable guidance, make a small update. Do not put one-off task notes there.

## Validation

`bun run validate` checks the repository structure. The issue should now contain enough app context that a different agent could continue the feature without reading your private chat.

Why this matters in GitHub: repository instructions hold durable rules, while the issue holds the concrete feature context.

## Reflect

Which facts belong in repository instructions, and which belong only in this feature issue?
