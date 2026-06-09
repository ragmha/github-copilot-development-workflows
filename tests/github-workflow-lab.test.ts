import { describe, expect, test } from "bun:test";
import { createLearningPath } from "../src/github-workflow-lab";

describe("GitHub Copilot workflow lab", () => {
  test("presents an ordered GitHub-native learning path", () => {
    const path = createLearningPath();

    expect(path.map((step) => step.id)).toEqual([
      "setup",
      "context",
      "agentic-loop",
      "parallel-agents",
      "projects-mcp",
      "custom-workflows",
      "guardrails",
      "economics",
    ]);
    expect(path[0]).toMatchObject({
      title: "Set up your GitHub Copilot workspace",
      surface: "Codespaces, VS Code, GitHub CLI, Copilot CLI",
    });
    expect(path.at(-1)).toMatchObject({
      title: "Make the workflow sustainable",
      surface: "Copilot usage, models, adoption rituals",
    });
  });
});
