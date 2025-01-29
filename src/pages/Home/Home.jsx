import "./Home.css";
import { useEffect, useState } from "react";
import { api } from "../../utils/api";
import SearchBar from "../../components/SearchBar/SearchBar";
import PlaylistGrid from "../../components/PlaylistGrid/PlaylistGrid";
import AddPlaylistIcon from "../../icons/AddPlaylistIcon";
import StandardButton from "../../components/buttons/StandardButton/StandardButton";
import AccentButton from "../../components/buttons/AccentButton/AccentButton";
import CreatePlaylistDialog from "../../components/PlaylistDialog/PlaylistDialog";

export default function Home() {
  const [user, setUser] = useState(null);
  const [playlists, setPlaylists] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleChange = (e) => {
    console.log(e.target.value);
  };

  const handleCreatePlaylistSubmit = async (name, description) => {
    const response = await api.post({
      endpoint: `users/${user.id}/playlists`,
      body: { name: name, description: description },
    });
    const newPlaylist = await response.json();

    setPlaylists((prevPlaylists) => [newPlaylist, ...prevPlaylists]);
  };

  useEffect(() => {
    api.me().then((user) => {
      setUser(user);
    });
    api.me.playlists().then((playlists) => setPlaylists(playlists.items));
  }, []);

  return (
    <>
      <header className="home__header">
        <h1>Welcome {user ? user.display_name : ""}!</h1>
      </header>
      <main className="home__main">
        <div className="main__header">
          <div className="main__header-title">
            <h2>Your Playlists</h2>
            <StandardButton onClick={() => setIsDialogOpen(true)}>
              <AddPlaylistIcon />
            </StandardButton>
          </div>
          <SearchBar
            placeholder="Search your playlists..."
            onChange={handleChange}
          />
        </div>
        <PlaylistGrid playlists={playlists} />
        <CreatePlaylistDialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          onSubmit={handleCreatePlaylistSubmit}
        >
          <AccentButton type="submit">Create Playlist</AccentButton>
          <StandardButton onClick={() => setIsDialogOpen(false)}>
            Cancel
          </StandardButton>
        </CreatePlaylistDialog>
      </main>
    </>
  );
}
