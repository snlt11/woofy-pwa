import { NavLink } from "react-router-dom";

import {
  HealthNavIcon,
  HomeNavIcon,
  PlannerNavIcon,
  ProfileNavIcon,
} from "./icons/NavIcons";
import { ROUTES } from "../config/routes";

const tabs = [
  { to: ROUTES.home, label: "Home", icon: HomeNavIcon },
  { to: ROUTES.planner, label: "Planner", icon: PlannerNavIcon },
  { to: ROUTES.health, label: "Health", icon: HealthNavIcon },
  { to: ROUTES.profile, label: "Profile", icon: ProfileNavIcon },
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
            <Icon />
          </span>
          <span className="woofy-tab-label">{label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
