import "./PlaylistCard.css";

export default function Skeleton() {
  return (
    <div className="playlist-card skeleton">
      <div className="playlist-card__image skeleton"></div>
      <div className="playlist-card__info">
        <p className="skeleton"></p>
        <p className="skeleton"></p>
        <p className="skeleton"></p>
        {/* ALTERNATIVE */}
        {/* {[...Array(3)].map((_, index) => (
          <p key={index} className="skeleton"></p>
        ))} */}
      </div>
    </div>
  );
}
