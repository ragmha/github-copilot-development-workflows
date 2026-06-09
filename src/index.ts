import { buildReleaseDraft } from "./release-radar";

console.log(
  buildReleaseDraft({
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
  }),
);
