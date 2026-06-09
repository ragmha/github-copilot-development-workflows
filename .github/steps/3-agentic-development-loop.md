# Step 3: Agentic development loop

## Goal

Practice a test-first loop: understand the issue, write one failing behavior test, implement the smallest useful change, then review.

## Do this

1. Pick one behavior in `src/github-workflow-lab.ts`.
2. Add one behavior-focused test in `tests/github-workflow-lab.test.ts`.
3. Run the test and confirm it fails for the expected reason.
4. Implement the minimal change.
5. Paste the red/green evidence into the exercise issue:
   - the failing test summary,
   - the change you made,
   - the passing test summary.
6. Run:

```bash
bun test
bun run lint
```

## Validation

The test should fail before the implementation and pass after it. Avoid tests that assert internal helper behavior.

Why this matters in GitHub: the issue records intent, the test records expected behavior, and the pull request records the reviewed change.

Stretch: ask Copilot to review whether your test describes behavior or implementation details.

## Reflect

How did starting with a behavior test change the instructions you gave Copilot?
