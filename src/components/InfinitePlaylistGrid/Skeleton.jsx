import PlaylistCardSkeleton from "../PlaylistCard/Skeleton";

export default function Skeleton({ amount = 50 }) {
  return (
    <div className="infinite-playlists-grid">
      {[...Array(amount)].map((_, i) => (
        <PlaylistCardSkeleton key={i} />
      ))}
    </div>
  );
}
