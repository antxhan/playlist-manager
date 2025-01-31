import "./TopGenres.css";

export default function TopGenresSkeleton({ amount = 10 }) {
  return (
    <div className="top-genres">
      {[...Array(amount)].map((_, i) => (
        <div tkey={i} className="top-genre skeleton"></div>
      ))}
    </div>
  );
}
