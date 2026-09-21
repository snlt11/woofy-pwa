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
  let swUrl;
  let reloading = false;

  const updateSW = registerSW({
    immediate: true,

    onRegisteredSW(currentSwUrl, currentRegistration) {
      swUrl = currentSwUrl;
      registration = currentRegistration;

      void checkForUpdate();
    },

    onNeedRefresh() {
      void updateSW(true);
    },

    onRegisterError() {
      // Keep the app usable if service-worker registration fails.
    },
  });

  async function checkForUpdate() {
    if (!registration || !swUrl || !navigator.onLine) return;

    if (registration.installing) return;

    try {
      const response = await fetch(swUrl, {
        cache: "no-store",
        headers: {
          cache: "no-store",
          "cache-control": "no-cache",
        },
      });

      if (!response.ok) return;

      await registration.update();

      if (registration.waiting) {
        await updateSW(true);
      }
    } catch {
      // Keep the current cached version when the update check cannot reach the network.
    }
  }

  navigator.serviceWorker.addEventListener("controllerchange", () => {
    if (reloading) return;

    reloading = true;
    window.location.reload();
  });

  const handleVisibilityChange = () => {
    if (document.visibilityState === "visible") {
      void checkForUpdate();
    }
  };

  window.addEventListener("online", checkForUpdate);
  window.addEventListener("focus", checkForUpdate);
  document.addEventListener("visibilitychange", handleVisibilityChange);

  window.__woofyCheckForUpdate = checkForUpdate;
}

registerWoofyServiceWorker();
