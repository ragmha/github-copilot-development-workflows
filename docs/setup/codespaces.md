# Codespaces setup

Codespaces is the recommended path because it gives every learner the same environment.

1. Open the repository with the Codespaces badge in `README.md`.
2. Wait for the dev container to finish.
3. Run:

```bash
bun install
bash scripts/verify-environment.sh
bun test
```

If Bun is not available immediately, open a new terminal after the post-create command finishes.
