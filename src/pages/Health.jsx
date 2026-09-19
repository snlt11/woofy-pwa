import {
  CalendarDays,
  Scale,
  Footprints,
  Moon,
  Syringe,
  Pill,
  HeartPulse,
  MapPin,
  Clock,
  Check,
} from "lucide-react";

const weightPoints = [
  [10, 60],
  [55, 67],
  [100, 58],
  [145, 64],
  [190, 53],
  [235, 61],
  [290, 65],
];

export default function Health() {
  return (
    <main className="app-page health-page">
      {/* Header */}
      <header className="page-header">
        <div>
          <h1>Health</h1>
          <p>Buddy's wellness overview</p>
        </div>

        <button className="round-button" aria-label="Health calendar">
          <CalendarDays size={23} />
        </button>
      </header>

      {/* Wellness Hero */}
      <section className="health-hero">
        <div className="health-buddy">
          <img src="/assets/buddy-master.png" alt="Buddy" />
        </div>

        <div className="health-hero-content">
          <h2>Buddy is doing great</h2>

          <p>3 of 4 daily goals completed</p>

          <div className="health-progress-row">
            <div className="health-progress">
              <span />
            </div>

            <strong>75%</strong>
          </div>
        </div>
      </section>

      {/* Today */}
      <section className="health-section">
        <h2 className="section-title">Today</h2>

        <div className="health-stat-grid">
          <HealthStat icon={<Scale size={24} />} value="12.4 KG" label="Weight" />
          <HealthStat icon={<Footprints size={24} />} value="7,240" label="Steps" />
          <HealthStat icon={<Moon size={24} />} value="8h 20m" label="Sleep" />
        </div>
      </section>

      {/* Weight Trend */}
      <section className="health-section">
        <h2 className="section-title">Weight trend</h2>

        <div className="weight-card">
          <div className="weight-summary">
            <strong>12.4 KG</strong>
            <span>Stable this month</span>
          </div>

          <div className="fake-chart">
            <div className="chart-grid-line line-1" />
            <div className="chart-grid-line line-2" />

            <svg
              viewBox="0 0 300 100"
              className="weight-chart-svg"
              aria-hidden="true"
            >
              <polyline
                points={weightPoints.map((point) => point.join(",")).join(" ")}
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {weightPoints.map(([cx, cy], index) => (
                <circle key={index} cx={cx} cy={cy} r="5" fill="currentColor" />
              ))}
            </svg>

            <div className="chart-labels">
              <span>Sep 1</span>
              <span>Sep 8</span>
              <span>Sep 15</span>
              <span>Sep 22</span>
              <span>Sep 29</span>
            </div>
          </div>
        </div>
      </section>

      {/* Vet Visit */}
      <section className="health-section">
        <h2 className="section-title">Next vet visit</h2>

        <div className="vet-card">
          <div className="vet-date-icon">
            <CalendarDays size={28} />
          </div>

          <div className="vet-main">
            <strong>OCT 12</strong>
            <span>Annual check-up</span>
          </div>

          <div className="vet-meta">
            <div>
              <Clock size={16} />
              <span>10:30 AM</span>
            </div>

            <div>
              <MapPin size={16} />
              <span>Happy Paws Clinic</span>
            </div>
          </div>

          <button className="details-button">View details</button>
        </div>
      </section>

      {/* Vaccination + Medication */}
      <section className="health-two-column">
        <HealthMiniCard
          icon={<Syringe size={24} />}
          title="Vaccinations"
          status="Up to date"
          detail="Next booster: Jan 2027"
          success
        />

        <HealthMiniCard
          icon={<Pill size={24} />}
          title="Medication"
          status="Daily vitamin"
          detail="1 tablet • 1:00 PM"
        />
      </section>

      {/* Daily Activity */}
      <section className="health-section">
        <div className="activity-card">
          <div className="activity-icon">
            <HeartPulse size={28} />
          </div>

          <div className="activity-content">
            <span className="activity-label">Daily activity</span>

            <strong>42 / 60 min</strong>

            <div className="activity-progress">
              <span />
            </div>
          </div>

          <p>
            18 min to reach
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
    <div className="health-stat">
      <div className="health-stat-icon">{icon}</div>

      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  );
}

function HealthMiniCard({ icon, title, status, detail, success = false }) {
  return (
    <div className="health-mini-card">
      <div className="health-mini-icon">{icon}</div>

      <div className="health-mini-copy">
        <strong>{title}</strong>

        <span className={success ? "success-text" : ""}>
          {success && <Check size={14} />}
          {status}
        </span>

        <small>{detail}</small>
      </div>
    </div>
  );
}
