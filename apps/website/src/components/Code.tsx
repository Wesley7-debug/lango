import { useState } from "react";

/** Copy button with clipboard fallback + Copied/Failed confirmation. */
export function CopyButton({ text }: { text: string }) {
  const [state, setState] = useState<"copy" | "copied" | "failed">("copy");
  return (
    <button
      type="button"
      aria-live="polite"
      onClick={() => {
        const done = (ok: boolean) => {
          setState(ok ? "copied" : "failed");
          window.setTimeout(() => setState("copy"), 1400);
        };
        const fallbackCopy = () => {
          try {
            const ta = document.createElement("textarea");
            ta.value = text;
            ta.style.position = "fixed";
            ta.style.opacity = "0";
            document.body.appendChild(ta);
            ta.select();
            const ok = document.execCommand("copy");
            document.body.removeChild(ta);
            done(ok);
          } catch {
            done(false);
          }
        };
        if (navigator.clipboard?.writeText) {
          void navigator.clipboard.writeText(text).then(
            () => done(true),
            () => fallbackCopy()
          );
        } else {
          fallbackCopy();
        }
      }}
      className="rounded-md border border-neutral-700 px-2.5 py-1 text-xs font-semibold text-neutral-400 transition hover:border-stone-200 hover:text-stone-50"
    >
      {state === "copied" ? "Copied" : state === "failed" ? "Failed" : "Copy"}
    </button>
  );
}

/** Dark code block with a title bar and copy button. */
export function Code({ title, children }: { title: string; children: string }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-neutral-800 bg-stone-900">
      <div className="flex items-center justify-between border-b border-neutral-800 px-4 py-2.5">
        <span className="text-xs font-semibold tracking-wide text-neutral-400">{title}</span>
        <CopyButton text={children} />
      </div>
      <pre className="code-scroll overflow-x-auto p-5 text-[13px] leading-relaxed text-neutral-100">
        <code className="font-mono">{children}</code>
      </pre>
    </div>
  );
}
