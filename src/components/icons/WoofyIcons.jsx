export function MealIcon({ className = "", title = "Meal" }) {
  return (
    <svg
      className={`woofy-icon ${className}`}
      viewBox="0 0 64 64"
      role="img"
      aria-label={title}
    >
      <rect x="2" y="2" width="60" height="60" rx="16" fill="#EEF7FD" />
      <g
        fill="none"
        stroke="#2E8FE5"
        strokeWidth="3.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M18 34h28l-2.8 12.2a4 4 0 0 1-3.9 3.1H24.7a4 4 0 0 1-3.9-3.1L18 34Z" />
        <path d="M21 34c2.5-4.4 6.2-6.4 11-6.4s8.5 2 11 6.4" />
        <path d="M25 19l-2.2-3.1" />
        <path d="M32 17v-4" />
        <path d="M39 19l2.2-3.1" />
      </g>
      <g fill="#2E8FE5">
        <circle cx="28.2" cy="41.3" r="1.7" />
        <circle cx="32" cy="39.8" r="1.7" />
        <circle cx="35.8" cy="41.3" r="1.7" />
        <path d="M27.7 45.1c0-2.1 1.9-3.9 4.3-3.9s4.3 1.8 4.3 3.9c0 1.7-1.4 2.8-4.3 2.8s-4.3-1.1-4.3-2.8Z" />
      </g>
    </svg>
  );
}

export function WalkIcon({ className = "", title = "Walk" }) {
  return (
    <svg
      className={`woofy-icon ${className}`}
      viewBox="0 0 64 64"
      role="img"
      aria-label={title}
    >
      <rect x="2" y="2" width="60" height="60" rx="16" fill="#EEF7FD" />
      <g
        fill="none"
        stroke="#2E8FE5"
        strokeWidth="3.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M25.5 14.5c-6 0-10.5 4.8-10.5 10.9 0 6.2 4.2 10.4 9.9 10.4 5.8 0 10.1-4.4 10.1-10.4 0-6.2-3.8-10.9-9.5-10.9Z" />
        <path d="M27.5 35.2v5.3" />
        <circle cx="27.5" cy="44.2" r="3.5" />
        <path d="M34 28.3 45.8 45c2.2 3.2 6.9 1.6 6.9-2.3 0-.8-.2-1.6-.7-2.3L39.5 20.8" />
        <path d="M45.8 15.5l1.8-3.5" />
        <path d="M50 19.3l3.4-1.6" />
      </g>
    </svg>
  );
}

export function WeightIcon({ className = "", title = "Weight" }) {
  return (
    <svg
      className={`woofy-icon ${className}`}
      viewBox="0 0 64 64"
      role="img"
      aria-label={title}
    >
      <rect x="2" y="2" width="60" height="60" rx="16" fill="#EEF7FD" />
      <g
        fill="none"
        stroke="#2E8FE5"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="14.5" y="18" width="35" height="30" rx="7.5" />
        <circle cx="32" cy="27.5" r="6.1" />
        <path d="M32 27.5v-4.1" />
      </g>
    </svg>
  );
}

export function VetCalendarIcon({ className = "", title = "Vet visit" }) {
  return (
    <svg
      className={`woofy-icon ${className}`}
      viewBox="0 0 64 64"
      role="img"
      aria-label={title}
    >
      <rect x="2" y="2" width="60" height="60" rx="16" fill="#EEF7FD" />
      <g
        fill="none"
        stroke="#2E8FE5"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="13.5" y="16.5" width="37" height="33" rx="6.5" />
        <path d="M13.5 25h37" />
        <path d="M22 13.5v6" />
        <path d="M42 13.5v6" />
      </g>
      <g fill="#2E8FE5">
        <circle cx="28.5" cy="35.2" r="1.7" />
        <circle cx="32" cy="33.8" r="1.7" />
        <circle cx="35.5" cy="35.2" r="1.7" />
        <path d="M27.8 39.3c0-2 1.8-3.7 4.2-3.7s4.2 1.7 4.2 3.7c0 1.7-1.4 2.8-4.2 2.8s-4.2-1.1-4.2-2.8Z" />
      </g>
    </svg>
  );
}

export function AddIcon({ className = "", title = "Add" }) {
  return (
    <svg
      className={`woofy-state-icon ${className}`}
      viewBox="0 0 64 64"
      role="img"
      aria-label={title}
    >
      <rect x="4" y="4" width="56" height="56" rx="16" fill="#4AA3EA" />
      <path
        d="M32 19v26M19 32h26"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function CompleteIcon({ className = "", title = "Completed" }) {
  return (
    <svg
      className={`woofy-state-icon ${className}`}
      viewBox="0 0 64 64"
      role="img"
      aria-label={title}
    >
      <circle cx="32" cy="32" r="28" fill="#4AA3EA" />
      <path
        d="m20.5 32.5 7 7L43.8 23"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IncompleteIcon({ className = "", title = "Not completed" }) {
  return (
    <svg
      className={`woofy-state-icon ${className}`}
      viewBox="0 0 64 64"
      role="img"
      aria-label={title}
    >
      <circle cx="32" cy="32" r="28" fill="#F4F5F8" />
      <circle
        cx="32"
        cy="32"
        r="16"
        fill="none"
        stroke="#A9ABB5"
        strokeWidth="3.5"
      />
    </svg>
  );
}

export function PawAccentIcon({ className = "", title = "Paw" }) {
  return (
    <svg
      className={`woofy-paw-icon ${className}`}
      viewBox="0 0 64 64"
      role="img"
      aria-label={title}
    >
      <g fill="#9CA0AD">
        <ellipse cx="20" cy="23" rx="5.2" ry="7.2" transform="rotate(-18 20 23)" />
        <ellipse cx="31" cy="18" rx="5.4" ry="7.7" />
        <ellipse cx="43" cy="22.5" rx="5.2" ry="7.2" transform="rotate(18 43 22.5)" />
        <ellipse cx="14.5" cy="35" rx="4.8" ry="6.5" transform="rotate(-28 14.5 35)" />
        <ellipse cx="49" cy="35" rx="4.8" ry="6.5" transform="rotate(28 49 35)" />
        <path d="M22 44c0-7 4.4-12 10-12s10 5 10 12c0 5.4-3.8 8-10 8s-10-2.6-10-8Z" />
      </g>
    </svg>
  );
}


export function MedicineIcon({ className = "", title = "Medicine" }) {
  return (
    <svg
      className={`woofy-icon ${className}`}
      viewBox="0 0 64 64"
      role="img"
      aria-label={title}
    >
      <defs>
        <linearGradient id="woofyMedicationTile" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F5FBFF" />
          <stop offset="100%" stopColor="#EAF6FF" />
        </linearGradient>
      </defs>

      <rect
        x="2"
        y="2"
        width="60"
        height="60"
        rx="16"
        fill="url(#woofyMedicationTile)"
      />

      <g
        fill="none"
        stroke="#278BEA"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M14.5 38.5 35.8 17.2a10 10 0 0 1 14.1 14.1L28.6 52.6a10 10 0 0 1-14.1-14.1Z" />
        <path d="m25.2 27.8 11 11" />
      </g>

      <g fill="#278BEA">
        <ellipse cx="39.5" cy="44.1" rx="2.55" ry="3.45" transform="rotate(-17 39.5 44.1)" />
        <ellipse cx="45.2" cy="41.7" rx="2.65" ry="3.6" />
        <ellipse cx="50.6" cy="44.5" rx="2.55" ry="3.45" transform="rotate(17 50.6 44.5)" />
        <path d="M38.4 51c0-3.5 2.9-6.2 6.8-6.2S52 47.5 52 51c0 2.8-2.2 4.5-6.8 4.5S38.4 53.8 38.4 51Z" />
      </g>
    </svg>
  );
}

export function PlayIcon({ className = "", title = "Play time" }) {
  return (
    <svg
      className={`woofy-icon ${className}`}
      viewBox="0 0 64 64"
      role="img"
      aria-label={title}
    >
      <rect x="2" y="2" width="60" height="60" rx="16" fill="#EEF7FD" />
      <g
        fill="none"
        stroke="#2E8FE5"
        strokeWidth="3.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="32" cy="32" r="15.5" />
        <path d="M20 22.5c6.4 2 10.2 6.6 11.6 13.7" />
        <path d="M43.6 21.8c-5.7 4.3-8.5 9.2-8.4 14.8" />
        <path d="M20.5 43c5.9-3 12.2-3.6 19-1.8" />
      </g>
    </svg>
  );
}

export function PlannerCalendarIcon({ className = "", title = "Calendar" }) {
  return (
    <svg
      className={`woofy-control-icon ${className}`}
      viewBox="0 0 32 32"
      role="img"
      aria-label={title}
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="6" y="8" width="20" height="18" rx="3.5" />
        <path d="M6 13h20M11 5.5v5M21 5.5v5" />
        <path d="M11 17h2M16 17h2M21 17h2M11 21h2M16 21h2M21 21h2" />
      </g>
    </svg>
  );
}

export function PreviousIcon({ className = "", title = "Previous" }) {
  return (
    <svg
      className={`woofy-control-icon ${className}`}
      viewBox="0 0 32 32"
      role="img"
      aria-label={title}
    >
      <path
        d="m19 9-7 7 7 7"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function NextIcon({ className = "", title = "Next" }) {
  return (
    <svg
      className={`woofy-control-icon ${className}`}
      viewBox="0 0 32 32"
      role="img"
      aria-label={title}
    >
      <path
        d="m13 9 7 7-7 7"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}


export function SleepIcon({ className = "", title = "Sleep" }) {
  return (
    <svg
      className={`woofy-icon ${className}`}
      viewBox="0 0 64 64"
      role="img"
      aria-label={title}
    >
      <rect x="2" y="2" width="60" height="60" rx="16" fill="#EEF7FD" />
      <path
        d="M39.5 18.5c-8.4 1.2-14.8 8.4-14.8 17.1 0 6.2 3.3 11.7 8.3 14.7-9.1-.8-16.3-8.4-16.3-17.7 0-9.8 8-17.8 17.8-17.8 1.8 0 3.5.3 5 .7Z"
        fill="none"
        stroke="#2E8FE5"
        strokeWidth="3.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SyringeIcon({ className = "", title = "Vaccination" }) {
  return (
    <svg
      className={`woofy-icon ${className}`}
      viewBox="0 0 64 64"
      role="img"
      aria-label={title}
    >
      <defs>
        <linearGradient id="woofyVaccineTile" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F5FBFF" />
          <stop offset="100%" stopColor="#EAF6FF" />
        </linearGradient>
      </defs>

      <rect
        x="2"
        y="2"
        width="60"
        height="60"
        rx="16"
        fill="url(#woofyVaccineTile)"
      />

      <g transform="rotate(-45 32 32)">
        <g
          fill="none"
          stroke="#278BEA"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M22.5 22.5h19v26a7.8 7.8 0 0 1-7.8 7.8h-3.4a7.8 7.8 0 0 1-7.8-7.8v-26Z" />
          <path d="M18.5 20h27" />
          <path d="M27.5 13.5h9V20h-9Z" />
          <path d="M32 56.3V62" />
          <path d="M22.5 33h5M22.5 40h5M22.5 47h5" />
        </g>

        <g fill="#278BEA">
          <ellipse cx="29" cy="37.3" rx="2.15" ry="2.8" transform="rotate(-15 29 37.3)" />
          <ellipse cx="32.4" cy="35.8" rx="2.2" ry="3" />
          <ellipse cx="36" cy="37.4" rx="2.15" ry="2.8" transform="rotate(15 36 37.4)" />
          <path d="M28.6 42c0-2.5 1.7-4.3 4.1-4.3s4.1 1.8 4.1 4.3c0 2-1.4 3.2-4.1 3.2s-4.1-1.2-4.1-3.2Z" />
        </g>
      </g>

      <g
        fill="none"
        stroke="#278BEA"
        strokeWidth="4.6"
        strokeLinecap="round"
      >
        <path d="M47 43.8 53 46" />
        <path d="M43.1 48.4 47.2 53.6" />
      </g>
    </svg>
  );
}

export function ActivityHeartIcon({ className = "", title = "Daily activity" }) {
  return (
    <svg
      className={`woofy-icon ${className}`}
      viewBox="0 0 64 64"
      role="img"
      aria-label={title}
    >
      <rect x="2" y="2" width="60" height="60" rx="16" fill="#EEF7FD" />
      <g
        fill="none"
        stroke="#2E8FE5"
        strokeWidth="3.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M32 49S14.5 39 14.5 26.5A9.5 9.5 0 0 1 32 21a9.5 9.5 0 0 1 17.5 5.5C49.5 39 32 49 32 49Z" />
        <path d="M21 32h6l3-6 4 12 3-6h6" />
      </g>
    </svg>
  );
}


export function BirthdayIcon({ className = "", title = "Birthday" }) {
  return (
    <svg className={`woofy-icon ${className}`} viewBox="0 0 64 64" role="img" aria-label={title}>
      <rect x="2" y="2" width="60" height="60" rx="16" fill="#EEF7FD" />
      <g fill="none" stroke="#2E8FE5" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 34h28v14H18z" />
        <path d="M18 34c2.5-4 5.8-5.8 10-5.2 2.2.3 3.5 1.5 4 3 1-1.7 2.4-2.7 4.6-2.8 3.9-.2 7.3 1.5 9.4 5" />
        <path d="M23 34v14M41 34v14" />
        <path d="M24 23v6M32 20v9M40 23v6" />
      </g>
      <g fill="#2E8FE5">
        <path d="M22.6 20.5c0-1.8 1.4-3.3 2.9-4.8 1.5 1.5 2.9 3 2.9 4.8a2.9 2.9 0 1 1-5.8 0Z" />
        <path d="M29.1 17.7c0-1.8 1.4-3.3 2.9-4.8 1.5 1.5 2.9 3 2.9 4.8a2.9 2.9 0 1 1-5.8 0Z" />
        <path d="M35.6 20.5c0-1.8 1.4-3.3 2.9-4.8 1.5 1.5 2.9 3 2.9 4.8a2.9 2.9 0 1 1-5.8 0Z" />
      </g>
    </svg>
  );
}

export function GenderIcon({ className = "", title = "Gender" }) {
  return (
    <svg className={`woofy-icon ${className}`} viewBox="0 0 64 64" role="img" aria-label={title}>
      <rect x="2" y="2" width="60" height="60" rx="16" fill="#EEF7FD" />
      <g fill="none" stroke="#2E8FE5" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="25" cy="31" r="9" />
        <path d="M19 38 14 43M14 38v5h5" />
        <circle cx="39" cy="27" r="9" />
        <path d="m45 21 7-7M47 14h5v5" />
      </g>
    </svg>
  );
}

export function ActivityLevelIcon({ className = "", title = "Activity level" }) {
  return (
    <svg className={`woofy-icon ${className}`} viewBox="0 0 64 64" role="img" aria-label={title}>
      <rect x="2" y="2" width="60" height="60" rx="16" fill="#EEF7FD" />
      <g fill="none" stroke="#2E8FE5" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M32 49S14.5 39 14.5 26.5A9.5 9.5 0 0 1 32 21a9.5 9.5 0 0 1 17.5 5.5C49.5 39 32 49 32 49Z" />
        <path d="M21 32h6l3-6 4 12 3-6h6" />
      </g>
    </svg>
  );
}

export function MicrochipIcon({ className = "", title = "Microchip" }) {
  return (
    <svg className={`woofy-icon ${className}`} viewBox="0 0 64 64" role="img" aria-label={title}>
      <rect x="2" y="2" width="60" height="60" rx="16" fill="#EEF7FD" />
      <g fill="none" stroke="#2E8FE5" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="20" y="20" width="24" height="24" rx="5" />
        <path d="M26 15v5M32 15v5M38 15v5M26 44v5M32 44v5M38 44v5M15 26h5M15 32h5M15 38h5M44 26h5M44 32h5M44 38h5" />
      </g>
      <g fill="#2E8FE5">
        <circle cx="28" cy="31" r="1.6" />
        <circle cx="32" cy="29.6" r="1.6" />
        <circle cx="36" cy="31" r="1.6" />
        <path d="M27.8 35.2c0-2 1.8-3.6 4.2-3.6s4.2 1.6 4.2 3.6c0 1.6-1.4 2.7-4.2 2.7s-4.2-1.1-4.2-2.7Z" />
      </g>
    </svg>
  );
}

export function VetIcon({ className = "", title = "Primary vet" }) {
  return (
    <svg className={`woofy-icon ${className}`} viewBox="0 0 64 64" role="img" aria-label={title}>
      <rect x="2" y="2" width="60" height="60" rx="16" fill="#EEF7FD" />
      <g fill="none" stroke="#2E8FE5" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16v13a10 10 0 0 0 20 0V16" />
        <path d="M18 16h8M38 16h8" />
        <path d="M32 39v5a7 7 0 0 0 14 0v-3" />
        <circle cx="46" cy="38" r="3" />
        <path d="M47 18h8M51 14v8" />
      </g>
    </svg>
  );
}

export function DietIcon({ className = "", title = "Diet" }) {
  return (
    <svg className={`woofy-icon ${className}`} viewBox="0 0 64 64" role="img" aria-label={title}>
      <rect x="2" y="2" width="60" height="60" rx="16" fill="#EEF7FD" />
      <g fill="none" stroke="#2E8FE5" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 36h28l-2.5 11H20.5L18 36Z" />
        <path d="M27 30c0-4 3-7 7-7 2.4 0 4.4 1 5.8 2.8" />
        <path d="M33 24c1-4 4.1-6.5 8.2-6.5-.2 4.2-2.9 7.2-7 7.6" />
      </g>
      <g fill="#2E8FE5">
        <circle cx="28" cy="41" r="1.5" />
        <circle cx="32" cy="39.8" r="1.5" />
        <circle cx="36" cy="41" r="1.5" />
        <path d="M28 44.4c0-1.8 1.8-3.3 4-3.3s4 1.5 4 3.3c0 1.5-1.3 2.5-4 2.5s-4-1-4-2.5Z" />
      </g>
    </svg>
  );
}

export function InsuranceIcon({ className = "", title = "Insurance" }) {
  return (
    <svg className={`woofy-icon ${className}`} viewBox="0 0 64 64" role="img" aria-label={title}>
      <rect x="2" y="2" width="60" height="60" rx="16" fill="#EEF7FD" />
      <path
        d="M32 14 47 20v11c0 10-6.2 16.5-15 20-8.8-3.5-15-10-15-20V20l15-6Z"
        fill="none"
        stroke="#2E8FE5"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <g fill="#2E8FE5">
        <circle cx="28.2" cy="30.8" r="1.7" />
        <circle cx="32" cy="29.4" r="1.7" />
        <circle cx="35.8" cy="30.8" r="1.7" />
        <path d="M27.8 34.7c0-2 1.8-3.6 4.2-3.6s4.2 1.6 4.2 3.6c0 1.7-1.4 2.7-4.2 2.7s-4.2-1-4.2-2.7Z" />
      </g>
    </svg>
  );
}

export function EditControlIcon({ className = "", title = "Edit profile" }) {
  return (
    <svg className={`woofy-control-icon ${className}`} viewBox="0 0 32 32" role="img" aria-label={title}>
      <g fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="m9 23 1.5-5.5L21 7a3 3 0 0 1 4 4L14.5 21.5 9 23Z" />
        <path d="m18.5 9.5 4 4" />
      </g>
    </svg>
  );
}
