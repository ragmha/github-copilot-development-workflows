# Step 1: Create the feature issue

## Goal

Turn the product request into a GitHub Issue that Copilot, a teammate, or a future you can use as the source of truth.

## Do this

1. Confirm `gh`, Copilot CLI, Bun, and Git are available:

```bash
bash scripts/verify-environment.sh
```

2. Create or update the exercise issue with this feature request:

```md
## Problem

Release Radar hides risky changes inside regular release-note sections. Maintainers need risky PRs to stand out before publishing a release.

## Acceptance criteria

- Merged PRs labeled `security`, `dependency`, or `migration` appear under `## Risks to review`.
- Unmerged PRs are ignored.
- Risky PRs still keep their existing release-note section if they also have labels like `feature` or `bug`.
- The risk section appears after `## Breaking changes` and before `## Features`.
- The behavior is covered by a failing test before implementation.
```

3. Add links to `src/release-radar.ts` and `tests/release-radar.test.ts` in the issue.

## Validation

The issue should contain the problem, acceptance criteria, test expectation, and file links. `bun test` should still pass before you start changing behavior.

Why this matters in GitHub: a good issue gives Copilot and reviewers the same target, so the PR is judged against shared acceptance criteria.

## Reflect

What information in the issue would prevent an agent from overbuilding this feature?
