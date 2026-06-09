# Step 3: Agentic development loop

## Goal

Practice a test-first loop: understand the issue, write one failing behavior test, implement the smallest useful change, then review.

## Do this

1. Pick one behavior in `src/github-workflow-lab.ts`.
2. Add one behavior-focused test in `tests/github-workflow-lab.test.ts`.
3. Run the test and confirm it fails for the expected reason.
4. Implement the minimal change.
5. Run:

```bash
bun test
bun run lint
```

## Validation

The test should fail before the implementation and pass after it. Avoid tests that assert internal helper behavior.

## Reflect

How did starting with a behavior test change the instructions you gave Copilot?
