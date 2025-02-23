import "./TopGenres.css";

export default function TopGenresSkeleton({ amount = 10 }) {
  return (
    <div className="top-genres">
      {/* avoid one letter variables */}
      {[...Array(amount)].map((_, index) => (
        <div key={index} className="top-genre skeleton"></div>
      ))}
    </div>
  );
}
