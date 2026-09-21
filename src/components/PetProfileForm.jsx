import { useState } from "react";

import {
  formValuesToPetPatch,
  petToFormValues,
} from "../lib/pet-profile";

const ACTIVITY_OPTIONS = ["Low energy", "Moderate energy", "High energy"];

export default function PetProfileForm({
  initialPet,
  onSubmit,
  submitLabel = "Save pet profile",
  onCancel,
}) {
  const [values, setValues] = useState(() => petToFormValues(initialPet));
  const [error, setError] = useState("");

  function updateField(event) {
    const { name, value } = event.target;

    setValues((current) => ({
      ...current,
      [name]: value,
    }));

    if (error) setError("");
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!values.name.trim() || !values.breed.trim() || !values.birthdayISO) {
      setError("Add your pet's name, breed, and birthday to continue.");
      return;
    }

    const weight = Number.parseFloat(values.weightKg);

    if (!Number.isFinite(weight) || weight <= 0) {
      setError("Enter a valid weight.");
      return;
    }

    onSubmit(formValuesToPetPatch(values));
  }

  return (
    <form className="pet-profile-form" onSubmit={handleSubmit}>
      <section className="pet-form-section">
        <div className="pet-form-section-heading">
          <div>
            <span>Step 1</span>
            <h2>About your pet</h2>
          </div>
          <p>Basic details used across WOOFY.</p>
        </div>

        <div className="pet-form-grid">
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

          <label className="pet-field">
            <span>Birthday</span>
            <input
              type="date"
              name="birthdayISO"
              value={values.birthdayISO}
              onChange={updateField}
              max={new Date().toISOString().slice(0, 10)}
              required
            />
          </label>

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

      <section className="pet-form-section">
        <div className="pet-form-section-heading">
          <div>
            <span>Step 2</span>
            <h2>Care details</h2>
          </div>
          <p>You can update these later from Profile.</p>
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

      {error && (
        <p className="pet-form-error" role="alert">
          {error}
        </p>
      )}

      <div className="pet-form-actions">
        {onCancel && (
          <button className="pet-form-secondary" type="button" onClick={onCancel}>
            Cancel
          </button>
        )}

        <button className="pet-form-primary" type="submit">
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
