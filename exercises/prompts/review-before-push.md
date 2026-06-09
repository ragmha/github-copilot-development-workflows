# Prompt: review before push

Use this prompt before publishing a pull request or pushing a training repository.

```text
Review the current changes for correctness, security, and exercise clarity.
Check that tests, lint, and content validation are meaningful.
Flag only issues that could confuse learners, break the workflow, or create unsafe GitHub Actions behavior.
```

Expected validation:

```bash
bun test
bun run lint
bun run validate
```
