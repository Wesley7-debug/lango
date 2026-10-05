import { Code } from "../../components/Code";
import { DocSection, IC } from "../DocBits";
import { HEADLESS_BUTTONS, HEADLESS_SELECT } from "../content";

/** 08 - the headless useLango() API. */
export function HeadlessSection() {
  return (
    <DocSection id="headless" index="08" title="useLango">
      <p>
        Sometimes a dropdown is not what you want - maybe a native{" "}
        <IC>&lt;select&gt;</IC> in
        a settings form, a row of pill buttons, or an entry in a command palette. That
        is what <IC>useLango()</IC> is
        for: the complete headless API over the same provider state. It returns the
        current <IC>language</IC>, the{" "}
        <IC>languages</IC> list,{" "}
        <IC>setLanguage</IC>, plus{" "}
        <IC>isTranslating</IC> and{" "}
        <IC>error</IC> so
        custom UIs can show loading and failure states just like the built-in switcher
        does. It must be called inside <IC>&lt;Lango&gt;</IC> -
        outside of it, it throws a helpful error instead of silently returning garbage.
      </p>
      <Code title="CustomSelector.tsx">{HEADLESS_SELECT}</Code>
      <p>
        The same hook powers richer patterns too. Here is a button group that disables
        itself mid-translation and marks the active language for assistive technology
        with <IC>aria-pressed</IC> -
        a nice little accessibility win that costs one attribute.
      </p>
      <Code title="LanguageButtons.tsx">{HEADLESS_BUTTONS}</Code>
    </DocSection>
  );
}
