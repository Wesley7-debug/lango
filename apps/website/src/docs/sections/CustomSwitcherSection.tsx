import { Code } from "../../components/Code";
import { DocSection, IC } from "../DocBits";
import { CUSTOM_SWITCHER } from "../content";

/** 09 - building a bespoke switcher on the headless hook. */
export function CustomSwitcherSection() {
  return (
    <DocSection id="custom-switcher" index="09" title="Custom Switcher">
      <p>
        The headless hook makes a fully custom switcher a small component instead of a
        project. Here is a pill group that disables itself mid-translation and marks
        the active language with <IC>aria-pressed</IC> -
        style the buttons with your own Tailwind classes and it feels native to your
        app while Lango handles state, persistence, and the translation itself.
      </p>
      <Code title="PillSwitcher.tsx">{CUSTOM_SWITCHER}</Code>
      <p>
        The rule of thumb: reach for <IC>&lt;LanguageSwitcher&gt;</IC> when
        you want a polished dropdown with zero effort, and for{" "}
        <IC>useLango()</IC> the
        moment the design calls for anything else - tabs, a command-palette entry, a
        footer link list. Both stay in sync because both read the same provider.
      </p>
    </DocSection>
  );
}
