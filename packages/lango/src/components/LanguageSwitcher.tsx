import { useEffect } from "react";
import { useLango } from "../hooks/useLango.js";
import { getLanguageMeta } from "../core/language.js";
import { ensureLangoStyles } from "../core/injectStyles.js";
import { useSwitcherMenu } from "./useSwitcherMenu.js";
import type { LanguageSwitcherProps } from "../types/index.js";

/**
 * Single responsibility: rendering the language switcher UI.
 * Menu behavior lives in `useSwitcherMenu`; translation state comes from
 * `useLango`. Pre-styled with zero CSS imports, Tailwind-overridable via
 * the *ClassName props.
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
  const menu = useSwitcherMenu(setLanguage);
  const active = getLanguageMeta(language);

  useEffect(() => {
    ensureLangoStyles();
  }, []);

  const choose = (code: string) => {
    setLanguage(code);
    menu.toggle();
    menu.buttonRef.current?.focus();
  };

  return (
    <div
      ref={menu.rootRef}
      className={`lango-switcher relative inline-block ${className}`.trim()}
    >
      <button
        ref={menu.buttonRef}
        type="button"
        className={`lango-trigger inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-black shadow-sm transition hover:bg-neutral-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 dark:border-neutral-800 dark:bg-black dark:text-white dark:hover:bg-neutral-900 ${triggerClassName}`.trim()}
        aria-haspopup="listbox"
        aria-expanded={menu.open}
        aria-controls={menu.menuId}
        aria-label={`Language: ${active.nativeName}. Change language`}
        onClick={menu.toggle}
        onKeyDown={menu.onTriggerKey}
      >
        {showFlags && active.flag && (
          <span
            className="lango-flag text-base leading-none"
            aria-hidden="true"
          >
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
        <span
          className="lango-trigger-icon text-xs opacity-60"
          aria-hidden="true"
        >
          ▾
        </span>
      </button>

      {menu.open && (
        <ul
          ref={menu.listRef}
          id={menu.menuId}
          role="listbox"
          aria-label="Languages"
          aria-activedescendant={`lango-opt-${language}`}
          className={`lango-menu absolute z-50 mt-2 max-h-80 min-w-[200px] overflow-auto rounded-xl border border-neutral-200 bg-white p-1.5 shadow-xl dark:border-neutral-800 dark:bg-black ${menuClassName}`.trim()}
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
                className={`lango-option flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm text-black hover:bg-neutral-100 focus:outline-none dark:text-white dark:hover:bg-neutral-900${selected ? " lango-option-active bg-neutral-100 font-semibold dark:bg-neutral-900" : ""} ${optionClassName}`.trim()}
                onClick={() => choose(code)}
                onKeyDown={(e) => menu.onOptionKey(e, code, i)}
              >
                {showFlags && meta.flag && (
                  <span
                    className="lango-flag text-base leading-none"
                    aria-hidden="true"
                  >
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
            ></li>
          )}
        </ul>
      )}
    </div>
  );
}

export default LanguageSwitcher;
