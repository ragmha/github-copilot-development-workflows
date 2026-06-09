# Codespaces setup

Codespaces is the recommended path because it gives every learner the same environment.

## Fastest path

1. Click the Codespaces badge in `README.md`.
2. Choose **Create new codespace**.
3. Wait for dependency installation to finish.
4. Run `bun test`.
5. Start the exercise from the Actions tab.

## Manual verification

1. Open the repository with the Codespaces badge in `README.md`.
2. Wait for the dev container to finish.
3. Run:

```bash
bun install
bash scripts/verify-environment.sh
bun test
```

If Bun is not available immediately, open a new terminal after the post-create command finishes.
