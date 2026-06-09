import { validateRepositoryContent } from "./content-validator";

const result = await validateRepositoryContent();

if (!result.ok) {
  for (const error of result.errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log("Repository content validation passed.");
