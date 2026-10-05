import { GITHUB_URL, X_URL } from "../site";

/** Site footer: version, links, credit, attribution. */
export function SiteFooter() {
  return (
    <footer className="mt-10 border-t-2 border-stone-900 dark:border-stone-200">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-6 gap-y-2 px-6 py-8 text-sm">
        <span className="font-extrabold tracking-tight">LANGO v1.2.0 - MIT</span>
        <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="font-semibold underline underline-offset-4">
          GitHub
        </a>
        <a href={X_URL} target="_blank" rel="noreferrer" className="font-semibold underline underline-offset-4">
          Made by @slycodez
        </a>
        <span className="ml-auto text-neutral-500">Translations by Google</span>
      </div>
    </footer>
  );
}
