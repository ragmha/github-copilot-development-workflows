# Release Radar: GitHub Copilot Development Workflows

> A GitHub Skills-style exercise where you use GitHub Copilot to ship a real TypeScript feature: better release notes from GitHub pull requests.

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/ragmha/github-copilot-development-workflows?quickstart=1)

## The point of the exercise

You are maintaining **Release Radar**, a tiny TypeScript + Bun app that builds release notes from GitHub pull requests. The app already groups merged PRs into **Breaking changes**, **Features**, and **Fixes**.

Your job is to ship one concrete product improvement:

> Add a **risk-section feature** so Release Radar creates a **Risks to review** section for merged PRs labeled `security`, `dependency`, or `migration`.

By the end, you should have a PR-ready change with:

- a GitHub Issue containing the problem and acceptance criteria,
- a failing behavior test you wrote first,
- a Copilot-assisted implementation in `src/release-radar.ts`,
- passing tests, lint, typecheck, and content validation,
- a pull request description that explains the change and evidence.

That is the workflow this repo teaches: not “use AI in general,” but **turn a GitHub issue into a tested, reviewed, merge-ready app feature**.

## What you will build

Release Radar turns release notes from GitHub pull requests into Markdown:

```ts
buildReleaseDraft({
  version: "1.4.0",
  pullRequests: [
    { number: 42, title: "Add saved searches", author: "mona", labels: ["feature"], merged: true },
    { number: 43, title: "Fix empty dashboard crash", author: "hubot", labels: ["bug"], merged: true },
  ],
});
```

The starter app produces:

```md
# Release 1.4.0

## Features

- Add saved searches (#42) by @mona

## Fixes

- Fix empty dashboard crash (#43) by @hubot
```

The feature you build adds a risk section when the release includes risky work:

```md
## Risks to review

- Rotate dependency signing key (#45) by @octocat
```

## Visual workflow map

![GitHub Copilot workflow map](docs/diagrams/copilot-workflow.png)

See [`docs/visual-overview.md`](./docs/visual-overview.md) for a guided explanation and the editable draw.io source.

## How the exercise works

1. Open this repository in Codespaces or clone it locally.
2. Run `bun install`.
3. Run the app with `bun start` and inspect `src/release-radar.ts`.
4. Start the exercise from the **Actions** tab by running **Start exercise**.
5. Follow the issue comments posted from `.github/steps/`.
6. Ship the risk-section feature through a branch and pull request.

The content is readable without Actions, too. Start with [`.github/steps/0-welcome.md`](./.github/steps/0-welcome.md).

## GitHub Skills alignment

This repository follows the same learning shape as GitHub Skills, adapted for a concrete Copilot coding task:

- **Issue-guided learning:** the feature issue is your mission log.
- **Actions-gated progress:** workflows provide feedback and keep validation visible.
- **Learner-owned copy:** you work in your own repository copy so branches, issues, PRs, and Actions are real.
- **Real workflow surfaces:** Codespaces, Issues, Pull Requests, Actions, and Copilot all stay in the loop.

For the official Skills ecosystem, see the [GitHub Skills catalog](https://learn.github.com/skills), [Exercise Creator](https://github.com/skills/exercise-creator), [Exercise Template](https://github.com/skills/exercise-template), and [Exercise Toolkit](https://github.com/skills/exercise-toolkit).

## Choose your path

| Path | Best for | How to use it |
|---|---|---|
| Beginner | You want a guided first Copilot CLI workflow | Follow every step and paste key outputs into the issue |
| Experienced | You already know Issues, PRs, Actions, and Codespaces | Implement the feature, then use the stretch prompts for review depth |
| Facilitated | You are running a group session | Use `docs/facilitator-notes.md` for pacing, hints, and reflection prompts |

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
| `src/release-radar.ts` | Release Radar app logic |
| `tests/release-radar.test.ts` | Behavior tests for release-note generation |
| `.github/steps/` | Learner-facing issue comments for each exercise step |
| `.github/workflows/` | GitHub Actions that start the exercise, advance steps, and run CI |
| `.github/copilot-instructions.md` | Durable instructions for Copilot agents working in this repo |
| `scripts/` | Environment and content validation helpers |
| `docs/` | Setup guides, facilitator notes, and visual overview |
| `appendices/` | Reference material for Copilot surfaces, pricing, and troubleshooting |
| `exercises/expected-outcomes/` | Acceptance criteria and examples for the target feature |

## Commands

```bash
bun install
bun start
bun test
bun run lint
bun run typecheck
bun run validate
```

## Exercise steps

| Step | Concrete outcome | Main GitHub surface |
|---|---|---|
| 0 | Understand Release Radar and the target risk-section feature | Codespaces, source files |
| 1 | Create a feature issue with acceptance criteria | Issues |
| 2 | Give Copilot durable app context | Repository instructions, issue context |
| 3 | Write the failing test for `Risks to review` | Tests, Copilot CLI |
| 4 | Implement the feature in `src/release-radar.ts` | Copilot CLI, source code |
| 5 | Open a PR linked to the issue | Pull Requests |
| 6 | Use review to harden edge cases | Copilot review, PR discussion |
| 7 | Make CI and guardrails green | GitHub Actions |
| 8 | Capture what this workflow changes for a real team | Issue reflection |

## License

MIT. See [`LICENSE`](./LICENSE).
