import {
  Activity,
  Cake,
  Cpu,
  Mars,
  Pencil,
  Salad,
  ShieldCheck,
  Stethoscope,
  Utensils,
} from "lucide-react";

import { ASSETS } from "../../config/assets";
import { useWoofy } from "../../state/useWoofy";

export default function ProfilePage() {
  const {
    state: { pet },
  } = useWoofy();

  return (
    <main className="app-page profile-page">
      <header className="page-header">
        <div>
          <h1>Profile</h1>
        </div>

        <button className="round-button" type="button" aria-label="Edit profile">
          <Pencil size={22} />
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
          <ProfileRow icon={<Cake size={22} />} label="Birthday" value={pet.birthday} />
          <ProfileRow icon={<Mars size={22} />} label="Gender" value={pet.gender} />
          <ProfileRow
            icon={<Utensils size={22} />}
            label="Favorite food"
            value={pet.favoriteFood}
          />
          <ProfileRow
            icon={<Activity size={22} />}
            label="Activity level"
            value={pet.activityLevel}
          />
        </div>
      </section>

      <section className="profile-section">
        <h2 className="section-title">Pet identification</h2>

        <div className="identity-card">
          <div className="profile-row-icon">
            <Cpu size={23} />
          </div>

          <div>
            <span>Microchip ID</span>
            <strong>{pet.microchipId}</strong>
            <small>{pet.microchipStatus}</small>
          </div>
        </div>
      </section>

      <section className="profile-section">
        <h2 className="section-title">Care details</h2>

        <div className="profile-list">
          <ProfileRow
            icon={<Stethoscope size={22} />}
            label="Primary vet"
            value={pet.primaryVet}
          />
          <ProfileRow icon={<Salad size={22} />} label="Diet" value={pet.diet} />
          <ProfileRow
            icon={<ShieldCheck size={22} />}
            label="Insurance"
            value={pet.insurance}
          />
        </div>
      </section>

      <button className="profile-edit-button" type="button">
        <Pencil size={20} />
        Edit {pet.name}&apos;s Profile
      </button>
    </main>
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
