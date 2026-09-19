import {
  Bell,
  Plus,
  Check,
  Circle,
  Smile,
  Laugh,
  Leaf,
  Moon,
  CalendarDays,
  Utensils,
  Footprints,
  Scale,
} from "lucide-react";

import useLocalStorage from "../hooks/useLocalStorage";

const defaultCareTasks = [
  {
    id: "morning-meal",
    title: "Morning meal",
    time: "8:00 AM",
    type: "meal",
    completed: true,
  },
  {
    id: "afternoon-walk",
    title: "Afternoon walk",
    time: "2:00 PM",
    type: "walk",
    completed: false,
  },
  {
    id: "evening-meal",
    title: "Evening meal",
    time: "6:00 PM",
    type: "meal",
    completed: false,
  },
];

const moods = [
  { id: "happy", label: "Happy", icon: Smile },
  { id: "playful", label: "Playful", icon: Laugh },
  { id: "calm", label: "Calm", icon: Leaf },
  { id: "sleepy", label: "Sleepy", icon: Moon },
];

export default function Home() {
  const [careTasks, setCareTasks] = useLocalStorage(
    "woofy-care-tasks",
    defaultCareTasks
  );

  const [moodId, setMoodId] = useLocalStorage("woofy-mood", "happy");

  const moodIndex = Math.max(
    0,
    moods.findIndex((mood) => mood.id === moodId)
  );
  const mood = moods[moodIndex];
  const MoodIcon = mood.icon;

  const toggleTask = (id) => {
    setCareTasks((current) =>
      current.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const nextMood = () => {
    setMoodId(moods[(moodIndex + 1) % moods.length].id);
  };

  return (
    <main className="home-page">
      {/* Header */}
      <header className="home-header">
        <div className="home-user">
          <div className="avatar">
            <img src="/assets/buddy-master.png" alt="Buddy" />
          </div>

          <div>
            <h1>Hey Buddy!</h1>
            <p>How are you doing today?</p>
          </div>
        </div>

        <button className="round-button" aria-label="Notifications">
          <Bell size={23} />
          <span className="notification-dot" />
        </button>
      </header>

      {/* Buddy Hero */}
      <section className="buddy-card">
        <img src="/assets/paw.png" className="hero-paw hero-paw-1" alt="" />
        <img src="/assets/paw.png" className="hero-paw hero-paw-2" alt="" />

        <div className="hero-dog">
          <img src="/assets/buddy-master.png" alt="Buddy" />
        </div>

        <div className="hero-info">
          <h2>BUDDY</h2>
          <p>Golden Puppy</p>

          <button
            className="mood-button"
            onClick={nextMood}
            aria-label={`Buddy's mood: ${mood.label}. Tap to change.`}
          >
            <MoodIcon size={20} />
            {mood.label}
            <span>›</span>
          </button>
        </div>
      </section>

      {/* Today's Care */}
      <section className="home-section">
        <div className="section-header">
          <h2>Today's care</h2>

          <button className="add-button" aria-label="Add care task">
            <Plus size={28} />
          </button>
        </div>

        <div className="care-list">
          {careTasks.map((task) => (
            <CareItem
              key={task.id}
              icon={
                task.type === "walk" ? (
                  <Footprints size={24} />
                ) : (
                  <Utensils size={24} />
                )
              }
              title={task.title}
              time={task.time}
              done={task.completed}
              onToggle={() => toggleTask(task.id)}
            />
          ))}
        </div>
      </section>

      {/* Wellness */}
      <section className="home-section">
        <h2 className="section-title">Buddy's wellness</h2>

        <div className="wellness-grid">
          <WellnessCard icon={<Scale size={25} />} value="12.4 KG" label="Weight" />
          <WellnessCard
            icon={<CalendarDays size={25} />}
            value="OCT 12"
            label="Next vet visit"
          />
        </div>
      </section>
    </main>
  );
}

function CareItem({ icon, title, time, done, onToggle }) {
  return (
    <div className="care-item">
      <div className="care-icon">{icon}</div>

      <div className="care-copy">
        <strong>{title}</strong>
        <span>{time}</span>
      </div>

      <button
        className={`care-check ${done ? "done" : ""}`}
        onClick={onToggle}
        aria-label={`Mark ${title} ${done ? "not complete" : "complete"}`}
      >
        {done ? <Check size={22} /> : <Circle size={24} />}
      </button>
    </div>
  );
}

function WellnessCard({ icon, value, label }) {
  return (
    <div className="wellness-card">
      <div className="wellness-icon">{icon}</div>

      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  );
}
