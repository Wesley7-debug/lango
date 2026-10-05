import { useState } from "react";
import { Lango, LanguageSwitcher, useLango } from "lango";

const GITHUB_URL = "https://github.com/Wesley7-debug/lango";
const X_URL = "https://x.com/slycodez";

/* ---------------------------------- bits ---------------------------------- */

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={() => {
        void navigator.clipboard?.writeText(text).then(
          () => {
            setCopied(true);
            window.setTimeout(() => setCopied(false), 1400);
          },
          () => setCopied(false)
        );
      }}
      className="rounded-md border border-neutral-700 px-2.5 py-1 text-xs font-semibold text-neutral-400 transition hover:border-white hover:text-white"
    >
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

function Code({ title, children }: { title: string; children: string }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-neutral-800 bg-black">
      <div className="flex items-center justify-between border-b border-neutral-800 px-4 py-2.5">
        <span className="text-xs font-semibold tracking-wide text-neutral-400">{title}</span>
        <CopyButton text={children} />
      </div>
      <pre className="code-scroll overflow-x-auto p-5 text-[13px] leading-relaxed text-neutral-100">
        <code className="font-mono">{children}</code>
      </pre>
    </div>
  );
}

function DemoCard() {
  const { isTranslating } = useLango();
  return (
    <div className="overflow-hidden rounded-3xl border-2 border-black bg-white shadow-[8px_8px_0_0_#09090b] dark:border-white dark:bg-black dark:shadow-[8px_8px_0_0_#fff]">
      <div className="flex items-center justify-between gap-3 border-b-2 border-black px-5 py-3 dark:border-white">
        <span className="text-sm font-extrabold tracking-tight">Acme</span>
        <LanguageSwitcher triggerClassName="!bg-black !text-white !border-black hover:!bg-neutral-800 dark:!bg-white dark:!text-black dark:!border-white" />
      </div>
      <div className="px-6 py-8 sm:px-8">
        <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
          Build products people love.
        </h2>
        <p className="mt-3 max-w-xl text-neutral-600 dark:text-neutral-400">
          Launch faster with a beautiful experience. This demo card is wrapped in Lango — switch
          the language above and Google translates this whole page live.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href="#docs"
            className="inline-flex items-center rounded-full bg-black px-6 py-2.5 text-sm font-bold text-white transition hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
          >
            Get Started
          </a>
          <a
            href="#docs"
            className="inline-flex items-center rounded-full border-2 border-black px-6 py-2.5 text-sm font-bold transition hover:bg-neutral-200/70 dark:border-white dark:hover:bg-neutral-800"
          >
            Learn more
          </a>
        </div>
        {isTranslating && (
          <p className="mt-4 inline-flex items-center gap-2 text-sm font-semibold">
            <span className="h-3 w-3 animate-spin rounded-full border-2 border-neutral-300 border-t-black dark:border-t-white" />
            Translating…
          </p>
        )}
      </div>
    </div>
  );
}

function ThemeToggle() {
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

/* -------------------------------- docs bits -------------------------------- */

function DocSection({
  id,
  index,
  title,
  children,
}: {
  id: string;
  index: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <article id={id} className="scroll-mt-24 border-t border-neutral-200 pt-10 first:border-t-0 first:pt-0 dark:border-neutral-800">
      <p className="font-mono text-xs font-bold tracking-widest text-neutral-400">{index}</p>
      <h3 className="mt-1 text-2xl font-extrabold tracking-tight sm:text-3xl">{title}</h3>
      <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-neutral-600 dark:text-neutral-400">
        {children}
      </div>
    </article>
  );
}

function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border-2 border-black bg-neutral-50 p-5 text-sm text-black dark:border-white dark:bg-neutral-950 dark:text-white">
      {children}
    </div>
  );
}

function DocTable({ rows }: { rows: [string, string, string][] }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-neutral-200 dark:border-neutral-800">
      <table className="w-full min-w-[520px] text-left text-sm">
        <thead>
          <tr className="border-b border-neutral-200 bg-neutral-50 text-xs uppercase tracking-widest text-neutral-500 dark:border-neutral-800 dark:bg-neutral-950">
            <th className="px-5 py-3 font-bold">Prop</th>
            <th className="px-5 py-3 font-bold">Default</th>
            <th className="px-5 py-3 font-bold">Description</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
          {rows.map(([prop, def, desc]) => (
            <tr key={prop}>
              <td className="px-5 py-3 font-mono font-bold text-black dark:text-white">{prop}</td>
              <td className="px-5 py-3 font-mono text-neutral-500">{def}</td>
              <td className="px-5 py-3">{desc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* -------------------------------- snippets --------------------------------- */

const QUICK_START = `import { Lango, LanguageSwitcher } from "lango";
// No CSS import needed — Lango is pre-styled.
// Restyle anytime with Tailwind classes.

function App() {
  return (
    <Lango languages={["en", "fr", "es"]}>
      <LanguageSwitcher />
      <YourApp />
    </Lango>
  );
}`;

const TAILWIND_STYLE = `// Override with your own Tailwind utilities
<LanguageSwitcher
  className="font-sans"
  triggerClassName="bg-black text-white border-black hover:bg-neutral-800"
  menuClassName="rounded-2xl border-black"
  optionClassName="hover:bg-neutral-100"
/>

// …or plain CSS — class names are stable
.lango-trigger { border-radius: 999px; }`;

const HEADLESS_SELECT = `function CustomSelector() {
  const { language, languages, setLanguage } = useLango();
  return (
    <select value={language} onChange={(e) => setLanguage(e.target.value)}>
      {languages.map((l) => <option key={l} value={l}>{l}</option>)}
    </select>
  );
}`;

const HEADLESS_BUTTONS = `function LanguageButtons() {
  const { language, languages, setLanguage, isTranslating } = useLango();
  return (
    <div>
      {languages.map((l) => (
        <button
          key={l}
          disabled={isTranslating}
          onClick={() => setLanguage(l)}
          aria-pressed={l === language}
        >
          {l}
        </button>
      ))}
    </div>
  );
}`;

const CUSTOM_PROVIDER = `import type { TranslationProvider } from "lango";

// Call YOUR server — the API key never touches the browser.
const myProvider: TranslationProvider = {
  async translate(language: string) {
    await fetch("/api/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ language }),
    });
  },
};

<Lango languages={["en", "fr", "es"]} provider={myProvider}>
  <App />
</Lango>`;

const CSS_VARIABLES = `:root {
  --lango-background: #fff;
  --lango-foreground: #09090b;
  --lango-border: #e4e4e7;
  --lango-radius: 12px;
  --lango-option-hover: #f4f4f5;
  --lango-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
  --lango-font-size: 14px;
}`;

const FEATURES = [
  {
    title: "5-minute setup",
    body: "npm install lango, add the provider, done. No dashboard, no API key for the default path.",
  },
  {
    title: "Pre-styled, Tailwind-ready",
    body: "Zero CSS imports. Override with triggerClassName, menuClassName and optionClassName.",
  },
  {
    title: "Headless API",
    body: "useLango() lets you build any custom UI — select, buttons, command palette.",
  },
  {
    title: "Google-compliant",
    body: "Official Translate Element underneath, attribution preserved, no secret keys in the browser.",
  },
];

const TOC = [
  ["installation", "Installation"],
  ["quick-start", "Quick start"],
  ["how-it-works", "How it works"],
  ["configuration", "Configuration"],
  ["styling", "Styling with Tailwind"],
  ["headless", "Headless UI"],
  ["providers", "Custom providers"],
  ["persistence", "Persistence"],
  ["troubleshooting", "Troubleshooting"],
];

export default function App() {
  return (
    <Lango languages={["en", "fr", "es", "de", "pt"]} defaultLanguage="en">
      <div className="min-h-screen bg-[#f6f5f1] font-sans text-black antialiased dark:bg-black dark:text-white">
        {/* Header */}
        <header className="sticky top-0 z-30 border-b border-neutral-200 bg-[#f6f5f1]/85 backdrop-blur-md dark:border-neutral-800 dark:bg-black/85">
          <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-6">
            <a href="#" className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-black text-sm font-extrabold text-white dark:bg-white dark:text-black">
                L
              </span>
              <span className="text-lg font-extrabold tracking-tight">LANGO</span>
            </a>
            <nav className="ml-4 hidden items-center gap-1 text-sm font-medium sm:flex">
              <a
                href="#demo"
                className="rounded-full px-3 py-1.5 text-neutral-600 transition hover:bg-neutral-200/70 hover:text-black dark:text-neutral-400 dark:hover:bg-neutral-900 dark:hover:text-white"
              >
                Demo
              </a>
              <a
                href="#docs"
                className="rounded-full px-3 py-1.5 text-neutral-600 transition hover:bg-neutral-200/70 hover:text-black dark:text-neutral-400 dark:hover:bg-neutral-900 dark:hover:text-white"
              >
                Docs
              </a>
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noreferrer"
                className="rounded-full px-3 py-1.5 text-neutral-600 transition hover:bg-neutral-200/70 hover:text-black dark:text-neutral-400 dark:hover:bg-neutral-900 dark:hover:text-white"
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

        <main className="mx-auto max-w-6xl px-6">
          {/* Hero */}
          <section className="pb-10 pt-16 text-center sm:pt-24">
            <p className="inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-widest dark:border-neutral-700 dark:bg-black">
              <span className="h-2 w-2 rounded-full bg-black dark:bg-white" />
              v0.1.0 — Powered by Google
            </p>
            <h1 className="mx-auto mt-6 max-w-4xl text-5xl font-extrabold leading-[1.02] tracking-tight sm:text-7xl">
              Translate your website.
              <br />
              <span className="bg-black text-white dark:bg-white dark:text-black">
                &nbsp;Keep your UI.&nbsp;
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-neutral-600 dark:text-neutral-400">
              A developer-first translation package for React. One provider, one switcher —
              pre-styled, Tailwind-compatible, fully customizable.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#docs"
                className="inline-flex items-center rounded-full bg-black px-8 py-3 text-sm font-bold text-white transition hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
              >
                Read the Docs
              </a>
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center rounded-full border-2 border-black px-8 py-3 text-sm font-bold transition hover:bg-neutral-200/70 dark:border-white dark:hover:bg-neutral-800"
              >
                ★ Star on GitHub
              </a>
            </div>

            <div className="mx-auto mt-8 max-w-md">
              <Code title="install">{`npm install lango`}</Code>
            </div>

            {/* Demo */}
            <div id="demo" className="mx-auto mt-12 max-w-3xl scroll-mt-24 text-left">
              <DemoCard />
              <p className="mt-4 text-center text-sm text-neutral-500">
                Live demo — this content is really translated by Google. Try the switcher.
              </p>
            </div>
          </section>

          {/* Features */}
          <section className="grid gap-4 py-10 sm:grid-cols-2">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="rounded-3xl border-2 border-black bg-white p-7 transition hover:-translate-y-1 hover:shadow-[6px_6px_0_0_#09090b] dark:border-white dark:bg-black dark:hover:shadow-[6px_6px_0_0_#fff]"
              >
                <h3 className="text-lg font-extrabold tracking-tight">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                  {f.body}
                </p>
              </div>
            ))}
          </section>

          {/* Docs — one whole page */}
          <section id="docs" className="scroll-mt-24 py-10">
            <p className="text-xs font-bold uppercase tracking-widest text-neutral-500">
              Documentation
            </p>
            <h2 className="mt-2 max-w-2xl text-4xl font-extrabold tracking-tight sm:text-5xl">
              Everything you need, on one page.
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-neutral-600 dark:text-neutral-400">
              This is the full Lango manual — from install to custom translation backends. Read
              it top to bottom, or jump to whatever you need. Every example on this page is
              copy-paste ready.
            </p>

            <div className="mt-12 grid gap-10 lg:grid-cols-[220px_minmax(0,1fr)]">
              {/* TOC */}
              <aside className="lg:sticky lg:top-24 lg:self-start">
                <p className="mb-3 hidden text-xs font-bold uppercase tracking-widest text-neutral-400 lg:block">
                  On this page
                </p>
                <nav className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0">
                  {TOC.map(([id, label], i) => (
                    <a
                      key={id}
                      href={`#${id}`}
                      className="shrink-0 rounded-full border border-neutral-300 px-3.5 py-1.5 text-sm font-semibold whitespace-nowrap transition hover:bg-neutral-200/70 lg:border-0 lg:px-3 lg:py-1.5 lg:text-left lg:font-medium lg:text-neutral-500 lg:hover:bg-neutral-200/70 lg:hover:text-black dark:border-neutral-700 dark:hover:bg-neutral-800 lg:dark:hover:bg-neutral-900 lg:dark:hover:text-white"
                    >
                      <span className="mr-1.5 font-mono text-xs opacity-50">{i + 1}</span>
                      {label}
                    </a>
                  ))}
                </nav>
              </aside>

              {/* Content */}
              <div className="min-w-0 space-y-12">
                <DocSection id="installation" index="01" title="Installation">
                  <p>
                    Lango ships as a single npm package with zero runtime dependencies — just
                    React itself. It needs <strong className="font-bold text-black dark:text-white">React 16.8 or newer</strong> (hooks),
                    and works with or without Tailwind in your project. Tailwind is purely
                    optional: the switcher looks finished out of the box, and Tailwind classes
                    simply give you a nicer way to restyle it.
                  </p>
                  <Code title="terminal">{`npm install lango`}</Code>
                  <p>
                    That is the entire install. There is no CLI to run, no config file to create,
                    no API key to paste, and — importantly —{" "}
                    <strong className="font-bold text-black dark:text-white">no stylesheet to import</strong>.
                    Older versions of Lango asked you to add{" "}
                    <code className="rounded bg-neutral-100 px-1.5 py-0.5 font-mono text-[13px] text-black dark:bg-neutral-900 dark:text-white">import "lango/styles.css"</code>,
                    but that step is gone: the <code className="rounded bg-neutral-100 px-1.5 py-0.5 font-mono text-[13px] text-black dark:bg-neutral-900 dark:text-white">&lt;Lango&gt;</code> provider
                    injects its default styles automatically the first time it mounts. If you still
                    have the old import lying around, it is harmless — but you can safely delete it.
                  </p>
                </DocSection>

                <DocSection id="quick-start" index="02" title="Quick start">
                  <p>
                    The fastest way to understand Lango is the three-line version: wrap your app in
                    the <code className="rounded bg-neutral-100 px-1.5 py-0.5 font-mono text-[13px] text-black dark:bg-neutral-900 dark:text-white">Lango</code> provider,
                    drop a <code className="rounded bg-neutral-100 px-1.5 py-0.5 font-mono text-[13px] text-black dark:bg-neutral-900 dark:text-white">LanguageSwitcher</code> wherever
                    you want it, and you are done. Switching languages in the dropdown translates
                    the whole page in place — your layout, your components, your routing all stay
                    exactly as they are.
                  </p>
                  <Code title="App.tsx">{QUICK_START}</Code>
                  <p>
                    A few things worth noticing here. First,{" "}
                    <code className="rounded bg-neutral-100 px-1.5 py-0.5 font-mono text-[13px] text-black dark:bg-neutral-900 dark:text-white">languages</code> is
                    the list of languages your site offers, and it must contain at least one code —
                    Lango throws a clear error otherwise, because a translator with no languages is
                    almost certainly a bug. Second, <code className="rounded bg-neutral-100 px-1.5 py-0.5 font-mono text-[13px] text-black dark:bg-neutral-900 dark:text-white">defaultLanguage</code> (which
                    falls back to <code className="rounded bg-neutral-100 px-1.5 py-0.5 font-mono text-[13px] text-black dark:bg-neutral-900 dark:text-white">"en"</code>) is
                    the language your content is actually written in. Lango uses it as the source
                    language for translation and as the fallback whenever a saved or detected
                    language is not in your list. Third, the switcher can live anywhere inside the
                    provider — header, sidebar, settings modal — and you can render as many of them
                    as you like; they all stay in sync because they all read the same context.
                  </p>
                  <Callout>
                    <strong className="font-extrabold">Try it live — </strong>
                    the demo card at the top of this page is a real Lango integration. Open the
                    switcher in its toolbar, pick a language, and watch this entire page —
                    including this documentation — get translated by Google.
                  </Callout>
                </DocSection>

                <DocSection id="how-it-works" index="03" title="How it works">
                  <p>
                    There is no magic here, and that is deliberate. Under the hood, Lango drives
                    the official <strong className="font-bold text-black dark:text-white">Google Translate Element</strong> —
                    the same no-key, client-side website translator Google itself offers. When your
                    app mounts, Lango loads Google's script, creates the Translate Element in a
                    hidden container, and then translates pages by driving the widget's own language
                    selector programmatically. You get Google-grade translation quality with none of
                    the usual pain: no billing account, no server to run, no API keys leaking into
                    your frontend bundle.
                  </p>
                  <p>
                    Concretely, calling <code className="rounded bg-neutral-100 px-1.5 py-0.5 font-mono text-[13px] text-black dark:bg-neutral-900 dark:text-white">setLanguage("fr")</code> does
                    roughly this, in order: it updates React state immediately (so your switcher
                    label flips to <em>Français</em> without waiting), persists the choice to{" "}
                    <code className="rounded bg-neutral-100 px-1.5 py-0.5 font-mono text-[13px] text-black dark:bg-neutral-900 dark:text-white">localStorage</code>,
                    sets <code className="rounded bg-neutral-100 px-1.5 py-0.5 font-mono text-[13px] text-black dark:bg-neutral-900 dark:text-white">isTranslating</code> to{" "}
                    <code className="rounded bg-neutral-100 px-1.5 py-0.5 font-mono text-[13px] text-black dark:bg-neutral-900 dark:text-white">true</code> so
                    you can show a spinner, and then asks the provider to translate. The default
                    provider waits for the Google widget to be ready, sets its language, and
                    resolves — at which point <code className="rounded bg-neutral-100 px-1.5 py-0.5 font-mono text-[13px] text-black dark:bg-neutral-900 dark:text-white">isTranslating</code> flips
                    back to false. If anything fails (offline, blocked script), the promise rejects,
                    Lango stores the error in <code className="rounded bg-neutral-100 px-1.5 py-0.5 font-mono text-[13px] text-black dark:bg-neutral-900 dark:text-white">error</code>,
                    and your original content stays put — the app never crashes, never blanks.
                  </p>
                  <p>
                    Compliance-wise, Lango plays by Google's rules: the raw Google widget stays in
                    the DOM (it is only visually hidden with static CSS positioning — no interval
                    loops deleting Google nodes, no spoofed attribution), and the{" "}
                    <em>“Translations by Google”</em> credit stays visible in the switcher menu by
                    default. Google may inject a top banner iframe on some pages or locales; Lango
                    neutralizes its layout impact with documented CSS so your design does not jump.
                  </p>
                </DocSection>

                <DocSection id="configuration" index="04" title="Configuration">
                  <p>
                    Both Lango components are configured with plain props — no context setup files,
                    no higher-order components. The provider owns the language state; the switcher
                    is just a (very polished) view over it. Here is everything each one accepts.
                  </p>
                  <p className="text-sm font-bold uppercase tracking-widest text-neutral-400">
                    &lt;Lango&gt; props
                  </p>
                  <DocTable
                    rows={[
                      ["languages", "required", 'The languages you offer, e.g. ["en","fr","es"]. Min length 1.'],
                      ["defaultLanguage", '"en"', "The language your content is written in. Prepended to languages if missing."],
                      ["persistLanguage", "true", 'Remember the choice in localStorage["lango-language"] across visits.'],
                      ["provider", "Google element", "Swap the translation backend (see Custom providers)."],
                    ]}
                  />
                  <p className="text-sm font-bold uppercase tracking-widest text-neutral-400">
                    &lt;LanguageSwitcher&gt; props
                  </p>
                  <DocTable
                    rows={[
                      ["showFlags", "true", "Show the flag emoji next to each language."],
                      ["showNativeNames", "true", 'Show autonyms ("Français") instead of English names ("French").'],
                      ["className", '""', "Extra classes on the root element. Tailwind welcome."],
                      ["triggerClassName", '""', "Tailwind classes for the trigger button."],
                      ["menuClassName", '""', "Tailwind classes for the dropdown panel."],
                      ["optionClassName", '""', "Tailwind classes for each language row."],
                      ["showAttribution", "true", "“Translations by Google” line. Keep it on for Google compliance."],
                    ]}
                  />
                </DocSection>

                <DocSection id="styling" index="05" title="Styling with Tailwind">
                  <p>
                    Styling is where Lango tries hardest to stay out of your way. The switcher
                    arrives fully designed — pill trigger, elevated dropdown, checkmark on the
                    active language, spinner while translating — so most projects never write a
                    line of CSS for it. But when your design system demands something specific, you
                    have three layers of control, from quickest to most total.
                  </p>
                  <p>
                    <strong className="font-bold text-black dark:text-white">Layer one is Tailwind props.</strong> Pass
                    utilities straight into the trigger, menu, or individual options. Because these
                    are merged on top of the defaults, you only specify what you want to change —
                    a black trigger is literally one prop.
                  </p>
                  <Code title="styling.tsx">{TAILWIND_STYLE}</Code>
                  <p>
                    <strong className="font-bold text-black dark:text-white">Layer two is CSS variables.</strong> If
                    you prefer tokens over utilities, every color, radius, and shadow the switcher
                    uses is a <code className="rounded bg-neutral-100 px-1.5 py-0.5 font-mono text-[13px] text-black dark:bg-neutral-900 dark:text-white">--lango-*</code> variable
                    you can redefine once in your own stylesheet. Class names are stable
                    (<code className="rounded bg-neutral-100 px-1.5 py-0.5 font-mono text-[13px] text-black dark:bg-neutral-900 dark:text-white">.lango-switcher</code>,{" "}
                    <code className="rounded bg-neutral-100 px-1.5 py-0.5 font-mono text-[13px] text-black dark:bg-neutral-900 dark:text-white">.lango-trigger</code>,{" "}
                    <code className="rounded bg-neutral-100 px-1.5 py-0.5 font-mono text-[13px] text-black dark:bg-neutral-900 dark:text-white">.lango-menu</code>,{" "}
                    <code className="rounded bg-neutral-100 px-1.5 py-0.5 font-mono text-[13px] text-black dark:bg-neutral-900 dark:text-white">.lango-option</code>, …),
                    so plain-CSS overrides keep working across upgrades.
                  </p>
                  <Code title="tokens.css">{CSS_VARIABLES}</Code>
                  <p>
                    <strong className="font-bold text-black dark:text-white">Layer three is the eject hatch.</strong> Set{" "}
                    <code className="rounded bg-neutral-100 px-1.5 py-0.5 font-mono text-[13px] text-black dark:bg-neutral-900 dark:text-white">window.__LANGO_NO_AUTO_CSS__ = true</code> before
                    mounting and Lango injects nothing at all — every pixel comes from your CSS.
                    This is the right choice if you are building a strict design-system wrapper and
                    want zero competing styles.
                  </p>
                </DocSection>

                <DocSection id="headless" index="06" title="Headless UI">
                  <p>
                    Sometimes a dropdown is not what you want — maybe a native{" "}
                    <code className="rounded bg-neutral-100 px-1.5 py-0.5 font-mono text-[13px] text-black dark:bg-neutral-900 dark:text-white">&lt;select&gt;</code> in
                    a settings form, a row of pill buttons, or an entry in a command palette. That
                    is what <code className="rounded bg-neutral-100 px-1.5 py-0.5 font-mono text-[13px] text-black dark:bg-neutral-900 dark:text-white">useLango()</code> is
                    for: the complete headless API over the same provider state. It returns the
                    current <code className="rounded bg-neutral-100 px-1.5 py-0.5 font-mono text-[13px] text-black dark:bg-neutral-900 dark:text-white">language</code>, the{" "}
                    <code className="rounded bg-neutral-100 px-1.5 py-0.5 font-mono text-[13px] text-black dark:bg-neutral-900 dark:text-white">languages</code> list,{" "}
                    <code className="rounded bg-neutral-100 px-1.5 py-0.5 font-mono text-[13px] text-black dark:bg-neutral-900 dark:text-white">setLanguage</code>, plus{" "}
                    <code className="rounded bg-neutral-100 px-1.5 py-0.5 font-mono text-[13px] text-black dark:bg-neutral-900 dark:text-white">isTranslating</code> and{" "}
                    <code className="rounded bg-neutral-100 px-1.5 py-0.5 font-mono text-[13px] text-black dark:bg-neutral-900 dark:text-white">error</code> so
                    custom UIs can show loading and failure states just like the built-in switcher
                    does. It must be called inside <code className="rounded bg-neutral-100 px-1.5 py-0.5 font-mono text-[13px] text-black dark:bg-neutral-900 dark:text-white">&lt;Lango&gt;</code> —
                    outside of it, it throws a helpful error instead of silently returning garbage.
                  </p>
                  <Code title="CustomSelector.tsx">{HEADLESS_SELECT}</Code>
                  <p>
                    The same hook powers richer patterns too. Here is a button group that disables
                    itself mid-translation and marks the active language for assistive technology
                    with <code className="rounded bg-neutral-100 px-1.5 py-0.5 font-mono text-[13px] text-black dark:bg-neutral-900 dark:text-white">aria-pressed</code> —
                    a nice little accessibility win that costs one attribute.
                  </p>
                  <Code title="LanguageButtons.tsx">{HEADLESS_BUTTONS}</Code>
                </DocSection>

                <DocSection id="providers" index="07" title="Custom providers">
                  <p>
                    The Google Translate Element is a wonderful default — free, keyless, instant —
                    but some teams need something else: paid Cloud Translation quality, a fully
                    offline dictionary, or content that must never touch a third party. Lango
                    handles that with the <code className="rounded bg-neutral-100 px-1.5 py-0.5 font-mono text-[13px] text-black dark:bg-neutral-900 dark:text-white">TranslationProvider</code> interface:
                    any object with an async <code className="rounded bg-neutral-100 px-1.5 py-0.5 font-mono text-[13px] text-black dark:bg-neutral-900 dark:text-white">translate(language)</code> method
                    (plus an optional <code className="rounded bg-neutral-100 px-1.5 py-0.5 font-mono text-[13px] text-black dark:bg-neutral-900 dark:text-white">dispose()</code>).
                    Pass it as <code className="rounded bg-neutral-100 px-1.5 py-0.5 font-mono text-[13px] text-black dark:bg-neutral-900 dark:text-white">provider</code> and
                    everything else — state, persistence, switcher UI, loading and error states —
                    keeps working unchanged.
                  </p>
                  <Code title="my-provider.ts">{CUSTOM_PROVIDER}</Code>
                  <p>
                    The canonical example is Google's Cloud Translation API, which — unlike the
                    Element — requires a billed API key. That key must live on{" "}
                    <strong className="font-bold text-black dark:text-white">your server</strong>, never
                    in the frontend bundle where anyone could extract it. So your provider becomes
                    a thin client over your own endpoint: it POSTs the target language, your server
                    calls Google with the secret key, and returns translated content. Lango never
                    sees or touches credentials either way.
                  </p>
                </DocSection>

                <DocSection id="persistence" index="08" title="Persistence">
                  <p>
                    Returning visitors should not have to re-pick their language, so Lango resolves
                    the starting language with a simple, predictable priority. First it checks{" "}
                    <code className="rounded bg-neutral-100 px-1.5 py-0.5 font-mono text-[13px] text-black dark:bg-neutral-900 dark:text-white">localStorage["lango-language"]</code> —
                    an explicit past choice always wins. If there is none (or it names a language
                    you no longer offer), it looks at the browser's preferred languages and picks
                    the first one present in your <code className="rounded bg-neutral-100 px-1.5 py-0.5 font-mono text-[13px] text-black dark:bg-neutral-900 dark:text-white">languages</code> list.
                    Otherwise it falls back to <code className="rounded bg-neutral-100 px-1.5 py-0.5 font-mono text-[13px] text-black dark:bg-neutral-900 dark:text-white">defaultLanguage</code>.
                    Set <code className="rounded bg-neutral-100 px-1.5 py-0.5 font-mono text-[13px] text-black dark:bg-neutral-900 dark:text-white">persistLanguage={`false`}</code> to
                    opt out of storage entirely — useful for incognito-style experiences or demos.
                    On mount, if the resolved language differs from the page language, Lango
                    translates to it automatically, so a French visitor lands on French content with
                    no flicker of interaction required.
                  </p>
                </DocSection>

                <DocSection id="troubleshooting" index="09" title="Troubleshooting">
                  <p>
                    Translation happens in the browser against Google's servers, so when something
                    goes wrong it is almost always environmental rather than a bug in your code.
                    Here are the failure modes people actually hit, in rough order of frequency,
                    and what to do about each.
                  </p>
                  <div className="space-y-3">
                    {[
                      ["The switcher label changes, but the page stays in English.",
                        "The Google script never loaded. Open DevTools → Network, filter for translate.google.com, and look for element.js. Ad-blockers, Brave Shields, Pi-hole, and corporate firewalls all block it. Allow the domain, disable the blocker for your dev host, and hard-refresh. Lango sets error from useLango() in this case and keeps your original content readable."],
                      ["Nothing happens at all, not even the label.",
                        "Your click handler is fine — the component is probably outside <Lango>. useLango() throws in that case, so check the console. Every LanguageSwitcher and every useLango() call must be a descendant of the provider."],
                      ["It works in dev but not in production.",
                        "You probably edited packages/lango/src without rebuilding. The site consumes the built dist/, not src/. Run npm run build --workspace=lango and restart Vite so the fresh bundle is picked up."],
                      ["An unsupported language code gets selected.",
                        "setLanguage() ignores codes outside your languages list and logs a console warning — by design, so a bad value can never blank your page. Double-check spelling (e.g. pt vs pt-BR) and make sure the code is in your languages array."],
                      ["Layout jumps when translating certain locales.",
                        "Google injects a top banner iframe for some locales. Lango's injected CSS neutralizes it (body{top:0!important} plus hiding .goog-te-banner-frame). If you disabled auto-injection with __LANGO_NO_AUTO_CSS__, you own those rules now — re-add them to your own stylesheet."],
                    ].map(([title, body]) => (
                      <div
                        key={title}
                        className="rounded-2xl border border-neutral-200 p-5 dark:border-neutral-800"
                      >
                        <p className="font-bold text-black dark:text-white">{title}</p>
                        <p className="mt-1.5 text-sm">{body}</p>
                      </div>
                    ))}
                  </div>
                </DocSection>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="mt-10 border-t-2 border-black dark:border-white">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-6 gap-y-2 px-6 py-8 text-sm">
            <span className="font-extrabold tracking-tight">LANGO v0.1.0 — MIT</span>
            <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="font-semibold underline underline-offset-4">
              GitHub
            </a>
            <a href={X_URL} target="_blank" rel="noreferrer" className="font-semibold underline underline-offset-4">
              Made by @slycodez
            </a>
            <span className="ml-auto text-neutral-500">Translations by Google</span>
          </div>
        </footer>
      </div>
    </Lango>
  );
}
