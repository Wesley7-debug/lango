// Single source of truth for Lango's default stylesheet (SRP/DRY):
// reads the small, hand-edited CSS files and generates BOTH the runtime
// auto-inject string (src/styles/cssText.ts) and the legacy published file
// (dist/lango.css), so the two can never drift apart.
// Runs under Node, pnpm, Yarn, or Bun - only node:fs is used.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const root = new URL("..", import.meta.url);
const read = (p) => readFileSync(new URL(p, root), "utf8");

const css = ["src/styles/switcher.css", "src/styles/google-element.css"]
  .map(read)
  .join("\n");

mkdirSync(new URL("../dist", import.meta.url), { recursive: true });
writeFileSync(new URL("../dist/lango.css", import.meta.url), css);

const doc = `/**
 * Lango default stylesheet, injected automatically at runtime.
 *
 * GENERATED - do not edit. Edit src/styles/switcher.css or
 * src/styles/google-element.css, then run \`npm run build:css\`.
 *
 * You do NOT need to import any CSS. \`<Lango>\` injects this once
 * (guarded by \`#lango-styles\`) so the switcher looks good out of the box.
 * To opt out: \`window.__LANGO_NO_AUTO_CSS__ = true\` before mounting.
 */
`;

writeFileSync(
  new URL("../src/styles/cssText.ts", import.meta.url),
  `${doc}\nexport const LANGO_CSS = ${JSON.stringify(css)};\n`
);

console.log("built cssText.ts + dist/lango.css from switcher.css + google-element.css");
