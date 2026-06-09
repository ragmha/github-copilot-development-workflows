# Facilitator notes

This repository can run as a self-paced GitHub Skills-style exercise or as a guided session.

## Recommended facilitation rhythm

1. Frame each step as a workflow shift, not a feature tour.
2. Ask learners to keep the issue as the shared source of truth.
3. Encourage TDD: one failing behavior test, one minimal implementation, one review.
4. Pause after delegation and guardrails steps for group discussion.
5. End with one concrete workflow habit learners will try in a real repository.

## Common coaching prompts

- What context should be durable in GitHub rather than private in chat?
- Which task can safely run in parallel?
- What validation would let you trust an agent-produced pull request?
- What metric would prove this workflow improves delivery quality?

## Skills-style coaching rubric

| Moment | Good facilitator move | Avoid |
|---|---|---|
| Learner is stuck on setup | Point them to the verifier output and ask what the next smallest check is | Taking over their terminal immediately |
| Learner asks Copilot a vague prompt | Ask them to anchor the prompt in the issue, files, and expected validation | Rewriting the whole prompt for them |
| A test fails | Ask for red/green evidence in the issue before discussing the implementation | Treating the failure as a detour from the lesson |
| A workflow fails | Open the run, inspect the failing step, and turn it into a retry plan | Rerunning blindly |
| Reflection feels abstract | Ask what GitHub artifact would preserve the learning for the next teammate | Ending with generic enthusiasm |

## Hint ladder

1. Ask the learner to restate the goal from the step.
2. Ask which GitHub artifact should hold the source of truth.
3. Ask which command or workflow validates the next move.
4. Offer a narrow hint that points to a file or command.
5. Only then show an example.
