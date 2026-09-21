import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { PawPrint } from "lucide-react";

import PetProfileForm from "../../components/PetProfileForm";
import { ASSETS } from "../../config/assets";
import { useWoofy } from "../../state/useWoofy";
import "../../styles/pet-profile-form.css";

export default function OnboardingPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState("welcome");

  const {
    state: { onboarding, pet },
    actions,
  } = useWoofy();

  if (onboarding.completed && onboarding.profileCompleted) {
    return <Navigate to="/home" replace />;
  }

  function saveProfile(patch) {
    actions.savePetProfile(patch);
    actions.completeOnboarding();
    navigate("/home", { replace: true });
  }

  if (step === "profile" || onboarding.completed) {
    return (
      <main className="onboarding-profile">
        <header className="onboarding-profile-header">
          <img src={ASSETS.buddy} alt="" />

          <div>
            <span>Set up WOOFY</span>
            <h1>Tell us about your pet</h1>
            <p>
              WOOFY will use these details across Home, Planner, Health, and Profile.
            </p>
          </div>
        </header>

        <PetProfileForm
          initialPet={pet}
          onSubmit={saveProfile}
          submitLabel="Save & start WOOFY"
        />
      </main>
    );
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

      <button
        className="onboarding-button"
        type="button"
        onClick={() => setStep("profile")}
      >
        <span>Get WOOFY</span>
        <PawPrint size={24} />
      </button>
    </main>
  );
}
