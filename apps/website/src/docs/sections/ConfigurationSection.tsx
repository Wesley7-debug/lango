import { DocSection, DocTable } from "../DocBits";

/** 05 - every prop on both components. */
export function ConfigurationSection() {
  return (
    <DocSection id="configuration" index="05" title="Configuration">
      <p>
        Both Lango components are configured with plain props - no context setup files,
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
          ["provider", "Google element", "Swap the translation backend (see Custom Providers)."],
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
  );
}
