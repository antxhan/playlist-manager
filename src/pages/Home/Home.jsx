import "./Home.css";
import { useEffect, useState, Suspense, lazy } from "react";
import { useHandleError } from "../../hooks/useHandleError";
import { api } from "../../utils/api";
import SearchBar from "../../components/SearchBar/SearchBar";
import AddPlaylistIcon from "../../icons/AddPlaylistIcon";
import StandardButton from "../../components/buttons/StandardButton/StandardButton";
import AccentButton from "../../components/buttons/AccentButton/AccentButton";
import CreatePlaylistDialog from "../../components/dialogs/PlaylistDialogs/CreatePlaylistDialog/CreatePlaylistDialog";
import InfinitePlaylistGridSkeleton from "../../components/InfinitePlaylistGrid/Skeleton";
const InfinitePlaylistGrid = lazy(() =>
  import("../../components/InfinitePlaylistGrid/InfinitePlaylistGrid")
);

export default function Home() {
  const handleError = useHandleError();
  const [user, setUser] = useState(null);
  const [playlists, setPlaylists] = useState([]);
  const [playlistsAreLoading, setPlaylistsAreLoading] = useState(true);
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
    try {
      const response = await api.post({
        endpoint: `users/${user.id}/playlists`,
        body: { name: name, description: description },
      });
      let newPlaylist = await response.json();

      if (addTopTracks) {
        try {
          const topTracks = await api.get({
            endpoint: "me/top/tracks",
            params: { time_range: "long_term", limit: 20 },
          });

          await api.post({
            endpoint: `playlists/${newPlaylist.id}/tracks`,
            body: { uris: topTracks.items.map((track) => track.uri) },
          });

          const total = topTracks.items.length ?? 0;
          newPlaylist.tracks = { total: total };
        } catch (error) {
          handleError(error, "Failed to add tracks to playlist.");
        }
      }

      const displayName = newPlaylist.owner.display_name ?? user.display_name;
      newPlaylist.owner = { display_name: displayName };

      setPlaylists((prevPlaylists) => [newPlaylist, ...prevPlaylists]);
    } catch (error) {
      handleError(error, "Failed to create playlist.");
    }
  };

  useEffect(() => {
    api
      .me()
      .then((user) => setUser(user))
      .catch((error) => handleError(error, "Failed to fetch user data."));
    api.me
      .playlists()
      .then((playlists) => {
        setPlaylists(playlists.items);
        setPlaylistsAreLoading(false);
      })
      .catch((error) => handleError(error, "Failed to fetch playlists."));
  }, [handleError]);

  const getNextPage = () => {
    api
      .get({ url: nextPage })
      .then((results) => {
        setPlaylists([...playlists, ...results.items]);
        setNextPage(results.next);
      })
      .catch((error) => handleError(error, "Failed to fetch playlists."));
  };

  return (
    <>
      <header className="home__header page-header">
        <h1>
          Welcome
          {user ? (
            <span className="home__username">{user.display_name}</span>
          ) : (
            <span className="home__username skeleton"></span>
          )}
          !
        </h1>
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
          <Suspense fallback={<InfinitePlaylistGridSkeleton amount={10} />}>
            <InfinitePlaylistGrid
              playlists={playlists}
              getNextPage={getNextPage}
              hasMore={nextPage}
              endMessage={null}
            />
          </Suspense>
        ) : playlistsAreLoading ? (
          <InfinitePlaylistGridSkeleton amount={10} />
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
