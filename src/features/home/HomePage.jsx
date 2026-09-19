import {
  Bell,
  CalendarDays,
  Check,
  Circle,
  Footprints,
  Laugh,
  Leaf,
  Moon,
  Plus,
  Scale,
  Smile,
  Utensils,
} from "lucide-react";

import { ASSETS } from "../../config/assets";
import { useWoofy } from "../../state/useWoofy";

const moods = [
  { id: "happy", label: "Happy", icon: Smile },
  { id: "playful", label: "Playful", icon: Laugh },
  { id: "calm", label: "Calm", icon: Leaf },
  { id: "sleepy", label: "Sleepy", icon: Moon },
];

export default function HomePage() {
  const {
    state: { pet, home, health },
    actions,
  } = useWoofy();

  const moodIndex = Math.max(
    0,
    moods.findIndex((mood) => mood.id === home.moodId)
  );
  const mood = moods[moodIndex];
  const MoodIcon = mood.icon;

  function cycleMood() {
    const next = moods[(moodIndex + 1) % moods.length];
    actions.setMood(next.id);
  }

  return (
    <main className="home-page">
      <header className="home-header">
        <div className="home-user">
          <div className="avatar">
            <img src={ASSETS.buddy} alt={pet.name} />
          </div>

          <div>
            <h1>Hey {pet.name}!</h1>
            <p>How are you doing today?</p>
          </div>
        </div>

        <button className="round-button" type="button" aria-label="Notifications">
          <Bell size={23} />
          <span className="notification-dot" />
        </button>
      </header>

      <section className="buddy-card" aria-label={`${pet.name} overview`}>
        <img src={ASSETS.paw} className="hero-paw hero-paw-1" alt="" />
        <img src={ASSETS.paw} className="hero-paw hero-paw-2" alt="" />

        <div className="hero-dog">
          <img src={ASSETS.buddy} alt={pet.name} />
        </div>

        <div className="hero-info">
          <h2>{pet.name.toUpperCase()}</h2>
          <p>{pet.breed}</p>

          <button
            className="mood-button"
            type="button"
            onClick={cycleMood}
            aria-label={`${pet.name}'s mood: ${mood.label}. Tap to change.`}
          >
            <MoodIcon size={20} />
            {mood.label}
            <span aria-hidden="true">›</span>
          </button>
        </div>
      </section>

      <section className="home-section">
        <div className="section-header">
          <h2>Today's care</h2>

          <button className="add-button" type="button" aria-label="Add care task">
            <Plus size={28} />
          </button>
        </div>

        <div className="care-list">
          {home.careTasks.map((task) => (
            <CareItem
              key={task.id}
              task={task}
              onToggle={() => actions.toggleCareTask(task.id)}
            />
          ))}
        </div>
      </section>

      <section className="home-section">
        <h2 className="section-title">{pet.name}'s wellness</h2>

        <div className="wellness-grid">
          <WellnessCard
            icon={<Scale size={25} />}
            value={`${pet.weightKg} KG`}
            label="Weight"
          />
          <WellnessCard
            icon={<CalendarDays size={25} />}
            value={health.nextVetVisit.dateLabel}
            label="Next vet visit"
          />
        </div>
      </section>
    </main>
  );
}

function CareItem({ task, onToggle }) {
  const Icon = task.type === "walk" ? Footprints : Utensils;

  return (
    <article className="care-item">
      <div className="care-icon">
        <Icon size={24} />
      </div>

      <div className="care-copy">
        <strong>{task.title}</strong>
        <span>{task.time}</span>
      </div>

      <button
        className={`care-check ${task.completed ? "done" : ""}`}
        type="button"
        onClick={onToggle}
        aria-pressed={task.completed}
        aria-label={`Mark ${task.title} ${task.completed ? "not complete" : "complete"}`}
      >
        {task.completed ? <Check size={22} /> : <Circle size={24} />}
      </button>
    </article>
  );
}

function WellnessCard({ icon, value, label }) {
  return (
    <article className="wellness-card">
      <div className="wellness-icon">{icon}</div>
      <strong>{value}</strong>
      <span>{label}</span>
    </article>
  );
}
