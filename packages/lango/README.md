<div align="center">

# lango

**Simple, customizable website translation for React.**

[![npm version](https://img.shields.io/npm/v/lango?style=flat-square)](https://www.npmjs.com/package/lango)
[![license: MIT](https://img.shields.io/badge/license-MIT-black?style=flat-square)](../../LICENSE)

Powered by Google. Built for developers. Made by [@slycodez](https://x.com/slycodez).

</div>

---

```bash
npm install lango
```

```tsx
import { Lango, LanguageSwitcher } from "lango";
// No CSS import needed — pre-styled, Tailwind-ready.

export function App() {
  return (
    <Lango languages={["en", "fr", "es"]}>
      <LanguageSwitcher />
      <YourApp />
    </Lango>
  );
}
```

## Features

- `<Lango>` provider with language state + persistence
- `<LanguageSwitcher>` — pre-styled, accessible, Tailwind-customizable dropdown
- `useLango()` — headless API for any custom UI
- Zero CSS imports: styles auto-inject on mount (`ensureLangoStyles()`)
- Stable class names (`.lango-switcher`, `.lango-trigger`, …) + `--lango-*` variables
- SSR-safe (no `window`/`localStorage` access during render)
- Google-powered, no API key needed for the default provider

## Installation

```bash
npm install lango
```

No stylesheet import required. (The old `import "lango/styles.css"` still works — it's now optional.)

## Quick Start

```tsx
import { Lango, LanguageSwitcher } from "lango";

function App() {
  return (
    <Lango languages={["en", "fr", "es"]} defaultLanguage="en" persistLanguage>
      <LanguageSwitcher />
      <YourApp />
    </Lango>
  );
}
```

## Configuration

| Prop | Type | Default | Description |
|---|---|---|---|
| `languages` | `string[]` | required | Supported codes, e.g. `["en","fr","es"]` |
| `defaultLanguage` | `string` | `"en"` | Fallback; prepended if missing from `languages` |
| `persistLanguage` | `boolean` | `true` | Save to `localStorage["lango-language"]` |
| `provider` | `TranslationProvider` | Google element | Override backend |

`<LanguageSwitcher>` props: `showFlags` (default true), `showNativeNames`
(default true), `className`, `triggerClassName`, `menuClassName`,
`optionClassName` (all accept Tailwind utilities), `showAttribution`
(default true — keep on for Google compliance).

## Headless usage

```tsx
function CustomSelector() {
  const { language, languages, setLanguage } = useLango();
  return (
    <select value={language} onChange={(e) => setLanguage(e.target.value)}>
      {languages.map((l) => (
        <option key={l} value={l}>{l}</option>
      ))}
    </select>
  );
}
```

## Styling with Tailwind

```tsx
<LanguageSwitcher
  triggerClassName="bg-black text-white border-black hover:bg-neutral-800"
  menuClassName="rounded-2xl border-black"
  optionClassName="hover:bg-neutral-100"
/>
```

```css
/* …or plain CSS */
.lango-trigger { background: white; border-radius: 999px; padding: 8px 14px; }
.lango-menu { border-radius: 14px; padding: 6px; }
.lango-option { padding: 8px 12px; }
```

Variables: `--lango-background`, `--lango-foreground`, `--lango-border`,
`--lango-radius`, `--lango-option-hover`, `--lango-shadow`, `--lango-font-size`.

Disable auto-injection for full manual control:

```ts
window.__LANGO_NO_AUTO_CSS__ = true;
```

## Google integration

Default provider = official Google Translate Element. No credentials in the
browser. Keep `showAttribution` on (Google requires attribution). What Lango
hides — and how: the raw Google dropdown is visually hidden with static CSS
positioning; no `setInterval` DOM deletion, no reliance on Google internals.
Google may inject a top banner iframe in some locales; Lango neutralizes it
with documented CSS (`body{top:0!important}` + hiding `.goog-te-banner-frame`).

For Google Cloud Translation API: build a `TranslationProvider` that calls
YOUR server endpoint (which holds the API key), then
`<Lango provider={myProvider}>`. Never ship private keys in frontend bundles.

## Supported languages

Any Google Translate code works; metadata (names/flags) is built in for ~30
common languages and gracefully falls back to the raw code otherwise.

## Accessibility

Button/listbox semantics, `aria-expanded`, `aria-selected`, keyboard
(Enter/Space/Arrows/Home/End/Escape), focus-visible styles, screen-reader labels.

## Troubleshooting

- Offline/ad-blocker: content stays in the original language; `error` is set.
  Allow `translate.google.com` and retry.
- Unsupported code passed to `setLanguage`: ignored + console warning.
- SSR: safe — browser APIs only touched in effects/event handlers.

## Run / Build / Publish

```bash
# from the monorepo root
npm install
npm run dev:website          # demo site → http://localhost:5173
npm run build --workspace=lango
npm run test --workspace=lango
cd packages/lango && npm publish --access public
```

Repo: [Wesley7-debug/lango](https://github.com/Wesley7-debug/lango) · Author: [@slycodez](https://x.com/slycodez)

## License

MIT
