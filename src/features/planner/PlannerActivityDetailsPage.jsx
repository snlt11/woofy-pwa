import {
  ArrowLeft,
  CalendarDays,
  Check,
  Clock3,
  Info,
  RotateCcw,
  UserRound,
} from "lucide-react";
import { Navigate, useNavigate, useParams } from "react-router-dom";

import {
  MealIcon,
  MedicineIcon,
  PlayIcon,
  WalkIcon,
} from "../../components/icons/WoofyIcons";
import { ROUTES } from "../../config/routes";
import { formatPlannerDate, fromISODate } from "../../lib/date";
import { useWoofy } from "../../state/useWoofy";
import "../../styles/woofy-icons.css";
import "../../styles/planner-activity-details.css";

const activityIcons = {
  meal: MealIcon,
  walk: WalkIcon,
  medicine: MedicineIcon,
  play: PlayIcon,
};

const activityCopy = {
  meal: {
    description: "A scheduled meal in the daily routine.",
    note: "Keep the portion and timing consistent with the usual feeding plan.",
  },
  walk: {
    description: "A planned walk for movement, sniffing, and enrichment.",
    note: "Keep the pace comfortable and adjust the duration when needed.",
  },
  medicine: {
    description: "A scheduled medication or supplement reminder.",
    note: "Follow the saved care instructions and keep the timing consistent.",
  },
  play: {
    description: "Dedicated play time for movement and mental enrichment.",
    note: "Use familiar toys and keep the session comfortable and fun.",
  },
};

export default function PlannerActivityDetailsPage() {
  const navigate = useNavigate();
  const { activityId } = useParams();

  const {
    state: { pet, planner },
    actions,
  } = useWoofy();

  const activity = planner.activities.find(
    (item) => String(item.id) === String(activityId)
  );

  if (!activity) {
    return <Navigate to={ROUTES.planner} replace />;
  }

  const ActivityIcon = activityIcons[activity.type] ?? PlayIcon;
  const copy = activityCopy[activity.type] ?? activityCopy.play;
  const selectedDate = fromISODate(planner.selectedDate);

  return (
    <main className="app-page planner-activity-details-page">
      <header className="planner-activity-details-header">
        <button
          className="planner-activity-details-back"
          type="button"
          aria-label="Back to Planner"
          onClick={() => navigate(ROUTES.planner)}
        >
          <ArrowLeft size={21} />
        </button>

        <div>
          <span>Planner activity</span>
          <h1>{activity.title}</h1>
          <p>
            {activity.time} {activity.period}
          </p>
        </div>
      </header>

      <section className="planner-activity-details-hero">
        <div className="planner-activity-details-icon">
          <ActivityIcon />
        </div>

        <div className="planner-activity-details-hero-copy">
          <span className={activity.completed ? "is-complete" : ""}>
            {activity.completed ? "Completed" : "Planned"}
          </span>
          <h2>{activity.detail}</h2>
          <p>{copy.description}</p>
        </div>
      </section>

      <section className="planner-activity-details-section">
        <h2>Details</h2>

        <div className="planner-activity-details-list">
          <DetailRow
            icon={<CalendarDays size={18} />}
            label="Date"
            value={formatPlannerDate(selectedDate)}
          />

          <DetailRow
            icon={<Clock3 size={18} />}
            label="Time"
            value={`${activity.time} ${activity.period}`}
          />

          <DetailRow
            icon={<Info size={18} />}
            label="Plan"
            value={activity.detail}
          />

          <DetailRow
            icon={<UserRound size={18} />}
            label="For"
            value={pet.name}
          />
        </div>
      </section>

      <section className="planner-activity-details-note">
        <span>Routine note</span>
        <p>{copy.note}</p>
      </section>

      <button
        className={`planner-activity-details-primary ${
          activity.completed ? "is-complete" : ""
        }`}
        type="button"
        onClick={() => actions.togglePlannerActivity(activity.id)}
      >
        {activity.completed ? <RotateCcw size={18} /> : <Check size={19} />}
        {activity.completed ? "Mark as not done" : "Mark as complete"}
      </button>
    </main>
  );
}

function DetailRow({ icon, label, value }) {
  return (
    <article className="planner-activity-details-row">
      <div className="planner-activity-details-row-icon">{icon}</div>

      <div>
        <span>{label}</span>
        <strong>{value}</strong>
      </div>
    </article>
  );
}
