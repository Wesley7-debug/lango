import { Code } from "../../components/Code";
import { Callout, DocSection, IC } from "../DocBits";
import { QUICK_START } from "../content";

/** 03 - the shortest path to a translated page. */
export function QuickStartSection() {
  return (
    <DocSection id="quick-start" index="03" title="Quick Start">
      <div className="flex flex-wrap items-center gap-x-2 gap-y-2 text-sm font-extrabold">
        {["Install", "Import", "Wrap app", "Add switcher", "Done"].map((step, i, arr) => (
          <span key={step} className="inline-flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-neutral-300 px-3 py-1 dark:border-neutral-700">
              <span className="font-mono text-xs opacity-50">{i + 1}</span> {step}
            </span>
            {i < arr.length - 1 && <span aria-hidden="true" className="opacity-40">↓</span>}
          </span>
        ))}
      </div>
      <p>
        The fastest way to understand Lango is the three-line version: wrap your app in
        the <IC>Lango</IC> provider,
        drop a <IC>LanguageSwitcher</IC> wherever
        you want it, and you are done. Switching languages in the dropdown translates
        the whole page in place - your layout, your components, your routing all stay
        exactly as they are.
      </p>
      <Code title="App.tsx">{QUICK_START}</Code>
      <p>
        A few things worth noticing here. First,{" "}
        <IC>languages</IC> is
        the list of languages your site offers, and it must contain at least one code -
        Lango throws a clear error otherwise, because a translator with no languages is
        almost certainly a bug. Second, <IC>defaultLanguage</IC> (which
        falls back to <IC>"en"</IC>) is
        the language your content is actually written in. Lango uses it as the source
        language for translation and as the fallback whenever a saved or detected
        language is not in your list. Third, the switcher can live anywhere inside the
        provider - header, sidebar, settings modal - and you can render as many of them
        as you like; they all stay in sync because they all read the same context.
      </p>
      <Callout>
        <strong className="font-extrabold">Try it live - </strong>
        the demo card on the home page is a real Lango integration. Open the
        switcher in its toolbar, pick a language, and watch the entire page get
        translated by Google.
      </Callout>
    </DocSection>
  );
}
