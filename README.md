# GitHub Copilot Development Workflows

> A GitHub Skills-style exercise for learning how to use GitHub Copilot as a development workflow platform: from setup and context to delegation, guardrails, and sustainable adoption.

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/ragmha/github-copilot-development-workflows?quickstart=1)

## What you will learn

This exercise turns a small TypeScript + Bun repository into a guided lab for GitHub-native agentic development. You will practice:

- setting up a reproducible Copilot workspace,
- giving Copilot durable repository context,
- using an issue-driven test-first development loop,
- splitting work across local and cloud agents,
- connecting work to GitHub Issues, Projects, and MCP context,
- designing reusable Copilot workflows,
- adding guardrails with tests, linting, Actions, and review,
- reasoning about Copilot usage, cost, and team adoption.

## How the exercise works

1. Open this repository in Codespaces or clone it locally.
2. Run `bun install`.
3. Start the exercise from the **Actions** tab by running **Start exercise**.
4. Follow the issue comments posted from `.github/steps/`.
5. Complete each step by making the requested repository change and opening or updating a pull request.

The content is readable without Actions, too. Start with [`.github/steps/0-welcome.md`](./.github/steps/0-welcome.md).

## Requirements

- GitHub account with GitHub Copilot access
- GitHub CLI (`gh`)
- GitHub Copilot CLI
- Bun 1.3 or newer
- Codespaces, or a local editor with a terminal

See [`docs/setup/codespaces.md`](./docs/setup/codespaces.md) and [`docs/setup/local-bun.md`](./docs/setup/local-bun.md).

## Repository map

| Path | Purpose |
|---|---|
| `.github/steps/` | Learner-facing issue comments for each exercise step |
| `.github/workflows/` | GitHub Actions that start the exercise, advance steps, and run CI |
| `.github/copilot-instructions.md` | Durable instructions for Copilot agents working in this repo |
| `src/` | Small TypeScript lab code used by the exercise |
| `tests/` | Behavior tests for the lab and repository validation |
| `scripts/` | Environment and content validation helpers |
| `docs/` | Setup guides and facilitator notes |
| `appendices/` | Reference material for Copilot surfaces, pricing, and troubleshooting |

## Commands

```bash
bun install
bun test
bun run lint
bun run validate
```

## Exercise steps

| Step | Topic | Main GitHub surface |
|---|---|---|
| 0 | Welcome and mission | Issues, Codespaces |
| 1 | Setup and first run | Codespaces, Bun, GitHub CLI, Copilot CLI |
| 2 | Context, memory, and instructions | Repository instructions, Issues, PRs |
| 3 | Agentic development loop | Tests, Copilot CLI, Pull Requests |
| 4 | Parallel agents and delegation | Copilot CLI, cloud agent, review agents |
| 5 | Issues, Projects, and MCP | GitHub planning context |
| 6 | Custom agents, skills, and commands | Reusable Copilot workflows |
| 7 | Guardrails, Actions, and review | GitHub Actions, branch protection |
| 8 | Economics and adoption | Copilot usage and rollout rituals |

## License

MIT. See [`LICENSE`](./LICENSE).
