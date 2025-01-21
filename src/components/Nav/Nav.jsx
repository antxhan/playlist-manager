import { NavLink } from "react-router";

export default function Nav() {
  return (
    <nav>
      <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
        Home
      </NavLink>
      <NavLink
        to="/playlists"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        Playlists
      </NavLink>
      <NavLink
        to="/settings"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        Settings
      </NavLink>
    </nav>
  );
}
