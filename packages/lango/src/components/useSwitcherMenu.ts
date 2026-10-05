import { useEffect, useId, useRef, useState } from "react";

/**
 * Single responsibility: dropdown menu behavior for the language switcher -
 * open state, outside-click/Escape dismissal, and full keyboard operation.
 * Rendering stays in `LanguageSwitcher`, so behavior can evolve without
 * touching markup (SRP) and could back a different UI if ever needed.
 */

function focusOption(list: HTMLUListElement | null, index: number): void {
  const options = Array.from(
    list?.querySelectorAll<HTMLElement>("[role='option']") ?? []
  );
  if (options.length === 0) return;
  const wrapped = ((index % options.length) + options.length) % options.length;
  options[wrapped]?.focus();
}

export interface SwitcherMenu {
  open: boolean;
  toggle: () => void;
  rootRef: React.RefObject<HTMLDivElement>;
  buttonRef: React.RefObject<HTMLButtonElement>;
  listRef: React.RefObject<HTMLUListElement>;
  menuId: string;
  onTriggerKey: (e: React.KeyboardEvent) => void;
  onOptionKey: (e: React.KeyboardEvent, code: string, index: number) => void;
}

export function useSwitcherMenu(select: (code: string) => void): SwitcherMenu {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const menuId = useId();

  const close = (refocus = true) => {
    setOpen(false);
    if (refocus) buttonRef.current?.focus();
  };

  // Close on outside click / Escape.
  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open ]);

  const toggle = () => setOpen((v) => !v);

  const onTriggerKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setOpen(true);
      requestAnimationFrame(() => focusOption(listRef.current, 0));
    }
  };

  const onOptionKey = (e: React.KeyboardEvent, code: string, index: number) => {
    const count =
      listRef.current?.querySelectorAll("[role='option']").length ?? 0;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      select(code);
      close();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      focusOption(listRef.current, index + 1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      focusOption(listRef.current, index - 1);
    } else if (e.key === "Home") {
      e.preventDefault();
      focusOption(listRef.current, 0);
    } else if (e.key === "End") {
      e.preventDefault();
      focusOption(listRef.current, count - 1);
    }
  };

  return { open, toggle, rootRef, buttonRef, listRef, menuId, onTriggerKey, onOptionKey };
}
