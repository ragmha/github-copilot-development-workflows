export type PullRequestSummary = {
  number: number;
  title: string;
  author: string;
  labels: string[];
  merged: boolean;
};

export type ReleaseDraftInput = {
  version: string;
  pullRequests: PullRequestSummary[];
};

type ReleaseSection = {
  heading: string;
  labels: string[];
};

const releaseSections: ReleaseSection[] = [
  {
    heading: "Breaking changes",
    labels: ["breaking", "breaking-change"],
  },
  {
    heading: "Features",
    labels: ["feature", "enhancement"],
  },
  {
    heading: "Fixes",
    labels: ["bug", "fix"],
  },
];

export function buildReleaseDraft(input: ReleaseDraftInput): string {
  const mergedPullRequests = input.pullRequests.filter(
    (pullRequest) => pullRequest.merged,
  );
  const lines = [`# Release ${input.version}`, ""];

  for (const section of releaseSections) {
    const pullRequests = mergedPullRequests.filter((pullRequest) =>
      hasAnyLabel(pullRequest, section.labels),
    );
    if (pullRequests.length === 0) {
      continue;
    }

    lines.push(`## ${section.heading}`, "");
    for (const pullRequest of pullRequests) {
      lines.push(
        `- ${pullRequest.title} (#${pullRequest.number}) by @${pullRequest.author}`,
      );
    }
    lines.push("");
  }

  return `${lines.join("\n").trimEnd()}\n`;
}

function hasAnyLabel(
  pullRequest: PullRequestSummary,
  labels: string[],
): boolean {
  const normalizedLabels = pullRequest.labels.map((label) =>
    label.toLowerCase(),
  );
  return labels.some((label) => normalizedLabels.includes(label));
}
