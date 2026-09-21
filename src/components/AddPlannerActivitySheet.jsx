import { useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronDown, Clock3, X } from "lucide-react";

import { formatPlannerDate } from "../lib/date";

const HOURS = Array.from({ length: 12 }, (_, index) => String(index + 1));
const MINUTES = Array.from(
  { length: 12 },
  (_, index) => String(index * 5).padStart(2, "0")
);

const TYPE_OPTIONS = [
  { value: "meal", label: "Meal" },
  { value: "walk", label: "Walk" },
  { value: "medicine", label: "Medicine" },
  { value: "play", label: "Play time" },
];

const DEFAULT_PLANS = {
  meal: "Meal",
  walk: "30 min walk",
  medicine: "Medication reminder",
  play: "Ball & toys • 20 min",
};

const DEFAULT_TITLES = {
  meal: "Meal",
  walk: "Walk",
  medicine: "Medicine",
  play: "Play time",
};

export default function AddPlannerActivitySheet({
  petName,
  selectedDate,
  onClose,
  onSave,
}) {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("walk");
  const [hour, setHour] = useState("10");
  const [minute, setMinute] = useState("00");
  const [period, setPeriod] = useState("AM");
  const [timePickerOpen, setTimePickerOpen] = useState(false);
  const [plan, setPlan] = useState("");
  const [note, setNote] = useState("");
  const [error, setError] = useState("");

  const defaultPlan = useMemo(() => DEFAULT_PLANS[type], [type]);
  const displayTime = `${hour}:${minute}`;
  const sortMinutes = useMemo(() => {
    const normalizedHour = Number(hour) % 12 + (period === "PM" ? 12 : 0);
    return normalizedHour * 60 + Number(minute);
  }, [hour, minute, period]);

  function submit(event) {
    event.preventDefault();

    const nextTitle = title.trim() || DEFAULT_TITLES[type];

    if (!nextTitle) {
      setError("Add an activity name.");
      return;
    }

    onSave({
      title: nextTitle,
      type,
      time: displayTime,
      period,
      sortMinutes,
      detail: plan.trim() || defaultPlan,
      description: `A planned ${TYPE_OPTIONS.find((item) => item.value === type)?.label.toLowerCase()} activity for ${petName}.`,
      note:
        note.trim() ||
        `Keep this activity aligned with ${petName}'s usual daily routine.`,
    });

    onClose();
  }

  return createPortal(
    <>
      <div className="add-planner-overlay" role="presentation">
        <section
          className="add-planner-sheet"
          role="dialog"
          aria-modal="true"
          aria-labelledby="add-planner-title"
        >
          <header className="add-planner-header">
            <div>
              <span>Planner</span>
              <h2 id="add-planner-title">Add activity</h2>
              <p>{formatPlannerDate(selectedDate)} • {petName}</p>
            </div>

            <button
              className="add-planner-close"
              type="button"
              aria-label="Close"
              onClick={onClose}
            >
              <X size={20} />
            </button>
          </header>

          <form className="add-planner-form" onSubmit={submit}>
            <label className="add-planner-field">
              <span>Activity name</span>
              <input
                value={title}
                onChange={(event) => {
                  setTitle(event.target.value);
                  if (error) setError("");
                }}
                placeholder={DEFAULT_TITLES[type]}
              />
            </label>

            <div className="add-planner-grid">
              <label className="add-planner-field">
                <span>Type</span>
                <select
                  value={type}
                  onChange={(event) => {
                    setType(event.target.value);
                    setPlan("");
                  }}
                >
                  {TYPE_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>

              <div className="add-planner-field">
                <span>Time</span>

                <button
                  className="add-planner-time-button"
                  type="button"
                  onClick={() => setTimePickerOpen(true)}
                  aria-haspopup="dialog"
                  aria-expanded={timePickerOpen}
                >
                  <Clock3 size={16} aria-hidden="true" />
                  <span>{displayTime} {period}</span>
                  <ChevronDown size={15} aria-hidden="true" />
                </button>
              </div>
            </div>

            <label className="add-planner-field">
              <span>Plan</span>
              <input
                value={plan}
                onChange={(event) => setPlan(event.target.value)}
                placeholder={defaultPlan}
              />
            </label>

            <label className="add-planner-field">
              <span>Routine note</span>
              <textarea
                value={note}
                onChange={(event) => setNote(event.target.value)}
                placeholder="Optional note"
                rows={3}
              />
            </label>

            {error && (
              <p className="add-planner-error" role="alert">
                {error}
              </p>
            )}

            <div className="add-planner-actions">
              <button
                className="add-planner-secondary"
                type="button"
                onClick={onClose}
              >
                Cancel
              </button>

              <button className="add-planner-primary" type="submit">
                Add activity
              </button>
            </div>
          </form>
        </section>
      </div>

      {timePickerOpen && (
        <div className="add-planner-time-overlay" role="presentation">
          <section
            className="add-planner-time-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="planner-time-title"
          >
            <header className="add-planner-time-dialog-header">
              <div>
                <span>Time</span>
                <h3 id="planner-time-title">Choose time</h3>
              </div>

              <button
                type="button"
                aria-label="Close time picker"
                onClick={() => setTimePickerOpen(false)}
              >
                <X size={18} />
              </button>
            </header>

            <div className="add-planner-time-selects">
              <label>
                <span>Hour</span>
                <select value={hour} onChange={(event) => setHour(event.target.value)}>
                  {HOURS.map((item) => (
                    <option key={item} value={item}>{item}</option>
                  ))}
                </select>
              </label>

              <label>
                <span>Minute</span>
                <select value={minute} onChange={(event) => setMinute(event.target.value)}>
                  {MINUTES.map((item) => (
                    <option key={item} value={item}>{item}</option>
                  ))}
                </select>
              </label>

              <label>
                <span>Period</span>
                <select value={period} onChange={(event) => setPeriod(event.target.value)}>
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </select>
              </label>
            </div>

            <button
              className="add-planner-time-confirm"
              type="button"
              onClick={() => setTimePickerOpen(false)}
            >
              Set time
            </button>
          </section>
        </div>
      )}
    </>,
    document.body
  );
}
