import "./Nav.css";
import SignInOutButton from "../SignInOutButton/SignInOutButton";
import { NavLink } from "react-router";
import HomeIcon from "../../icons/HomeIcon";
// import PlaylistIcon from "../../icons/PlaylistIcon";
import SettingsIcon from "../../icons/SettingsIcon";
import SearchIcon from "../../icons/SearchIcon";
// import DiscoverIcon from "../../icons/DiscoverIcon";

export default function Nav() {
  const routes = [
    { path: "/", label: "Home", icon: <HomeIcon /> },
    // { path: "/playlists", label: "Playlists", icon: <PlaylistIcon /> },
    { path: "/search", label: "Search", icon: <SearchIcon /> },
    // { path: "/discover", label: "Discover", icon: <DiscoverIcon /> },
    { path: "/settings", label: "Settings", icon: <SettingsIcon /> },
  ];
  return (
    <nav className="nav">
      <ul>
        {routes.map((route) => (
          <li key={route.path}>
            <NavLink
              to={route.path}
              className={({ isActive }) => (isActive ? "active" : "")}
              aria-label={route.label}
            >
              {route.icon}
              {route.icon}
            </NavLink>
            <span>{route.label}</span>
          </li>
        ))}
        <li>
          <SignInOutButton />
        </li>
      </ul>
    </nav>
  );
}
