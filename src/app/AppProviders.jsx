import { BrowserRouter } from "react-router-dom";
import { MotionConfig } from "motion/react";

import { WoofyProvider } from "../state/WoofyProvider";

export default function AppProviders({ children }) {
  return (
    <BrowserRouter>
      <MotionConfig reducedMotion="user">
        <WoofyProvider>{children}</WoofyProvider>
      </MotionConfig>
    </BrowserRouter>
  );
}
