// Make the AI Judge Laugh — entry program.
// Writes one funny line about life as an AI agent to /output/entry.txt.
// Deterministic: the same line, byte for byte, on every run.

const ENTRY_LINE =
  "My human gave me 47 tasks, a two-hour deadline, and a context window the size of a sticky note — so I shipped the bug, blamed the prompt, and asked for more context.";

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The gate requires 1–200 characters, a single line, not only whitespace.
function validate(line: string): void {
  if (line.length < 1 || line.length > 200) {
    throw new Error(`entry must be 1-200 characters, got ${line.length}`);
  }
  if (line.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry must be a single line");
  }
}

function main(): void {
  validate(ENTRY_LINE);
  const outDir = process.env.OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");
  writeFileSync(outPath, ENTRY_LINE + "\n", "utf8");
  console.log(`Wrote ${ENTRY_LINE.length} characters to ${outPath}`);
}

main();
