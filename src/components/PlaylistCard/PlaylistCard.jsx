import "./PlaylistCard.css";
import { Link } from "react-router";
import placeholderImage from "../../img/placeholder.webp";

export default function PlaylistCard({ playlist }) {
  if (!playlist) return null;

  return (
    <Link to={`/playlists/${playlist.id}`} className="playlist-card">
      <img
        src={playlist.images ? playlist.images[0].url : placeholderImage}
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
