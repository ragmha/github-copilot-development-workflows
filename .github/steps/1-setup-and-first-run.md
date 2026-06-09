# Step 1: Setup and first run

## Goal

Create a reproducible GitHub Copilot workspace that works for humans and agents.

## Do this

1. Confirm `gh`, Copilot CLI, Bun, and Git are available.
2. Run the environment verifier:

```bash
bash scripts/verify-environment.sh
```

3. Read `docs/setup/codespaces.md` or `docs/setup/local-bun.md`.
4. Commit any setup note requested by your facilitator or issue.

## Validation

The verifier should report the available tools and exit successfully. `bun test` should still pass.

Why this matters in GitHub: Codespaces turns setup into shared infrastructure, so every learner and agent starts from the same baseline.

Stretch: capture one setup improvement in the exercise issue that would help a new teammate.

## Reflect

What setup decision in this repository would make it easier for a future teammate or agent to contribute safely?
