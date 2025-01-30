import "./Home.css";
import { useEffect, useState } from "react";
import { api } from "../../utils/api";
import SearchBar from "../../components/SearchBar/SearchBar";
import AddPlaylistIcon from "../../icons/AddPlaylistIcon";
import StandardButton from "../../components/buttons/StandardButton/StandardButton";
import AccentButton from "../../components/buttons/AccentButton/AccentButton";
import CreatePlaylistDialog from "../../components/dialogs/PlaylistDialog/PlaylistDialog";
import InfinitePlaylistGrid from "../../components/InfinitePlaylistGrid/InfinitePlaylistGrid";

export default function Home() {
  const [user, setUser] = useState(null);
  const [playlists, setPlaylists] = useState([]);
  const [nextPage, setNextPage] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleChange = (e) => {
    console.log(e.target.value);
  };

  const handleCreatePlaylistSubmit = async (
    name,
    description,
    addTopTracks
  ) => {
    const response = await api.post({
      endpoint: `users/${user.id}/playlists`,
      body: { name: name, description: description },
    });
    const newPlaylist = await response.json();

    if (addTopTracks) {
      const topTracks = await api.get({
        endpoint: "me/top/tracks",
        params: { time_range: "long_term", limit: 20 },
      });

      await api.post({
        endpoint: `playlists/${newPlaylist.id}/tracks`,
        body: { uris: topTracks.items.map((track) => track.uri) },
      });

      newPlaylist.tracks = { total: topTracks.items.length };
    }

    setPlaylists((prevPlaylists) => [newPlaylist, ...prevPlaylists]);
  };

  useEffect(() => {
    api.me().then((user) => setUser(user));
    api.me.playlists().then((playlists) => setPlaylists(playlists.items));
  }, []);

  const getNextPage = () => {
    api.get({ url: nextPage }).then((results) => {
      setPlaylists([...playlists, ...results.items]);
      setNextPage(results.next);
    });
  };

  return (
    <>
      <header className="home__header page-header">
        <h1>Welcome {user ? user.display_name : ""}!</h1>
      </header>
      <main className="home__main">
        <div className="main__header">
          <div className="main__header-title">
            <h2>Your Playlists</h2>
            <StandardButton
              onClick={() => setIsDialogOpen(true)}
              className="small-btn"
              ariaLabel="Create Playlist"
            >
              <AddPlaylistIcon />
            </StandardButton>
          </div>
          <SearchBar
            placeholder="Search your playlists..."
            onChange={handleChange}
          />
        </div>
        {playlists.length > 0 ? (
          <InfinitePlaylistGrid
            playlists={playlists}
            hasMore={nextPage}
            getNextPage={getNextPage}
            endMessage={null}
          />
        ) : (
          <div>
            You have no playlists. Create one by clicking the button above.
          </div>
        )}
        <CreatePlaylistDialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          onSubmit={handleCreatePlaylistSubmit}
          title="Create Playlist"
        >
          <AccentButton
            type="submit"
            ariaLabel="'Create Playlist' confirmation"
          >
            Create Playlist
          </AccentButton>
        </CreatePlaylistDialog>
      </main>
    </>
  );
}
