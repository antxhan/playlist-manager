import "./Nav.css";
import { NavLink } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import { useNavigateWithTransition } from "../../hooks/useNavigateWithTransition";
import FrequencyBars from "../FrequencyBars/FrequencyBars";
import SignInOutButton from "../SignInOutButton/SignInOutButton";
import HomeIcon from "../../icons/HomeIcon";
// import PlaylistIcon from "../../icons/PlaylistIcon";
import SettingsIcon from "../../icons/SettingsIcon";
import SearchIcon from "../../icons/SearchIcon";
import ToolTip from "../ToolTip/ToolTip";
// import DiscoverIcon from "../../icons/DiscoverIcon";

export default function Nav() {
  const isSignedIn = useAuth();
  const navigateWithTransition = useNavigateWithTransition();
  const routes = [
    { path: "/", label: "Home", icon: <HomeIcon /> },
    // { path: "/playlists", label: "Playlists", icon: <PlaylistIcon /> },
    { path: "/search", label: "Search", icon: <SearchIcon /> },
    // { path: "/discover", label: "Discover", icon: <DiscoverIcon /> },
    { path: "/settings", label: "Settings", icon: <SettingsIcon /> },
  ];
  return (
    <nav className="nav">
      {isSignedIn && <FrequencyBars />}
      <ul>
        {routes.map((route) => (
          <li key={route.path}>
            <NavLink
              to={{
                pathname: route.path,
                state: { transition: true },
              }}
              className={({ isActive }) => (isActive ? "active" : "")}
              aria-label={route.label}
              onClick={(e) => {
                e.preventDefault();
                navigateWithTransition(route.path);
              }}
            >
              {route.icon}
              {route.icon}
            </NavLink>
            <ToolTip text={route.label} postition="right" />
          </li>
        ))}
        <li>
          <SignInOutButton />
        </li>
      </ul>
    </nav>
  );
}
