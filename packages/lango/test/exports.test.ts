import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import {
  Lango,
  LanguageSwitcher,
  useLango,
  GoogleTranslateElementProvider,
  LANGUAGE_META,
  getLanguageMeta,
  ensureLangoStyles,
} from "../src/index";

describe("package exports (v1.x public API)", () => {
  it("exposes the v0.1 core API unchanged", () => {
    expect(typeof Lango).toBe("function");
    expect(typeof LanguageSwitcher).toBe("function");
    expect(typeof useLango).toBe("function");
  });

  it("exposes the extended public API", () => {
    expect(typeof GoogleTranslateElementProvider).toBe("function");
    expect(typeof LANGUAGE_META).toBe("object");
    expect(typeof getLanguageMeta).toBe("function");
    expect(typeof ensureLangoStyles).toBe("function");
  });

  it("does not leak internals", async () => {
    const mod = (await import("../src/index")) as Record<string, unknown>;
    const names = Object.keys(mod).sort();
    expect(names).toEqual(
      [
        "GoogleTranslateElementProvider",
        "LANGUAGE_META",
        "Lango",
        "LanguageSwitcher",
        "ensureLangoStyles",
        "getLanguageMeta",
        "useLango",
      ].sort()
    );
  });
});

describe("published build artifacts", () => {
  // Vitest runs with cwd = the package root.
  const dist = (f: string) => join(process.cwd(), "dist", f);

  it.each(["index.js", "index.cjs", "index.d.ts", "index.d.cts", "lango.css"])(
    "dist/%s exists (run `npm run build --workspace=lango-i18n` first)",
    (f) => {
      expect(existsSync(dist(f))).toBe(true);
    }
  );

  it("ships TypeScript declarations for the public API", () => {
    const dts = readFileSync(dist("index.d.ts"), "utf8");
    for (const name of [
      "Lango",
      "LanguageSwitcher",
      "useLango",
      "LangoProps",
      "TranslationProvider",
    ]) {
      expect(dts).toContain(name);
    }
  });
});
