import { useLayoutEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { MotionConfig } from "motion/react";

import BottomNav from "./BottomNav";
import PageTransition from "./PageTransition";

export default function AppLayout() {
  const { pathname } = useLocation();

  // Each tab opens at the top instead of keeping the previous tab's scroll
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <MotionConfig reducedMotion="user">
      {/* Keyed by route so only the page content re-animates; BottomNav stays mounted */}
      <PageTransition key={pathname}>
        <Outlet />
      </PageTransition>

      <BottomNav />
    </MotionConfig>
  );
}
