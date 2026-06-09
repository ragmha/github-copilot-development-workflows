# Step 6: Review and harden the feature

## Goal

Use Copilot as a reviewer, not just an implementer, so the feature handles edge cases and remains maintainable.

## Do this

1. Ask Copilot to review the PR against the acceptance criteria.
2. Ask specifically about edge cases:
   - a PR has both `security` and `feature`,
   - a PR is unmerged,
   - labels use uppercase or mixed case,
   - no risky PRs exist.
3. Add any missing test that catches a real behavior gap.
4. Adapt the starter prompt in `exercises/prompts/release-radar-review.md` so it reflects what you learned from this feature.

## Validation

The PR should include either a clear "no change needed" review note or an additional test/fix based on the review. The reusable prompt should still name inputs, outputs, guardrails, and validation commands.

Why this matters in GitHub: review is where agentic workflows become trustworthy instead of just faster.

## Reflect

Which edge case was easiest for Copilot to miss?
