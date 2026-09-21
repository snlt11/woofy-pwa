import {
  ArrowLeft,
  Check,
  Clock3,
  Info,
  RotateCcw,
} from "lucide-react";
import { Navigate, useNavigate, useParams } from "react-router-dom";

import {
  MealIcon,
  WalkIcon,
} from "../../components/icons/WoofyIcons";
import { ROUTES } from "../../config/routes";
import { useWoofy } from "../../state/useWoofy";
import "../../styles/woofy-icons.css";
import "../../styles/care-details.css";

export default function CareDetailsPage() {
  const navigate = useNavigate();
  const { taskId } = useParams();

  const {
    state: { pet, home },
    actions,
  } = useWoofy();

  const task = home.careTasks.find((item) => item.id === taskId);

  if (!task) {
    return <Navigate to={ROUTES.home} replace />;
  }

  const TaskIcon = task.type === "walk" ? WalkIcon : MealIcon;

  return (
    <main className="app-page care-details-page">
      <header className="care-details-header">
        <button
          className="care-details-back"
          type="button"
          aria-label="Back to Home"
          onClick={() => navigate(ROUTES.home)}
        >
          <ArrowLeft size={21} />
        </button>

        <div>
          <span>Today&apos;s care</span>
          <h1>{task.title}</h1>
          <p>{task.time}</p>
        </div>
      </header>

      <section className="care-details-hero">
        <div className="care-details-icon">
          <TaskIcon />
        </div>

        <div className="care-details-hero-copy">
          <span className={task.completed ? "is-complete" : ""}>
            {task.completed ? "Completed" : "Up next"}
          </span>
          <h2>{task.detail}</h2>
          <p>{task.description}</p>
        </div>
      </section>

      <section className="care-details-section">
        <h2>Details</h2>

        <div className="care-details-list">
          <DetailRow
            icon={<Clock3 size={19} />}
            label="Time"
            value={task.time}
          />

          <DetailRow
            icon={<Info size={19} />}
            label="Plan"
            value={task.detail}
          />

          <DetailRow
            icon={<TaskIcon />}
            label="For"
            value={pet.name}
            customIcon
          />
        </div>
      </section>

      <section className="care-details-note">
        <span>Care note</span>
        <p>{task.note}</p>
      </section>

      <button
        className={`care-details-primary ${task.completed ? "is-complete" : ""}`}
        type="button"
        onClick={() => actions.toggleCareTask(task.id)}
      >
        {task.completed ? <RotateCcw size={19} /> : <Check size={20} />}
        {task.completed ? "Mark as not done" : "Mark as complete"}
      </button>
    </main>
  );
}

function DetailRow({ icon, label, value, customIcon = false }) {
  return (
    <article className="care-details-row">
      <div className={`care-details-row-icon ${customIcon ? "is-custom" : ""}`}>
        {icon}
      </div>

      <div>
        <span>{label}</span>
        <strong>{value}</strong>
      </div>
    </article>
  );
}
