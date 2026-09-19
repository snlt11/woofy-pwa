import { Routes, Route } from "react-router-dom";

import AppLayout from "./components/AppLayout";
import InstallPrompt from "./components/InstallPrompt";
import Onboarding from "./pages/Onboarding";
import Home from "./pages/Home";
import Planner from "./pages/Planner";
import Health from "./pages/Health";
import Profile from "./pages/Profile";

export default function App() {
  return (
    <>
      <InstallPrompt />

      <Routes>
        <Route path="/" element={<Onboarding />} />

        <Route element={<AppLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/planner" element={<Planner />} />
          <Route path="/health" element={<Health />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </>
  );
}
