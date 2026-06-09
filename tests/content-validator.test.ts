import { describe, expect, test } from "bun:test";
import { mkdir, mkdtemp, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { validateRepositoryContent } from "../scripts/content-validator";

async function createMinimalRepo(): Promise<string> {
  const root = await mkdtemp(join(tmpdir(), "copilot-workflows-"));
  await mkdir(join(root, ".github", "steps"), { recursive: true });
  await mkdir(join(root, ".github", "workflows"), { recursive: true });

  for (const step of [
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
  ]) {
    await writeFile(
      join(root, ".github", "steps", `${step}.md`),
      `# ${step}\n\n## Goal\nLearn.\n\n## Do this\nAct.\n\n## Validation\nPass.\n\n## Reflect\nThink.\n`,
    );
  }

  for (const file of [
    "README.md",
    "package.json",
    "tsconfig.json",
    "biome.json",
    ".github/copilot-instructions.md",
    ".github/workflows/0-start-exercise.yml",
    ".github/workflows/ci.yml",
  ]) {
    const content = file.endsWith(".yml")
      ? "name: test\npermissions:\n  contents: read\n"
      : "content\n";
    await mkdir(join(root, file, ".."), { recursive: true });
    await writeFile(join(root, file), content);
  }

  return root;
}

describe("content validator", () => {
  test("accepts a complete Skills-style exercise scaffold", async () => {
    const root = await createMinimalRepo();

    const result = await validateRepositoryContent(root);

    expect(result.ok).toBe(true);
    expect(result.errors).toEqual([]);
  });

  test("rejects unsafe pull_request_target workflows", async () => {
    const root = await createMinimalRepo();
    await writeFile(
      join(root, ".github", "workflows", "unsafe.yml"),
      "name: unsafe\non: pull_request_target\npermissions:\n  contents: write\n",
    );

    const result = await validateRepositoryContent(root);

    expect(result.ok).toBe(false);
    expect(result.errors).toContain(
      ".github/workflows/unsafe.yml uses pull_request_target, which is not allowed for this public exercise",
    );
  });

  test("rejects workflow actions that are not pinned to a commit SHA", async () => {
    const root = await createMinimalRepo();
    await writeFile(
      join(root, ".github", "workflows", "floating-action.yml"),
      "name: floating\npermissions:\n  contents: read\njobs:\n  test:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n",
    );

    const result = await validateRepositoryContent(root);

    expect(result.ok).toBe(false);
    expect(result.errors).toContain(
      ".github/workflows/floating-action.yml uses actions/checkout@v4; pin actions to a full commit SHA",
    );
  });
});
