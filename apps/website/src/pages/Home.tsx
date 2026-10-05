import DemoCard from "../components/DemoCard";

const GITHUB_URL = "https://github.com/lango-dev/lango";

const FEATURES = [
  {
    icon: "⚡",
    title: "5-minute setup",
    body: "npm install lango, add the provider, done. No dashboard, no API key for the default.",
  },
  {
    icon: "🎨",
    title: "Beautiful switcher",
    body: "Modern accessible dropdown with CSS variables and predictable class names.",
  },
  {
    icon: "🧩",
    title: "Headless API",
    body: "useLango() lets you build any custom UI — select, buttons, command palette.",
  },
  {
    icon: "🛡️",
    title: "Google-compliant",
    body: "Official Translate Element underneath, attribution preserved, no secret keys in the browser.",
  },
];

export default function Home() {
  return (
    <main className="wrap">
      <section className="hero">
        <span className="hero-badge">
          <span aria-hidden="true">✨</span> Powered by Google · Built for developers
        </span>
        <h1>
          Translate your website.
          <br />
          <span className="accent">Keep your UI.</span>
        </h1>
        <p className="sub">
          A developer-first translation package powered by Google. One provider,
          one switcher, fully customizable.
        </p>
        <div className="btn-row">
          <a className="btn btn-primary" href="#/docs">
            View Docs
          </a>
          <a className="btn" href={GITHUB_URL} target="_blank" rel="noreferrer">
            View GitHub
          </a>
        </div>

        <div className="demo-shell">
          <DemoCard />
          <p className="demo-note">
            Live demo — this content is really translated by Google. Powered by
            Google.
          </p>
        </div>
      </section>

      <section className="grid" aria-label="Features">
        {FEATURES.map((f) => (
          <div className="feature" key={f.title}>
            <div className="icon" aria-hidden="true">
              {f.icon}
            </div>
            <h3>{f.title}</h3>
            <p>{f.body}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
