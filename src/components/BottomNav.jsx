import { NavLink } from "react-router-dom";
import { Home, CalendarDays, Heart, User } from "lucide-react";

const items = [
  { to: "/home", label: "Home", icon: Home },
  { to: "/planner", label: "Planner", icon: CalendarDays },
  { to: "/health", label: "Health", icon: Heart },
  { to: "/profile", label: "Profile", icon: User },
];

export default function BottomNav() {
  return (
    <nav className="bottom-nav">
      {items.map((item) => {
        const Icon = item.icon;

        return (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
          >
            <span className="nav-icon">
              <Icon size={23} />
            </span>

            <span>{item.label}</span>
          </NavLink>
        );
      })}
    </nav>
  );
}
