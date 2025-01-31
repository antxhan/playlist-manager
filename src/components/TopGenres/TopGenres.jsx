import "./TopGenres.css";
import { Link } from "react-router";

export default function TopGenres({ topGenres }) {
  return (
    <div className="top-genres">
      {topGenres.map((genre) => (
        <Link to={`/search?q=${genre}`} key={genre} className="top-genre">
          {genre}
        </Link>
      ))}
    </div>
  );
}
