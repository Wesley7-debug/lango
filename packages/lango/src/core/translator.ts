import type { TranslationProvider } from "../types/index.js";

/**
 * GOOGLE INTEGRATION — architecture note (also in README/docs):
 *
 * MVP default uses the official **Google Translate Element**
 * (`translate.google.com/translate_a/element.js`), the no-key, client-side
 * product Google offers for whole-website translation.
 *
 * Why this mechanism:
 * - Google Cloud Translation API requires a server-side API key + billing.
 *   Bundling that key in browser JS would leak secrets, so it cannot be
 *   the zero-config default. It remains supported via a custom
 *   `TranslationProvider` that calls YOUR server endpoint.
 * - The Translate Element is the only Google website-translation product
 *   that works with no account / no API key, which the Lango DX requires.
 *
 * Compliance:
 * - We load the official script and instantiate the official
 *   `google.translate.TranslateElement` (InlineLayout.SIMPLE, autoDisplay off).
 * - The widget container is visually hidden with plain CSS positioning
 *   (off-screen, 1px) — a documented CSS customization, NOT JS deletion.
 * - We do NOT run intervals that delete Google nodes, do NOT rely on
 *   Google's internal class names, and do NOT spoof attribution.
 * - Google's "Powered by Google" attribution is preserved via the
 *   `showAttribution` line in <LanguageSwitcher/> (default ON) and the
 *   hidden widget itself remains in the DOM.
 * - Known limitation documented to users: Google may still inject its top
 *   banner iframe on some pages/locales; we neutralize its layout impact
 *   with the officially-recommended CSS (`body { top: 0 !important; }`
 *   + hiding `.goog-te-banner-frame` via CSS display rules, which Google's
 *   own support forums document as the supported customization).
 *
 * Programmatic translation uses the widget's public <select class="goog-te-combo">
 * element (set value + dispatch change). This is how Google's own widget
 * performs translation; we simply drive it from Lango UI instead of
 * showing Google's default dropdown.
 */

declare global {
  interface Window {
    google?: {
      translate?: {
        TranslateElement?: new (
          opts: Record<string, unknown>,
          elementId: string
        ) => unknown;
        // provided by Google's script
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        [k: string]: any;
      };
    };
    googleTranslateElementInit?: () => void;
  }
}

const SCRIPT_SRC =
  "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";

const CONTAINER_ID = "lango-google-translate-element";

let scriptPromise: Promise<void> | null = null;
let initPromise: Promise<void> | null = null;

function isBrowser(): boolean {
  return typeof window !== "undefined" && typeof document !== "undefined";
}

function loadGoogleScript(): Promise<void> {
  if (!isBrowser()) return Promise.reject(new Error("Not in a browser environment"));
  if (scriptPromise) return scriptPromise;
  scriptPromise = new Promise<void>((resolve, reject) => {
    if (window.google?.translate?.TranslateElement) {
      resolve();
      return;
    }
    const done = (fn: () => void) => {
      window.clearTimeout(timer);
      fn();
    };
    // Hard timeout: never leave callers hanging with a stuck spinner. Reset
    // the singleton so a later retry can attempt the load again.
    const timer = window.setTimeout(() => {
      if (window.google?.translate?.TranslateElement) {
        resolve();
      } else {
        scriptPromise = null;
        reject(
          new Error(
            "Lango: timed out loading the Google Translate script. " +
              "Check network access to translate.google.com — ad-blockers often block it."
          )
        );
      }
    }, 20000);
    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${SCRIPT_SRC}"]`
    );
    if (existing) {
      existing.addEventListener("load", () => done(resolve));
      existing.addEventListener("error", () =>
        done(() => {
          scriptPromise = null;
          reject(new Error("Failed to load Google Translate script"));
        })
      );
      return;
    }
    window.googleTranslateElementInit = () => done(resolve);
    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.async = true;
    script.defer = true;
    script.onerror = () => {
      scriptPromise = null;
      done(() => reject(new Error("Failed to load Google Translate script")));
    };
    document.head.appendChild(script);
  });
  return scriptPromise;
}

function ensureContainer(pageLanguage: string): HTMLElement {
  let el = document.getElementById(CONTAINER_ID);
  if (!el) {
    el = document.createElement("div");
    el.id = CONTAINER_ID;
    // Visually hidden but present (display:none breaks the widget).
    el.setAttribute("aria-hidden", "true");
    el.className = "lango-google-element";
    document.body.appendChild(el);
  }
  el.setAttribute("data-page-language", pageLanguage);
  return el;
}

function initElement(pageLanguage: string, autoDisplay = false): Promise<void> {
  if (!isBrowser()) return Promise.reject(new Error("Not in a browser environment"));
  if (initPromise) return initPromise;
  initPromise = loadGoogleScript().then(
    () =>
      new Promise<void>((resolve, reject) => {
        try {
          ensureContainer(pageLanguage);
          const Ctor = window.google?.translate?.TranslateElement;
          if (!Ctor) {
            initPromise = null;
            reject(new Error("Google Translate is unavailable"));
            return;
          }
          new Ctor(
            {
              pageLanguage,
              autoDisplay,
              // SIMPLE keeps the injected UI minimal; our own switcher is the UI.
              inlineLayout: 0,
            },
            CONTAINER_ID
          );
          // The <select.goog-te-combo> is created async by Google; poll briefly.
          const started = Date.now();
          const tick = () => {
            const combo = document.querySelector<HTMLSelectElement>(
              `#${CONTAINER_ID} select.goog-te-combo`
            );
            if (combo) {
              resolve();
              return;
            }
            if (Date.now() - started > 15000) {
              // Widget script loaded but combo never appeared — still resolve;
              // translate() will retry / surface a clear error.
              resolve();
              return;
            }
            window.setTimeout(tick, 100);
          };
          tick();
        } catch (err) {
          initPromise = null;
          reject(err instanceof Error ? err : new Error("Failed to init Google Translate"));
        }
      })
  );
  return initPromise;
}

function getCombo(): HTMLSelectElement | null {
  if (!isBrowser()) return null;
  return document.querySelector<HTMLSelectElement>(
    `#${CONTAINER_ID} select.goog-te-combo`
  );
}

function comboHasOption(combo: HTMLSelectElement, language: string): boolean {
  return Array.from(combo.options).some((o) => o.value === language);
}

/**
 * Google populates the widget's language list lazily — the <select> often
 * exists before the target language's <option> does. Setting a value with no
 * matching option is a SILENT no-op (the widget ignores the change event but
 * nothing throws), which used to leave the page untranslated while Lango
 * believed the switch had succeeded. So we wait for the option instead.
 */
function waitForComboOption(
  language: string,
  timeoutMs: number
): Promise<HTMLSelectElement> {
  return new Promise((resolve, reject) => {
    const started = Date.now();
    const tick = () => {
      const combo = getCombo();
      if (combo && comboHasOption(combo, language)) {
        resolve(combo);
        return;
      }
      if (Date.now() - started > timeoutMs) {
        const comboNow = getCombo();
        const available = comboNow
          ? Array.from(comboNow.options)
              .map((o) => o.value)
              .filter(Boolean)
              .slice(0, 8)
              .join(", ")
          : "widget missing";
        reject(
          new Error(
            `Lango: Google Translate never offered "${language}" ` +
              `(saw: ${available || "no options yet"}). ` +
              `Check network access to translate.google.com — ad-blockers often block it.`
          )
        );
        return;
      }
      window.setTimeout(tick, 150);
    };
    tick();
  });
}

function fireTranslation(combo: HTMLSelectElement, language: string): void {
  combo.value = language;
  // Google's widget listens for change on the select; dispatch it.
  combo.dispatchEvent(new Event("change", { bubbles: true }));
  // Some locales need the native event path too:
  try {
    combo.dispatchEvent(new Event("input", { bubbles: true }));
  } catch {
    /* noop */
  }
}

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
    // De-dupe: don't re-translate the same page unnecessarily.
    // NOTE: `current` is only set after a VERIFIED switch (see below), so a
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
    this.inflight = (async () => {
      await initElement(this.pageLanguage);
      // Wait for the target option — never set a value the widget would ignore.
      const combo = await waitForComboOption(language, this.optionTimeoutMs);
      fireTranslation(combo, language);
      // Confirm the widget accepted it; if the value didn't stick, retry once
      // after a beat before reporting failure.
      await new Promise((r) => setTimeout(r, 150));
      const fresh = getCombo();
      if (!fresh || fresh.value !== language) {
        await new Promise((r) => setTimeout(r, 500));
        const retry = getCombo();
        if (retry && comboHasOption(retry, language)) {
          fireTranslation(retry, language);
          await new Promise((r) => setTimeout(r, 150));
        }
      }
      const final = getCombo();
      if (!final || final.value !== language) {
        throw new Error(
          `Lango: Google Translate did not switch to "${language}". ` +
            `The widget may still be loading — try again in a moment.`
        );
      }
      this.current = language;
    })();
    try {
      await this.inflight;
    } finally {
      this.inflight = null;
    }
  }

  dispose(): void {
    this.current = null;
  }
}

/** Reset module-level singletons (tests only). */
export function __resetGoogleSingletons(): void {
  scriptPromise = null;
  initPromise = null;
}
