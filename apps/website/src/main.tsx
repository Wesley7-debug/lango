import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
// NOTE: no `import "lango/styles.css"` needed — Lango auto-injects its
// default styles. The import still works if you prefer explicit bundling.

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
