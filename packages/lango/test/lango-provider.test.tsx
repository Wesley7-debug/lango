import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen, act } from "@testing-library/react";
import React from "react";
import { Lango } from "../src/provider/LangoProvider";
import { useLango } from "../src/hooks/useLango";
import { makeProvider } from "./helpers";

beforeEach(() => {
  window.localStorage.clear();
  vi.restoreAllMocks();
});

describe("Lango provider", () => {
  it("initializes with default language", () => {
    const provider = makeProvider();
    let seen = "";
    function Probe() {
      const { language } = useLango();
      seen = language;
      return null;
    }
    render(
      <Lango languages={["en", "fr"]} defaultLanguage="en" provider={provider}>
        <Probe />
      </Lango>
    );
    expect(seen).toBe("en");
  });

  it("rejects unsupported language", async () => {
    const provider = makeProvider();
    let api: ReturnType<typeof useLango> | null = null;
    function Probe() {
      api = useLango();
      return null;
    }
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    render(
      <Lango languages={["en", "fr"]} provider={provider}>
        <Probe />
      </Lango>
    );
    await act(async () => {
      api!.setLanguage("de");
    });
    expect(api!.language).toBe("en");
    expect(provider.translate).not.toHaveBeenCalled();
    expect(warn).toHaveBeenCalled();
  });

  it("changes language and persists", async () => {
    const provider = makeProvider();
    let api: ReturnType<typeof useLango> | null = null;
    function Probe() {
      api = useLango();
      return null;
    }
    render(
      <Lango languages={["en", "fr"]} provider={provider}>
        <Probe />
      </Lango>
    );
    await act(async () => {
      api!.setLanguage("fr");
    });
    expect(api!.language).toBe("fr");
    expect(provider.translate).toHaveBeenCalledWith("fr");
    expect(window.localStorage.getItem("lango-language")).toBe("fr");
  });

  it("restores saved language and falls back on invalid", () => {
    window.localStorage.setItem("lango-language", "fr");
    const provider = makeProvider();
    let seen = "";
    function Probe() {
      seen = useLango().language;
      return null;
    }
    render(
      <Lango languages={["en", "fr"]} provider={provider}>
        <Probe />
      </Lango>
    );
    expect(seen).toBe("fr");

    window.localStorage.setItem("lango-language", "xx-invalid");
    let seen2 = "";
    function Probe2() {
      seen2 = useLango().language;
      return null;
    }
    render(
      <Lango languages={["en", "fr"]} defaultLanguage="en" provider={makeProvider()}>
        <Probe2 />
      </Lango>
    );
    expect(["en", "fr"]).toContain(seen2);
  });

  it("handles translation errors without crashing", async () => {
    const provider = { translate: vi.fn(async () => { throw new Error("boom"); }) };
    let api: ReturnType<typeof useLango> | null = null;
    function Probe() {
      api = useLango();
      return <div>content stays</div>;
    }
    render(
      <Lango languages={["en", "fr"]} provider={provider}>
        <Probe />
      </Lango>
    );
    await act(async () => {
      api!.setLanguage("fr");
    });
    // flush promise
    await act(async () => {});
    expect(screen.getByText("content stays")).toBeInTheDocument();
    expect(api!.error?.message).toBe("boom");
  });
});
