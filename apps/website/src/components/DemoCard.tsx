import { LanguageSwitcher, useLango } from "lango";

export default function DemoCard() {
  const { isTranslating } = useLango();
  return (
    <div className="demo-card">
      <div className="demo-bar">
        <span className="demo-brand">Acme</span>
        <LanguageSwitcher />
      </div>
      <div className="demo-body">
        <h2>Build products people love.</h2>
        <p>
          Launch faster with a beautiful experience. This demo card is wrapped
          in Lango — switch the language above and Google translates this whole
          page live.
        </p>
        <div className="btn-row" style={{ justifyContent: "flex-start" }}>
          <a className="btn btn-primary" href="#/docs">
            Get Started
          </a>
          <a className="btn" href="#/docs">
            Learn more
          </a>
        </div>
        {isTranslating && <p className="demo-note">Translating…</p>}
      </div>
    </div>
  );
}
