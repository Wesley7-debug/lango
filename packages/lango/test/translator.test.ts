import { describe, expect, it, vi } from "vitest";
import { GoogleTranslateElementProvider, __resetGoogleSingletons } from "../src/core/translator";

function stubWidget(optionValues: string[]) {
  const options = optionValues.map((v) => `<option value="${v}">${v}</option>`).join("");
  document.body.innerHTML =
    `<div id="lango-google-translate-element">` +
    `<select class="goog-te-combo">${options}</select></div>`;
  // @ts-expect-error test stub constructor
  window.google = { translate: { TranslateElement: function () {} } };
}

function cleanup() {
  document.body.innerHTML = "";
  // @ts-expect-error test cleanup
  delete window.google;
  __resetGoogleSingletons();
}

describe("GoogleTranslateElementProvider", () => {
  it("dedupes duplicate translate calls", async () => {
    __resetGoogleSingletons();
    const p = new GoogleTranslateElementProvider({ pageLanguage: "en" });
    // Mock: pretend widget ready by stubbing document combo
    stubWidget(["en", "fr"]);
    const combo = document.querySelector<HTMLSelectElement>("select.goog-te-combo")!;
    const spy = vi.spyOn(combo, "dispatchEvent");
    await p.translate("fr");
    await p.translate("fr"); // duplicate — should no-op
    expect(spy).toHaveBeenCalled();
    cleanup();
  });

  it("waits for a lazily-added language option instead of silently no-op-ing", async () => {
    __resetGoogleSingletons();
    const p = new GoogleTranslateElementProvider({
      pageLanguage: "en",
      optionTimeoutMs: 5000,
    });
    // Widget exists but French hasn't been populated yet (Google is lazy).
    stubWidget(["en"]);
    const pending = p.translate("fr");
    // French arrives a moment later, like the real widget.
    await new Promise((r) => setTimeout(r, 300));
    document
      .querySelector("select.goog-te-combo")!
      .insertAdjacentHTML("beforeend", `<option value="fr">fr</option>`);
    await pending; // must resolve, not hang or throw
    expect(
      document.querySelector<HTMLSelectElement>("select.goog-te-combo")!.value
    ).toBe("fr");
    cleanup();
  });

  it("fails loudly (and stays retryable) when the option never appears", async () => {
    __resetGoogleSingletons();
    const p = new GoogleTranslateElementProvider({
      pageLanguage: "en",
      optionTimeoutMs: 300,
    });
    stubWidget(["en"]);
    await expect(p.translate("fr")).rejects.toThrow(/never offered/);
    // The failed language must NOT be recorded as active — retrying the same
    // language later (the reported "switch away and back" workaround) must work.
    document
      .querySelector("select.goog-te-combo")!
      .insertAdjacentHTML("beforeend", `<option value="fr">fr</option>`);
    await p.translate("fr");
    expect(
      document.querySelector<HTMLSelectElement>("select.goog-te-combo")!.value
    ).toBe("fr");
    cleanup();
  });
});
