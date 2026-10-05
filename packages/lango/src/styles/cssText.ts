/**
 * Lango default stylesheet, injected automatically at runtime.
 *
 * You do NOT need to import any CSS. `<Lango>` injects this once
 * (guarded by `#lango-styles`) so the switcher looks good out of the box.
 *
 * Tailwind users: every element also carries Tailwind utility classes and
 * stable `lango-*` class names, plus `className` / `triggerClassName` /
 * `menuClassName` / `optionClassName` overrides — so you can restyle
 * everything with your own utilities without touching this file.
 *
 * To opt out of auto-injection (full manual control):
 *   window.__LANGO_NO_AUTO_CSS__ = true
 * ...before mounting, and style `.lango-*` yourself or via Tailwind.
 */

export const LANGO_CSS = `
:root {
  --lango-background: #fff;
  --lango-foreground: #09090b;
  --lango-border: #e4e4e7;
  --lango-radius: 12px;
  --lango-option-hover: #f4f4f5;
  --lango-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
  --lango-font-size: 14px;
}
.lango-switcher { position: relative; display: inline-block; font-size: var(--lango-font-size); color: var(--lango-foreground); }
.lango-trigger { display: inline-flex; align-items: center; gap: 8px; background: var(--lango-background); color: var(--lango-foreground); border: 1px solid var(--lango-border); border-radius: 999px; padding: 8px 14px; cursor: pointer; font: inherit; line-height: 1.2; }
.lango-trigger:hover { background: var(--lango-option-hover); }
.lango-trigger:focus-visible { outline: 2px solid #09090b; outline-offset: 2px; }
.lango-trigger-icon { font-size: 0.8em; opacity: 0.6; }
.lango-menu { position: absolute; z-index: 50; top: calc(100% + 6px); left: 0; min-width: 200px; max-width: min(280px, 90vw); max-height: 320px; overflow: auto; margin: 0; padding: 6px; list-style: none; background: var(--lango-background); color: var(--lango-foreground); border: 1px solid var(--lango-border); border-radius: var(--lango-radius); box-shadow: var(--lango-shadow); }
.lango-option { display: flex; align-items: center; gap: 8px; padding: 8px 12px; border-radius: calc(var(--lango-radius) - 4px); cursor: pointer; }
.lango-option:hover { background: var(--lango-option-hover); }
.lango-option:focus-visible { outline: 2px solid #09090b; outline-offset: -2px; }
.lango-option-active { font-weight: 600; }
.lango-flag { font-size: 1.1em; line-height: 1; }
.lango-language-name { flex: 1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.lango-check { opacity: 0.7; }
.lango-spinner { width: 12px; height: 12px; border: 2px solid var(--lango-border); border-top-color: currentColor; border-radius: 50%; animation: lango-spin 0.8s linear infinite; }
@keyframes lango-spin { to { transform: rotate(360deg); } }
.lango-attribution { padding: 8px 12px 4px; font-size: 11px; opacity: 0.55; cursor: default; }

/* ---- Google Translate Element: documented CSS customization ---- */
.lango-google-element { position: absolute !important; top: -9999px; left: -9999px; width: 1px; height: 1px; overflow: hidden; opacity: 0; pointer-events: none; }
body { top: 0 !important; }
.goog-te-banner-frame, .goog-te-balloon-frame { display: none !important; }
.goog-te-gadget { font-size: 0 !important; }
.skiptranslate > iframe { display: none !important; }
@media (prefers-reduced-motion: reduce) { .lango-spinner { animation: none; } }
@media (max-width: 480px) {
  .lango-menu { position: fixed; left: 12px; right: 12px; top: auto; bottom: 12px; max-width: none; }
}
`;
