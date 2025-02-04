import "./TopGenres.css";
import { Link } from "react-router";
import { motion, easeInOut } from "framer-motion";

export default function TopGenres({ topGenres }) {
  return (
    <div className="top-genres">
      {topGenres.map((genre) => (
        <motion.div
          key={genre}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: easeInOut }}
        >
          <Link to={`/search?q=${genre}`} className="top-genre">
            {genre}
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
