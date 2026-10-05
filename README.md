<div align="center">

# LANGO

**Simple, customizable website translation for React.**

Powered by Google. Built for developers.

[![npm version](https://img.shields.io/npm/v/lango-i18n?style=flat-square)](https://www.npmjs.com/package/lango-i18n)
[![license: MIT](https://img.shields.io/badge/license-MIT-black?style=flat-square)](./LICENSE)
[![ci](https://img.shields.io/github/actions/workflow/status/Wesley7-debug/lango/ci.yml?style=flat-square&label=ci)](https://github.com/Wesley7-debug/lango/actions)
[![react](https://img.shields.io/badge/react-%3E%3D16.8-black?style=flat-square&logo=react)](https://react.dev)
[![tailwind ready](https://img.shields.io/badge/tailwind-ready-black?style=flat-square&logo=tailwindcss)](./packages/lango)

[Demo](#-run-the-demo-site) · [Quick Start](#-quick-start) · [Docs](./packages/lango/README.md) · [GitHub](https://github.com/Wesley7-debug/lango)

</div>

---

```bash
npm install lango-i18n
```

```tsx
import { Lango, LanguageSwitcher } from "lango-i18n";
// No CSS import needed - Lango is pre-styled out of the box.

function App() {
  return (
    <Lango languages={["en", "fr", "es"]}>
      <LanguageSwitcher />
      <YourApp />
    </Lango>
  );
}
```

## ✨ Features

| | |
|---|---|
| 🎯 **One-line setup** | Provider + switcher, no dashboard, no API key |
| 💅 **Pre-styled, Tailwind-ready** | Zero CSS imports. Restyle with `triggerClassName`, `menuClassName`, `optionClassName` |
| 🧩 **Headless API** | `useLango()` for any custom UI - select, buttons, command palette |
| 💾 **Persistent** | Remembers language in `localStorage`, detects browser language |
| ♿ **Accessible** | Button/listbox semantics, full keyboard support, focus-visible states |
| 🔒 **Google-compliant** | Official Translate Element, attribution preserved, no secrets in the browser |
| 🛡️ **SSR-safe** | No `window`/`localStorage` access during render |

## 🚀 Quick Start

**1. Install - pick your package manager**

```bash
npm install lango-i18n
```

```bash
pnpm add lango-i18n
```

```bash
yarn add lango-i18n
```

```bash
bun add lango-i18n
```

> The published package is identical on all four - zero runtime dependencies,
> just a React peer dependency. This repo develops with npm
> (`package-lock.json`); see [CHANGELOG](./CHANGELOG.md) for the v1.2.0 notes.

**2. Wrap your app**

```tsx
import { Lango, LanguageSwitcher } from "lango-i18n";

function App() {
  return (
    <Lango languages={["en", "fr", "es"]} defaultLanguage="en" persistLanguage>
      <LanguageSwitcher />
      <YourApp />
    </Lango>
  );
}
```

> **No stylesheet import required.** `<Lango>` auto-injects its default styles on mount.
> The legacy `import "lango-i18n/styles.css"` still works but is optional.

**3. Restyle with Tailwind (optional)**

```tsx
<LanguageSwitcher
  triggerClassName="bg-black text-white border-black hover:bg-neutral-800"
  menuClassName="rounded-2xl border-black"
  optionClassName="hover:bg-neutral-100"
/>
```

Or plain CSS - class names are stable (`.lango-switcher`, `.lango-trigger`, `.lango-menu`, `.lango-option`, …) with `--lango-*` variables:

```css
:root {
  --lango-background: #fff;
  --lango-foreground: #09090b;
  --lango-border: #e4e4e7;
  --lango-radius: 12px;
}
```

To fully opt out of auto-injected styles (100% manual control):

```ts
window.__LANGO_NO_AUTO_CSS__ = true;
```

## 🧪 Headless usage

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

## ⚙️ Configuration

### `<Lango>` props

| Prop | Type | Default | Description |
|---|---|---|---|
| `languages` | `string[]` | *required* | Supported codes, e.g. `["en","fr","es"]` |
| `defaultLanguage` | `string` | `"en"` | Fallback; prepended if missing |
| `persistLanguage` | `boolean` | `true` | Save to `localStorage["lango-language"]` |
| `provider` | `TranslationProvider` | Google element | Override backend |

### `<LanguageSwitcher>` props

| Prop | Default | Description |
|---|---|---|
| `showFlags` | `true` | Show flag emoji |
| `showNativeNames` | `true` | Show autonym (`Français`) vs English name |
| `className` | `""` | Extra classes on root (Tailwind ok) |
| `triggerClassName` | `""` | Tailwind classes for the button |
| `menuClassName` | `""` | Tailwind classes for the dropdown |
| `optionClassName` | `""` | Tailwind classes for each option |
| `showAttribution` | `true` | Keep on - required by Google terms |

## 💻 Run the demo site

The docs + live demo live in `apps/website` (Vite + React + Tailwind + Sora).

```bash
# 1. Clone
git clone https://github.com/Wesley7-debug/lango.git
cd lango

# 2. Install (monorepo - installs everything)
npm install

# 3. Start the site
npm run dev:website
# → http://localhost:5173
```

| Command | What it does |
|---|---|
| `npm run dev:website` | Start demo site (port `5173`) |
| `npm run build --workspace=lango-i18n` | Build the `lango-i18n` package → `packages/lango/dist/` |
| `npm run build --workspace=lango-website` | Production build of the site → `apps/website/dist/` |
| `npm run preview --workspace=lango-website` | Preview the production build |
| `npm run test --workspace=lango-i18n` | Run package tests (vitest) |
| `npm run build` | Build all workspaces |

> After editing `packages/lango/src`, rebuild it (`npm run build --workspace=lango-i18n`) and restart Vite so the site picks up the change.

## 📦 Publish

```bash
# 1. Bump version
#    edit packages/lango/package.json → "version": "0.2.0"

# 2. Build + test
npm run build --workspace=lango
npm run test --workspace=lango

# 3. Publish to npm (from the package dir)
cd packages/lango
npm publish --access public
```

Requirements: `npm login`, and the `dist/` output (`index.js`, `index.cjs`, `index.d.ts`, `lango.css`) is generated by `npm run build` - never commit it by hand.

## 🔌 Google integration

Default provider = official Google Translate Element. No credentials in the browser. Keep `showAttribution` on. The raw Google dropdown stays in the DOM (visually hidden with static CSS); Lango never deletes Google nodes.

For Google Cloud Translation API: build a `TranslationProvider` that calls **your** server endpoint (which holds the API key), then `<Lango provider={myProvider}>`. Never ship private keys in frontend bundles.

## 🩺 Troubleshooting

- **Switched language, page didn't translate** → check DevTools Network for `translate.google.com/translate_a/element.js`. Ad-blockers / Brave Shields block it. Disable + hard refresh.
- **`error` from `useLango()` is set** → Google script failed (offline / blocked). Content stays readable in the original language.
- **Stale demo after editing the package** → `npm run build --workspace=lango-i18n`, then restart `npm run dev:website`.
- **Unsupported code in `setLanguage`** → ignored with a console warning, app keeps working.

## 👤 Credits

Made by **[@slycodez](https://x.com/slycodez)**.

- 🐙 GitHub: [Wesley7-debug/lango](https://github.com/Wesley7-debug/lango)
- 𝕏 Twitter/X: [@slycodez](https://x.com/slycodez)

Contributions welcome - open an issue or PR.

## 📄 License

MIT - see [LICENSE](./LICENSE).
