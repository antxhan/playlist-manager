import { useEffect, useState } from "react";
import { api } from "../../utils/api";
import Layout from "../../Layout";
import PlaylistGrid from "../../components/PlaylistGrid/PlaylistGrid";

export default function Playlists() {
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    api.me.playlists().then((playlists) => setPlaylists(playlists.items));
  }, []);

  return (
    <Layout>
      <PlaylistGrid playlists={playlists} />
    </Layout>
  );
}
