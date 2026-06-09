# Step 4: Parallel agents and delegation

## Goal

Learn what work can be split across agents without losing ownership or context.

## Do this

1. Write a short task split in your exercise issue:
   - implementation owner,
   - test/review owner,
   - documentation owner,
   - security or risk reviewer.
2. Identify which tasks can run in parallel and which must wait.
3. Keep one source of truth: the issue or pull request.

## Validation

Your issue should contain a delegation plan that separates independent work from sequencing dependencies.

Why this matters in GitHub: GitHub gives each work stream a visible place to land through issues, branches, pull requests, and checks.

Stretch: mark one task as safe for a cloud agent and one task as human-owned, then explain why.

## Reflect

Which task was safe to delegate, and which task needed a single accountable owner?
