import { useState } from "react";
import { ChevronRight, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

import AddPlannerActivitySheet from "../../components/AddPlannerActivitySheet";
import {
  CompleteIcon,
  IncompleteIcon,
  MealIcon,
  MedicineIcon,
  NextIcon,
  PlannerCalendarIcon,
  PlayIcon,
  PreviousIcon,
  WalkIcon,
} from "../../components/icons/WoofyIcons";
import { ASSETS } from "../../config/assets";
import { ROUTES } from "../../config/routes";
import {
  addDays,
  formatMonthYear,
  formatPlannerDate,
  fromISODate,
  getWeek,
  toISODate,
} from "../../lib/date";
import { useWoofy } from "../../state/useWoofy";
import "../../styles/woofy-icons.css";
import "../../styles/planner-icons.css";
import "../../styles/add-planner-activity.css";

const activityIcons = {
  meal: MealIcon,
  walk: WalkIcon,
  medicine: MedicineIcon,
  play: PlayIcon,
};

export default function PlannerPage() {
  const navigate = useNavigate();
  const [addingActivity, setAddingActivity] = useState(false);

  const {
    state: { pet, planner },
    actions,
  } = useWoofy();

  const selectedDate = fromISODate(planner.selectedDate);
  const isToday = planner.selectedDate === toISODate(new Date());

  function shiftWeek(weeks) {
    actions.setPlannerDate(toISODate(addDays(selectedDate, weeks * 7)));
  }

  return (
    <main className="app-page planner-page">
      <header className="page-header">
        <div>
          <h1>Planner</h1>
          <p>{pet.name}'s daily routine</p>
        </div>

        <button
          className="round-button planner-calendar-shortcut"
          type="button"
          aria-label="Jump to today"
          onClick={() => actions.setPlannerDate(toISODate(new Date()))}
        >
          <PlannerCalendarIcon />
        </button>
      </header>

      <section className="planner-calendar" aria-label="Planner calendar">
        <div className="month-row">
          <button
            className="calendar-arrow"
            type="button"
            aria-label="Previous week"
            onClick={() => shiftWeek(-1)}
          >
            <PreviousIcon />
          </button>

          <h2>{formatMonthYear(selectedDate)}</h2>

          <button
            className="calendar-arrow"
            type="button"
            aria-label="Next week"
            onClick={() => shiftWeek(1)}
          >
            <NextIcon />
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
                active={iso === planner.selectedDate}
                onSelect={() => actions.setPlannerDate(iso)}
              />
            );
          })}
        </div>
      </section>

      <section className="planner-summary">
        <div className="planner-buddy">
          <img src={ASSETS.buddy} alt={pet.name} />
        </div>

        <div className="planner-summary-copy">
          <h2>{formatPlannerDate(selectedDate)}</h2>
          <p>
            {planner.activities.length} activities{" "}
            {isToday ? "today" : "planned"}
          </p>
        </div>

        <div className="planner-note" aria-hidden="true">
          Good
          <br />
          Day!
          <span>♡</span>
        </div>
      </section>

      <div className="planner-section-heading">
        <h2>Today&apos;s plan</h2>
        <span>{planner.activities.length} activities</span>
      </div>

      <section className="timeline" aria-label="Activities">
        {planner.activities.map((activity, index) => {
          const Icon = activityIcons[activity.type] ?? PlayIcon;

          return (
            <TimelineItem
              key={activity.id}
              activity={activity}
              icon={<Icon />}
              last={index === planner.activities.length - 1}
              onOpen={() =>
                navigate(
                  ROUTES.plannerActivityDetails.replace(
                    ":activityId",
                    String(activity.id)
                  )
                )
              }
              onToggle={() => actions.togglePlannerActivity(activity.id)}
            />
          );
        })}
      </section>

      <button
        className="planner-add-button"
        type="button"
        onClick={() => setAddingActivity(true)}
      >
        <Plus size={21} />
        <span>Add activity</span>
      </button>

      {addingActivity && (
        <AddPlannerActivitySheet
          petName={pet.name}
          selectedDate={selectedDate}
          onClose={() => setAddingActivity(false)}
          onSave={(activity) => actions.addPlannerActivity(activity)}
        />
      )}
    </main>
  );
}

function Day({ day, date, active = false, onSelect }) {
  return (
    <button
      className={`calendar-day ${active ? "active" : ""}`}
      type="button"
      onClick={onSelect}
      aria-pressed={active}
    >
      <span>{day}</span>
      <strong>{date}</strong>
    </button>
  );
}

function TimelineItem({
  activity,
  icon,
  last = false,
  onOpen,
  onToggle,
}) {
  return (
    <article className="timeline-row">
      <div className="timeline-time">
        <strong>{activity.time}</strong>
        <span>{activity.period}</span>
      </div>

      <div className={`timeline-marker ${last ? "last" : ""}`}>
        <span className={activity.completed ? "marker-done" : ""} />
      </div>

      <div className="timeline-card timeline-card-with-details">
        <button
          className="timeline-open"
          type="button"
          onClick={onOpen}
          aria-label={`View details for ${activity.title}`}
        >
          <div className="timeline-icon">{icon}</div>

          <div className="timeline-copy">
            <strong>{activity.title}</strong>
            <span>{activity.detail}</span>
          </div>

          <ChevronRight
            className="timeline-detail-chevron"
            size={18}
            aria-hidden="true"
          />
        </button>

        <button
          className={`care-check ${activity.completed ? "done" : ""}`}
          type="button"
          onClick={onToggle}
          aria-pressed={activity.completed}
          aria-label={`Mark ${activity.title} ${
            activity.completed ? "not complete" : "complete"
          }`}
        >
          {activity.completed ? <CompleteIcon /> : <IncompleteIcon />}
        </button>
      </div>
    </article>
  );
}
