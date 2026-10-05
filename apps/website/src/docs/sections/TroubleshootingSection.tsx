import { DocSection } from "../DocBits";

const CASES: [string, string][] = [
  [
    "The switcher label changes, but the page stays in English.",
    "The Google script never loaded. Open DevTools → Network, filter for translate.google.com, and look for element.js. Ad-blockers, Brave Shields, Pi-hole, and corporate firewalls all block it. Allow the domain, disable the blocker for your dev host, and hard-refresh. Lango sets error from useLango() in this case and keeps your original content readable.",
  ],
  [
    "Nothing happens at all, not even the label.",
    "Your click handler is fine - the component is probably outside <Lango>. useLango() throws in that case, so check the console. Every LanguageSwitcher and every useLango() call must be a descendant of the provider.",
  ],
  [
    "It works in dev but not in production.",
    "You probably edited packages/lango/src without rebuilding. The site consumes the built dist/, not src/. Run npm run build --workspace=lango-i18n and restart Vite so the fresh bundle is picked up.",
  ],
  [
    "An unsupported language code gets selected.",
    "setLanguage() ignores codes outside your languages list and logs a console warning - by design, so a bad value can never blank your page. Double-check spelling (e.g. pt vs pt-BR) and make sure the code is in your languages array.",
  ],
  [
    "Layout jumps when translating certain locales.",
    "Google injects a top banner iframe for some locales. Lango's injected CSS neutralizes it (body{top:0!important} plus hiding .goog-te-banner-frame). If you disabled auto-injection with __LANGO_NO_AUTO_CSS__, you own those rules now - re-add them to your own stylesheet.",
  ],
];

/** 15 - real failure modes and fixes. */
export function TroubleshootingSection() {
  return (
    <DocSection id="troubleshooting" index="15" title="Troubleshooting">
      <p>
        Translation happens in the browser against Google's servers, so when something
        goes wrong it is almost always environmental rather than a bug in your code.
        Here are the failure modes people actually hit, in rough order of frequency,
        and what to do about each.
      </p>
      <div className="space-y-3">
        {CASES.map(([title, body]) => (
          <div
            key={title}
            className="rounded-2xl border border-neutral-200 p-5 dark:border-neutral-800"
          >
            <p className="font-bold text-stone-900 dark:text-stone-100">{title}</p>
            <p className="mt-1.5 text-sm">{body}</p>
          </div>
        ))}
      </div>
    </DocSection>
  );
}
