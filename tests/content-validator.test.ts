import { describe, expect, test } from "bun:test";
import { mkdir, mkdtemp, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { validateRepositoryContent } from "../scripts/content-validator";

async function createMinimalRepo(): Promise<string> {
  const root = await mkdtemp(join(tmpdir(), "copilot-workflows-"));
  await mkdir(join(root, ".github", "steps"), { recursive: true });
  await mkdir(join(root, ".github", "workflows"), { recursive: true });
  await mkdir(join(root, "docs", "diagrams"), { recursive: true });
  await mkdir(join(root, "docs"), { recursive: true });

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
    "docs/diagrams/copilot-workflow.drawio",
    "docs/diagrams/copilot-workflow.png",
    "docs/visual-overview.md",
    "docs/skills-alignment.md",
    ".github/copilot-instructions.md",
    ".github/workflows/0-start-exercise.yml",
    ".github/workflows/ci.yml",
  ]) {
    const content = file.endsWith(".yml")
      ? "name: test\npermissions:\n  contents: read\n"
      : file === "README.md"
        ? "GitHub Skills alignment\nRelease Radar\nrisk-section feature\nrelease notes from GitHub pull requests\n![Workflow map](docs/diagrams/copilot-workflow.png)\nhttps://learn.github.com/skills\n"
        : file === "docs/skills-alignment.md"
          ? "## Design principles\nIssues\nGitHub Actions\nCodespaces\npersonal copy\n\n## Official resources\nhttps://github.com/skills/exercise-creator\nhttps://github.com/skills/exercise-template\nhttps://github.com/skills/exercise-toolkit\n"
          : file === "docs/visual-overview.md"
            ? "GitHub Copilot workflow map\n\n[Source diagram](diagrams/copilot-workflow.drawio)\n\n![Workflow map](diagrams/copilot-workflow.png)\n"
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

  test("requires GitHub Skills alignment guidance", async () => {
    const root = await createMinimalRepo();
    await writeFile(
      join(root, "docs", "skills-alignment.md"),
      "## Design principles\n",
    );

    const result = await validateRepositoryContent(root);

    expect(result.ok).toBe(false);
    expect(result.errors).toContain(
      "docs/skills-alignment.md must describe Issues, GitHub Actions, Codespaces, personal copies, and official Skills resources",
    );
  });

  test("rejects workflow run blocks that interpolate GitHub event context", async () => {
    const root = await createMinimalRepo();
    const eventContext = "$" + "{{ github.event.issue.title }}";
    await writeFile(
      join(root, ".github", "workflows", "event-injection.yml"),
      `name: event-injection\npermissions:\n  contents: read\njobs:\n  test:\n    runs-on: ubuntu-latest\n    steps:\n      - run: echo "${eventContext}"\n`,
    );

    const result = await validateRepositoryContent(root);

    expect(result.ok).toBe(false);
    expect(result.errors).toContain(
      ".github/workflows/event-injection.yml interpolates github.event context inside a run block; pass event data through env instead",
    );
  });

  test("rejects multiline workflow run blocks that interpolate GitHub event context", async () => {
    const root = await createMinimalRepo();
    const eventContext = "$" + "{{ github.event.comment.body }}";
    await writeFile(
      join(root, ".github", "workflows", "multiline-event-injection.yml"),
      `name: multiline-event-injection\npermissions:\n  contents: read\njobs:\n  test:\n    runs-on: ubuntu-latest\n    steps:\n      - run: |\n          echo "${eventContext}"\n`,
    );

    const result = await validateRepositoryContent(root);

    expect(result.ok).toBe(false);
    expect(result.errors).toContain(
      ".github/workflows/multiline-event-injection.yml interpolates github.event context inside a run block; pass event data through env instead",
    );
  });

  test("rejects non-HTTPS or untrusted markdown links", async () => {
    const root = await createMinimalRepo();
    await writeFile(
      join(root, "docs", "unsafe-links.md"),
      "[bad](http://example.com)",
    );

    const result = await validateRepositoryContent(root);

    expect(result.ok).toBe(false);
    expect(result.errors).toContain(
      "docs/unsafe-links.md links to untrusted or non-HTTPS URL: http://example.com",
    );
  });

  test("requires the README to embed the workflow visualization", async () => {
    const root = await createMinimalRepo();
    await writeFile(
      join(root, "README.md"),
      "GitHub Skills alignment\nhttps://learn.github.com/skills\n",
    );

    const result = await validateRepositoryContent(root);

    expect(result.ok).toBe(false);
    expect(result.errors).toContain(
      "README.md must embed docs/diagrams/copilot-workflow.png",
    );
  });

  test("requires a concrete Release Radar app spine", async () => {
    const root = await createMinimalRepo();
    await writeFile(
      join(root, "README.md"),
      "GitHub Skills alignment\n![Workflow map](docs/diagrams/copilot-workflow.png)\nhttps://learn.github.com/skills\n",
    );

    const result = await validateRepositoryContent(root);

    expect(result.ok).toBe(false);
    expect(result.errors).toContain(
      "README.md must explain the concrete Release Radar app and risk-section feature learners build",
    );
  });
});
