import { GITHUB_URL } from "../site";
import { DemoCard } from "../components/DemoCard";
import { DocsTeaser } from "../components/DocsTeaser";
import { InstallSwitcher } from "../components/InstallSwitcher";
import { FEATURES } from "../docs/content";

/** Landing page: hero, live demo, features, docs teaser. */
export function HomePage() {
  return (
    <main className="mx-auto max-w-6xl px-6">
      <section className="pb-10 pt-16 text-center sm:pt-24">
        <p className="inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-stone-50 px-4 py-1.5 text-xs font-bold uppercase tracking-widest dark:border-neutral-700 dark:bg-stone-950">
          <span className="h-2 w-2 rounded-full bg-stone-900 dark:bg-stone-100" />
          v1.2.1 - Powered by Google
        </p>
        <h1 className="mx-auto mt-6 max-w-4xl text-5xl font-extrabold leading-[1.02] tracking-tight sm:text-7xl">
          Translate your website.
          <br />
          <span className="bg-stone-900 text-stone-50 dark:bg-stone-100 dark:text-stone-900">
            &nbsp;Keep your UI.&nbsp;
          </span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-neutral-600 dark:text-neutral-400">
          A developer-first translation package for React. One provider, one switcher -
          pre-styled, Tailwind-compatible, fully customizable.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href="#/docs"
            className="inline-flex items-center rounded-full bg-stone-900 px-8 py-3 text-sm font-bold text-stone-50 transition hover:bg-neutral-800 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-neutral-200"
          >
            Read the Docs
          </a>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center rounded-full border-2 border-stone-900 px-8 py-3 text-sm font-bold transition hover:bg-neutral-200/70 dark:border-stone-200 dark:hover:bg-neutral-800"
          >
            ★ Star on GitHub
          </a>
        </div>

        <div className="mx-auto mt-8 max-w-md">
          <InstallSwitcher />
        </div>

        <div id="demo" className="mx-auto mt-12 max-w-3xl scroll-mt-24 text-left">
          <DemoCard />
          <p className="mt-4 text-center text-sm text-neutral-500">
            Live demo - this content is really translated by Google. Try the switcher.
          </p>
        </div>
      </section>

      <section className="grid gap-4 py-10 sm:grid-cols-2">
        {FEATURES.map((f) => (
          <div
            key={f.title}
            className="rounded-3xl border-2 border-stone-900 bg-stone-50 p-7 transition hover:-translate-y-1 hover:shadow-[6px_6px_0_0_#d6d3d1] dark:border-stone-200 dark:bg-stone-950 dark:hover:shadow-[6px_6px_0_0_#78716c]"
          >
            <h3 className="text-lg font-extrabold tracking-tight">{f.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
              {f.body}
            </p>
          </div>
        ))}
      </section>

      <DocsTeaser />
    </main>
  );
}
