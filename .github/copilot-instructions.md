# Copilot instructions

This repository is educational content plus a small TypeScript + Bun lab.

## Goals

- Teach GitHub-native Copilot workflows through Issues, Pull Requests, Codespaces, Actions, and MCP context.
- Keep explanations friendly, practical, and beginner-accessible.
- Use original wording and public GitHub documentation links.

## Code conventions

- Use TypeScript with strict types.
- Use Bun for package management, tests, and scripts.
- Prefer behavior tests through public interfaces.
- Keep examples small enough to read during a workshop.

## Safety rules

- Do not add secrets or require secrets.
- Do not use `pull_request_target`.
- Keep workflow permissions explicit and least-privilege.
- Run `bun test`, `bun run lint`, and `bun run validate` before publishing changes.
