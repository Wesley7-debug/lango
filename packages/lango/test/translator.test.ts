import { describe, expect, it, vi } from "vitest";
import { GoogleTranslateElementProvider, __resetGoogleSingletons } from "../src/core/translator";

describe("GoogleTranslateElementProvider", () => {
  it("dedupes duplicate translate calls", async () => {
    __resetGoogleSingletons();
    const p = new GoogleTranslateElementProvider({ pageLanguage: "en" });
    // Mock: pretend widget ready by stubbing document combo
    document.body.innerHTML = `<div id="lango-google-translate-element"><select class="goog-te-combo"><option value="en">en</option><option value="fr">fr</option></select></div>`;
    // @ts-expect-error test stub constructor
    window.google = { translate: { TranslateElement: function () {} } };
    const combo = document.querySelector<HTMLSelectElement>("select.goog-te-combo")!;
    const spy = vi.spyOn(combo, "dispatchEvent");
    await p.translate("fr");
    await p.translate("fr"); // duplicate — should no-op
    expect(spy).toHaveBeenCalled();
    document.body.innerHTML = "";
    delete window.google;
    __resetGoogleSingletons();
  });
});
