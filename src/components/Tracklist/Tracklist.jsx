import InfiniteScroll from "react-infinite-scroll-component";
import Track from "../Track/Track";

export default function Tracklist({
  playlistId,
  player,
  tracks,
  getNextPage,
  hasMore,
  endMessage = "",
  loading = "Loading tracks...",
}) {
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
          player={player}
          index={index}
        />
      ))}
    </InfiniteScroll>
  );
}
