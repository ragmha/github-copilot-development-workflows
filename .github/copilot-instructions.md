# Copilot instructions

This repository is educational content plus a small TypeScript + Bun app called Release Radar.

## Goals

- Teach GitHub-native Copilot workflows by having learners ship a concrete Release Radar feature through Issues, Pull Requests, Codespaces, Actions, and MCP context.
- Keep explanations friendly, practical, and beginner-accessible.
- Use original wording and public GitHub documentation links.

## Code conventions

- Use TypeScript with strict types.
- Use Bun for package management, tests, and scripts.
- Prefer behavior tests through public interfaces.
- Keep examples small enough to read during a workshop.
- Keep Release Radar behavior centered on observable release-note output from GitHub pull request metadata.

## Safety rules

- Do not add secrets or require secrets.
- Do not use `pull_request_target`.
- Keep workflow permissions explicit and least-privilege.
- Run `bun test`, `bun run lint`, and `bun run validate` before publishing changes.
