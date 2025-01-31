import "./PlaylistCard.css";

export default function Skeleton() {
  return (
    <div className="playlist-card skeleton">
      <div className="playlist-card__image skeleton"></div>
      <div className="playlist-card__info">
        <p className="skeleton"></p>
        <p className="skeleton"></p>
        <p className="skeleton"></p>
      </div>
    </div>
  );
}
