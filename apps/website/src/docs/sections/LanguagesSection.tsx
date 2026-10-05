import { DocSection, IC } from "../DocBits";
import { LANGUAGE_CODES } from "../content";

/** 10 - which language codes work. */
export function LanguagesSection() {
  return (
    <DocSection id="languages" index="10" title="Supported Languages">
      <p>
        Any Google Translate code works in the{" "}
        <IC>languages</IC> array -
        Lango ships display metadata (English name, autonym, flag hint) for about 30
        common languages and gracefully falls back to the raw code for anything else,
        so an exotic code never breaks the switcher.
      </p>
      <div className="flex flex-wrap gap-1.5">
        {LANGUAGE_CODES.map((code) => (
          <code
            key={code}
            className="rounded-md border border-neutral-200 bg-neutral-50 px-2 py-0.5 font-mono text-[13px] text-stone-900 dark:border-neutral-800 dark:bg-neutral-950 dark:text-stone-100"
          >
            {code}
          </code>
        ))}
      </div>
      <p>
        Passing a code outside your list to{" "}
        <IC>setLanguage()</IC> is
        ignored with a console warning, so a bad value can never blank your page.
      </p>
    </DocSection>
  );
}
