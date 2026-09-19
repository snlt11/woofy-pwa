import { NavLink } from "react-router-dom";
import { CalendarDays, Heart, House, UserRound } from "lucide-react";

import { ROUTES } from "../config/routes";

const tabs = [
  { to: ROUTES.home, label: "Home", icon: House },
  { to: ROUTES.planner, label: "Planner", icon: CalendarDays },
  { to: ROUTES.health, label: "Health", icon: Heart },
  { to: ROUTES.profile, label: "Profile", icon: UserRound },
];

export default function BottomNav() {
  return (
    <nav className="woofy-tabbar" aria-label="Primary navigation">
      {tabs.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `woofy-tab ${isActive ? "is-active" : ""}`
          }
        >
          <span className="woofy-tab-icon">
            <Icon size={24} strokeWidth={2} />
          </span>
          <span className="woofy-tab-label">{label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
