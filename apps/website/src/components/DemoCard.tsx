import { LanguageSwitcher, useLango } from "lango-i18n";

/** Live demo: a real Lango integration visitors can translate. */
export function DemoCard() {
  const { isTranslating } = useLango();
  return (
    <div className="overflow-hidden rounded-3xl border-2 border-stone-900 bg-stone-50 shadow-[8px_8px_0_0_#d6d3d1] dark:border-stone-200 dark:bg-stone-950 dark:shadow-[8px_8px_0_0_#78716c]">
      <div className="flex items-center justify-between gap-3 border-b-2 border-stone-900 px-5 py-3 dark:border-stone-200">
        <span className="text-sm font-extrabold tracking-tight">Acme</span>
        <LanguageSwitcher triggerClassName="!bg-stone-900 !text-stone-50 !border-stone-900 hover:!bg-neutral-800 dark:!bg-stone-50 dark:!text-stone-900 dark:!border-stone-200" />
      </div>
      <div className="px-6 py-8 sm:px-8">
        <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
          Build products people love.
        </h2>
        <p className="mt-3 max-w-xl text-neutral-600 dark:text-neutral-400">
          Launch faster with a beautiful experience. This demo card is wrapped in Lango - switch
          the language above and Google translates this whole page live.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href="#/docs"
            className="inline-flex items-center rounded-full bg-stone-900 px-6 py-2.5 text-sm font-bold text-stone-50 transition hover:bg-neutral-800 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-neutral-200"
          >
            Get Started
          </a>
          <a
            href="#/docs"
            className="inline-flex items-center rounded-full border-2 border-stone-900 px-6 py-2.5 text-sm font-bold transition hover:bg-neutral-200/70 dark:border-stone-200 dark:hover:bg-neutral-800"
          >
            Learn more
          </a>
        </div>
        {isTranslating && (
          <p className="mt-4 inline-flex items-center gap-2 text-sm font-semibold">
            <span className="h-3 w-3 animate-spin rounded-full border-2 border-neutral-300 border-t-stone-500" />
            Translating…
          </p>
        )}
      </div>
    </div>
  );
}
