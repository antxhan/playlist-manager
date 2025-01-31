import "./PlaylistCard.css";
import { Link } from "react-router-dom";
import { useNavigateWithTransition } from "../../hooks/useNavigateWithTransition";
import placeholderImage from "../../img/placeholder.webp";

export default function PlaylistCard({ playlist }) {
  const navigateWithTransition = useNavigateWithTransition();

  if (!playlist) return null;

  return (
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
      />
      <div className="playlist-card__info">
        <p>{playlist.name || "Unknown Playlist"}</p>
        <p>{playlist.owner.display_name || "No owner"}</p>
        {playlist.tracks.total && <p>{playlist.tracks.total} tracks</p>}
      </div>
    </Link>
  );
}
