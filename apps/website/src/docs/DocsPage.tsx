import { TOC } from "./content";
import { AccessibilitySection } from "./sections/AccessibilitySection";
import { ConfigurationSection } from "./sections/ConfigurationSection";
import { CustomSwitcherSection } from "./sections/CustomSwitcherSection";
import { GoogleSection } from "./sections/GoogleSection";
import { HeadlessSection } from "./sections/HeadlessSection";
import { HowItWorksSection } from "./sections/HowItWorksSection";
import { InstallationSection } from "./sections/InstallationSection";
import { IntroductionSection } from "./sections/IntroductionSection";
import { LanguagesSection } from "./sections/LanguagesSection";
import { PersistenceSection } from "./sections/PersistenceSection";
import { ProvidersSection } from "./sections/ProvidersSection";
import { QuickStartSection } from "./sections/QuickStartSection";
import { StylingSection } from "./sections/StylingSection";
import { SwitcherSection } from "./sections/SwitcherSection";
import { TroubleshootingSection } from "./sections/TroubleshootingSection";

/**
 * The full manual on one page: sticky table of contents plus every section
 * composed in reading order. Sections own their prose; this owns layout.
 */
export function DocsPage() {
  return (
    <main className="mx-auto max-w-6xl px-6">
      <section className="py-10 sm:py-14">
        <a
          href="#/"
          className="inline-flex items-center gap-1.5 rounded-full border border-neutral-300 px-3.5 py-1.5 text-sm font-semibold transition hover:bg-neutral-200/70 dark:border-neutral-700 dark:hover:bg-neutral-800"
        >
          ← Back to home
        </a>
        <p className="mt-8 text-xs font-bold uppercase tracking-widest text-neutral-500">
          Documentation
        </p>
        <h2 className="mt-2 max-w-2xl text-4xl font-extrabold tracking-tight sm:text-5xl">
          Everything you need, on one page.
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-neutral-600 dark:text-neutral-400">
          This is the full Lango manual - from install to custom translation backends. Read
          it top to bottom, or jump to whatever you need. Every example on this page is
          copy-paste ready.
        </p>

        <div className="mt-12 grid gap-10 lg:grid-cols-[220px_minmax(0,1fr)]">
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <p className="mb-3 hidden text-xs font-bold uppercase tracking-widest text-neutral-400 lg:block">
              On this page
            </p>
            <nav className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0">
              {TOC.map(([id, label], i) => (
                <a
                  key={id}
                  href={`#/docs/${id}`}
                  className="shrink-0 rounded-full border border-neutral-300 px-3.5 py-1.5 text-sm font-semibold whitespace-nowrap transition hover:bg-neutral-200/70 lg:border-0 lg:px-3 lg:py-1.5 lg:text-left lg:font-medium lg:text-neutral-500 lg:hover:bg-neutral-200/70 lg:hover:text-stone-900 dark:border-neutral-700 dark:hover:bg-neutral-800 lg:dark:hover:bg-neutral-900 lg:dark:hover:text-stone-50"
                >
                  <span className="mr-1.5 font-mono text-xs opacity-50">{i + 1}</span>
                  {label}
                </a>
              ))}
            </nav>
          </aside>

          <div className="min-w-0 space-y-12">
            <IntroductionSection />
            <InstallationSection />
            <QuickStartSection />
            <HowItWorksSection />
            <ConfigurationSection />
            <SwitcherSection />
            <StylingSection />
            <HeadlessSection />
            <CustomSwitcherSection />
            <LanguagesSection />
            <GoogleSection />
            <ProvidersSection />
            <PersistenceSection />
            <AccessibilitySection />
            <TroubleshootingSection />
          </div>
        </div>
      </section>
    </main>
  );
}
