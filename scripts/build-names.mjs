import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const mdPath = path.join(root, "src", "data", "raw-names-list.md");
const outPath = path.join(root, "src", "data", "names.ts");

const text = fs.readFileSync(mdPath, "utf8");
const lines = text.split(/\r?\n/);
/** @type {Map<string, string>} normalized NFC → display form */
const seen = new Map();

/** Tokens that appear in the raw dump but are not usable given names. */
const DENY = new Set(
  ["Авария", "Ру"].map((s) => s.normalize("NFC")),
);

function isSectionHeader(line) {
  return /^[\p{L}]$/u.test(line);
}

function extractName(line) {
  line = line.trim();
  if (!line) return null;
  if (isSectionHeader(line)) return null;
  const idxImya = line.indexOf(" (имя)");
  if (idxImya !== -1) return line.slice(0, idxImya).trim();
  const idxZhen = line.indexOf(" (женское имя)");
  if (idxZhen !== -1) return line.slice(0, idxZhen).trim();
  return line;
}

for (const line of lines) {
  const name = extractName(line);
  if (!name) continue;
  if (!/^[\p{L}\s\-'.]+$/u.test(name)) continue;
  if (name.length < 2) continue;
  const key = name.normalize("NFC");
  if (DENY.has(key)) continue;
  if (!seen.has(key)) seen.set(key, key);
}

const sorted = [...seen.values()].sort((a, b) => a.localeCompare(b, "ru"));

const body = sorted
  .map((n) => `  ${JSON.stringify(n)},`)
  .join("\n");

const file = `/** Curated female given names (from \`raw-names-list.md\`): section letters, wiki clutter, and exact duplicates removed. */
export const NAMES = [
${body}
] as const;

export type Name = (typeof NAMES)[number];
`;

fs.writeFileSync(outPath, file, "utf8");
console.log(`Wrote ${sorted.length} names → ${path.relative(root, outPath)}`);
