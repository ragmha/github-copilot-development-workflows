# Step 7: Guardrails, Actions, and review

## Goal

Use automation to protect quality instead of relying on memory or heroic review.

## Do this

1. Inspect `.github/workflows/ci.yml`.
2. Run the same checks locally:

```bash
bun test
bun run lint
bun run validate
```

3. Review workflow permissions and confirm no workflow uses `pull_request_target`.
4. Add a pull request checklist item for security review before push.

## Validation

All checks should pass locally and in CI. Workflow permissions should be explicit and least-privilege.

## Reflect

Which checks should block a merge, and which checks should only guide the reviewer?
