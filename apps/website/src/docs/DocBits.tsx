import type { ReactNode } from "react";

/**
 * Shared docs primitives (SRP: one place for section layout, callouts,
 * tables, and inline-code/strong styling - no class duplication in sections).
 */

export function DocSection({
  id,
  index,
  title,
  children,
}: {
  id: string;
  index: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <article id={id} className="scroll-mt-24 border-t border-neutral-200 pt-10 first:border-t-0 first:pt-0 dark:border-neutral-800">
      <p className="font-mono text-xs font-bold tracking-widest text-neutral-400">{index}</p>
      <h3 className="mt-1 text-2xl font-extrabold tracking-tight sm:text-3xl">{title}</h3>
      <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-neutral-600 dark:text-neutral-400">
        {children}
      </div>
    </article>
  );
}

export function Callout({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-2xl border-2 border-stone-900 bg-neutral-50 p-5 text-sm text-stone-900 dark:border-stone-200 dark:bg-neutral-950 dark:text-stone-100">
      {children}
    </div>
  );
}

export function DocTable({ rows }: { rows: [string, string, string][] }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-neutral-200 dark:border-neutral-800">
      <table className="w-full min-w-[520px] text-left text-sm">
        <thead>
          <tr className="border-b border-neutral-200 bg-neutral-50 text-xs uppercase tracking-widest text-neutral-500 dark:border-neutral-800 dark:bg-neutral-950">
            <th className="px-5 py-3 font-bold">Prop</th>
            <th className="px-5 py-3 font-bold">Default</th>
            <th className="px-5 py-3 font-bold">Description</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
          {rows.map(([prop, def, desc]) => (
            <tr key={prop}>
              <td className="px-5 py-3 font-mono font-bold text-stone-900 dark:text-stone-100">{prop}</td>
              <td className="px-5 py-3 font-mono text-neutral-500">{def}</td>
              <td className="px-5 py-3">{desc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** Inline code span in docs prose. */
export function IC({ children }: { children: ReactNode }) {
  return (
    <code className="rounded bg-neutral-100 px-1.5 py-0.5 font-mono text-[13px] text-stone-900 dark:bg-neutral-900 dark:text-stone-100">
      {children}
    </code>
  );
}

/** Emphasized term in docs prose. */
export function Strong({ children }: { children: ReactNode }) {
  return (
    <strong className="font-bold text-stone-900 dark:text-stone-100">{children}</strong>
  );
}
