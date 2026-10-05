import { Code } from "../../components/Code";
import { DocSection, IC } from "../DocBits";

/** 06 - the pre-built dropdown in depth. */
export function SwitcherSection() {
  return (
    <DocSection id="switcher" index="06" title="LanguageSwitcher">
      <p>
        The switcher is a finished dropdown UI over the provider state: a pill trigger
        showing the current language, an accessible listbox menu, a checkmark on the
        active language, a spinner while translating, and the Google attribution line.
        Render it anywhere inside <IC>&lt;Lango&gt;</IC> -
        header, sidebar, settings modal - and render as many as you like; they all stay
        in sync through the same context. It is fully keyboard operable (Enter, Space,
        Arrow keys, Home, End, Escape) and announces itself correctly to screen readers
        via <IC>listbox</IC> semantics.
      </p>
      <Code title="Header.tsx">{`<LanguageSwitcher
  showFlags
  showNativeNames
  triggerClassName="bg-stone-900 text-stone-50"
  showAttribution
/>`}</Code>
      <p>
        Keep <IC>showAttribution</IC> on
        whenever you use the default Google provider - attribution is required by
        Google's terms. If the dropdown pattern does not fit your design, skip it
        entirely and build a custom switcher with <IC>useLango()</IC> instead.
      </p>
    </DocSection>
  );
}
