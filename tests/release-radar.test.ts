import { describe, expect, test } from "bun:test";
import { buildReleaseDraft } from "../src/release-radar";

describe("Release Radar", () => {
  test("builds release notes from merged pull requests", () => {
    const draft = buildReleaseDraft({
      version: "1.4.0",
      pullRequests: [
        {
          number: 42,
          title: "Add saved searches",
          author: "mona",
          labels: ["feature"],
          merged: true,
        },
        {
          number: 43,
          title: "Fix empty dashboard crash",
          author: "hubot",
          labels: ["bug"],
          merged: true,
        },
        {
          number: 44,
          title: "Draft billing page",
          author: "octo",
          labels: ["feature"],
          merged: false,
        },
      ],
    });

    expect(draft).toBe(`# Release 1.4.0

## Features

- Add saved searches (#42) by @mona

## Fixes

- Fix empty dashboard crash (#43) by @hubot
`);
  });

  test("calls out breaking changes before regular sections", () => {
    const draft = buildReleaseDraft({
      version: "2.0.0",
      pullRequests: [
        {
          number: 51,
          title: "Remove legacy export endpoint",
          author: "octocat",
          labels: ["breaking", "feature"],
          merged: true,
        },
        {
          number: 52,
          title: "Add CSV export",
          author: "mona",
          labels: ["feature"],
          merged: true,
        },
      ],
    });

    expect(draft).toContain(
      "## Breaking changes\n\n- Remove legacy export endpoint (#51) by @octocat",
    );
    expect(draft.indexOf("## Breaking changes")).toBeLessThan(
      draft.indexOf("## Features"),
    );
  });
});
