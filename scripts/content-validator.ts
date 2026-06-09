import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";

const requiredFiles = [
  "README.md",
  "package.json",
  "tsconfig.json",
  "biome.json",
  "docs/skills-alignment.md",
  "docs/visual-overview.md",
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

const skillsAlignmentRequirements = [
  "Issues",
  "GitHub Actions",
  "Codespaces",
  "personal copy",
  "https://github.com/skills/exercise-creator",
  "https://github.com/skills/exercise-template",
  "https://github.com/skills/exercise-toolkit",
];

const trustedLinkHosts = new Set([
  "codespaces.new",
  "docs.github.com",
  "github.com",
  "learn.github.com",
]);

const asciiDiagramRequirements = [
  "```text",
  "Release Radar app",
  "Feature issue",
  "Failing test",
  "Copilot implementation",
  "Pull request",
  "GitHub Actions",
  "PR-ready feature",
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
    if (workflowInterpolatesEventContextInRunBlock(contents)) {
      errors.push(
        `.github/workflows/${workflow} interpolates github.event context inside a run block; pass event data through env instead`,
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

  const skillsAlignment = await readTextIfExists(
    join(root, "docs", "skills-alignment.md"),
  );
  if (
    skillsAlignment !== undefined &&
    !skillsAlignmentRequirements.every((requirement) =>
      skillsAlignment.includes(requirement),
    )
  ) {
    errors.push(
      "docs/skills-alignment.md must describe Issues, GitHub Actions, Codespaces, personal copies, and official Skills resources",
    );
  }

  const readme = await readTextIfExists(join(root, "README.md"));
  if (
    readme !== undefined &&
    !asciiDiagramRequirements.every((requirement) =>
      readme.includes(requirement),
    )
  ) {
    errors.push(
      "README.md must include the ASCII Release Radar workflow diagram",
    );
  }
  if (
    readme !== undefined &&
    !(
      readme.includes("Release Radar") &&
      readme.includes("risk-section feature") &&
      readme.includes("release notes from GitHub pull requests")
    )
  ) {
    errors.push(
      "README.md must explain the concrete Release Radar app and risk-section feature learners build",
    );
  }

  for (const markdownFile of await listMarkdownFiles(root)) {
    const contents = await readFile(join(root, markdownFile), "utf8");
    for (const url of findMarkdownUrls(contents)) {
      if (!isTrustedHttpsUrl(url)) {
        errors.push(
          `${markdownFile} links to untrusted or non-HTTPS URL: ${url}`,
        );
      }
    }
  }

  return {
    ok: errors.length === 0,
    errors,
  };
}

function workflowInterpolatesEventContextInRunBlock(contents: string): boolean {
  const lines = contents.split("\n");

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    if (line === undefined) {
      continue;
    }

    const runMatch = line.match(/^(\s*)-?\s*run:\s*(.*)$/);
    if (runMatch === null) {
      continue;
    }

    const runIndent = runMatch[1]?.length ?? 0;
    const inlineRunCommand = runMatch[2] ?? "";
    if (interpolatesGitHubEventContext(inlineRunCommand)) {
      return true;
    }

    if (inlineRunCommand.trim() !== "|" && inlineRunCommand.trim() !== ">") {
      continue;
    }

    for (
      let blockIndex = index + 1;
      blockIndex < lines.length;
      blockIndex += 1
    ) {
      const blockLine = lines[blockIndex];
      if (blockLine === undefined) {
        continue;
      }

      const blockIndent = blockLine.match(/^\s*/)?.[0].length ?? 0;
      if (blockLine.trim() !== "" && blockIndent <= runIndent) {
        break;
      }

      if (interpolatesGitHubEventContext(blockLine)) {
        return true;
      }
    }
  }

  return false;
}

function interpolatesGitHubEventContext(value: string): boolean {
  return /\$\{\{\s*github\.event\./.test(value);
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

async function listMarkdownFiles(
  root: string,
  directory = ".",
): Promise<string[]> {
  const directoryPath = join(root, directory);
  const entries = await readdir(directoryPath, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const relativePath =
      directory === "." ? entry.name : join(directory, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === ".git" || entry.name === "node_modules") {
        continue;
      }
      files.push(...(await listMarkdownFiles(root, relativePath)));
      continue;
    }

    if (entry.isFile() && entry.name.endsWith(".md")) {
      files.push(relativePath);
    }
  }

  return files;
}

function findMarkdownUrls(contents: string): string[] {
  const urls: string[] = [];
  const markdownLinkPattern = /\[[^\]]+\]\((https?:\/\/[^)\s]+)\)/g;

  for (const match of contents.matchAll(markdownLinkPattern)) {
    const url = match[1];
    if (url !== undefined) {
      urls.push(url);
    }
  }

  return urls;
}

function isTrustedHttpsUrl(url: string): boolean {
  try {
    const parsedUrl = new URL(url);
    return (
      parsedUrl.protocol === "https:" &&
      trustedLinkHosts.has(parsedUrl.hostname)
    );
  } catch {
    return false;
  }
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
