import { LanguageSwitcher } from "lango-i18n";
import { GITHUB_URL } from "../site";
import { ThemeToggle } from "./ThemeToggle";

/** Sticky site header: brand, nav, theme toggle, live switcher. */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-neutral-200 bg-[#f6f5f1]/85 backdrop-blur-md dark:border-neutral-800 dark:bg-stone-950/85">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-6">
        <a href="#/" className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-stone-900 text-sm font-extrabold text-stone-50 dark:bg-stone-100 dark:text-stone-900">
            L
          </span>
          <span className="text-lg font-extrabold tracking-tight">LANGO</span>
        </a>
        <nav className="ml-4 hidden items-center gap-1 text-sm font-medium sm:flex">
          <a
            href="#demo"
            className="rounded-full px-3 py-1.5 text-neutral-600 transition hover:bg-neutral-200/70 hover:text-stone-900 dark:text-neutral-400 dark:hover:bg-neutral-900 dark:hover:text-stone-50"
          >
            Demo
          </a>
          <a
            href="#/docs"
            className="rounded-full px-3 py-1.5 text-neutral-600 transition hover:bg-neutral-200/70 hover:text-stone-900 dark:text-neutral-400 dark:hover:bg-neutral-900 dark:hover:text-stone-50"
          >
            Docs
          </a>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            className="rounded-full px-3 py-1.5 text-neutral-600 transition hover:bg-neutral-200/70 hover:text-stone-900 dark:text-neutral-400 dark:hover:bg-neutral-900 dark:hover:text-stone-50"
          >
            GitHub
          </a>
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
