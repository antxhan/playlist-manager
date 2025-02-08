import "./TrackLink.css";
import { Link } from "react-router-dom";

export default function TrackLink({ endpoint, children }) {
  return (
    <Link
      className="track-link"
      to={`https://open.spotify.com/${endpoint}`}
      target="_blank"
    >
      {children}
    </Link>
  );
}
