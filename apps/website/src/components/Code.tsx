import { useState } from "react";

export function Code({
  title,
  children,
}: {
  title?: string;
  children: string;
}) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(children);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard unavailable (e.g. insecure context) — ignore.
    }
  };

  return (
    <div className="code-block">
      <div className="code-head">
        <span className="code-title">{title ?? "Code"}</span>
        <button type="button" className="code-copy" onClick={copy}>
          {copied ? "Copied ✓" : "Copy"}
        </button>
      </div>
      <pre>
        <code>{children}</code>
      </pre>
    </div>
  );
}
