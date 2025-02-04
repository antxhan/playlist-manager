import "./PlaylistCard.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useNavigateWithTransition } from "../../hooks/useNavigateWithTransition";
import placeholderImage from "../../img/placeholder.webp";

export default function PlaylistCard({ playlist }) {
  const navigateWithTransition = useNavigateWithTransition();

  if (!playlist) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5}}
    >
      <Link
        to={{
          pathname: `/playlists/${playlist.id}`,
          state: { transition: true },
        }}
        className="playlist-card"
        onClick={(e) => {
          e.preventDefault();
          navigateWithTransition(`/playlists/${playlist.id}`);
        }}
      >
        <img
          src={
            playlist.images && playlist.images[0]
              ? playlist.images[0].url
              : placeholderImage
          }
          alt="Playlist cover"
          width={150}
          loading="lazy"
        />
        <div className="playlist-card__info">
          <p>{playlist.name || "Unknown Playlist"}</p>
          <p>
            {playlist.owner
              ? playlist.owner.display_name
                ? playlist.owner.display_name
                : playlist.owner.id
              : "Unknown owner"}
          </p>
          <p>
            {playlist.tracks.total > 0
              ? `${playlist.tracks.total} tracks`
              : "No tracks"}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
