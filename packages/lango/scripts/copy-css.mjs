import { copyFileSync, mkdirSync } from "node:fs";

mkdirSync(new URL("../dist", import.meta.url), { recursive: true });
copyFileSync(
  new URL("../src/styles/lango.css", import.meta.url),
  new URL("../dist/lango.css", import.meta.url)
);
console.log("copied lango.css -> dist/lango.css");
