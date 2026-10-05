import { useState } from "react";

/** Light/dark toggle for the demo site chrome (not part of the package). */
export function ThemeToggle() {
  const [dark, setDark] = useState(() =>
    typeof document !== "undefined"
      ? document.documentElement.classList.contains("dark")
      : false
  );
  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={() => {
        const el = document.documentElement;
        const next = !el.classList.contains("dark");
        el.classList.toggle("dark", next);
        setDark(next);
      }}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-neutral-300 text-sm transition hover:bg-neutral-200/70 dark:border-neutral-700 dark:hover:bg-neutral-800"
    >
      {dark ? "☾" : "☀"}
    </button>
  );
}
