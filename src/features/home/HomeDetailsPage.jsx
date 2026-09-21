import { ArrowLeft, ChevronRight, Smile, Laugh, Leaf, Moon } from "lucide-react";
import { useNavigate } from "react-router-dom";

import {
  ActivityLevelIcon, BirthdayIcon, CompleteIcon, DietIcon, GenderIcon,
  IncompleteIcon, MealIcon, VetCalendarIcon, VetIcon, WalkIcon, WeightIcon,
} from "../../components/icons/WoofyIcons";
import { ASSETS } from "../../config/assets";
import { ROUTES } from "../../config/routes";
import { useWoofy } from "../../state/useWoofy";
import "../../styles/woofy-icons.css";
import "../../styles/home-details.css";

const moods = {
  happy: { label: "Happy", icon: Smile },
  playful: { label: "Playful", icon: Laugh },
  calm: { label: "Calm", icon: Leaf },
  sleepy: { label: "Sleepy", icon: Moon },
};

export default function HomeDetailsPage() {
  const navigate = useNavigate();
  const { state: { pet, home, health }, actions } = useWoofy();
  const completedCare = home.careTasks.filter((task) => task.completed).length;
  const mood = moods[home.moodId] || moods.happy;
  const MoodIcon = mood.icon;

  return (
    <main className="app-page home-details-page">
      <header className="home-details-header">
        <button className="home-details-back" type="button" aria-label="Back to Home" onClick={() => navigate(ROUTES.home)}>
          <ArrowLeft size={21} />
        </button>
        <div className="home-details-heading">
          <span>Home details</span>
          <h1>{pet.name}&apos;s day</h1>
          <p>Care, wellness, and profile information in one place.</p>
        </div>
      </header>

      <section className="home-details-hero">
        <div className="home-details-dog"><img src={ASSETS.buddy} alt={pet.name} /></div>
        <div className="home-details-hero-copy">
          <span className="home-details-eyebrow">Your buddy</span>
          <h2>{pet.name}</h2>
          <p>{pet.breed}</p>
          <div className="home-details-mood"><MoodIcon size={18} /><span>{mood.label}</span></div>
        </div>
        <div className="home-details-progress">
          <strong>{completedCare}/{home.careTasks.length}</strong>
          <span>care tasks done</span>
        </div>
      </section>

      <section className="home-details-section">
        <div className="home-details-section-heading"><div><h2>Today&apos;s care</h2><p>{completedCare} of {home.careTasks.length} completed</p></div></div>
        <div className="home-details-care-list">
          {home.careTasks.map((task) => (
            <HomeCareRow key={task.id} task={task} onToggle={() => actions.toggleCareTask(task.id)} />
          ))}
        </div>
      </section>

      <section className="home-details-section">
        <div className="home-details-section-heading"><div><h2>Wellness</h2><p>Live from {pet.name}&apos;s saved profile.</p></div></div>
        <div className="home-details-stat-grid">
          <DetailStat icon={<WeightIcon />} label="Weight" value={pet.weightKg + " KG"} />
          <DetailStat icon={<ActivityLevelIcon />} label="Activity" value={pet.activityLevel || "Not added"} />
          <DetailStat icon={<VetCalendarIcon />} label="Next vet" value={health.nextVetVisit.dateLabel} wide />
        </div>
      </section>

      <section className="home-details-section">
        <div className="home-details-section-heading">
          <div><h2>About {pet.name}</h2><p>Details saved on this device.</p></div>
          <button className="home-details-text-action" type="button" onClick={() => navigate(ROUTES.profile)}>Edit <ChevronRight size={16} /></button>
        </div>
        <div className="home-details-info-card">
          <InfoRow icon={<BirthdayIcon />} label="Birthday" value={pet.birthday || "Not added"} />
          <InfoRow icon={<GenderIcon />} label="Gender" value={pet.gender || "Not added"} />
          <InfoRow icon={<MealIcon title="Favorite food" />} label="Favorite food" value={pet.favoriteFood || "Not added"} />
          <InfoRow icon={<VetIcon />} label="Primary vet" value={pet.primaryVet || "Not added"} />
          <InfoRow icon={<DietIcon />} label="Diet" value={pet.diet || "Not added"} last />
        </div>
      </section>
    </main>
  );
}

function HomeCareRow({ task, onToggle }) {
  const Icon = task.type === "walk" ? WalkIcon : MealIcon;
  return (
    <article className="home-details-care-row">
      <div className="home-details-row-icon"><Icon /></div>
      <div className="home-details-row-copy"><strong>{task.title}</strong><span>{task.time}</span></div>
      <button
        className="home-details-check"
        type="button"
        onClick={onToggle}
        aria-pressed={task.completed}
        aria-label={"Mark " + task.title + " " + (task.completed ? "not complete" : "complete")}
      >
        {task.completed ? <CompleteIcon /> : <IncompleteIcon />}
      </button>
    </article>
  );
}

function DetailStat({ icon, label, value, wide = false }) {
  return (
    <article className={"home-details-stat " + (wide ? "is-wide" : "")}>
      <div className="home-details-stat-icon">{icon}</div>
      <div><span>{label}</span><strong>{value}</strong></div>
    </article>
  );
}

function InfoRow({ icon, label, value, last = false }) {
  return (
    <article className={"home-details-info-row " + (last ? "is-last" : "")}>
      <div className="home-details-info-icon">{icon}</div>
      <div><span>{label}</span><strong>{value}</strong></div>
    </article>
  );
}
