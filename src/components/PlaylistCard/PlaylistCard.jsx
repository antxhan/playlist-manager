import { Link } from "react-router";
import "./PlaylistCard.css";

export default function PlaylistCard({ playlist }) {
  return (
    <Link href={`/playlists/${playlist.id}`} className="playlist-card">
      <img
        src={
          playlist.images[1] ? playlist.images[1].url : playlist.images[0].url
        }
        alt="Playlist cover"
      />
      <div className="playlist-card__info">
        <p>{playlist.name}</p>
        <p>{playlist.tracks.total} tracks</p>
      </div>
    </Link>
  );
}
