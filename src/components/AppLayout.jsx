import { useEffect, useLayoutEffect, useRef } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import { ROUTES } from "../config/routes";
import { useWoofy } from "../state/useWoofy";
import BottomNav from "./BottomNav";
import PageTransition from "./PageTransition";

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
    if (!("serviceWorker" in navigator) || !navigator.onLine) return;

    let cancelled = false;

    navigator.serviceWorker
      .getRegistration()
      .then((registration) => {
        if (!cancelled && registration) {
          return registration.update();
        }

        return undefined;
      })
      .catch(() => {
        // Keep using the current cached version when an update check fails.
      });

    return () => {
      cancelled = true;
    };
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

      <BottomNav />
    </div>
  );
}
