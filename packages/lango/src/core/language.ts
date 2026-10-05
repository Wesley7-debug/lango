import type { LanguageMeta } from "../types/index.js";

/**
 * Common language metadata. Codes match Google Translate language codes.
 * Flags are display hints only - a language is not owned by one country.
 * Hide them with <LanguageSwitcher showFlags={false} />.
 */
export const LANGUAGE_META: Record<string, LanguageMeta> = {
  en: { code: "en", name: "English", nativeName: "English", flag: "🇬🇧" },
  fr: { code: "fr", name: "French", nativeName: "Français", flag: "🇫🇷" },
  es: { code: "es", name: "Spanish", nativeName: "Español", flag: "🇪🇸" },
  de: { code: "de", name: "German", nativeName: "Deutsch", flag: "🇩🇪" },
  pt: { code: "pt", name: "Portuguese", nativeName: "Português", flag: "🇵🇹" },
  it: { code: "it", name: "Italian", nativeName: "Italiano", flag: "🇮🇹" },
  nl: { code: "nl", name: "Dutch", nativeName: "Nederlands", flag: "🇳🇱" },
  pl: { code: "pl", name: "Polish", nativeName: "Polski", flag: "🇵🇱" },
  ru: { code: "ru", name: "Russian", nativeName: "Русский", flag: "🇷🇺" },
  ja: { code: "ja", name: "Japanese", nativeName: "日本語" },
  "zh-CN": { code: "zh-CN", name: "Chinese (Simplified)", nativeName: "简体中文" },
  "zh-TW": { code: "zh-TW", name: "Chinese (Traditional)", nativeName: "繁體中文" },
  ko: { code: "ko", name: "Korean", nativeName: "한국어" },
  ar: { code: "ar", name: "Arabic", nativeName: "العربية" },
  hi: { code: "hi", name: "Hindi", nativeName: "हिन्दी" },
  tr: { code: "tr", name: "Turkish", nativeName: "Türkçe", flag: "🇹🇷" },
  uk: { code: "uk", name: "Ukrainian", nativeName: "Українська", flag: "🇺🇦" },
  vi: { code: "vi", name: "Vietnamese", nativeName: "Tiếng Việt", flag: "🇻🇳" },
  th: { code: "th", name: "Thai", nativeName: "ไทย" },
  id: { code: "id", name: "Indonesian", nativeName: "Bahasa Indonesia", flag: "🇮🇩" },
  sv: { code: "sv", name: "Swedish", nativeName: "Svenska", flag: "🇸🇪" },
  da: { code: "da", name: "Danish", nativeName: "Dansk", flag: "🇩🇰" },
  fi: { code: "fi", name: "Finnish", nativeName: "Suomi", flag: "🇫🇮" },
  no: { code: "no", name: "Norwegian", nativeName: "Norsk", flag: "🇳🇴" },
  el: { code: "el", name: "Greek", nativeName: "Ελληνικά", flag: "🇬🇷" },
  he: { code: "he", name: "Hebrew", nativeName: "עברית" },
  cs: { code: "cs", name: "Czech", nativeName: "Čeština", flag: "🇨🇿" },
  ro: { code: "ro", name: "Romanian", nativeName: "Română", flag: "🇷🇴" },
  hu: { code: "hu", name: "Hungarian", nativeName: "Magyar", flag: "🇭🇺" },
};

export function getLanguageMeta(code: string): LanguageMeta {
  return (
    LANGUAGE_META[code] ?? {
      code,
      name: code,
      nativeName: code,
    }
  );
}

export function normalizeLanguageCode(code: string): string {
  return code.trim().replace("_", "-");
}

/** True when `code` is in the supported list (case/format tolerant). */
export function isSupportedLanguage(code: string, languages: string[]): boolean {
  const n = normalizeLanguageCode(code).toLowerCase();
  return languages.some((l) => normalizeLanguageCode(l).toLowerCase() === n);
}
