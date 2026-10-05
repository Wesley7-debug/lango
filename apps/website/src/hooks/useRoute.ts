import { useEffect, useState } from "react";

/**
 * Single responsibility: hash routing (`#/` home, `#/docs[/section]` docs).
 * Scrolls to top on page change, or deep-scrolls to a docs section.
 */

export type Route = { page: "home" | "docs"; section: string | null };

export function readRoute(): Route {
  const h = window.location.hash;
  if (h.startsWith("#/docs")) {
    const section = h.replace(/^#\/docs\/?/, "") || null;
    return { page: "docs", section };
  }
  return { page: "home", section: null };
}

function scrollToHashTarget(): void {
  const id = window.location.hash.replace(/^#\/?/, "");
  if (!id) {
    window.scrollTo({ top: 0 });
    return;
  }
  requestAnimationFrame(() => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  });
}

export function useRoute(): Route {
  const [route, setRoute] = useState<Route>(() =>
    typeof window !== "undefined" ? readRoute() : { page: "home", section: null }
  );

  useEffect(() => {
    const onChange = () => {
      const next = readRoute();
      setRoute(next);
      if (next.page === "docs") {
        window.scrollTo({ top: 0 });
        if (next.section) {
          const section = next.section;
          requestAnimationFrame(() => {
            document.getElementById(section)?.scrollIntoView({ behavior: "smooth" });
          });
        }
        return;
      }
      scrollToHashTarget();
    };
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);

  return route;
}
