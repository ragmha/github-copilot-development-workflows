# Step 3: Write the failing test

## Goal

Create the red part of the red-green loop for the risk-section feature.

## Do this

1. Open `tests/release-radar.test.ts`.
2. Add one behavior test for this scenario:

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

3. Assert that the output contains:

```md
## Risks to review

- Rotate dependency signing key (#45) by @octocat
```

4. Add a feature PR to the test input, then assert section order:
   - `## Breaking changes` appears before `## Risks to review`.
   - `## Risks to review` appears before `## Features`.
5. Run:

```bash
bun test
```

6. Paste the failing test summary into the issue.

## Validation

The new test should fail because `src/release-radar.ts` does not yet create a risk section. If the test passes before implementation, the test is not proving the missing behavior.

Why this matters in GitHub: the issue records intent, the test records expected behavior, and the future PR can show exactly what changed.

## Reflect

How did the acceptance criteria shape the test you wrote?
