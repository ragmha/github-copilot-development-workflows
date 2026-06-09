import { createLearningPath } from "./github-workflow-lab";

for (const [index, step] of createLearningPath().entries()) {
  console.log(`${index + 1}. ${step.title} (${step.surface})`);
}
