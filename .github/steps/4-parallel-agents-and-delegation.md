# Step 4: Implement the risk section

## Goal

Use Copilot to make the failing test pass with the smallest useful change to Release Radar.

## Do this

1. Ask Copilot to implement the risk-section feature in `src/release-radar.ts`.
2. Keep the public interface small: prefer extending `buildReleaseDraft` behavior over adding a second API.
3. Run:

```bash
bun test
bun run lint
bun run typecheck
```

4. Paste the passing test summary into the issue.
5. Write one sentence explaining why the implementation is minimal.

## Validation

The risk-section test should pass, and existing feature/fix/breaking-change tests should still pass. Risky PRs should not disappear from their normal sections if they also carry `feature` or `bug`.

Why this matters in GitHub: this is the shippable app change. Copilot is useful only if it helps you land a correct, reviewable diff.

## Reflect

What did you ask Copilot to do, and what did you still need to judge yourself?
