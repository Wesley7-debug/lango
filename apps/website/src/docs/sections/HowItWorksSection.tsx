import { DocSection, IC, Strong } from "../DocBits";

/** 04 - what happens under the hood when you switch. */
export function HowItWorksSection() {
  return (
    <DocSection id="how-it-works" index="04" title="How It Works">
      <p>
        There is no magic here, and that is deliberate. Under the hood, Lango drives
        the official <Strong>Google Translate Element</Strong> -
        the same no-key, client-side website translator Google itself offers. When your
        app mounts, Lango loads Google's script, creates the Translate Element in a
        hidden container, and then translates pages by driving the widget's own language
        selector programmatically. You get Google-grade translation quality with none of
        the usual pain: no billing account, no server to run, no API keys leaking into
        your frontend bundle.
      </p>
      <p>
        Concretely, calling <IC>setLanguage("fr")</IC> does
        roughly this, in order: it updates React state immediately (so your switcher
        label flips to <em>Français</em> without waiting), persists the choice to{" "}
        <IC>localStorage</IC>,
        sets <IC>isTranslating</IC> to{" "}
        <IC>true</IC> so
        you can show a spinner, and then asks the provider to translate. The default
        provider waits for the Google widget to be ready, sets its language, and
        resolves - at which point <IC>isTranslating</IC> flips
        back to false. If anything fails (offline, blocked script), the promise rejects,
        Lango stores the error in <IC>error</IC>,
        and your original content stays put - the app never crashes, never blanks.
      </p>
      <p>
        Compliance-wise, Lango plays by Google's rules: the raw Google widget stays in
        the DOM (it is only visually hidden with static CSS positioning - no interval
        loops deleting Google nodes, no spoofed attribution), and the{" "}
        <em>“Translations by Google”</em> credit stays visible in the switcher menu by
        default. Google may inject a top banner iframe on some pages or locales; Lango
        neutralizes its layout impact with documented CSS so your design does not jump.
      </p>
    </DocSection>
  );
}
