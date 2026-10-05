const STORAGE_KEY = "lango-language";

function canUseStorage(): boolean {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

export function readStoredLanguage(): string | null {
  if (!canUseStorage()) return null;
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

export function writeStoredLanguage(language: string): void {
  if (!canUseStorage()) return;
  try {
    window.localStorage.setItem(STORAGE_KEY, language);
  } catch {
    // private mode / quota - persistence is best-effort, never fatal
  }
}

export function clearStoredLanguage(): void {
  if (!canUseStorage()) return;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}

export function getBrowserLanguage(supported: string[], fallback: string): string {
  if (typeof navigator === "undefined" || !navigator.language) return fallback;
  const browser = navigator.language;
  const short = browser.split("-")[0];
  const match =
    supported.find((l) => l.toLowerCase() === browser.toLowerCase()) ??
    supported.find((l) => l.toLowerCase() === short.toLowerCase());
  return match ?? fallback;
}

export function resolveInitialLanguage(opts: {
  languages: string[];
  defaultLanguage: string;
  persistLanguage: boolean;
}): string {
  const { languages, defaultLanguage, persistLanguage } = opts;
  if (persistLanguage) {
    const stored = readStoredLanguage();
    if (stored && languages.includes(stored)) return stored;
  }
  const browser = getBrowserLanguage(languages, defaultLanguage);
  if (languages.includes(browser)) return browser;
  return languages.includes(defaultLanguage) ? defaultLanguage : languages[0];
}
