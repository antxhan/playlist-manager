import "./InfinitePlaylistGrid.css";
import InfiniteScroll from "react-infinite-scroll-component";
import PlaylistCard from "../PlaylistCard/PlaylistCard";
import PlaylistCardSkeleton from "../PlaylistCard/Skeleton";

export default function InfinitePlaylistGrid({
  playlists,
  getNextPage,
  hasMore,
  endMessage = "No more results",
  loading = (
    <>
      {Array.from(Array(10)).map((_, index) => (
        <PlaylistCardSkeleton key={index} />
      ))}
    </>
  ),
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
      {playlists.map((playlist, index) => (
        <PlaylistCard playlist={playlist} key={playlist.id + index} />
      ))}
    </InfiniteScroll>
  );
}
