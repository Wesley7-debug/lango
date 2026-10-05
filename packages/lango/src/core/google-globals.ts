/**
 * Single responsibility: shared browser-detection helper + the minimal
 * ambient typings for Google's Translate Element script.
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

export function isBrowser(): boolean {
  return typeof window !== "undefined" && typeof document !== "undefined";
}
