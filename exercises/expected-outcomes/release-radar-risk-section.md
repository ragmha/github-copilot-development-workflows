# Expected outcome: Release Radar risk section

The learner's pull request should add a **Risks to review** section to Release Radar.

## Acceptance criteria

- Merged PRs labeled `security`, `dependency`, or `migration` appear under `## Risks to review`.
- Unmerged PRs are ignored.
- A risky PR can still appear in its normal section, such as `## Features`, when it also has a matching label.
- `## Risks to review` appears after `## Breaking changes` and before `## Features`.
- Labels are matched case-insensitively.
- The behavior is covered by a failing test before implementation.

## Example

Input:

```ts
buildReleaseDraft({
  version: "1.5.0",
  pullRequests: [
    {
      number: 41,
      title: "Remove legacy webhook payload",
      author: "mona",
      labels: ["breaking"],
      merged: true,
    },
    {
      number: 45,
      title: "Rotate dependency signing key",
      author: "octocat",
      labels: ["dependency", "security"],
      merged: true,
    },
  ],
});
```

Expected section:

```md
## Risks to review

- Rotate dependency signing key (#45) by @octocat
```

Expected order:

1. `## Breaking changes`
2. `## Risks to review`
3. `## Features`
