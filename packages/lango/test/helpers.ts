import { vi } from "vitest";

/** Shared mock TranslationProvider (SRP: one helper, no duplication). */
export function makeProvider() {
  return { translate: vi.fn(async (_language: string) => {}) };
}
