import "./RecommendView.css";
import { lazy, Suspense, useEffect, useState } from "react";
import { sortByFrequency, toCapitalize } from "../../utils/utils";
import { Link } from "react-router";
import { api } from "../../utils/api";
import InfinitePlaylistGridSkeleton from "../InfinitePlaylistGrid/Skeleton";
import TopGenresSkeleton from "../TopGenres/Skeleton";

const TopGenres = lazy(() => import("../TopGenres/TopGenres"));
const RecommendGrid = lazy(() => import("./RecommendGrid"));

export default function RecommendView() {
  const [topGenres, setTopGenres] = useState([]);

  useEffect(() => {
    api.me.top().then((data) => {
      const genres = data.items.map((artist) => artist.genres).flat();
      const sortedGenres = sortByFrequency(genres);
      setTopGenres(sortedGenres.slice(0, 10).map((g) => g.item));
    });
  }, []);

  return (
    <div className="recommend-view">
      <h2>Your Top Genres</h2>
      <Suspense fallback={<TopGenresSkeleton />}>
        <TopGenres topGenres={topGenres} />
      </Suspense>
      <h2 className="recommended__header-title">
        Because you like
        {topGenres.length > 0 ? (
          <span className="recommended-genre">
            {toCapitalize(topGenres.at(-1))}...
          </span>
        ) : (
          <span className="recommended-genre skeleton"></span>
        )}
      </h2>
      <Suspense fallback={<InfinitePlaylistGridSkeleton amount={10} />}>
        <RecommendGrid topGenres={topGenres} />
      </Suspense>
      <Link to={`/search?q=${topGenres.at(-1)}`} className="view-more">
        See more
      </Link>
    </div>
  );
}
