import { useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronDown, Clock3, X } from "lucide-react";

const HOURS = Array.from({ length: 12 }, (_, index) => String(index + 1));
const MINUTES = Array.from(
  { length: 12 },
  (_, index) => String(index * 5).padStart(2, "0")
);

export default function AddCareTaskSheet({ petName, onClose, onSave }) {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("meal");
  const [hour, setHour] = useState("9");
  const [minute, setMinute] = useState("00");
  const [period, setPeriod] = useState("AM");
  const [timePickerOpen, setTimePickerOpen] = useState(false);
  const [plan, setPlan] = useState("");
  const [note, setNote] = useState("");
  const [error, setError] = useState("");

  const defaultPlan = useMemo(
    () => (type === "walk" ? "20 min walk" : "Meal"),
    [type]
  );

  const displayTime = `${hour}:${minute} ${period}`;

  function submit(event) {
    event.preventDefault();

    if (!title.trim()) {
      setError("Add a care task name.");
      return;
    }

    onSave({
      title: title.trim(),
      type,
      time: displayTime,
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
    <>
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

              <div className="add-care-field">
                <span>Time</span>

                <button
                  className="add-care-time-button"
                  type="button"
                  onClick={() => setTimePickerOpen(true)}
                  aria-haspopup="dialog"
                  aria-expanded={timePickerOpen}
                >
                  <Clock3 size={16} aria-hidden="true" />
                  <span>{displayTime}</span>
                  <ChevronDown size={15} aria-hidden="true" />
                </button>
              </div>
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
      </div>

      {timePickerOpen && (
        <div className="add-care-time-overlay" role="presentation">
          <section
            className="add-care-time-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="care-time-title"
          >
            <header className="add-care-time-dialog-header">
              <div>
                <span>Time</span>
                <h3 id="care-time-title">Choose time</h3>
              </div>

              <button
                type="button"
                aria-label="Close time picker"
                onClick={() => setTimePickerOpen(false)}
              >
                <X size={18} />
              </button>
            </header>

            <div className="add-care-time-selects">
              <label>
                <span>Hour</span>
                <select value={hour} onChange={(event) => setHour(event.target.value)}>
                  {HOURS.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                <span>Minute</span>
                <select
                  value={minute}
                  onChange={(event) => setMinute(event.target.value)}
                >
                  {MINUTES.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                <span>Period</span>
                <select
                  value={period}
                  onChange={(event) => setPeriod(event.target.value)}
                >
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </select>
              </label>
            </div>

            <button
              className="add-care-time-confirm"
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
