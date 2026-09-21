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
