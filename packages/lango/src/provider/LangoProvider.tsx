import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type {
  LangoContextValue,
  LangoProps,
  TranslationProvider,
} from "../types/index.js";
import { GoogleTranslateElementProvider } from "../core/translator.js";
import { ensureLangoStyles } from "../core/injectStyles.js";
import {
  readStoredLanguage,
  resolveInitialLanguage,
  writeStoredLanguage,
} from "../core/storage.js";

export const LangoContext = createContext<LangoContextValue | null>(null);

function dedupeLanguages(languages: string[], defaultLanguage: string): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const l of [defaultLanguage, ...languages]) {
    if (typeof l !== "string" || !l.trim()) continue;
    const code = l.trim();
    if (!seen.has(code)) {
      seen.add(code);
      out.push(code);
    }
  }
  return out;
}

export function Lango({
  languages: languagesProp,
  defaultLanguage = "en",
  persistLanguage = true,
  provider: providerProp,
  children,
}: LangoProps) {
  if (!languagesProp || languagesProp.length === 0) {
    throw new Error("Lango: `languages` must be a non-empty array.");
  }
  const languages = useMemo(
    () => dedupeLanguages(languagesProp, defaultLanguage),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [JSON.stringify(languagesProp), defaultLanguage]
  );
  const defaultLang = languages.includes(defaultLanguage)
    ? defaultLanguage
    : languages[0];

  const [language, setLanguageState] = useState<string>(() => {
    if (typeof window === "undefined") return defaultLang;
    try {
      return resolveInitialLanguage({
        languages,
        defaultLanguage: defaultLang,
        persistLanguage,
      });
    } catch {
      return defaultLang;
    }
  });
  const [isTranslating, setIsTranslating] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const providerRef = useRef<TranslationProvider | null>(null);
  if (providerRef.current === null) {
    providerRef.current =
      providerProp ?? new GoogleTranslateElementProvider({ pageLanguage: defaultLang });
  }
  // Allow a custom provider instance to be swapped in.
  useEffect(() => {
    if (providerProp) providerRef.current = providerProp;
  }, [providerProp]);

  // Auto-inject default styles once (no CSS import needed).
  // Users can still override everything with Tailwind classes or `.lango-*`.
  useEffect(() => {
    try {
      ensureLangoStyles();
    } catch {
      /* non-fatal: app still works, switcher just unstyled */
    }
  }, []);

  // Translate the initial (restored) language once on mount if it differs
  // from the page language. SSR-safe: effects never run on the server.
  const mountedRef = useRef(false);
  useEffect(() => {
    if (mountedRef.current) return;
    mountedRef.current = true;
    const initial =
      persistLanguage && typeof window !== "undefined"
        ? readStoredLanguage()
        : null;
    const target =
      initial && languages.includes(initial) ? initial : language;
    if (target !== defaultLang) {
      setIsTranslating(true);
      providerRef
        .current!.translate(target)
        .catch((err: unknown) => {
          setError(err instanceof Error ? err : new Error("Translation failed"));
        })
        .finally(() => setIsTranslating(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setLanguage = useCallback(
    (next: string) => {
      if (!languages.includes(next)) {
        // Never allow an unsupported language to break the app.
        // eslint-disable-next-line no-console
        console.warn(`Lango: unsupported language "${next}" ignored.`);
        return;
      }
      if (next === language) return;
      setLanguageState(next);
      setError(null);
      setIsTranslating(true);
      if (persistLanguage) writeStoredLanguage(next);
      providerRef
        .current!.translate(next)
        .catch((err: unknown) => {
          setError(err instanceof Error ? err : new Error("Translation failed"));
        })
        .finally(() => setIsTranslating(false));
    },
    [language, languages, persistLanguage]
  );

  const value = useMemo<LangoContextValue>(
    () => ({ language, setLanguage, languages, isTranslating, error }),
    [language, setLanguage, languages, isTranslating, error]
  );

  return (
    <LangoContext.Provider value={value}>{children}</LangoContext.Provider>
  );
}

export default Lango;
