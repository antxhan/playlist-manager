import "./Playlist.css";
import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { api } from "../../utils/api";
import Layout from "../../Layout";
import Track from "../../components/Track/Track";
import InfiniteScroll from "react-infinite-scroll-component";
import { usePlayer } from "../../hooks/usePlayer";
import { decodeHTMLEntities } from "../../utils/utils";

export default function Playlist() {
  const isSignedIn = useAuth();
  const { id } = useParams();
  const [playlist, setPlaylist] = useState(null);
  const [tracks, setTracks] = useState([]);
  const [tracksHasMore, setTracksHasMore] = useState(true);
  const [trackOffset, setTrackOffset] = useState(0);
  const trackLimit = 20;
  const [isInitialFetch, setIsInitialFetch] = useState(true);

  const player = usePlayer();

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

  useEffect(() => {
    if (isSignedIn && id && isInitialFetch) {
      api.playlist(id).then((playlist) => setPlaylist(playlist));
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
                    playlist.images[1]
                      ? playlist.images[1].url
                      : playlist.images[0].url
                  }
                  alt="Playlist cover"
                />
              </div>
              <div className="playlist__info">
                <h2>{playlist.name}</h2>
                <p>{playlist.tracks.total} tracks</p>
                <p>{decodeHTMLEntities(playlist.description)}</p>
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
                <div
                  key={index}
                  onClick={() => {
                    player.setIsPaused(false);
                    api.track.play({
                      trackUri: item.track.uri,
                      playlistId: id,
                      deviceId: player.deviceId,
                    });
                  }}
                >
                  <Track track={item.track} />
                </div>
              ))}
            </InfiniteScroll>
          </div>
        </div>
      </section>
    </Layout>
  );
}
