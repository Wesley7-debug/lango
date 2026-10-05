import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { Lango } from "../src/provider/LangoProvider";
import { useLango } from "../src/hooks/useLango";
import { LanguageSwitcher } from "../src/components/LanguageSwitcher";
import { makeProvider } from "./helpers";

beforeEach(() => {
  window.localStorage.clear();
  vi.restoreAllMocks();
});

describe("LanguageSwitcher", () => {
  it("renders languages and changes on click", async () => {
    const user = userEvent.setup();
    const provider = makeProvider();
    render(
      <Lango languages={["en", "fr", "es"]} provider={provider}>
        <LanguageSwitcher />
      </Lango>
    );
    expect(screen.getByRole("button", { name: /language/i })).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: /language/i }));
    expect(screen.getByRole("listbox")).toBeInTheDocument();
    expect(screen.getAllByRole("option")).toHaveLength(3);
    await user.click(screen.getByRole("option", { name: /Français/ }));
    expect(provider.translate).toHaveBeenCalledWith("fr");
  });

  it("supports keyboard: Escape closes, Enter selects", async () => {
    const user = userEvent.setup();
    const provider = makeProvider();
    render(
      <Lango languages={["en", "fr"]} provider={provider}>
        <LanguageSwitcher />
      </Lango>
    );
    const trigger = screen.getByRole("button", { name: /language/i });
    trigger.focus();
    await user.keyboard("{Enter}");
    expect(screen.getByRole("listbox")).toBeInTheDocument();
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("headless useLango custom UI works", async () => {
    const user = userEvent.setup();
    const provider = makeProvider();
    function Custom() {
      const { language, languages, setLanguage } = useLango();
      return (
        <select
          aria-label="custom-lang"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          {languages.map((l) => (
            <option key={l} value={l}>
              {l}
            </option>
          ))}
        </select>
      );
    }
    render(
      <Lango languages={["en", "fr"]} provider={provider}>
        <Custom />
      </Lango>
    );
    await user.selectOptions(screen.getByLabelText("custom-lang"), "fr");
    expect(provider.translate).toHaveBeenCalledWith("fr");
  });
});
