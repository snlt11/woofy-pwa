function NavSvg({ title, className, children }) {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      role="img"
      aria-label={title}
    >
      {children}
    </svg>
  );
}

export function HomeNavIcon({ className = "", title = "Home" }) {
  return (
    <NavSvg className={className} title={title}>
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth="2.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5.8 14.6 16 5.8l10.2 8.8v10.1a2.2 2.2 0 0 1-2.2 2.2H8a2.2 2.2 0 0 1-2.2-2.2V14.6Z" />
        <path d="M12.2 26.9v-8.4h7.6v8.4" />
      </g>
    </NavSvg>
  );
}

export function PlannerNavIcon({ className = "", title = "Planner" }) {
  return (
    <NavSvg className={className} title={title}>
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth="2.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="5.8" y="7.8" width="20.4" height="19" rx="3.7" />
        <path d="M5.8 13.2h20.4M11 5.2v5.1M21 5.2v5.1" />
      </g>
      <g fill="currentColor">
        <circle cx="11" cy="17.2" r="1.25" />
        <circle cx="16" cy="17.2" r="1.25" />
        <circle cx="21" cy="17.2" r="1.25" />
        <circle cx="11" cy="22.1" r="1.25" />
        <circle cx="16" cy="22.1" r="1.25" />
        <circle cx="21" cy="22.1" r="1.25" />
      </g>
    </NavSvg>
  );
}

export function HealthNavIcon({ className = "", title = "Health" }) {
  return (
    <NavSvg className={className} title={title}>
      <path
        d="M16 27S5.9 21 5.9 13.8A5.9 5.9 0 0 1 16 9.5a5.9 5.9 0 0 1 10.1 4.3C26.1 21 16 27 16 27Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <g fill="currentColor">
        <ellipse cx="12.7" cy="15.5" rx="1.3" ry="1.7" />
        <ellipse cx="16" cy="14.4" rx="1.35" ry="1.8" />
        <ellipse cx="19.3" cy="15.5" rx="1.3" ry="1.7" />
        <path d="M12.4 20c0-2.2 1.6-3.8 3.6-3.8s3.6 1.6 3.6 3.8c0 1.7-1.2 2.7-3.6 2.7s-3.6-1-3.6-2.7Z" />
      </g>
    </NavSvg>
  );
}

export function ProfileNavIcon({ className = "", title = "Profile" }) {
  return (
    <NavSvg className={className} title={title}>
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth="2.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="16" cy="10.1" r="4.7" />
        <path d="M8.1 26.6c.8-5.3 3.7-8 7.9-8s7.1 2.7 7.9 8" />
      </g>
    </NavSvg>
  );
}
