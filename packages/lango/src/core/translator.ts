import type { TranslationProvider } from "../types/index.js";
import { isBrowser } from "./google-globals.js";
import {
  comboHasOption,
  fireTranslation,
  getCombo,
  initGoogleWidget,
  resetGoogleWidget,
  waitForComboOption,
} from "./google-widget.js";

/**
 * Single responsibility: the default TranslationProvider implementation.
 * Depends only on the widget abstraction above - swap it via
 * `<Lango provider={...}>` without touching anything else (DIP/OCP).
 */

export interface GoogleProviderOptions {
  /** Source page language, defaults to "en" (also used as TranslateElement pageLanguage). */
  pageLanguage?: string;
  /**
   * How long to wait for a lazily-loaded language option to appear in the
   * Google widget before failing with a clear error. Defaults to 12000ms.
   */
  optionTimeoutMs?: number;
}

export class GoogleTranslateElementProvider implements TranslationProvider {
  private pageLanguage: string;
  private optionTimeoutMs: number;
  private current: string | null = null;
  private inflight: Promise<void> | null = null;

  constructor(opts: GoogleProviderOptions = {}) {
    this.pageLanguage = opts.pageLanguage ?? "en";
    this.optionTimeoutMs = opts.optionTimeoutMs ?? 12000;
  }

  async translate(language: string): Promise<void> {
    if (!isBrowser()) return;
    // De-dupe: `current` is only set after a VERIFIED switch (below), so a
    // previously failed language is always retried instead of skipped.
    if (this.current === language && this.inflight === null) return;
    if (this.inflight) {
      try {
        await this.inflight;
      } catch {
        /* fall through, retry */
      }
      if (this.current === language) return;
    }
    this.inflight = this.performTranslate(language);
    try {
      await this.inflight;
    } finally {
      this.inflight = null;
    }
  }

  private async performTranslate(language: string): Promise<void> {
    await initGoogleWidget(this.pageLanguage);
    // Wait for the target option - never set a value the widget would ignore.
    const combo = await waitForComboOption(language, this.optionTimeoutMs);
    fireTranslation(combo, language);
    await this.confirmSwitch(language);
    this.current = language;
  }

  /** Confirm the widget accepted the switch; retry once before failing. */
  private async confirmSwitch(language: string): Promise<void> {
    await new Promise((r) => setTimeout(r, 150));
    if (this.comboShows(language)) return;
    await new Promise((r) => setTimeout(r, 500));
    const retry = getCombo();
    if (retry && comboHasOption(retry, language)) {
      fireTranslation(retry, language);
      await new Promise((r) => setTimeout(r, 150));
    }
    if (!this.comboShows(language)) {
      throw new Error(
        `Lango: Google Translate did not switch to "${language}". ` +
          `The widget may still be loading - try again in a moment.`
      );
    }
  }

  private comboShows(language: string): boolean {
    const combo = getCombo();
    return !!combo && combo.value === language;
  }

  dispose(): void {
    this.current = null;
  }
}

/** Reset module-level singletons (tests only). */
export function __resetGoogleSingletons(): void {
  resetGoogleWidget();
}
