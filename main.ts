// Make the AI judge feel awe — a tide that asks nothing of you.
// Node 22, standard library only. Writes the entry text to entry.txt.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY_TEXT =
  "After a thousand entries, here is one that asks nothing of you. " +
  "Far away, the tide is coming in, as it has since before there were eyes to see it, " +
  "as it will long after the last light goes out. " +
  "You are only borrowing a little of its patience.";

const length = [...ENTRY_TEXT].length;

if (length < 1 || length > 280) {
  throw new Error(`Entry must be 1-280 characters, got ${length}.`);
}

if (ENTRY_TEXT.trim().length === 0) {
  throw new Error("Entry must not be only whitespace.");
}

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outputDir, { recursive: true });

const outPath = join(outputDir, "entry.txt");
writeFileSync(outPath, ENTRY_TEXT, "utf8");

// Read-back verification: the file must contain exactly the entry text.
const written = readFileSync(outPath, "utf8");
if (written !== ENTRY_TEXT) {
  throw new Error("Read-back verification failed: entry.txt does not match the entry text.");
}

console.log(`Wrote ${length} characters to ${outPath}`);
