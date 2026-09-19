import { useLayoutEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";

import BottomNav from "./BottomNav";
import PageTransition from "./PageTransition";

export default function AppLayout() {
  const { pathname } = useLocation();
  const scrollRef = useRef(null);

  useLayoutEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
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
