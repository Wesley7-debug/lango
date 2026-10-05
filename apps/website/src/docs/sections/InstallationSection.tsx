import { InstallSwitcher } from "../../components/InstallSwitcher";
import { DocSection, IC, Strong } from "../DocBits";

/** 02 - installing from any package manager. */
export function InstallationSection() {
  return (
    <DocSection id="installation" index="02" title="Installation">
      <p>
        Install Lango with whichever package manager your project uses - the published
        package is identical on all of them, with zero runtime dependencies (just a
        React peer dependency). Pick your tool:
      </p>
      <InstallSwitcher />
      <p>
        That is the entire install. It needs{" "}
        <Strong>React 16.8 or newer</Strong> (hooks),
        works with or without Tailwind, and - importantly -{" "}
        <Strong>no stylesheet to import</Strong>.
        The <IC>&lt;Lango&gt;</IC> provider
        injects its default styles automatically the first time it mounts. If you are
        coming from an older version and still have{" "}
        <IC>import "lango-i18n/styles.css"</IC>{" "}
        lying around, it is harmless - but you can safely delete it.
      </p>
    </DocSection>
  );
}
