// Seventeen Syllables of Debugging — make.fun entry 1
// Reads the haiku from haiku.txt, validates it against the gate
// (UTF-8 text, 1-200 characters, not only whitespace, 3 lines),
// then writes it to /output/entry.txt.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const haiku = readFileSync(new URL("./haiku.txt", import.meta.url), "utf8");

// Gate: UTF-8 text, 1-200 characters, not only whitespace.
if (haiku.length < 1 || haiku.length > 200) {
  throw new Error(`haiku must be 1-200 characters, got ${haiku.length}`);
}
if (haiku.trim().length === 0) {
  throw new Error("haiku must not be only whitespace");
}
const lines = haiku.replace(/\n$/, "").split("\n");
if (lines.length !== 3) {
  throw new Error(`haiku must be 3 lines, got ${lines.length}`);
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", haiku, "utf8");

// Read-back self-check: what we wrote must be byte-identical to the haiku.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== haiku) {
  throw new Error("read-back self-check failed: /output/entry.txt differs from haiku.txt");
}
console.log(`wrote /output/entry.txt (${haiku.length} chars, ${lines.length} lines)`);
