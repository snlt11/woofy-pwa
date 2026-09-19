import { NavLink } from "react-router-dom";
import { House, CalendarDays, Heart, UserRound } from "lucide-react";

const tabs = [
  { to: "/home", label: "Home", icon: House },
  { to: "/planner", label: "Planner", icon: CalendarDays },
  { to: "/health", label: "Health", icon: Heart },
  { to: "/profile", label: "Profile", icon: UserRound },
];

export default function BottomNav() {
  return (
    <nav className="woofy-tabbar">
      {tabs.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) => `woofy-tab ${isActive ? "is-active" : ""}`}
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
