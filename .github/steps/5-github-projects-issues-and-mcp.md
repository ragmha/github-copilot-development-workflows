# Step 5: Issues, Projects, and MCP

## Goal

Connect code work to planning context that humans and agents can both read.

## Do this

1. Create or update an issue with:
   - problem statement,
   - acceptance criteria,
   - test expectations,
   - risk notes,
   - links to related files.
2. If your environment has MCP configured, ask Copilot to inspect GitHub issue or pull request context through MCP.
3. If MCP is not available, use `gh issue view` and `gh pr view` as the GitHub-native fallback.

## Validation

The issue should be detailed enough that a different teammate or agent could resume the work without reading your private chat history.

Why this matters in GitHub: Issues and Projects make planning context queryable, linkable, and durable across humans, agents, and future sessions.

Stretch: use `gh issue view` or an MCP-enabled client to summarize the issue without opening the browser.

## Reflect

What context should be captured in GitHub so the team benefits from it later?
