import "./PlaylistGrid.css";
import PlaylistCard from "../PlaylistCard/PlaylistCard";

export default function PlaylistGrid({ playlists }) {
  return (
    <div className="playlists-wrapper">
      <section className="playlists">
        <ul className="playlist-grid">
          {playlists.map((playlist) => (
            <li key={playlist.id}>
              <PlaylistCard playlist={playlist} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
