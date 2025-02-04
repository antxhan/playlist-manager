import InfiniteScroll from "react-infinite-scroll-component";
import Track from "../Track/Track";
import { usePlayer } from "../../hooks/usePlayer";

export default function Tracklist({
  playlistId,
  tracks,
  getNextPage,
  hasMore,
  endMessage = "",
  loading = "Loading tracks...",
}) {
  const { deviceId } = usePlayer();
  console.log(deviceId);
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
          deviceId={deviceId}
        />
      ))}
    </InfiniteScroll>
  );
}
