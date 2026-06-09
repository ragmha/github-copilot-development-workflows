# Step 2: Context, memory, and instructions

## Goal

Teach Copilot durable repository context so every prompt does not need to repeat the same rules.

## Do this

1. Read `.github/copilot-instructions.md`.
2. Ask Copilot to summarize the repository's purpose, commands, and safety rules.
3. Add one small improvement to the instructions if you discover a missing durable rule.
4. Keep task-specific notes in the issue, not in repository instructions.

## Validation

`bun run validate` checks that the instruction file exists and that exercise steps keep the required structure.

Why this matters in GitHub: repository instructions travel with the code, while issue comments capture task-specific context for the current run.

Stretch: ask Copilot to compare the issue context with `.github/copilot-instructions.md` and identify what should move where.

## Reflect

Which facts belong in repository instructions, which belong in an issue, and which should stay in your current conversation only?
