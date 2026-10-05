import { Code } from "../../components/Code";
import { DocSection, IC, Strong } from "../DocBits";
import { CSS_VARIABLES, TAILWIND_STYLE } from "../content";

/** 07 - three layers of styling control. */
export function StylingSection() {
  return (
    <DocSection id="styling" index="07" title="Custom Styling">
      <p>
        Styling is where Lango tries hardest to stay out of your way. The switcher
        arrives fully designed - pill trigger, elevated dropdown, checkmark on the
        active language, spinner while translating - so most projects never write a
        line of CSS for it. But when your design system demands something specific, you
        have three layers of control, from quickest to most total.
      </p>
      <p>
        <Strong>Layer one is Tailwind props.</Strong> Pass
        utilities straight into the trigger, menu, or individual options. Because these
        are merged on top of the defaults, you only specify what you want to change -
        a black trigger is literally one prop.
      </p>
      <Code title="styling.tsx">{TAILWIND_STYLE}</Code>
      <p>
        <Strong>Layer two is CSS variables.</Strong> If
        you prefer tokens over utilities, every color, radius, and shadow the switcher
        uses is a <IC>--lango-*</IC> variable
        you can redefine once in your own stylesheet. Class names are stable
        (<IC>.lango-switcher</IC>,{" "}
        <IC>.lango-trigger</IC>,{" "}
        <IC>.lango-menu</IC>,{" "}
        <IC>.lango-option</IC>, …),
        so plain-CSS overrides keep working across upgrades.
      </p>
      <Code title="tokens.css">{CSS_VARIABLES}</Code>
      <p>
        <Strong>Layer three is the eject hatch.</Strong> Set{" "}
        <IC>window.__LANGO_NO_AUTO_CSS__ = true</IC> before
        mounting and Lango injects nothing at all - every pixel comes from your CSS.
        This is the right choice if you are building a strict design-system wrapper and
        want zero competing styles.
      </p>
    </DocSection>
  );
}
