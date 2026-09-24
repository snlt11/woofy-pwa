import { useEffect, useLayoutEffect, useRef } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import { ROUTES } from "../config/routes";
import { useWoofy } from "../state/useWoofy";
import BottomNav from "./BottomNav";
import PageTransition from "./PageTransition";
import ProgressiveBlur from "./ProgressiveBlur";

export default function AppLayout() {
  const { pathname } = useLocation();
  const scrollRef = useRef(null);

  const {
    state: { onboarding },
  } = useWoofy();

  useLayoutEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  }, [pathname]);

  useEffect(() => {
    if (typeof window.__woofyCheckForUpdate === "function") {
      void window.__woofyCheckForUpdate();
    }
  }, [pathname]);

  if (!onboarding.profileCompleted) {
    return <Navigate to={ROUTES.onboarding} replace />;
  }

  return (
    <div className="app-shell">
      <div className="app-scroll" ref={scrollRef}>
        <PageTransition key={pathname}>
          <Outlet />
        </PageTransition>
      </div>

      <ProgressiveBlur />
      <BottomNav />
    </div>
  );
}
