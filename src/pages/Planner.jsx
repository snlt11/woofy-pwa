import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Check,
  Circle,
  Plus,
  Utensils,
  Footprints,
  Pill,
  CircleDot,
} from "lucide-react";

import useLocalStorage from "../hooks/useLocalStorage";

const defaultActivities = [
  {
    id: 1,
    time: "8:00",
    period: "AM",
    title: "Morning meal",
    detail: "Breakfast • 1 cup",
    type: "meal",
    completed: true,
  },
  {
    id: 2,
    time: "10:30",
    period: "AM",
    title: "Morning walk",
    detail: "30 min walk",
    type: "walk",
    completed: false,
  },
  {
    id: 3,
    time: "1:00",
    period: "PM",
    title: "Medicine",
    detail: "Vitamin supplement",
    type: "medicine",
    completed: false,
  },
  {
    id: 4,
    time: "3:30",
    period: "PM",
    title: "Play time",
    detail: "Ball & toys • 20 min",
    type: "play",
    completed: false,
  },
  {
    id: 5,
    time: "6:00",
    period: "PM",
    title: "Evening meal",
    detail: "Dinner • 1 cup",
    type: "meal",
    completed: false,
  },
];

const activityIcons = {
  meal: Utensils,
  walk: Footprints,
  medicine: Pill,
  play: CircleDot,
};

// Dates are stored as local "YYYY-MM-DD" strings so they survive JSON
function toISODate(date) {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

function fromISODate(iso) {
  const [year, month, day] = iso.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function addDays(date, days) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

function getWeek(date) {
  const monday = addDays(date, -((date.getDay() + 6) % 7));
  return Array.from({ length: 7 }, (_, i) => addDays(monday, i));
}

export default function Planner() {
  const [activities, setActivities] = useLocalStorage(
    "woofy-planner",
    defaultActivities
  );

  const [selectedISO, setSelectedISO] = useLocalStorage(
    "woofy-planner-date",
    toISODate(new Date())
  );

  const selectedDate = fromISODate(selectedISO);
  const isToday = selectedISO === toISODate(new Date());

  const toggleActivity = (id) => {
    setActivities((current) =>
      current.map((activity) =>
        activity.id === id
          ? { ...activity, completed: !activity.completed }
          : activity
      )
    );
  };

  const shiftWeek = (weeks) => {
    setSelectedISO(toISODate(addDays(selectedDate, weeks * 7)));
  };

  return (
    <main className="app-page planner-page">
      {/* Header */}
      <header className="page-header">
        <div>
          <h1>Planner</h1>
          <p>Buddy's daily routine</p>
        </div>

        <button
          className="round-button"
          aria-label="Jump to today"
          onClick={() => setSelectedISO(toISODate(new Date()))}
        >
          <CalendarDays size={23} />
        </button>
      </header>

      {/* Month */}
      <section className="planner-calendar">
        <div className="month-row">
          <button
            className="calendar-arrow"
            aria-label="Previous week"
            onClick={() => shiftWeek(-1)}
          >
            <ChevronLeft size={22} />
          </button>

          <h2>
            {selectedDate.toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </h2>

          <button
            className="calendar-arrow"
            aria-label="Next week"
            onClick={() => shiftWeek(1)}
          >
            <ChevronRight size={22} />
          </button>
        </div>

        <div className="week-row">
          {getWeek(selectedDate).map((date) => {
            const iso = toISODate(date);

            return (
              <Day
                key={iso}
                day={date
                  .toLocaleDateString("en-US", { weekday: "short" })
                  .toUpperCase()}
                date={date.getDate()}
                active={iso === selectedISO}
                onSelect={() => setSelectedISO(iso)}
              />
            );
          })}
        </div>
      </section>

      {/* Summary card */}
      <section className="planner-summary">
        <div className="planner-buddy">
          <img src="/assets/buddy-master.png" alt="Buddy" />
        </div>

        <div className="planner-summary-copy">
          <h2>
            {selectedDate.toLocaleDateString("en-US", {
              weekday: "long",
              month: "short",
              day: "numeric",
            })}
          </h2>
          <p>
            {activities.length} activities {isToday ? "today" : "planned"}
          </p>
        </div>

        <div className="planner-note">
          Good
          <br />
          Day!
          <span>♡</span>
        </div>
      </section>

      {/* Timeline */}
      <section className="timeline">
        {activities.map((activity, index) => {
          const Icon = activityIcons[activity.type] ?? CircleDot;

          return (
            <TimelineItem
              key={activity.id}
              time={activity.time}
              period={activity.period}
              title={activity.title}
              detail={activity.detail}
              icon={<Icon size={22} />}
              done={activity.completed}
              last={index === activities.length - 1}
              onToggle={() => toggleActivity(activity.id)}
            />
          );
        })}
      </section>

      {/* Add Activity */}
      <button className="planner-add-button">
        <Plus size={28} />
        <span>Add activity</span>
      </button>
    </main>
  );
}

function Day({ day, date, active = false, onSelect }) {
  return (
    <button
      className={`calendar-day ${active ? "active" : ""}`}
      onClick={onSelect}
      aria-pressed={active}
    >
      <span>{day}</span>
      <strong>{date}</strong>
    </button>
  );
}

function TimelineItem({
  time,
  period,
  title,
  detail,
  icon,
  done = false,
  last = false,
  onToggle,
}) {
  return (
    <div className="timeline-row">
      <div className="timeline-time">
        <strong>{time}</strong>
        <span>{period}</span>
      </div>

      <div className={`timeline-marker ${last ? "last" : ""}`}>
        <span className={done ? "marker-done" : ""} />
      </div>

      <div className="timeline-card">
        <div className="timeline-icon">{icon}</div>

        <div className="timeline-copy">
          <strong>{title}</strong>
          <span>{detail}</span>
        </div>

        <button
          className={`care-check ${done ? "done" : ""}`}
          onClick={onToggle}
          aria-label={`Mark ${title} ${done ? "not complete" : "complete"}`}
        >
          {done ? <Check size={21} /> : <Circle size={25} />}
        </button>
      </div>
    </div>
  );
}
