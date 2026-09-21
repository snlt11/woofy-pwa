import { useMemo, useState } from "react";
import { CalendarDays, ChevronLeft, ChevronRight, X } from "lucide-react";

import { formatBirthdayShort } from "../lib/pet-profile";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function parseISO(value) {
  if (!value) return null;

  const [year, month, day] = value.split("-").map(Number);

  if (!year || !month || !day) return null;

  return { year, month, day };
}

function toISO(year, month, day) {
  return [
    String(year).padStart(4, "0"),
    String(month).padStart(2, "0"),
    String(day).padStart(2, "0"),
  ].join("-");
}

function daysInMonth(year, month) {
  return new Date(year, month, 0).getDate();
}

export default function BirthdayPicker({
  value,
  onChange,
  max,
  id = "pet-birthday",
}) {
  const maxParts = useMemo(() => {
    const parsed = parseISO(max);
    const today = new Date();

    return (
      parsed || {
        year: today.getFullYear(),
        month: today.getMonth() + 1,
        day: today.getDate(),
      }
    );
  }, [max]);

  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState(() => {
    return parseISO(value) || maxParts;
  });

  const yearOptions = useMemo(() => {
    const years = [];
    const minYear = Math.max(1990, maxParts.year - 40);

    for (let year = maxParts.year; year >= minYear; year -= 1) {
      years.push(year);
    }

    return years;
  }, [maxParts.year]);

  const maxDay = daysInMonth(draft.year, draft.month);

  function openPicker() {
    setDraft(parseISO(value) || maxParts);
    setOpen(true);
  }

  function updateDraft(key, nextValue) {
    setDraft((current) => {
      const next = {
        ...current,
        [key]: Number(nextValue),
      };

      const nextMaxDay = daysInMonth(next.year, next.month);
      next.day = Math.min(next.day, nextMaxDay);

      const candidate = toISO(next.year, next.month, next.day);
      const maxISO = toISO(maxParts.year, maxParts.month, maxParts.day);

      if (candidate > maxISO) {
        return { ...maxParts };
      }

      return next;
    });
  }

  function shiftYear(direction) {
    updateDraft("year", Math.min(maxParts.year, Math.max(yearOptions.at(-1), draft.year + direction)));
  }

  function applyBirthday() {
    onChange(toISO(draft.year, draft.month, draft.day));
    setOpen(false);
  }

  return (
    <>
      <div className="pet-date-picker" id={id}>
        <button
          className="pet-date-button"
          type="button"
          onClick={openPicker}
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-label={`Birthday: ${formatBirthdayShort(value)}. Choose date.`}
        >
          <span>{formatBirthdayShort(value)}</span>
          <CalendarDays size={17} aria-hidden="true" />
        </button>
      </div>

      {open && (
        <div
          className="pet-date-dialog-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setOpen(false);
          }}
        >
          <section
            className="pet-date-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby={`${id}-title`}
          >
            <header className="pet-date-dialog-header">
              <div>
                <span>Birthday</span>
                <h3 id={`${id}-title`}>Choose a date</h3>
              </div>

              <button
                className="pet-date-dialog-close"
                type="button"
                aria-label="Close birthday picker"
                onClick={() => setOpen(false)}
              >
                <X size={18} />
              </button>
            </header>

            <div className="pet-date-dialog-preview">
              <button
                type="button"
                aria-label="Previous year"
                onClick={() => shiftYear(-1)}
              >
                <ChevronLeft size={18} />
              </button>

              <strong>
                {MONTHS[draft.month - 1]} {draft.day}, {draft.year}
              </strong>

              <button
                type="button"
                aria-label="Next year"
                onClick={() => shiftYear(1)}
                disabled={draft.year >= maxParts.year}
              >
                <ChevronRight size={18} />
              </button>
            </div>

            <div className="pet-date-dialog-grid">
              <label className="pet-date-dialog-field pet-date-dialog-month">
                <span>Month</span>
                <select
                  value={draft.month}
                  onChange={(event) => updateDraft("month", event.target.value)}
                >
                  {MONTHS.map((month, index) => (
                    <option key={month} value={index + 1}>
                      {month}
                    </option>
                  ))}
                </select>
              </label>

              <label className="pet-date-dialog-field">
                <span>Day</span>
                <select
                  value={draft.day}
                  onChange={(event) => updateDraft("day", event.target.value)}
                >
                  {Array.from({ length: maxDay }, (_, index) => index + 1).map(
                    (day) => (
                      <option key={day} value={day}>
                        {day}
                      </option>
                    )
                  )}
                </select>
              </label>

              <label className="pet-date-dialog-field">
                <span>Year</span>
                <select
                  value={draft.year}
                  onChange={(event) => updateDraft("year", event.target.value)}
                >
                  {yearOptions.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="pet-date-dialog-actions">
              <button
                className="pet-date-dialog-cancel"
                type="button"
                onClick={() => setOpen(false)}
              >
                Cancel
              </button>

              <button
                className="pet-date-dialog-apply"
                type="button"
                onClick={applyBirthday}
              >
                Set birthday
              </button>
            </div>
          </section>
        </div>
      )}
    </>
  );
}
