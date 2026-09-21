import { useRef } from "react";
import { CalendarDays } from "lucide-react";

import { formatBirthdayShort } from "../lib/pet-profile";

export default function BirthdayPicker({
  value,
  onChange,
  max,
  id = "pet-birthday",
}) {
  const inputRef = useRef(null);

  function openPicker() {
    const input = inputRef.current;
    if (!input) return;

    try {
      if (typeof input.showPicker === "function") {
        input.showPicker();
        return;
      }
    } catch {
      // Safari can reject showPicker in some contexts; click is the fallback.
    }

    input.click();
  }

  return (
    <div className="pet-date-picker">
      <button
        className="pet-date-button"
        type="button"
        onClick={openPicker}
        aria-label={`Birthday: ${formatBirthdayShort(value)}. Choose date.`}
      >
        <span>{formatBirthdayShort(value)}</span>
        <CalendarDays size={17} aria-hidden="true" />
      </button>

      <input
        ref={inputRef}
        id={id}
        className="pet-date-native"
        type="date"
        value={value}
        max={max}
        onChange={(event) => onChange(event.target.value)}
        tabIndex={-1}
        aria-hidden="true"
      />
    </div>
  );
}
