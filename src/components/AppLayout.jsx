import { useLayoutEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { MotionConfig } from "motion/react";

import BottomNav from "./BottomNav";
import PageTransition from "./PageTransition";

export default function AppLayout() {
  const { pathname } = useLocation();
  const scrollRef = useRef(null);

  // Each tab opens at the top instead of keeping the previous tab's scroll
  useLayoutEffect(() => {
    scrollRef.current?.scrollTo(0, 0);
  }, [pathname]);

  return (
    <MotionConfig reducedMotion="user">
      {/* The shell is app-sized; only .app-scroll scrolls, and BottomNav never remounts */}
      <div className="app-shell">
        <div className="app-scroll" ref={scrollRef}>
          <PageTransition key={pathname}>
            <Outlet />
          </PageTransition>
        </div>

        <BottomNav />
      </div>
    </MotionConfig>
  );
}
