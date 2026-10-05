import { useContext } from "react";
import { LangoContext } from "../provider/LangoProvider.js";
import type { LangoContextValue } from "../types/index.js";

export function useLango(): LangoContextValue {
  const ctx = useContext(LangoContext);
  if (!ctx) {
    throw new Error("useLango() must be used inside <Lango>.");
  }
  return ctx;
}

export default useLango;
