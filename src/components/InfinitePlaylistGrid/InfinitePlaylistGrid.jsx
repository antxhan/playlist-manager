import "./InfinitePlaylistGrid.css";
import InfiniteScroll from "react-infinite-scroll-component";
import PlaylistCard from "../PlaylistCard/PlaylistCard";

export default function InfinitePlaylistGrid({
  playlists,
  getNextPage,
  hasMore,
  endMessage = "No more results",
  loading = <p>Loading...</p>,
}) {
  return (
    <InfiniteScroll
      className="infinite-playlists-grid"
      dataLength={playlists.length}
      next={getNextPage}
      hasMore={hasMore}
      loader={loading}
      endMessage={<p>{endMessage}</p>}
    >
      {playlists.map((playlist) => (
        <PlaylistCard playlist={playlist} key={playlist.id} />
      ))}
    </InfiniteScroll>
  );
}
