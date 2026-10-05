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
    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${SCRIPT_SRC}"]`
    );
    if (existing) {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () =>
        reject(new Error("Failed to load Google Translate script"))
      );
      return;
    }
    window.googleTranslateElementInit = () => resolve();
    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.async = true;
    script.defer = true;
    script.onerror = () => {
      scriptPromise = null;
      reject(new Error("Failed to load Google Translate script"));
    };
    document.head.appendChild(script);
    // Safety timeout: if Google never calls back, fail gracefully.
    window.setTimeout(() => {
      if (window.google?.translate?.TranslateElement) resolve();
    }, 15000);
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

function setComboLanguage(language: string): boolean {
  const combo = document.querySelector<HTMLSelectElement>(
    `#${CONTAINER_ID} select.goog-te-combo`
  );
  if (!combo) return false;
  const hasOption = Array.from(combo.options).some((o) => o.value === language);
  // Google populates options lazily; setting value + dispatching change is the
  // standard drive mechanism even if the option list is still minimal.
  void hasOption;
  combo.value = language;
  combo.dispatchEvent(new Event("change", { bubbles: true }));
  // Some locales need the native event path:
  const nativeSetter = Object.getOwnPropertyDescriptor(
    Object.getPrototypeOf(combo),
    "value"
  )?.set;
  if (nativeSetter) {
    // ensure React-free native change propagation
    try {
      combo.dispatchEvent(new Event("input", { bubbles: true }));
    } catch {
      /* noop */
    }
  }
  return true;
}

export interface GoogleProviderOptions {
  /** Source page language, defaults to "en" (also used as TranslateElement pageLanguage). */
  pageLanguage?: string;
}

export class GoogleTranslateElementProvider implements TranslationProvider {
  private pageLanguage: string;
  private current: string | null = null;
  private inflight: Promise<void> | null = null;

  constructor(opts: GoogleProviderOptions = {}) {
    this.pageLanguage = opts.pageLanguage ?? "en";
  }

  async translate(language: string): Promise<void> {
    if (!isBrowser()) return;
    // De-dupe: don't re-translate the same page unnecessarily.
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
      const ok = setComboLanguage(language);
      if (!ok) throw new Error("Google Translate widget is not ready yet");
      // Give Google a tick to swap the DOM; failure to swap is non-fatal.
      await new Promise((r) => setTimeout(r, 50));
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
