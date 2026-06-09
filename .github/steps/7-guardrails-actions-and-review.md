# Step 7: Make the guardrails green

## Goal

Use CI and repository validation to prove the Release Radar feature is ready for review.

## Do this

1. Run the same checks locally that CI runs:

```bash
bun test
bun run lint
bun run typecheck
bun run validate
```

2. Inspect `.github/workflows/ci.yml`.
3. Review workflow permissions and confirm no workflow uses `pull_request_target`.
4. Open the Actions tab and inspect the PR or branch workflow run.
5. If a workflow failed, write the retry or fix plan in the issue before changing code.

## Validation

All checks should pass locally and in GitHub Actions. The PR should not be considered done until the guardrails are green.

Why this matters in GitHub: CI turns "Copilot said it works" into visible evidence for the whole team.

## Reflect

Which check gives you the most confidence in the risk-section feature?
