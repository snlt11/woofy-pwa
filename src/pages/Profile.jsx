import {
  Pencil,
  Cake,
  Mars,
  Utensils,
  Activity,
  Cpu,
  Stethoscope,
  Salad,
  ShieldCheck,
} from "lucide-react";

export default function Profile() {
  return (
    <main className="app-page profile-page">
      {/* Header */}
      <header className="page-header">
        <div>
          <h1>Profile</h1>
        </div>

        <button className="round-button" aria-label="Edit profile">
          <Pencil size={22} />
        </button>
      </header>

      {/* Buddy Profile */}
      <section className="profile-hero">
        <div className="profile-image">
          <img src="/assets/buddy-master.png" alt="Buddy" />
        </div>

        <h2>Buddy</h2>
        <p>Golden Puppy</p>
        <span>2 years old</span>
      </section>

      {/* Summary */}
      <section className="profile-summary">
        <ProfileStat value="12.4 KG" label="Weight" />
        <ProfileStat value="2 Years" label="Age" />
        <ProfileStat value="High" label="Activity" />
      </section>

      {/* About */}
      <section className="profile-section">
        <h2 className="section-title">About Buddy</h2>

        <div className="profile-list">
          <ProfileRow icon={<Cake size={22} />} label="Birthday" value="March 24, 2024" />
          <ProfileRow icon={<Mars size={22} />} label="Gender" value="Male" />
          <ProfileRow icon={<Utensils size={22} />} label="Favorite food" value="Chicken & rice" />
          <ProfileRow icon={<Activity size={22} />} label="Activity level" value="High energy" />
        </div>
      </section>

      {/* Identification */}
      <section className="profile-section">
        <h2 className="section-title">Pet identification</h2>

        <div className="identity-card">
          <div className="profile-row-icon">
            <Cpu size={23} />
          </div>

          <div>
            <span>Microchip ID</span>
            <strong>984 123 456 789</strong>
            <small>Registered</small>
          </div>
        </div>
      </section>

      {/* Care Details */}
      <section className="profile-section">
        <h2 className="section-title">Care details</h2>

        <div className="profile-list">
          <ProfileRow icon={<Stethoscope size={22} />} label="Primary vet" value="Happy Paws Clinic" />
          <ProfileRow icon={<Salad size={22} />} label="Diet" value="Standard adult diet" />
          <ProfileRow icon={<ShieldCheck size={22} />} label="Insurance" value="Active" />
        </div>
      </section>

      {/* Edit Button */}
      <button className="profile-edit-button">
        <Pencil size={20} />
        Edit Buddy&apos;s Profile
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
    <div className="profile-row">
      <div className="profile-row-icon">{icon}</div>

      <div className="profile-row-copy">
        <span>{label}</span>
        <strong>{value}</strong>
      </div>
    </div>
  );
}
