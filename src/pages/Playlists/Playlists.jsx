import { useEffect, useState } from "react";
import Layout from "../../Layout";
import { api } from "../../utils/api";
import { useAuth } from "../../hooks/useAuth";
import Playlist from "../Playlist/Playlist";

export default function Playlists() {
  const isSignedIn = useAuth();
  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);

  useEffect(() => {
    if (isSignedIn) {
      api.playlists.get().then((playlists) => setPlaylists(playlists.items));
    }
  }, [isSignedIn]);

  const handlePlaylistClick = (playlist) => {
    api.playlist
      .get(playlist.id)
      .then((playlist) => setSelectedPlaylist(playlist));
  };

  return (
    <Layout>
      {selectedPlaylist ? (
        <Playlist playlist={selectedPlaylist} />
      ) : (
        <ul>
          {playlists.map((playlist) => (
            <li>
              <button
                key={playlist.id}
                onClick={() => handlePlaylistClick(playlist)}
              >
                {playlist.name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </Layout>
  );
}
