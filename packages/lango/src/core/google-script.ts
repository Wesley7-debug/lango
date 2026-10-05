import { isBrowser } from "./google-globals.js";

/**
 * Single responsibility: loading Google's Translate Element script exactly
 * once, with a hard timeout so callers never hang on a stuck spinner.
 */

const SCRIPT_SRC =
  "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";

const LOAD_TIMEOUT_MS = 20000;

let scriptPromise: Promise<void> | null = null;

export function loadGoogleScript(): Promise<void> {
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
    // Hard timeout: never leave callers hanging. Reset the singleton so a
    // later retry can attempt the load again.
    const timer = window.setTimeout(() => {
      if (window.google?.translate?.TranslateElement) {
        resolve();
      } else {
        scriptPromise = null;
        reject(
          new Error(
            "Lango: timed out loading the Google Translate script. " +
              "Check network access to translate.google.com - ad-blockers often block it."
          )
        );
      }
    }, LOAD_TIMEOUT_MS);
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

/** Reset module state (tests only). */
export function resetGoogleScript(): void {
  scriptPromise = null;
}
