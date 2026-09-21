import { useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { Clock3, X } from "lucide-react";

function formatTime(value) {
  if (!value) return "";

  const [hourPart, minutePart] = value.split(":");
  const hour = Number(hourPart);
  const minute = Number(minutePart);

  if (!Number.isFinite(hour) || !Number.isFinite(minute)) return value;

  const period = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 || 12;

  return `${displayHour}:${String(minute).padStart(2, "0")} ${period}`;
}

export default function AddCareTaskSheet({ petName, onClose, onSave }) {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("meal");
  const [time, setTime] = useState("09:00");
  const [plan, setPlan] = useState("");
  const [note, setNote] = useState("");
  const [error, setError] = useState("");

  const defaultPlan = useMemo(
    () => (type === "walk" ? "20 min walk" : "Meal"),
    [type]
  );

  function submit(event) {
    event.preventDefault();

    if (!title.trim()) {
      setError("Add a care task name.");
      return;
    }

    onSave({
      title: title.trim(),
      type,
      time: formatTime(time),
      detail: plan.trim() || defaultPlan,
      description:
        type === "walk"
          ? `A care walk planned for ${petName}.`
          : `A meal planned for ${petName}.`,
      note:
        note.trim() ||
        `Keep this task aligned with ${petName}'s usual care routine.`,
    });

    onClose();
  }

  return createPortal(
    <div className="add-care-overlay" role="presentation">
      <section
        className="add-care-sheet"
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-care-title"
      >
        <header className="add-care-header">
          <div>
            <span>Today&apos;s care</span>
            <h2 id="add-care-title">Add care task</h2>
            <p>Add something to {petName}&apos;s routine for today.</p>
          </div>

          <button
            className="add-care-close"
            type="button"
            aria-label="Close"
            onClick={onClose}
          >
            <X size={20} />
          </button>
        </header>

        <form className="add-care-form" onSubmit={submit}>
          <label className="add-care-field">
            <span>Task name</span>
            <input
              value={title}
              onChange={(event) => {
                setTitle(event.target.value);
                if (error) setError("");
              }}
              placeholder="Evening walk"
              autoFocus
            />
          </label>

          <div className="add-care-grid">
            <label className="add-care-field">
              <span>Type</span>
              <select
                value={type}
                onChange={(event) => setType(event.target.value)}
              >
                <option value="meal">Meal</option>
                <option value="walk">Walk</option>
              </select>
            </label>

            <label className="add-care-field">
              <span>Time</span>
              <div className="add-care-time">
                <Clock3 size={17} aria-hidden="true" />
                <input
                  type="time"
                  value={time}
                  onChange={(event) => setTime(event.target.value)}
                />
              </div>
            </label>
          </div>

          <label className="add-care-field">
            <span>Plan</span>
            <input
              value={plan}
              onChange={(event) => setPlan(event.target.value)}
              placeholder={defaultPlan}
            />
          </label>

          <label className="add-care-field">
            <span>Care note</span>
            <textarea
              value={note}
              onChange={(event) => setNote(event.target.value)}
              placeholder="Optional note"
              rows={3}
            />
          </label>

          {error && (
            <p className="add-care-error" role="alert">
              {error}
            </p>
          )}

          <div className="add-care-actions">
            <button className="add-care-secondary" type="button" onClick={onClose}>
              Cancel
            </button>

            <button className="add-care-primary" type="submit">
              Add to today
            </button>
          </div>
        </form>
      </section>
    </div>,
    document.body
  );
}
