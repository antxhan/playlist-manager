import "./PlaylistGrid.css";
import PlaylistCard from "../PlaylistCard/PlaylistCard";

export default function PlaylistGrid({ playlists }) {
  console.log(playlists[0]);
  return (
    <section className="playlists">
      <ul className="playlist-grid">
        {playlists.map((playlist) => (
          <li key={playlist.id}>
            <PlaylistCard playlist={playlist}/>
          </li>
        ))}
      </ul>
    </section>
  );
}
