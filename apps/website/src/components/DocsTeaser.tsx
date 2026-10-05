const GROUPS: { title: string; body: string; links: [string, string][] }[] = [
  {
    title: "Start here",
    body: "Install, wrap your app, and understand what happens when you switch.",
    links: [
      ["installation", "Installation"],
      ["quick-start", "Quick Start"],
      ["how-it-works", "How It Works"],
    ],
  },
  {
    title: "Make it yours",
    body: "Configure props, restyle with Tailwind, or build your own UI.",
    links: [
      ["configuration", "Configuration"],
      ["styling", "Custom Styling"],
      ["headless", "useLango"],
    ],
  },
  {
    title: "Go further",
    body: "Custom backends, persistence rules, and fixing real-world issues.",
    links: [
      ["providers", "Custom Providers"],
      ["persistence", "Persistence"],
      ["troubleshooting", "Troubleshooting"],
    ],
  },
];

/** Short docs teaser for the home page - the manual lives on `#/docs`. */
export function DocsTeaser() {
  return (
    <section className="py-10">
      <p className="text-xs font-bold uppercase tracking-widest text-neutral-500">
        Documentation
      </p>
      <h2 className="mt-2 max-w-2xl text-4xl font-extrabold tracking-tight sm:text-5xl">
        Short to start, deep when you need it.
      </h2>
      <p className="mt-4 max-w-2xl text-lg text-neutral-600 dark:text-neutral-400">
        The full Lango manual lives on its own page - fifteen sections from install to custom
        translation backends, every example copy-paste ready. Here is the map:
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {GROUPS.map((group) => (
          <div
            key={group.title}
            className="flex flex-col rounded-3xl border-2 border-stone-900 bg-stone-50 p-6 dark:border-stone-200 dark:bg-stone-950"
          >
            <h3 className="text-base font-extrabold tracking-tight">{group.title}</h3>
            <p className="mt-1.5 text-sm text-neutral-600 dark:text-neutral-400">{group.body}</p>
            <ul className="mt-4 space-y-1.5 text-sm font-semibold">
              {group.links.map(([id, label]) => (
                <li key={id}>
                  <a
                    href={`#/docs/${id}`}
                    className="underline underline-offset-4 decoration-neutral-300 transition hover:decoration-stone-900 dark:decoration-neutral-700 dark:hover:decoration-stone-100"
                  >
                    {label} →
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <a
        href="#/docs"
        className="mt-8 inline-flex items-center rounded-full bg-stone-900 px-8 py-3 text-sm font-bold text-stone-50 transition hover:bg-neutral-800 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-neutral-200"
      >
        Read the full documentation →
      </a>
    </section>
  );
}
