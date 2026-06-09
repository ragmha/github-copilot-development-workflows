export type LearningPathStep = {
  id: string;
  title: string;
  surface: string;
  outcome: string;
};

export function createLearningPath(): LearningPathStep[] {
  return [
    {
      id: "setup",
      title: "Set up your GitHub Copilot workspace",
      surface: "Codespaces, VS Code, GitHub CLI, Copilot CLI",
      outcome:
        "A reproducible development environment that humans and agents can share.",
    },
    {
      id: "context",
      title: "Teach Copilot the repository context",
      surface: "Repository instructions, Issues, Pull Requests",
      outcome: "Clear project guidance that reduces repeated prompting.",
    },
    {
      id: "agentic-loop",
      title: "Practice the agentic development loop",
      surface: "Issues, tests, Copilot CLI, Pull Requests",
      outcome: "A test-first workflow for moving from plan to reviewed change.",
    },
    {
      id: "parallel-agents",
      title: "Delegate work across agents safely",
      surface: "Copilot CLI, cloud agent, review agents",
      outcome:
        "A task split that keeps one source of truth while using parallel help.",
    },
    {
      id: "projects-mcp",
      title: "Connect work to GitHub planning context",
      surface: "Issues, Projects, labels, MCP",
      outcome: "Traceable work items that agents and teammates can resume.",
    },
    {
      id: "custom-workflows",
      title: "Create reusable Copilot workflows",
      surface: "Custom instructions, agents, skills, prompts",
      outcome:
        "Repeatable team workflows with clear inputs, outputs, and guardrails.",
    },
    {
      id: "guardrails",
      title: "Add automation that protects quality",
      surface: "GitHub Actions, branch protection, code review",
      outcome: "Automated checks that make agentic work safer to merge.",
    },
    {
      id: "economics",
      title: "Make the workflow sustainable",
      surface: "Copilot usage, models, adoption rituals",
      outcome:
        "A practical rollout plan grounded in cost, quality, and team habits.",
    },
  ];
}
