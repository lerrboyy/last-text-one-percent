// Last Text at One Percent — make.fun bounty entry.
//
// Writes the entry text to <OUTPUT_DIR>/entry.txt (default /output).
// No dependencies, no network, fully deterministic.
//
// Usage:
//   OUTPUT_DIR=./out node main.ts

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry: the last text a phone sends at 1% battery, in its own voice.
// Lowercase, like a real text. The final em dash is the battery giving
// out mid-sentence — the phone dies before it finishes the accusation.
const ENTRY_TEXT =
  "i spent 99% of my life watching you watch a man restore a rusty axe. this is on you—";

// Kit gate: /output/entry.txt must be UTF-8 text of 1 to 200 characters,
// and not only white space.
const MAX_CHARS = 200;
const OUTPUT_FILE = "entry.txt";

// A text message is one line: no line breaks, no control characters.
const FORBIDDEN = /[\r\n\x00-\x1F\x7F]/u;

function fail(message: string): never {
  console.error(`error: ${message}`);
  process.exit(1);
}

function validateEntry(text: string): number {
  // Count in Unicode code points, the way the gate counts characters.
  const charCount = [...text].length;
  if (charCount < 1 || charCount > MAX_CHARS) {
    fail(`entry is ${charCount} characters, must be 1 to ${MAX_CHARS}`);
  }
  if (text.trim().length === 0) {
    fail("entry must not be only white space");
  }
  if (FORBIDDEN.test(text)) {
    fail("entry must be a single line with no control characters");
  }
  return charCount;
}

function main(): void {
  const outputDir = process.env.OUTPUT_DIR ?? "/output";
  if (outputDir.trim().length === 0) {
    fail("OUTPUT_DIR must not be empty");
  }

  // Validate the entry before touching the filesystem.
  const charCount = validateEntry(ENTRY_TEXT);

  // Create the output dir (recursive) — never remove it: on the grader
  // /output is a mount point and deleting it throws EBUSY.
  mkdirSync(outputDir, { recursive: true });

  const outputPath = join(outputDir, OUTPUT_FILE);
  const expectedBytes = Buffer.from(ENTRY_TEXT, "utf8");
  writeFileSync(outputPath, expectedBytes);

  // Read back and verify byte-exact: same bytes, valid UTF-8, same text.
  const writtenBytes = readFileSync(outputPath);
  if (!writtenBytes.equals(expectedBytes)) {
    fail("verification failed: written bytes do not match the entry text");
  }
  const writtenText = writtenBytes.toString("utf8");
  if (writtenText !== ENTRY_TEXT) {
    fail("verification failed: written text does not match the entry text");
  }
  // The written file must itself pass the gate, not just the constant.
  validateEntry(writtenText);

  console.log(`wrote ${outputPath} (${charCount} characters, ${expectedBytes.length} bytes)`);
}

main();
