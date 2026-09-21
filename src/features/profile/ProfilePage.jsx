import { useState } from "react";

import PetProfileForm from "../../components/PetProfileForm";
import {
  ActivityLevelIcon,
  BirthdayIcon,
  DietIcon,
  EditControlIcon,
  GenderIcon,
  InsuranceIcon,
  MealIcon,
  MicrochipIcon,
  VetIcon,
} from "../../components/icons/WoofyIcons";
import { ASSETS } from "../../config/assets";
import { useWoofy } from "../../state/useWoofy";
import "../../styles/woofy-icons.css";
import "../../styles/profile-icons.css";
import "../../styles/pet-profile-form.css";

export default function ProfilePage() {
  const [editing, setEditing] = useState(false);

  const {
    state: { pet },
    actions,
  } = useWoofy();

  function saveProfile(patch) {
    actions.savePetProfile(patch);
    setEditing(false);
  }

  return (
    <>
      <main className="app-page profile-page">
        <header className="page-header">
          <div>
            <h1>Profile</h1>
            <p>{pet.name}&apos;s profile &amp; care details</p>
          </div>

          <button
            className="round-button"
            type="button"
            aria-label="Edit profile"
            onClick={() => setEditing(true)}
          >
            <EditControlIcon />
          </button>
        </header>

        <section className="profile-hero">
          <div className="profile-image">
            <img src={ASSETS.buddy} alt={pet.name} />
          </div>

          <h2>{pet.name}</h2>
          <p>{pet.breed}</p>
          <span>{pet.ageDescription}</span>
        </section>

        <section className="profile-summary">
          <ProfileStat value={`${pet.weightKg} KG`} label="Weight" />
          <ProfileStat value={pet.ageLabel} label="Age" />
          <ProfileStat value={pet.activityLabel} label="Activity" />
        </section>

        <section className="profile-section">
          <h2 className="section-title">About {pet.name}</h2>

          <div className="profile-list">
            <ProfileRow
              icon={<BirthdayIcon />}
              label="Birthday"
              value={pet.birthday}
            />
            <ProfileRow
              icon={<GenderIcon />}
              label="Gender"
              value={pet.gender || "Not added"}
            />
            <ProfileRow
              icon={<MealIcon title="Favorite food" />}
              label="Favorite food"
              value={pet.favoriteFood || "Not added"}
            />
            <ProfileRow
              icon={<ActivityLevelIcon />}
              label="Activity level"
              value={pet.activityLevel || "Not added"}
            />
          </div>
        </section>

        <section className="profile-section">
          <h2 className="section-title">Pet identification</h2>

          <div className="identity-card">
            <div className="profile-row-icon">
              <MicrochipIcon />
            </div>

            <div>
              <span>Microchip ID</span>
              <strong>{pet.microchipId || "Not added"}</strong>
              <small>{pet.microchipStatus}</small>
            </div>
          </div>
        </section>

        <section className="profile-section">
          <h2 className="section-title">Care details</h2>

          <div className="profile-list">
            <ProfileRow
              icon={<VetIcon />}
              label="Primary vet"
              value={pet.primaryVet || "Not added"}
            />
            <ProfileRow
              icon={<DietIcon />}
              label="Diet"
              value={pet.diet || "Not added"}
            />
            <ProfileRow
              icon={<InsuranceIcon />}
              label="Insurance"
              value={pet.insurance || "Not added"}
            />
          </div>
        </section>

        <button
          className="profile-edit-button"
          type="button"
          onClick={() => setEditing(true)}
        >
          <EditControlIcon />
          Edit {pet.name}&apos;s Profile
        </button>
      </main>

      {editing && (
        <div
          className="profile-edit-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="edit-pet-title"
        >
          <section className="profile-edit-sheet">
            <header className="profile-edit-sheet-header">
              <div>
                <h2 id="edit-pet-title">Edit {pet.name}</h2>
                <p>Changes are saved on this device and update every WOOFY page.</p>
              </div>

              <button
                className="profile-edit-sheet-close"
                type="button"
                aria-label="Close edit profile"
                onClick={() => setEditing(false)}
              >
                ×
              </button>
            </header>

            <PetProfileForm
              initialPet={pet}
              onSubmit={saveProfile}
              submitLabel="Save changes"
              onCancel={() => setEditing(false)}
            />
          </section>
        </div>
      )}
    </>
  );
}

function ProfileStat({ value, label }) {
  return (
    <div className="profile-stat">
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  );
}

function ProfileRow({ icon, label, value }) {
  return (
    <article className="profile-row">
      <div className="profile-row-icon">{icon}</div>

      <div className="profile-row-copy">
        <span>{label}</span>
        <strong>{value}</strong>
      </div>
    </article>
  );
}
