import { useEffect, useState } from "react";

export type Route = "/" | "/docs";

export function useRoute(): Route {
  const [route, setRoute] = useState<Route>(readRoute);

  useEffect(() => {
    const onChange = () => setRoute(readRoute());
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);

  return route;
}

function readRoute(): Route {
  const hash = window.location.hash.replace(/^#/, "").replace(/\/+$/, "");
  return hash.startsWith("/docs") ? "/docs" : "/";
}
