import { Callout, DocSection, IC, Strong } from "../DocBits";

/** 01 - what Lango is and what you get. */
export function IntroductionSection() {
  return (
    <DocSection id="introduction" index="01" title="Introduction">
      <p>
        Lango is a <Strong>simple, customizable website translation package for React</Strong>,
        powered by Google and built for developers. You write your site once, in one
        language - Lango translates the whole page in place when a visitor picks
        another language. No routing changes, no content duplication, no CMS, no
        dashboard, no API key.
      </p>
      <p>
        You get three pieces: a <IC>&lt;Lango&gt;</IC> provider
        that owns language state, a pre-styled{" "}
        <IC>&lt;LanguageSwitcher&gt;</IC> dropdown,
        and a <IC>useLango()</IC> hook
        for building any custom UI. Everything else on this page explains those three
        pieces in depth.
      </p>
    </DocSection>
  );
}
