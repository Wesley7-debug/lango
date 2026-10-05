import { isBrowser } from "./google-globals.js";
import { loadGoogleScript, resetGoogleScript } from "./google-script.js";

/**
 * Single responsibility: owning the hidden Google Translate Element widget -
 * creating it, waiting for its language <select>, and driving translation
 * through that select (the widget's own public mechanism).
 *
 * GOOGLE INTEGRATION - architecture note (also in README/docs):
 * The default uses the official Google Translate Element, the no-key,
 * client-side product Google offers for whole-website translation. The Cloud
 * Translation API needs a server-side key + billing, so it cannot be the
 * zero-config default; it stays supported via a custom TranslationProvider.
 *
 * Compliance: the widget container is visually hidden with plain CSS
 * positioning (NOT JS deletion), no intervals delete Google nodes, and the
 * "Powered by Google" attribution is preserved.
 */

const CONTAINER_ID = "lango-google-translate-element";

let initPromise: Promise<void> | null = null;

function ensureContainer(pageLanguage: string): HTMLElement {
  const found = document.getElementById(CONTAINER_ID);
  if (found) {
    found.setAttribute("data-page-language", pageLanguage);
    return found;
  }
  const el = document.createElement("div");
  el.id = CONTAINER_ID;
  // Visually hidden but present (display:none breaks the widget).
  el.setAttribute("aria-hidden", "true");
  el.className = "lango-google-element";
  el.setAttribute("data-page-language", pageLanguage);
  document.body.appendChild(el);
  return el;
}

export function initGoogleWidget(
  pageLanguage: string,
  autoDisplay = false
): Promise<void> {
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
            if (getCombo()) {
              resolve();
              return;
            }
            if (Date.now() - started > 15000) {
              // Script loaded but combo never appeared - still resolve;
              // translate() retries via waitForComboOption with a clear error.
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

export function getCombo(): HTMLSelectElement | null {
  if (!isBrowser()) return null;
  return document.querySelector<HTMLSelectElement>(
    `#${CONTAINER_ID} select.goog-te-combo`
  );
}

export function comboHasOption(combo: HTMLSelectElement, language: string): boolean {
  return Array.from(combo.options).some((o) => o.value === language);
}

/**
 * Google populates the language list lazily - the <select> often exists
 * before the target <option> does. Setting a value with no matching option
 * is a SILENT no-op, so we wait for the option instead of guessing.
 */
export function waitForComboOption(
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
              `Check network access to translate.google.com - ad-blockers often block it.`
          )
        );
        return;
      }
      window.setTimeout(tick, 150);
    };
    tick();
  });
}

export function fireTranslation(combo: HTMLSelectElement, language: string): void {
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

/** Reset module state (tests only). */
export function resetGoogleWidget(): void {
  initPromise = null;
  resetGoogleScript();
}
