/**
 * Single responsibility: docs content data - code samples, tables of
 * contents, feature lists. No JSX, no logic; sections render these.
 */

export const QUICK_START = `import { Lango, LanguageSwitcher } from "lango-i18n";
// No CSS import needed - Lango is pre-styled.
// Restyle anytime with Tailwind classes.

function App() {
  return (
    <Lango languages={["en", "fr", "es"]}>
      <LanguageSwitcher />
      <YourApp />
    </Lango>
  );
}`;

export const TAILWIND_STYLE = `// Override with your own Tailwind utilities
<LanguageSwitcher
  className="font-sans"
  triggerClassName="bg-stone-900 text-stone-50 border-stone-900 hover:bg-neutral-800"
  menuClassName="rounded-2xl border-stone-900"
  optionClassName="hover:bg-neutral-100"
/>

// …or plain CSS - class names are stable
.lango-trigger { border-radius: 999px; }`;

export const HEADLESS_SELECT = `function CustomSelector() {
  const { language, languages, setLanguage } = useLango();
  return (
    <select value={language} onChange={(e) => setLanguage(e.target.value)}>
      {languages.map((l) => <option key={l} value={l}>{l}</option>)}
    </select>
  );
}`;

export const HEADLESS_BUTTONS = `function LanguageButtons() {
  const { language, languages, setLanguage, isTranslating } = useLango();
  return (
    <div>
      {languages.map((l) => (
        <button
          key={l}
          disabled={isTranslating}
          onClick={() => setLanguage(l)}
          aria-pressed={l === language}
        >
          {l}
        </button>
      ))}
    </div>
  );
}`;

export const CUSTOM_PROVIDER = `import type { TranslationProvider } from "lango-i18n";

// Call YOUR server - the API key never touches the browser.
const myProvider: TranslationProvider = {
  async translate(language: string) {
    await fetch("/api/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ language }),
    });
  },
};

<Lango languages={["en", "fr", "es"]} provider={myProvider}>
  <App />
</Lango>`;

export const CSS_VARIABLES = `:root {
  --lango-background: #fafaf9;
  --lango-foreground: #1c1917;
  --lango-border: #e7e5e4;
  --lango-radius: 12px;
  --lango-option-hover: #f5f5f4;
  --lango-shadow: 0 8px 30px rgba(28, 25, 23, 0.08);
  --lango-font-size: 14px;
}`;

export const CUSTOM_SWITCHER = `function PillSwitcher() {
  const { language, languages, setLanguage, isTranslating } = useLango();
  return (
    <div role="group" aria-label="Language">
      {languages.map((code) => (
        <button
          key={code}
          onClick={() => setLanguage(code)}
          disabled={isTranslating}
          aria-pressed={code === language}
        >
          {code.toUpperCase()}
        </button>
      ))}
    </div>
  );
}`;

export const FEATURES = [
  {
    title: "5-minute setup",
    body: "npm install lango-i18n, add the provider, done. No dashboard, no API key for the default path.",
  },
  {
    title: "Pre-styled, Tailwind-ready",
    body: "Zero CSS imports. Override with triggerClassName, menuClassName and optionClassName.",
  },
  {
    title: "Headless API",
    body: "useLango() lets you build any custom UI - select, buttons, command palette.",
  },
  {
    title: "Google-compliant",
    body: "Official Translate Element underneath, attribution preserved, no secret keys in the browser.",
  },
];

export const TOC: [string, string][] = [
  ["introduction", "Introduction"],
  ["installation", "Installation"],
  ["quick-start", "Quick Start"],
  ["how-it-works", "How It Works"],
  ["configuration", "Configuration"],
  ["switcher", "LanguageSwitcher"],
  ["styling", "Custom Styling"],
  ["headless", "useLango"],
  ["custom-switcher", "Custom Switcher"],
  ["languages", "Supported Languages"],
  ["google", "Google Integration"],
  ["providers", "Custom Providers"],
  ["persistence", "Persistence"],
  ["accessibility", "Accessibility"],
  ["troubleshooting", "Troubleshooting"],
];

export const LANGUAGE_CODES = [
  "en", "fr", "es", "de", "pt", "it", "nl", "pl", "ru",
  "ja", "zh-CN", "zh-TW", "ko", "ar", "hi", "tr", "uk",
  "vi", "th", "id", "sv", "da", "fi", "no", "el", "he",
  "cs", "ro", "hu",
];
