# Step 0: Meet Release Radar

## Goal

Understand the app you will change. Release Radar builds release notes from GitHub pull request metadata. Your feature will add a **Risks to review** section for risky merged PRs.

## Do this

1. Work in your own copy of the repository, preferably in Codespaces.
2. Start or open the exercise issue and treat it as your mission log.
3. Read `README.md`, then inspect:
   - `src/release-radar.ts`
   - `tests/release-radar.test.ts`
   - `exercises/expected-outcomes/release-radar-risk-section.md`
4. Run:

```bash
bun install
bun start
bun test
```

## Validation

You should see example release notes from `bun start`, and all starter tests should pass. You should also be able to explain the target feature in one sentence: "Add a risk section for merged PRs labeled security, dependency, or migration."

Why this matters in GitHub: the exercise is now anchored in a real app behavior, so every issue, test, commit, and PR points at something shippable.

## Reflect

What would make this release-note feature useful to a maintainer reviewing a real release?
