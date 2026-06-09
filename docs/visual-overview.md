# Visual overview

The workflow map shows how the exercise fits together: learners work in their own repository copy, use the exercise issue as a mission log, apply Copilot inside a TDD loop, and rely on GitHub Actions plus security review as guardrails before carrying the habit into a real team workflow.

![GitHub Copilot workflow map](diagrams/copilot-workflow.png)

## How to read the diagram

1. **Start with a learner-owned copy.** Codespaces or local Bun setup gives the learner and Copilot the same working baseline.
2. **Use the issue as the mission log.** Step comments, red/green evidence, delegation notes, and adoption reflections stay in GitHub.
3. **Run the TDD loop.** Plan from the issue, write one failing behavior test, implement the minimal change, and make the checks green.
4. **Let Actions make quality visible.** Tests, lint, typecheck, content validation, and security review create shared confidence.
5. **Close with adoption.** The final note turns exercise output into one reusable workflow habit.

The editable source is [`diagrams/copilot-workflow.drawio`](diagrams/copilot-workflow.drawio).
