import { Navigate, useNavigate } from "react-router-dom";
import { PawPrint } from "lucide-react";

import { ASSETS } from "../../config/assets";
import { useWoofy } from "../../state/useWoofy";

export default function OnboardingPage() {
  const navigate = useNavigate();
  const {
    state: { onboarding },
    actions,
  } = useWoofy();

  if (onboarding.completed) {
    return <Navigate to="/home" replace />;
  }

  function continueToApp() {
    actions.completeOnboarding();
    navigate("/home", { replace: true });
  }

  return (
    <main className="onboarding">
      <div className="onboarding-paws" aria-hidden="true">
        <img src={ASSETS.paw} alt="" className="paw-decoration paw-1" />
        <img src={ASSETS.paw} alt="" className="paw-decoration paw-2" />
        <img src={ASSETS.paw} alt="" className="paw-decoration paw-3" />
        <img src={ASSETS.paw} alt="" className="paw-decoration paw-4" />
      </div>

      <img src={ASSETS.logo} alt="WOOFY" className="onboarding-logo" />

      <div className="onboarding-mascot">
        <img src={ASSETS.buddy} alt="Buddy" />
      </div>

      <button className="onboarding-button" type="button" onClick={continueToApp}>
        <span>Get WOOFY</span>
        <PawPrint size={24} />
      </button>
    </main>
  );
}
