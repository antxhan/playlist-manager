import "./Home.css";
import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../utils/api";
import { errorResponseMessages } from "../../utils/fetchError";
import SearchBar from "../../components/SearchBar/SearchBar";
import AddPlaylistIcon from "../../icons/AddPlaylistIcon";
import StandardButton from "../../components/buttons/StandardButton/StandardButton";
import AccentButton from "../../components/buttons/AccentButton/AccentButton";
import CreatePlaylistDialog from "../../components/dialogs/PlaylistDialogs/CreatePlaylistDialog/CreatePlaylistDialog";
import InfinitePlaylistGrid from "../../components/InfinitePlaylistGrid/InfinitePlaylistGrid";

export default function Home() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [playlists, setPlaylists] = useState([]);
  const [nextPage, setNextPage] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleError = useCallback(
    (error, additionalMessage = null) => {
      const errorMessage =
        errorResponseMessages[error.statusCode] ??
        "An unexpected error occured.";

      navigate("/error", {
        state: {
          message: additionalMessage
            ? additionalMessage + " " + errorMessage
            : errorMessage,
          statusCode: error.statusCode,
        },
      });
    },
    [navigate]
  );

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
      const newPlaylist = await response.json();

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
      .then((playlists) => setPlaylists(playlists.items))
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
