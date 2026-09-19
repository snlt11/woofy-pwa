import { useLayoutEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";

import BottomNav from "./BottomNav";
import PageTransition from "./PageTransition";

export default function AppLayout() {
  const { pathname } = useLocation();
  const scrollRef = useRef(null);

  useLayoutEffect(() => {
    scrollRef.current?.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  return (
    <div className="app-shell">
      <div className="app-scroll" ref={scrollRef}>
        <PageTransition key={pathname}>
          <Outlet />
        </PageTransition>
      </div>

      <BottomNav />
    </div>
  );
}
