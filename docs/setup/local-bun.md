# Local Bun setup

Use this path when Codespaces is not available.

1. Install GitHub CLI from public GitHub documentation.
2. Install GitHub Copilot CLI.
3. Install Bun from public Bun documentation.
4. Clone the repository.
5. Run:

```bash
bun install
bash scripts/verify-environment.sh
bun test
```

Local setup should match Codespaces closely enough that exercise commands behave the same way.
