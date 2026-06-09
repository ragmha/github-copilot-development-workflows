import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";

const requiredFiles = [
  "README.md",
  "package.json",
  "tsconfig.json",
  "biome.json",
  ".github/copilot-instructions.md",
  ".github/workflows/0-start-exercise.yml",
  ".github/workflows/ci.yml",
];

const requiredSteps = [
  "0-welcome",
  "1-setup-and-first-run",
  "2-context-memory-and-instructions",
  "3-agentic-development-loop",
  "4-parallel-agents-and-delegation",
  "5-github-projects-issues-and-mcp",
  "6-custom-agents-skills-and-commands",
  "7-guardrails-actions-and-review",
  "8-economics-adoption-and-next-steps",
  "x-finish",
];

const requiredStepSections = [
  "## Goal",
  "## Do this",
  "## Validation",
  "## Reflect",
];

export type ValidationResult = {
  ok: boolean;
  errors: string[];
};

export async function validateRepositoryContent(
  root = process.cwd(),
): Promise<ValidationResult> {
  const errors: string[] = [];

  for (const file of requiredFiles) {
    if (!(await fileExists(join(root, file)))) {
      errors.push(`Missing required file: ${file}`);
    }
  }

  for (const step of requiredSteps) {
    const stepPath = join(root, ".github", "steps", `${step}.md`);
    const contents = await readTextIfExists(stepPath);
    if (contents === undefined) {
      errors.push(`Missing required step: .github/steps/${step}.md`);
      continue;
    }

    for (const section of requiredStepSections) {
      if (!contents.includes(section)) {
        errors.push(`.github/steps/${step}.md is missing ${section}`);
      }
    }
  }

  for (const workflow of await listWorkflowFiles(root)) {
    const contents = await readFile(
      join(root, ".github", "workflows", workflow),
      "utf8",
    );
    if (contents.includes("pull_request_target")) {
      errors.push(
        `.github/workflows/${workflow} uses pull_request_target, which is not allowed for this public exercise`,
      );
    }
    if (!contents.includes("permissions:")) {
      errors.push(
        `.github/workflows/${workflow} must declare explicit permissions`,
      );
    }
    for (const actionRef of findActionRefs(contents)) {
      if (!isFullCommitSha(actionRef.ref)) {
        errors.push(
          `.github/workflows/${workflow} uses ${actionRef.value}; pin actions to a full commit SHA`,
        );
      }
    }
  }

  return {
    ok: errors.length === 0,
    errors,
  };
}

function findActionRefs(
  contents: string,
): Array<{ value: string; ref: string }> {
  const actionRefs: Array<{ value: string; ref: string }> = [];
  const actionPattern = /^\s*-?\s*uses:\s*([^@\s]+@([a-f0-9A-F]+|[^\s#]+))/gm;

  for (const match of contents.matchAll(actionPattern)) {
    const value = match[1];
    const ref = match[2];
    if (value !== undefined && ref !== undefined) {
      actionRefs.push({ value, ref });
    }
  }

  return actionRefs;
}

function isFullCommitSha(ref: string): boolean {
  return /^[a-f0-9]{40}$/i.test(ref);
}

async function listWorkflowFiles(root: string): Promise<string[]> {
  try {
    const entries = await readdir(join(root, ".github", "workflows"), {
      withFileTypes: true,
    });
    return entries
      .filter((entry) => entry.isFile() && /\.ya?ml$/.test(entry.name))
      .map((entry) => entry.name);
  } catch {
    return [];
  }
}

async function fileExists(path: string): Promise<boolean> {
  return (await readTextIfExists(path)) !== undefined;
}

async function readTextIfExists(path: string): Promise<string | undefined> {
  try {
    return await readFile(path, "utf8");
  } catch (error) {
    if (error instanceof Error && "code" in error && error.code === "ENOENT") {
      return undefined;
    }
    throw error;
  }
}
