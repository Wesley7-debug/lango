import { Code } from "../../components/Code";
import { DocSection, IC, Strong } from "../DocBits";
import { CUSTOM_PROVIDER } from "../content";

/** 12 - swapping the translation backend. */
export function ProvidersSection() {
  return (
    <DocSection id="providers" index="12" title="Custom Providers">
      <p>
        The Google Translate Element is a wonderful default - free, keyless, instant -
        but some teams need something else: paid Cloud Translation quality, a fully
        offline dictionary, or content that must never touch a third party. Lango
        handles that with the <IC>TranslationProvider</IC> interface:
        any object with an async <IC>translate(language)</IC> method
        (plus an optional <IC>dispose()</IC>).
        Pass it as <IC>provider</IC> and
        everything else - state, persistence, switcher UI, loading and error states -
        keeps working unchanged.
      </p>
      <Code title="my-provider.ts">{CUSTOM_PROVIDER}</Code>
      <p>
        The canonical example is Google's Cloud Translation API, which - unlike the
        Element - requires a billed API key. That key must live on{" "}
        <Strong>your server</Strong>, never
        in the frontend bundle where anyone could extract it. So your provider becomes
        a thin client over your own endpoint: it POSTs the target language, your server
        calls Google with the secret key, and returns translated content. Lango never
        sees or touches credentials either way.
      </p>
    </DocSection>
  );
}
