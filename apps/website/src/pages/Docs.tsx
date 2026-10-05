import { useEffect, useState } from "react";
import { Code } from "../components/Code";

const SECTIONS = [
  { id: "installation", label: "Installation" },
  { id: "quick-start", label: "Quick start" },
  { id: "configuration", label: "Configuration" },
  { id: "headless", label: "Headless API" },
  { id: "styling", label: "Styling" },
  { id: "google", label: "Google integration" },
  { id: "accessibility", label: "Accessibility" },
  { id: "troubleshooting", label: "Troubleshooting" },
];

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="docs-section">
      <h2>{title}</h2>
      {children}
    </section>
  );
}

const LANG_CONFIG = `npm install lango`;

const QUICK_START = `import { Lango, LanguageSwitcher } from "lango";
import "lango/styles.css";

function App() {
  return (
    <Lango languages={["en", "fr", "es"]} defaultLanguage="en">
      <LanguageSwitcher />
      <YourApp />
    </Lango>
  );
}`;

const HEADLESS = `function CustomSelector() {
  const { language, languages, setLanguage } = useLango();

  return (
    <select value={language} onChange={(e) => setLanguage(e.target.value)}>
      {languages.map((code) => (
        <option key={code} value={code}>{code}</option>
      ))}
    </select>
  );
}`;

const STYLING = `.lango-trigger {
  background: white;
  border: 1px solid #ddd;
  border-radius: 999px;
  padding: 8px 14px;
}

.lango-menu { border-radius: 14px; padding: 6px; }
.lango-option { padding: 8px 12px; }`;

const STYLING_VARS = `/* or override the CSS variables */
:root {
  --lango-background: white;
  --lango-foreground: #111;
  --lango-border: #e5e5e5;
  --lango-radius: 10px;
  --lango-option-hover: #f5f5f5;
  --lango-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
  --lango-font-size: 14px;
}`;

export default function Docs() {
  const [active, setActive] = useState(SECTIONS[0].id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-96px 0px -70% 0px" }
    );
    for (const s of SECTIONS) {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <main className="wrap docs-page">
      <div className="docs-head">
        <a className="docs-back" href="#/">
          ← Back to home
        </a>
        <h1>Documentation</h1>
        <p>
          Everything you need to add Google-powered translation to a React app —
          in about five minutes.
        </p>
      </div>

      <div className="docs-layout">
        <aside className="docs-sidebar">
          <p className="toc-label">On this page</p>
          <ul className="docs-toc">
            {SECTIONS.map((s) => (
              <li key={s.id}>
                <a
                  href={`#/docs`}
                  className={s.id === active ? "active" : undefined}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(s.id);
                  }}
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </aside>

        <div className="docs-content">
          <Section id="installation" title="Installation">
            <p>
              Install the package with npm and import the stylesheet once in
              your entry file.
            </p>
            <Code title="Terminal">{LANG_CONFIG}</Code>
            <Code title="src/main.tsx">{`import "lango/styles.css";`}</Code>
          </Section>

          <Section id="quick-start" title="Quick start">
            <p>
              Wrap your app in <code>Lango</code>, drop in a{" "}
              <code>LanguageSwitcher</code>, and you're done.
            </p>
            <Code title="App.tsx">{QUICK_START}</Code>
            <p>
              The default provider uses the official Google Translate Element,
              so there's no API key to manage.
            </p>
          </Section>

          <Section id="configuration" title="Configuration">
            <h3>Lango props</h3>
            <table className="props-table">
              <thead>
                <tr>
                  <th>Prop</th>
                  <th>Type</th>
                  <th>Default</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>languages</td>
                  <td>string[]</td>
                  <td>—</td>
                  <td>Supported codes, e.g. ["en", "fr", "es"]. Required.</td>
                </tr>
                <tr>
                  <td>defaultLanguage</td>
                  <td>string</td>
                  <td>"en"</td>
                  <td>Fallback; prepended if missing from languages.</td>
                </tr>
                <tr>
                  <td>persistLanguage</td>
                  <td>boolean</td>
                  <td>true</td>
                  <td>Save selection to localStorage["lango-language"].</td>
                </tr>
                <tr>
                  <td>provider</td>
                  <td>TranslationProvider</td>
                  <td>Google element</td>
                  <td>Override the translation backend.</td>
                </tr>
              </tbody>
            </table>

            <h3>LanguageSwitcher props</h3>
            <table className="props-table">
              <thead>
                <tr>
                  <th>Prop</th>
                  <th>Type</th>
                  <th>Default</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>showFlags</td>
                  <td>boolean</td>
                  <td>true</td>
                  <td>Flag emoji hint for each language.</td>
                </tr>
                <tr>
                  <td>showNativeNames</td>
                  <td>boolean</td>
                  <td>true</td>
                  <td>Show autonyms (e.g. "Français").</td>
                </tr>
                <tr>
                  <td>className</td>
                  <td>string</td>
                  <td>""</td>
                  <td>Extra class on the switcher root.</td>
                </tr>
                <tr>
                  <td>showAttribution</td>
                  <td>boolean</td>
                  <td>true</td>
                  <td>"Translations by Google" line — keep on for compliance.</td>
                </tr>
              </tbody>
            </table>
          </Section>

          <Section id="headless" title="Headless API">
            <p>
              <code>useLango()</code> exposes the raw state so you can build any
              UI — a native select, buttons, a command palette, whatever fits.
            </p>
            <Code title="CustomSelector.tsx">{HEADLESS}</Code>
            <p>
              It returns <code>language</code>, <code>setLanguage</code>,{" "}
              <code>languages</code>, <code>isTranslating</code>, and{" "}
              <code>error</code>.
            </p>
          </Section>

          <Section id="styling" title="Styling">
            <p>
              The switcher ships with stable class names so you can restyle it
              directly.
            </p>
            <Code title="styles.css">{STYLING}</Code>
            <p>Or override the CSS variables to match your design system.</p>
            <Code title="styles.css">{STYLING_VARS}</Code>
          </Section>

          <Section id="google" title="Google integration">
            <p>
              The default provider uses the official Google Translate Element —
              no credentials ever touch the browser. Lango keeps the
              "Translations by Google" attribution visible, never relies on
              interval-based DOM deletion, and hides the raw Google dropdown
              with static CSS positioning. Google may inject a banner iframe on
              some locales; Lango neutralizes its layout impact with documented
              CSS.
            </p>
            <div className="callout">
              <strong>Cloud Translation API:</strong> build a{" "}
              <code>TranslationProvider</code> that calls your own server
              endpoint (which holds the key) and pass it via{" "}
              <code>&lt;Lango provider=...&gt;</code>. Never ship private keys
              in frontend bundles.
            </div>
          </Section>

          <Section id="accessibility" title="Accessibility">
            <p>
              The switcher uses button/listbox semantics,{" "}
              <code>aria-expanded</code>, <code>aria-selected</code>, and full
              keyboard support (Enter, Space, Arrow keys, Home, End, Escape).
              Focus states are visible and <code>prefers-reduced-motion</code>{" "}
              is respected.
            </p>
          </Section>

          <Section id="troubleshooting" title="Troubleshooting">
            <ul>
              <li>
                <strong>Offline / ad-blocker:</strong> content stays in the
                original language and <code>error</code> is set.
              </li>
              <li>
                <strong>Unsupported language code:</strong> ignored with a
                console warning.
              </li>
              <li>
                <strong>SSR:</strong> safe — browser APIs are only touched in
                effects and event handlers.
              </li>
              <li>
                <strong>No translation happening:</strong> check network access
                to <code>translate.google.com</code>.
              </li>
            </ul>
          </Section>
        </div>
      </div>
    </main>
  );
}
