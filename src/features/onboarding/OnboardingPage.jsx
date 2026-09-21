import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { ArrowLeft, PawPrint } from "lucide-react";

import BirthdayPicker from "../../components/BirthdayPicker";
import { ASSETS } from "../../config/assets";
import {
  formValuesToPetPatch,
  petToFormValues,
} from "../../lib/pet-profile";
import { useWoofy } from "../../state/useWoofy";
import "../../styles/pet-profile-form.css";

const ACTIVITY_OPTIONS = ["Low energy", "Moderate energy", "High energy"];

export default function OnboardingPage() {
  const navigate = useNavigate();
  const {
    state: { onboarding, pet },
    actions,
  } = useWoofy();

  const [step, setStep] = useState("welcome");
  const [values, setValues] = useState(() => petToFormValues(pet));
  const [error, setError] = useState("");

  if (onboarding.completed && onboarding.profileCompleted) {
    return <Navigate to="/home" replace />;
  }

  function updateField(event) {
    const { name, value } = event.target;

    setValues((current) => ({
      ...current,
      [name]: value,
    }));

    if (error) setError("");
  }

  function validateAbout() {
    if (!values.name.trim() || !values.breed.trim() || !values.birthdayISO) {
      setError("Add your pet's name, breed, and birthday to continue.");
      return false;
    }

    const weight = Number.parseFloat(values.weightKg);

    if (!Number.isFinite(weight) || weight <= 0) {
      setError("Enter a valid weight.");
      return false;
    }

    return true;
  }

  function continueToCare(event) {
    event.preventDefault();

    if (!validateAbout()) return;

    actions.savePetProfile(formValuesToPetPatch(values));
    setStep("care");
    setError("");
  }

  function finishSetup(event) {
    event.preventDefault();

    if (!validateAbout()) {
      setStep("about");
      return;
    }

    actions.savePetProfile(formValuesToPetPatch(values));
    actions.completeOnboarding();
    navigate("/home", { replace: true });
  }

  if (step === "about") {
    return (
      <main key="about-step" className="onboarding-profile onboarding-profile-step">
        <OnboardingSetupHeader
          stepLabel="Step 1 of 2"
          title="Tell us about your pet"
          description="Start with the details WOOFY uses across every page."
          onBack={() => setStep("welcome")}
        />

        <form className="pet-profile-form" onSubmit={continueToCare}>
          <section className="pet-form-section pet-form-section-single">
            <div className="pet-form-section-heading">
              <div>
                <span>Step 1</span>
                <h2>About your pet</h2>
              </div>
              <p>Basic details used across WOOFY.</p>
            </div>

            <div className="pet-form-grid pet-about-grid">
              <label className="pet-field pet-field-full">
                <span>Pet name</span>
                <input
                  name="name"
                  value={values.name}
                  onChange={updateField}
                  placeholder="Buddy"
                  autoComplete="off"
                  required
                />
              </label>

              <label className="pet-field pet-field-full">
                <span>Breed</span>
                <input
                  name="breed"
                  value={values.breed}
                  onChange={updateField}
                  placeholder="Golden Retriever"
                  autoComplete="off"
                  required
                />
              </label>

              <div className="pet-field pet-date-field">
                <span>Birthday</span>

                <BirthdayPicker
                  id="onboarding-birthday"
                  value={values.birthdayISO}
                  max={new Date().toISOString().slice(0, 10)}
                  onChange={(birthdayISO) => {
                    setValues((current) => ({
                      ...current,
                      birthdayISO,
                    }));
                    if (error) setError("");
                  }}
                />
              </div>

              <label className="pet-field">
                <span>Gender</span>
                <select name="gender" value={values.gender} onChange={updateField}>
                  <option value="">Select</option>
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                  <option value="Other">Other</option>
                </select>
              </label>

              <label className="pet-field">
                <span>Weight (kg)</span>
                <input
                  type="number"
                  inputMode="decimal"
                  min="0.1"
                  step="0.1"
                  name="weightKg"
                  value={values.weightKg}
                  onChange={updateField}
                  placeholder="12.4"
                  required
                />
              </label>

              <label className="pet-field">
                <span>Activity level</span>
                <select
                  name="activityLevel"
                  value={values.activityLevel}
                  onChange={updateField}
                >
                  <option value="">Select</option>
                  {ACTIVITY_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </section>

          {error && (
            <p className="pet-form-error" role="alert">
              {error}
            </p>
          )}

          <div className="pet-form-actions onboarding-step-actions">
            <button className="pet-form-primary" type="submit">
              Continue to care details
            </button>
          </div>
        </form>
      </main>
    );
  }

  if (step === "care") {
    return (
      <main key="care-step" className="onboarding-profile onboarding-profile-step">
        <OnboardingSetupHeader
          stepLabel="Step 2 of 2"
          title="Care details"
          description="Add care information now, or update it later from Profile."
          onBack={() => setStep("about")}
        />

        <form className="pet-profile-form" onSubmit={finishSetup}>
          <section className="pet-form-section pet-form-section-single">
            <div className="pet-form-section-heading">
              <div>
                <span>Step 2</span>
                <h2>Care details</h2>
              </div>
              <p>These details can be changed any time from Profile.</p>
            </div>

            <div className="pet-form-grid">
              <label className="pet-field pet-field-full">
                <span>Favorite food</span>
                <input
                  name="favoriteFood"
                  value={values.favoriteFood}
                  onChange={updateField}
                  placeholder="Chicken & rice"
                />
              </label>

              <label className="pet-field pet-field-full">
                <span>Primary vet</span>
                <input
                  name="primaryVet"
                  value={values.primaryVet}
                  onChange={updateField}
                  placeholder="Happy Paws Clinic"
                />
              </label>

              <label className="pet-field pet-field-full">
                <span>Diet</span>
                <input
                  name="diet"
                  value={values.diet}
                  onChange={updateField}
                  placeholder="Standard adult diet"
                />
              </label>

              <label className="pet-field pet-field-full">
                <span>Microchip ID</span>
                <input
                  name="microchipId"
                  value={values.microchipId}
                  onChange={updateField}
                  placeholder="Optional"
                  autoComplete="off"
                />
              </label>

              <label className="pet-field pet-field-full">
                <span>Insurance</span>
                <select
                  name="insurance"
                  value={values.insurance}
                  onChange={updateField}
                >
                  <option value="">Not added</option>
                  <option value="Active">Active</option>
                  <option value="Not insured">Not insured</option>
                </select>
              </label>
            </div>
          </section>

          <div className="pet-form-actions onboarding-step-actions onboarding-step-actions-split">
            <button
              className="pet-form-secondary"
              type="button"
              onClick={() => setStep("about")}
            >
              Back
            </button>

            <button className="pet-form-primary" type="submit">
              Save & start WOOFY
            </button>
          </div>
        </form>
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
        onClick={() => setStep("about")}
      >
        <span>Get WOOFY</span>
        <PawPrint size={24} />
      </button>
    </main>
  );
}

function OnboardingSetupHeader({
  stepLabel,
  title,
  description,
  onBack,
}) {
  return (
    <header className="onboarding-profile-header onboarding-profile-header-step">
      <button
        className="onboarding-back-button"
        type="button"
        aria-label="Go back"
        onClick={onBack}
      >
        <ArrowLeft size={20} />
      </button>

      <img src={ASSETS.buddy} alt="" />

      <div>
        <span>{stepLabel}</span>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    </header>
  );
}
