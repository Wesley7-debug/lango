const GITHUB_URL = "https://github.com/lango-dev/lango";

export default function SiteFooter() {
  return (
    <footer className="footer">
      <div className="wrap footer-inner">
        <span>Lango v0.1.0 — MIT</span>
        <a href={GITHUB_URL} target="_blank" rel="noreferrer">
          GitHub
        </a>
        <span className="footer-attr">Translations by Google</span>
      </div>
    </footer>
  );
}
