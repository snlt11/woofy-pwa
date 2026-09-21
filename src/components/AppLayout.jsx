import { useLayoutEffect, useRef } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import { ROUTES } from "../config/routes";
import { useWoofy } from "../state/useWoofy";
import BottomNav from "./BottomNav";
import PageTransition from "./PageTransition";

export default function AppLayout() {
  const { pathname } = useLocation();
  const scrollRef = useRef(null);
  const showBottomNav = pathname !== ROUTES.homeDetails;

  const {
    state: { onboarding },
  } = useWoofy();

  useLayoutEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  }, [pathname]);

  if (!onboarding.profileCompleted) {
    return <Navigate to={ROUTES.onboarding} replace />;
  }

  return (
    <div className="app-shell">
      <div className={"app-scroll " + (!showBottomNav ? "app-scroll--detail" : "")} ref={scrollRef}>
        <PageTransition key={pathname}>
          <Outlet />
        </PageTransition>
      </div>

      {showBottomNav && <BottomNav />}
    </div>
  );
}
