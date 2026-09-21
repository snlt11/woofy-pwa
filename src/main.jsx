import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { registerSW } from "virtual:pwa-register";

import App from "./App.jsx";
import AppProviders from "./app/AppProviders.jsx";
import "./index.css";
import "./styles/app-consistency.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </StrictMode>
);


function registerWoofyServiceWorker() {
  if (!("serviceWorker" in navigator)) return;

  let registration;

  const checkForUpdate = async () => {
    if (!registration || !navigator.onLine) return;

    try {
      await registration.update();
    } catch {
      // Keep the current cached version if the update check cannot reach the network.
    }
  };

  registerSW({
    immediate: true,

    onRegisteredSW(_swUrl, currentRegistration) {
      registration = currentRegistration;

      void checkForUpdate();

      const handleVisibilityChange = () => {
        if (document.visibilityState === "visible") {
          void checkForUpdate();
        }
      };

      window.addEventListener("online", checkForUpdate);
      window.addEventListener("focus", checkForUpdate);
      document.addEventListener("visibilitychange", handleVisibilityChange);
    },
  });
}

registerWoofyServiceWorker();
