import { Navigate, Route, Routes } from "react-router-dom";

import AppLayout from "./components/AppLayout";
import InstallPrompt from "./components/InstallPrompt";
import { ROUTES } from "./config/routes";
import HealthPage from "./features/health/HealthPage";
import HomeDetailsPage from "./features/home/HomeDetailsPage";
import HomePage from "./features/home/HomePage";
import OnboardingPage from "./features/onboarding/OnboardingPage";
import PlannerPage from "./features/planner/PlannerPage";
import ProfilePage from "./features/profile/ProfilePage";

export default function App() {
  return (
    <>
      <InstallPrompt />

      <Routes>
        <Route path={ROUTES.onboarding} element={<OnboardingPage />} />

        <Route element={<AppLayout />}>
          <Route path={ROUTES.home} element={<HomePage />} />
          <Route path={ROUTES.homeDetails} element={<HomeDetailsPage />} />
          <Route path={ROUTES.planner} element={<PlannerPage />} />
          <Route path={ROUTES.health} element={<HealthPage />} />
          <Route path={ROUTES.profile} element={<ProfilePage />} />
        </Route>

        <Route path="*" element={<Navigate to={ROUTES.home} replace />} />
      </Routes>
    </>
  );
}
