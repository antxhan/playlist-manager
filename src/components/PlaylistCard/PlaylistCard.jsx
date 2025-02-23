import "./PlaylistCard.css";
import { Link } from "react-router-dom";
import { easeInOut, motion } from "framer-motion";
import { useNavigateWithTransition } from "../../hooks/useNavigateWithTransition";
import placeholderImage from "../../img/placeholder.webp";

export default function PlaylistCard({ playlist }) {
  const navigateWithTransition = useNavigateWithTransition();

  if (!playlist) return null;

  // refactor for better readability
  const { id, images, name, owner, tracks } = playlist;
  const imageUrl = images?.[0]?.url || placeholderImage;
  const ownerName = owner?.display_name || owner?.id || "Unknown owner";
  const trackCount = tracks?.total > 0 ? `${tracks.total} tracks` : "No tracks";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: easeInOut }}
    >
      <Link
        to={`/playlists/${id}`}
        className="playlist-card"
        onClick={(e) => {
          e.preventDefault();
          navigateWithTransition(`/playlists/${id}`);
        }}
      >
        <img src={imageUrl} alt="Playlist cover" width={150} loading="lazy" />
        <div className="playlist-card__info">
          <p>{name || "Unknown Playlist"}</p>
          <p>{ownerName}</p>
          <p>{trackCount}</p>
        </div>
      </Link>
    </motion.div>
  );
}
