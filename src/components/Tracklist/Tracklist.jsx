import InfiniteScroll from "react-infinite-scroll-component";
import Track from "../Track/Track";
import { usePlayer } from "../../hooks/usePlayer";
import { api } from "../../utils/api";
import { useHandleError } from "../../hooks/useHandleError";
import toast from "react-hot-toast";

export default function Tracklist({
  playlistId,
  tracks,
  getNextPage,
  hasMore,
  endMessage = "",
  loading = "Loading tracks...",
}) {
  const handleError = useHandleError();
  const { deviceId, userIsPremium } = usePlayer();
  const trackOnClick = (trackUri) => {
    if (!userIsPremium) {
      toast.error("You need Spotify Premium to be able to play tracks");
      return;
    }
    api.track
      .play({
        trackUri: trackUri,
        playlistId: playlistId,
        deviceId: deviceId,
      })
      .catch((error) => handleError(error, "Failed to play track."));
  };
  return (
    <InfiniteScroll
      className="playlist__tracks"
      dataLength={tracks.length}
      next={getNextPage}
      hasMore={hasMore}
      loader={loading}
      endMessage={<p>{endMessage}</p>}
    >
      {tracks.map((item, index) => (
        <Track
          key={item.track.id + index}
          track={item.track}
          playlistId={playlistId}
          onClick={() => trackOnClick(item.track.uri)}
        />
      ))}
    </InfiniteScroll>
  );
}
