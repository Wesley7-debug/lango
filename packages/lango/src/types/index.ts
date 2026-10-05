export interface LanguageMeta {
  /** BCP-47 / Google Translate code, e.g. "en", "fr", "pt", "zh-CN" */
  code: string;
  /** English name, e.g. "French" */
  name: string;
  /** Autonym, e.g. "Français" */
  nativeName: string;
  /**
   * Optional flag emoji hint for the default switcher UI.
   * A language is NOT owned by one country; this is display-only
   * and can be hidden with `showFlags={false}`.
   */
  flag?: string;
}

export interface TranslationProvider {
  /**
   * Translate the current page to `language`.
   * Implementations must be idempotent and resolve without
   * crashing the host app on failure (they should reject so the
   * caller can reset `isTranslating` and keep original content).
   */
  translate(language: string): Promise<void>;
  /** Optional cleanup (remove listeners / iframes the provider owns). */
  dispose?: () => void;
}

export interface LangoProps {
  /** Supported language codes, e.g. ["en", "fr", "es"]. Min length 1. */
  languages: string[];
  /** Fallback language. Defaults to "en". Must be in `languages` or it is prepended. */
  defaultLanguage?: string;
  /** Persist to localStorage. Defaults to true. */
  persistLanguage?: boolean;
  /** Override the translation backend (defaults to Google Translate Element). */
  provider?: TranslationProvider;
  children: React.ReactNode;
}

export interface LangoContextValue {
  language: string;
  setLanguage: (language: string) => void;
  languages: string[];
  isTranslating: boolean;
  error: Error | null;
}

export interface LanguageSwitcherProps {
  showFlags?: boolean;
  showNativeNames?: boolean;
  /**
   * Extra classes for the root element. Pass Tailwind utilities here, e.g.
   * `className="dark:[--lango-background:#000]"` or fully custom classes.
   * The default stylesheet is auto-injected, so this is purely additive.
   */
  className?: string;
  /** Tailwind / custom classes appended to the trigger `<button>`. */
  triggerClassName?: string;
  /** Tailwind / custom classes appended to the dropdown `<ul>`. */
  menuClassName?: string;
  /** Tailwind / custom classes appended to each option `<li>`. */
  optionClassName?: string;
  /** Show "Translations by Google" attribution line. Defaults to true (required by Google terms for the default provider). */
  showAttribution?: boolean;
}
