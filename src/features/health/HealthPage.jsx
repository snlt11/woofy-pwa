import {
  CalendarDays,
  Check,
  Clock,
  Footprints,
  HeartPulse,
  MapPin,
  Moon,
  Pill,
  Scale,
  Syringe,
} from "lucide-react";

import { ASSETS } from "../../config/assets";
import { useWoofy } from "../../state/useWoofy";

export default function HealthPage() {
  const {
    state: { pet, health },
  } = useWoofy();

  const progressPercent = Math.round(
    (health.dailyGoalsCompleted / health.dailyGoalsTotal) * 100
  );

  const activityPercent = Math.min(
    100,
    Math.round(
      (health.dailyActivity.currentMinutes / health.dailyActivity.goalMinutes) *
        100
    )
  );

  const remainingMinutes = Math.max(
    0,
    health.dailyActivity.goalMinutes - health.dailyActivity.currentMinutes
  );

  return (
    <main className="app-page health-page">
      <header className="page-header">
        <div>
          <h1>Health</h1>
          <p>{pet.name}'s wellness overview</p>
        </div>

        <button className="round-button" type="button" aria-label="Health calendar">
          <CalendarDays size={23} />
        </button>
      </header>

      <section className="health-hero">
        <div className="health-buddy">
          <img src={ASSETS.buddy} alt={pet.name} />
        </div>

        <div className="health-hero-content">
          <h2>{pet.name} is doing great</h2>
          <p>
            {health.dailyGoalsCompleted} of {health.dailyGoalsTotal} daily goals
            completed
          </p>

          <div className="health-progress-row">
            <div className="health-progress" aria-hidden="true">
              <span style={{ width: `${progressPercent}%` }} />
            </div>
            <strong>{progressPercent}%</strong>
          </div>
        </div>
      </section>

      <section className="health-section">
        <h2 className="section-title">Today</h2>

        <div className="health-stat-grid">
          <HealthStat
            icon={<Scale size={24} />}
            value={`${pet.weightKg} KG`}
            label="Weight"
          />
          <HealthStat
            icon={<Footprints size={24} />}
            value={health.steps.toLocaleString()}
            label="Steps"
          />
          <HealthStat
            icon={<Moon size={24} />}
            value={health.sleepLabel}
            label="Sleep"
          />
        </div>
      </section>

      <section className="health-section">
        <h2 className="section-title">Weight trend</h2>

        <div className="weight-card">
          <div className="weight-summary">
            <strong>{health.weightTrend.valueKg} KG</strong>
            <span>{health.weightTrend.summary}</span>
          </div>

          <div className="fake-chart">
            <div className="chart-grid-line line-1" />
            <div className="chart-grid-line line-2" />

            <svg
              viewBox="0 0 300 100"
              className="weight-chart-svg"
              aria-label="Weight trend chart"
              role="img"
            >
              <polyline
                points={health.weightTrend.points
                  .map((point) => point.join(","))
                  .join(" ")}
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {health.weightTrend.points.map(([cx, cy], index) => (
                <circle key={index} cx={cx} cy={cy} r="5" fill="currentColor" />
              ))}
            </svg>

            <div className="chart-labels">
              {health.weightTrend.labels.map((label) => (
                <span key={label}>{label}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="health-section">
        <h2 className="section-title">Next vet visit</h2>

        <div className="vet-card">
          <div className="vet-date-icon">
            <CalendarDays size={28} />
          </div>

          <div className="vet-main">
            <strong>{health.nextVetVisit.dateLabel}</strong>
            <span>{health.nextVetVisit.title}</span>
          </div>

          <div className="vet-meta">
            <div>
              <Clock size={16} />
              <span>{health.nextVetVisit.time}</span>
            </div>

            <div>
              <MapPin size={16} />
              <span>{health.nextVetVisit.clinic}</span>
            </div>
          </div>

          <button className="details-button" type="button">
            View details
          </button>
        </div>
      </section>

      <section className="health-two-column">
        <HealthMiniCard
          icon={<Syringe size={24} />}
          title="Vaccinations"
          status={health.vaccination.status}
          detail={health.vaccination.detail}
          success
        />

        <HealthMiniCard
          icon={<Pill size={24} />}
          title="Medication"
          status={health.medication.title}
          detail={health.medication.detail}
        />
      </section>

      <section className="health-section">
        <div className="activity-card">
          <div className="activity-icon">
            <HeartPulse size={28} />
          </div>

          <div className="activity-content">
            <span className="activity-label">Daily activity</span>
            <strong>
              {health.dailyActivity.currentMinutes} /{" "}
              {health.dailyActivity.goalMinutes} min
            </strong>

            <div className="activity-progress" aria-hidden="true">
              <span style={{ width: `${activityPercent}%` }} />
            </div>
          </div>

          <p>
            {remainingMinutes} min to reach
            <br />
            today's goal
          </p>
        </div>
      </section>
    </main>
  );
}

function HealthStat({ icon, value, label }) {
  return (
    <article className="health-stat">
      <div className="health-stat-icon">{icon}</div>
      <strong>{value}</strong>
      <span>{label}</span>
    </article>
  );
}

function HealthMiniCard({ icon, title, status, detail, success = false }) {
  return (
    <article className="health-mini-card">
      <div className="health-mini-icon">{icon}</div>

      <div className="health-mini-copy">
        <strong>{title}</strong>
        <span className={success ? "success-text" : ""}>
          {success && <Check size={14} />}
          {status}
        </span>
        <small>{detail}</small>
      </div>
    </article>
  );
}
