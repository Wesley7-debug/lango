import { LanguageSwitcher } from "lango";
import type { Route } from "../router";

const GITHUB_URL = "https://github.com/lango-dev/lango";

export default function SiteHeader({ route }: { route: Route }) {
  return (
    <header className="site-header">
      <div className="wrap header-inner">
        <a className="logo" href="#/">
          LANGO
        </a>
        <nav className="nav" aria-label="Main">
          <a href="#/" className={route === "/" ? "nav-link active" : "nav-link"}>
            Home
          </a>
          <a
            href="#/docs"
            className={route === "/docs" ? "nav-link active" : "nav-link"}
          >
            Docs
          </a>
          <a
            className="nav-link"
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
        </nav>
        <div className="header-right">
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
