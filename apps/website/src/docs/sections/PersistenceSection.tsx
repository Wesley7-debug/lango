import { DocSection, IC } from "../DocBits";

/** 13 - how the starting language is chosen. */
export function PersistenceSection() {
  return (
    <DocSection id="persistence" index="13" title="Persistence">
      <p>
        Returning visitors should not have to re-pick their language, so Lango resolves
        the starting language with a simple, predictable priority. First it checks{" "}
        <IC>localStorage["lango-language"]</IC> -
        an explicit past choice always wins. If there is none (or it names a language
        you no longer offer), it looks at the browser's preferred languages and picks
        the first one present in your <IC>languages</IC> list.
        Otherwise it falls back to <IC>defaultLanguage</IC>.
        Set <IC>persistLanguage={`false`}</IC> to
        opt out of storage entirely - useful for incognito-style experiences or demos.
        On mount, if the resolved language differs from the page language, Lango
        translates to it automatically, so a French visitor lands on French content with
        no flicker of interaction required.
      </p>
    </DocSection>
  );
}
