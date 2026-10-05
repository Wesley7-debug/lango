import { useEffect, useId, useRef, useState } from "react";
import { useLango } from "../hooks/useLango.js";
import { getLanguageMeta } from "../core/language.js";
import { ensureLangoStyles } from "../core/injectStyles.js";
import type { LanguageSwitcherProps } from "../types/index.js";

/**
 * Pre-styled, Tailwind-compatible language switcher.
 *
 * - No CSS import needed: `<Lango>` auto-injects the default stylesheet.
 * - Works with or without Tailwind in the host app. Tailwind utilities below
 *   are progressive enhancement; injected `.lango-*` CSS guarantees the
 *   layout even when Tailwind isn't present.
 * - Restyle with Tailwind via `className` / `triggerClassName` /
 *   `menuClassName` / `optionClassName`, or plain CSS targeting `.lango-*`.
 */
export function LanguageSwitcher({
  showFlags = true,
  showNativeNames = true,
  className = "",
  triggerClassName = "",
  menuClassName = "",
  optionClassName = "",
  showAttribution = true,
}: LanguageSwitcherProps) {
  const { language, setLanguage, languages, isTranslating } = useLango();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const menuId = useId();
  const active = getLanguageMeta(language);

  useEffect(() => {
    ensureLangoStyles();
  }, []);

  // Close on outside click / Escape.
  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open ]);

  const onTriggerKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setOpen(true);
      requestAnimationFrame(() => {
        listRef.current?.querySelector<HTMLElement>("[role='option']")?.focus();
      });
    }
  };

  const onOptionKey = (e: React.KeyboardEvent, code: string, index: number) => {
    const options = Array.from(
      listRef.current?.querySelectorAll<HTMLElement>("[role='option']") ?? []
    );
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setLanguage(code);
      setOpen(false);
      buttonRef.current?.focus();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      options[(index + 1) % options.length]?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      options[(index - 1 + options.length) % options.length]?.focus();
    } else if (e.key === "Home") {
      e.preventDefault();
      options[0]?.focus();
    } else if (e.key === "End") {
      e.preventDefault();
      options[options.length - 1]?.focus();
    }
  };

  return (
    <div ref={rootRef} className={`lango-switcher relative inline-block ${className}`.trim()}>
      <button
        ref={buttonRef}
        type="button"
        className={
          `lango-trigger inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-black shadow-sm transition hover:bg-neutral-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 dark:border-neutral-800 dark:bg-black dark:text-white dark:hover:bg-neutral-900 ${triggerClassName}`.trim()
        }
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={menuId}
        aria-label={`Language: ${active.nativeName}. Change language`}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={onTriggerKey}
      >
        {showFlags && active.flag && (
          <span className="lango-flag text-base leading-none" aria-hidden="true">
            {active.flag}
          </span>
        )}
        <span className="lango-language-name min-w-0 flex-1 truncate">
          {showNativeNames ? active.nativeName : active.name}
        </span>
        {isTranslating && (
          <span
            className="lango-spinner h-3 w-3 animate-spin rounded-full border-2 border-neutral-300 border-t-current"
            aria-hidden="true"
          />
        )}
        <span className="lango-trigger-icon text-xs opacity-60" aria-hidden="true">
          ▾
        </span>
      </button>

      {open && (
        <ul
          ref={listRef}
          id={menuId}
          role="listbox"
          aria-label="Languages"
          aria-activedescendant={`lango-opt-${language}`}
          className={
            `lango-menu absolute z-50 mt-2 max-h-80 min-w-[200px] overflow-auto rounded-xl border border-neutral-200 bg-white p-1.5 shadow-xl dark:border-neutral-800 dark:bg-black ${menuClassName}`.trim()
          }
        >
          {languages.map((code, i) => {
            const meta = getLanguageMeta(code);
            const selected = code === language;
            return (
              <li
                key={code}
                id={`lango-opt-${code}`}
                role="option"
                aria-selected={selected}
                tabIndex={0}
                className={
                  `lango-option flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm text-black hover:bg-neutral-100 focus:outline-none dark:text-white dark:hover:bg-neutral-900${selected ? " lango-option-active bg-neutral-100 font-semibold dark:bg-neutral-900" : ""} ${optionClassName}`.trim()
                }
                onClick={() => {
                  setLanguage(code);
                  setOpen(false);
                  buttonRef.current?.focus();
                }}
                onKeyDown={(e) => onOptionKey(e, code, i)}
              >
                {showFlags && meta.flag && (
                  <span className="lango-flag text-base leading-none" aria-hidden="true">
                    {meta.flag}
                  </span>
                )}
                <span className="lango-language-name min-w-0 flex-1 truncate">
                  {showNativeNames ? meta.nativeName : meta.name}
                </span>
                {selected && (
                  <span className="lango-check opacity-70" aria-hidden="true">
                    ✓
                  </span>
                )}
              </li>
            );
          })}
          {showAttribution && (
            <li
              className="lango-attribution px-3 pb-1 pt-2 text-[11px] text-neutral-500"
              aria-hidden="true"
            >
              Translations by Google
            </li>
          )}
        </ul>
      )}
    </div>
  );
}

export default LanguageSwitcher;
