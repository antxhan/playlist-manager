import { Link } from "react-router";
import "./PlaylistCard.css";
import placeholderImage from "../../img/daniel-schludi-l8cvrt3Hpec-unsplash.jpg";

export default function PlaylistCard({ playlist }) {
  return (
    <Link to={`/playlists/${playlist.id}`} className="playlist-card">
      <img
        src={
          playlist.images.length > 0
            ? playlist.images[1]
              ? playlist.images[1].url
              : playlist.images[0].url
            : placeholderImage
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
