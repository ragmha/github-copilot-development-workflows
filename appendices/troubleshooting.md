# Troubleshooting

## `bun` is not found

Open a new terminal in Codespaces or install Bun locally, then run `bun install` again.

## `gh` is not authenticated

Run:

```bash
gh auth login
```

## Copilot CLI is unavailable

Confirm your GitHub account has Copilot access and follow the public GitHub Copilot CLI setup documentation.

## A workflow did not post the next step

Open the Actions tab, inspect the failed workflow, and confirm the exercise issue has the `exercise` label.
