import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Layout from "../../Layout";
import { api } from "../../utils/api";
import { useAuth } from "../../hooks/useAuth";

export default function Playlists() {
  const isSignedIn = useAuth();
  const navigate = useNavigate();
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    if (isSignedIn) {
      api.playlists.get().then((playlists) => setPlaylists(playlists.items));
    }
  }, [isSignedIn]);

  const handlePlaylistClick = (playlist) => {
    navigate(`/playlists/${playlist.id}`);
  };

  return (
    <Layout>
      <ul>
        {playlists.map((playlist) => (
          <li key={playlist.id}>
            <button onClick={() => handlePlaylistClick(playlist)}>
              {playlist.name}
            </button>
          </li>
        ))}
      </ul>
    </Layout>
  );
}
