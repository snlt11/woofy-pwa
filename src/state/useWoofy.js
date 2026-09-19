import { useContext } from "react";

import { WoofyContext } from "./WoofyProvider";

export function useWoofy() {
  const context = useContext(WoofyContext);

  if (!context) {
    throw new Error("useWoofy must be used inside WoofyProvider");
  }

  return context;
}
