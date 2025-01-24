import { useEffect, useState } from "react";
import { api } from "../../utils/api";
import { useAuth } from "../../hooks/useAuth";
import Layout from "../../Layout";
import PlaylistGrid from "../../components/PlaylistGrid/PlaylistGrid";

export default function Playlists() {
  const isSignedIn = useAuth();
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    if (isSignedIn) {
      api.me.playlists().then((playlists) => setPlaylists(playlists.items));
    }
  }, [isSignedIn]);

  return (
    <Layout>
      <PlaylistGrid playlists={playlists} />
    </Layout>
  );
}
