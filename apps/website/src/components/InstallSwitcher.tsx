import { useState } from "react";
import { CopyButton } from "./Code";

/**
 * Package-manager selector for the install command.
 * UI convenience only - the published package is identical on all of them.
 */
export const INSTALL_COMMANDS = [
  { id: "npm", label: "npm", command: "npm install lango-i18n" },
  { id: "pnpm", label: "pnpm", command: "pnpm add lango-i18n" },
  { id: "yarn", label: "yarn", command: "yarn add lango-i18n" },
  { id: "bun", label: "bun", command: "bun add lango-i18n" },
] as const;

export type PackageManagerId = (typeof INSTALL_COMMANDS)[number]["id"];

export function InstallSwitcher() {
  const [pm, setPm] = useState<PackageManagerId>("npm");
  const active = INSTALL_COMMANDS.find((c) => c.id === pm)!;
  return (
    <div className="overflow-hidden rounded-2xl border border-neutral-800 bg-stone-900 text-left">
      <div className="flex items-center gap-1 border-b border-neutral-800 px-3 py-2">
        <div role="tablist" aria-label="Package manager" className="flex gap-1">
          {INSTALL_COMMANDS.map((c) => (
            <button
              key={c.id}
              type="button"
              role="tab"
              aria-selected={c.id === pm}
              onClick={() => setPm(c.id)}
              className={`rounded-md px-3 py-1 text-xs font-bold transition ${
                c.id === pm
                  ? "bg-stone-100 text-stone-900"
                  : "text-neutral-400 hover:bg-neutral-800 hover:text-stone-50"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
        <span className="ml-auto">
          <CopyButton text={active.command} />
        </span>
      </div>
      <pre className="code-scroll overflow-x-auto p-5 text-[13px] leading-relaxed text-neutral-100">
        <code className="font-mono">
          <span className="select-none text-neutral-500">$ </span>
          {active.command}
        </code>
      </pre>
    </div>
  );
}
