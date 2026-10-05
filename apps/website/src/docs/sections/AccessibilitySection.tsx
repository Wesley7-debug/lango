import { DocSection, IC } from "../DocBits";

/** 14 - accessibility contract. */
export function AccessibilitySection() {
  return (
    <DocSection id="accessibility" index="14" title="Accessibility">
      <p>
        The switcher is built as a real button/listbox pair, not a styled div: it
        exposes <IC>aria-haspopup</IC>,{" "}
        <IC>aria-expanded</IC>, and{" "}
        <IC>aria-selected</IC>,
        supports the full keyboard map (Enter, Space, Arrow keys, Home, End, Escape),
        returns focus to the trigger on close, and shows visible focus states. Motion
        respects <IC>prefers-reduced-motion</IC>.
        When building custom switchers with{" "}
        <IC>useLango()</IC>,
        mirror this with <IC>aria-pressed</IC> on
        toggle buttons or a labelled native <IC>&lt;select&gt;</IC>.
      </p>
    </DocSection>
  );
}
