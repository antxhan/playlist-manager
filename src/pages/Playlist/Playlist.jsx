import "./Playlist.css";
import BulletIcon from "../../icons/BulletIcon";
import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useHandleError } from "../../hooks/useHandleError";
import { useNavigateWithTransition } from "../../hooks/useNavigateWithTransition";
import { usePlayer } from "../../hooks/usePlayer";
import { api } from "../../utils/api";
import { easeOut, motion } from "framer-motion";
import he from "he";
import Layout from "../../Layout";
import Track from "../../components/Track/Track";
import InfiniteScroll from "react-infinite-scroll-component";
import EditPlaylistDialog from "../../components/dialogs/PlaylistDialogs/EditPlaylistDialog/EditPlaylistDialog";
import ConfirmDialog from "../../components/dialogs/ConfirmDialog/ConfirmDialog";
import EditIcon from "../../icons/EditIcon";
import placeholderImage from "../../img/placeholder.webp";
import StandardButton from "../../components/buttons/StandardButton/StandardButton";
import AccentButton from "../../components/buttons/AccentButton/AccentButton";
import PlaylistSkeleton from "../../components/skeletons/PlaylistSkeleton/PlaylistSkeleton";

export default function Playlist() {
  const player = usePlayer();
  const isSignedIn = useAuth();
  const navigateWithTransition = useNavigateWithTransition();
  const handleError = useHandleError();
  const { id } = useParams();
  const [playlist, setPlaylist] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [tracksHasMore, setTracksHasMore] = useState(true);
  const [trackOffset, setTrackOffset] = useState(0);
  const trackLimit = 20;
  const [isInitialFetch, setIsInitialFetch] = useState(true);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTracks = useCallback(() => {
    if (isSignedIn && id) {
      api.playlist
        .tracks({ id, limit: trackLimit, offset: trackOffset })
        .then((newTracks) => {
          setTracks((prevTracks) => [...prevTracks, ...newTracks.items]);
          setTracksHasMore(newTracks.next !== null);
          setTrackOffset(trackOffset + trackLimit);
        })
        .catch((error) =>
          handleError(error, "Failed to fetch playlist tracks.")
        );
    }
  }, [isSignedIn, id, trackLimit, trackOffset, handleError]);

  const handleEditPlaylist = (newName, newDescription) => {
    if (isSignedIn && id) {
      api
        .put({
          endpoint: `playlists/${id}`,
          body: { name: newName, description: newDescription },
        })
        .then(() => {
          setPlaylist({
            ...playlist,
            name: he.decode(newName),
            description: he.decode(newDescription),
          });
          setIsEditDialogOpen(false);
        })
        .catch((error) => {
          handleError(error, "Failed to edit playlist.");
        });
    }
  };

  const handleDeletePlaylist = () => {
    if (isSignedIn && id) {
      api
        .delete({ endpoint: `playlists/${id}/followers` })
        .then(() => {
          setIsConfirmDialogOpen(false);
          setIsEditDialogOpen(false);
          navigateWithTransition("/");
        })
        .catch((error) => handleError(error, "Failed to delete playlist."));
    }
  };

  useEffect(() => {
    if (isSignedIn && id && isInitialFetch) {
      api
        .playlist(id)
        .then(({ description, name, ...playlist }) => {
          setPlaylist({
            ...playlist,
            name: he.decode(name),
            description: he.decode(description),
          });
        })
        .then(() => setIsLoading(false))
        .catch((error) => handleError(error, "Failed to fetch playlist data."));
      fetchTracks();
      setIsInitialFetch(false);
    }
  }, [isSignedIn, id, isInitialFetch, handleError, fetchTracks]);

  if (isLoading)
    return (
      <Layout>
        <PlaylistSkeleton />
      </Layout>
    );

  return (
    <Layout>
      <section className="playlist-wrapper">
        <div className="playlist">
          <motion.div
            className="playlist__head-wrapper"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{duration: 0.5, ease: easeOut}}
          >
            <div className="playlist__head">
              <div className="playlist__image-wrapper">
                <img
                  src={
                    playlist.images && playlist.images.length > 0
                      ? playlist.images[0].url
                      : placeholderImage
                  }
                  alt="Playlist cover"
                />
                <button
                  className="playlist__edit-btn"
                  onClick={() => setIsEditDialogOpen(true)}
                  aria-label="Edit Playlist"
                >
                  <EditIcon />
                </button>
              </div>
              <div className="playlist__info">
                <h2 onClick={() => setIsEditDialogOpen(true)}>
                  {playlist.name || "Unknown Playlist"}
                </h2>
                <div className="playlist__info-group">
                  <p>
                    {playlist.owner
                      ? playlist.owner.display_name
                        ? playlist.owner.display_name
                        : playlist.owner.id
                      : "Unknown owner"}
                  </p>
                  <BulletIcon />
                  <p>
                    {playlist.tracks.total > 0
                      ? `${playlist.tracks.total} tracks`
                      : "No tracks"}
                  </p>
                </div>
                <p onClick={() => setIsEditDialogOpen(true)}>
                  {playlist.description}
                </p>
              </div>
            </div>
          </motion.div>
          <div className="playlist__body">
            <InfiniteScroll
              dataLength={tracks.length}
              next={fetchTracks}
              hasMore={tracksHasMore}
              loader={<div>Loading more tracks...</div>}
              className="playlist__tracks"
            >
              {tracks.map((item, index) => (
                <div
                  key={index}
                  onClick={() =>
                    api.track
                      .play({
                        trackUri: item.track.uri,
                        playlistId: id,
                        deviceId: player.deviceId,
                      })
                      .catch((error) =>
                        handleError(error, "Failed to play track.")
                      )
                  }
                >
                  <Track track={item.track} index={index} />
                </div>
              ))}
            </InfiniteScroll>
          </div>
        </div>
        <EditPlaylistDialog
          isOpen={isEditDialogOpen}
          onClose={() => setIsEditDialogOpen(false)}
          onSubmit={handleEditPlaylist}
          title="Edit Playlist"
          initialName={playlist.name}
          initialDescription={playlist.description}
        >
          <AccentButton type="submit" ariaLabel="Save">
            Save
          </AccentButton>
          <StandardButton onClick={() => setIsConfirmDialogOpen(true)}>
            Delete Playlist
          </StandardButton>
        </EditPlaylistDialog>
        <ConfirmDialog
          isOpen={isConfirmDialogOpen}
          onClose={() => setIsConfirmDialogOpen(false)}
          message="Do you want to delete your playlist?"
        >
          <StandardButton
            onClick={handleDeletePlaylist}
            ariaLabel="'Delete Playlist' confirmation"
          >
            Delete Playlist
          </StandardButton>
        </ConfirmDialog>
      </section>
    </Layout>
  );
}
