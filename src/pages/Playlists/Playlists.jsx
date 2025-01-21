import { useEffect, useState } from "react";
import Layout from "../../Layout";
import { api } from "../../utils/api";
import { useAuth } from "../../hooks/useAuth";

export default function Playlists() {
  const isSignedIn = useAuth();
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    if (isSignedIn) {
      api.playlists.get().then((playlists) => setPlaylists(playlists.items));
    }
  }, [isSignedIn]);

  return (
    <Layout>
      <div>
        {playlists.map((playlist) => (
          <p key={playlist.id}>{playlist.name}</p>
        ))}
      </div>
    </Layout>
  );
}
