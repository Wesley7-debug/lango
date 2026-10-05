import { LANGO_CSS } from "../styles/cssText.js";

const STYLE_ID = "lango-styles";

declare global {
  interface Window {
    __LANGO_NO_AUTO_CSS__?: boolean;
  }
}

/** Inject Lango's default stylesheet once. Safe to call repeatedly. */
export function ensureLangoStyles(): void {
  if (typeof document === "undefined") return;
  if (typeof window !== "undefined" && window.__LANGO_NO_AUTO_CSS__) return;
  if (document.getElementById(STYLE_ID)) return;
  const style = document.createElement("style");
  style.id = STYLE_ID;
  style.setAttribute("data-lango", "auto");
  style.textContent = LANGO_CSS;
  document.head.appendChild(style);
}
