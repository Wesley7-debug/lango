import { DocSection, IC } from "../DocBits";

/** 11 - how the Google default works and stays compliant. */
export function GoogleSection() {
  return (
    <DocSection id="google" index="11" title="Google Integration">
      <p>
        The default provider uses the official Google Translate Element - the no-key,
        client-side website translator Google offers. No billing account, no server,
        no credentials in the browser. Lango loads the official script, instantiates
        the official widget, and drives its language selector programmatically from
        your UI.
      </p>
      <p>
        Compliance is built in: the raw Google widget stays in the DOM (visually hidden
        with static CSS positioning - no interval loops deleting Google nodes), the{" "}
        <em>“Translations by Google”</em> attribution stays visible, and the top banner
        iframe Google injects on some locales is neutralized with documented CSS so
        your layout does not jump. If you need the paid Cloud Translation API instead,
        build a <IC>TranslationProvider</IC> over
        your own server endpoint (see Custom Providers) - the key must live on your
        server, never in the frontend bundle.
      </p>
    </DocSection>
  );
}
