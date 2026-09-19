import { useEffect, useState } from "react";
import { Share, SquarePlus, X, Download } from "lucide-react";

const DISMISSED_KEY = "woofy-install-dismissed";
const SNOOZE_MS = 7 * 24 * 60 * 60 * 1000;

function isStandalone() {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    window.navigator.standalone === true
  );
}

function isIOS() {
  return (
    /iphone|ipad|ipod/i.test(navigator.userAgent) ||
    // iPadOS 13+ reports itself as a Mac
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
  );
}

function recentlyDismissed() {
  try {
    const dismissedAt = Number(localStorage.getItem(DISMISSED_KEY));
    return dismissedAt > 0 && Date.now() - dismissedAt < SNOOZE_MS;
  } catch {
    return false;
  }
}

function rememberDismissal() {
  try {
    localStorage.setItem(DISMISSED_KEY, Date.now().toString());
  } catch {
    // Storage unavailable; the prompt may show again next visit
  }
}

export default function InstallPrompt() {
  const [showPrompt, setShowPrompt] = useState(false);
  const [showIOSInstructions, setShowIOSInstructions] = useState(false);
  const [installEvent, setInstallEvent] = useState(null);

  useEffect(() => {
    if (isStandalone() || recentlyDismissed()) return;

    // Chromium browsers: hold on to the native install prompt for our button
    const handleBeforeInstall = (event) => {
      event.preventDefault();
      setInstallEvent(event);
      setShowPrompt(true);
    };

    const handleInstalled = () => {
      setShowPrompt(false);
      setInstallEvent(null);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstall);
    window.addEventListener("appinstalled", handleInstalled);

    // iOS has no install event, so show our own sheet after a short delay
    const timer = isIOS() ? setTimeout(() => setShowPrompt(true), 1500) : null;

    return () => {
      clearTimeout(timer);
      window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
      window.removeEventListener("appinstalled", handleInstalled);
    };
  }, []);

  const install = async () => {
    if (installEvent) {
      try {
        await installEvent.prompt();
        const result = await installEvent.userChoice;

        if (result.outcome === "accepted") {
          setShowPrompt(false);
        }
      } catch {
        // The browser refused the prompt (e.g. already used); keep our sheet open
      }

      // A prompt event can only be used once
      setInstallEvent(null);
      return;
    }

    setShowIOSInstructions(true);
  };

  const dismiss = () => {
    rememberDismissal();
    setShowPrompt(false);
  };

  if (!showPrompt) return null;

  return (
    <>
      <div className="install-backdrop" onClick={dismiss} />

      <div
        className="install-sheet"
        role="dialog"
        aria-modal="true"
        aria-labelledby="install-title"
      >
        <button className="install-close" onClick={dismiss} aria-label="Close">
          <X size={20} />
        </button>

        <img src="/assets/buddy-master.png" alt="" className="install-buddy" />

        {!showIOSInstructions ? (
          <>
            <h2 id="install-title">Install WOOFY</h2>

            <p>Add WOOFY to your Home Screen for a smoother app experience.</p>

            <button className="install-primary" onClick={install}>
              <Download size={20} />
              Install WOOFY
            </button>

            <button className="install-later" onClick={dismiss}>
              Not now
            </button>
          </>
        ) : (
          <>
            <h2 id="install-title">Add WOOFY to Home Screen</h2>

            <div className="install-step">
              <span>1</span>
              <Share size={22} />
              <p>Tap the Share button in Safari</p>
            </div>

            <div className="install-step">
              <span>2</span>
              <SquarePlus size={22} />
              <p>Choose Add to Home Screen</p>
            </div>

            <div className="install-step">
              <span>3</span>
              <Download size={22} />
              <p>Turn on Open as Web App, then tap Add</p>
            </div>

            <button className="install-primary" onClick={dismiss}>
              Got it
            </button>
          </>
        )}
      </div>
    </>
  );
}
