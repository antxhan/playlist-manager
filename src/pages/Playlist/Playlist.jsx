import "./Playlist.css";
import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { api } from "../../utils/api";
import { usePlayer } from "../../hooks/usePlayer";
import he from "he";
import Layout from "../../Layout";
import Track from "../../components/Track/Track";
import InfiniteScroll from "react-infinite-scroll-component";
import EditPlaylistDialog from "../../components/EditPlaylistDialog/EditPlaylistDialog";
import EditIcon from "../../icons/EditIcon";
import placeholderImage from "../../img/daniel-schludi-l8cvrt3Hpec-unsplash.jpg";

export default function Playlist() {
  const isSignedIn = useAuth();
  const { id } = useParams();
  const { playTrack } = usePlayer();
  const [playlist, setPlaylist] = useState(null);
  const [tracks, setTracks] = useState([]);
  const [tracksHasMore, setTracksHasMore] = useState(true);
  const [trackOffset, setTrackOffset] = useState(0);
  const trackLimit = 20;
  const [isInitialFetch, setIsInitialFetch] = useState(true);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const fetchTracks = useCallback(() => {
    if (isSignedIn && id) {
      api.playlist
        .tracks({ id, limit: trackLimit, offset: trackOffset })
        .then((newTracks) => {
          setTracks((prevTracks) => [...prevTracks, ...newTracks.items]);
          setTracksHasMore(newTracks.next !== null);
          setTrackOffset(trackOffset + trackLimit);
        });
    }
  }, [isSignedIn, id, trackLimit, trackOffset]);

  const handleEditSubmit = (newName, newDescription) => {
    if (isSignedIn && id) {
      api
        .put({
          endpoint: `playlists/${id}`,
          body: { name: newName, description: newDescription },
        })
        .then((res) => {
          console.log(res);
          setPlaylist({
            ...playlist,
            name: he.decode(newName),
            description: he.decode(newDescription),
          });
          setIsEditDialogOpen(false);
        })
        .catch((error) => {
          console.error("Failed to edit playlist:", error);
        });
    }
  };

  useEffect(() => {
    if (isSignedIn && id && isInitialFetch) {
      api.playlist(id).then(({ description, name, ...playlist }) =>
        setPlaylist({
          ...playlist,
          name: he.decode(name),
          description: he.decode(description),
        })
      );
      fetchTracks();
      setIsInitialFetch(false);
    }
  }, [isSignedIn, id, isInitialFetch, fetchTracks]);

  if (playlist === null)
    return (
      <Layout>
        <h2>Loading...</h2>
      </Layout>
    );

  return (
    <Layout>
      <section className="playlist-wrapper">
        <div className="playlist">
          <div className="playlist__head-wrapper">
            <div className="playlist__head">
              <div className="playlist__image-wrapper">
                <img
                  src={
                    playlist.images && playlist.images.length > 0
                      ? playlist.images[1]
                        ? playlist.images[1].url
                        : playlist.images[0].url
                      : placeholderImage
                  }
                  alt="Playlist cover"
                />
                <button
                  className="playlist__edit-btn"
                  onClick={() => setIsEditDialogOpen(true)}
                >
                  <EditIcon />
                </button>
              </div>
              <div className="playlist__info">
                <h2>{playlist.name}</h2>
                <p>{playlist.tracks.total} tracks</p>
                <p>{playlist.description}</p>
              </div>
            </div>
          </div>
          <div className="playlist__body">
            <InfiniteScroll
              dataLength={tracks.length}
              next={fetchTracks}
              hasMore={tracksHasMore}
              loader={<h2>Loading more tracks...</h2>}
              className="playlist__tracks"
            >
              {tracks.map((item, index) => (
                <div key={index} onClick={() => playTrack(item.track, id)}>
                  <Track track={item.track} />
                </div>
              ))}
            </InfiniteScroll>
          </div>
        </div>
        <EditPlaylistDialog
          isOpen={isEditDialogOpen}
          onClose={() => setIsEditDialogOpen(false)}
          onSubmit={handleEditSubmit}
          initialName={playlist.name}
          initialDescription={playlist.description}
        />
      </section>
    </Layout>
  );
}
