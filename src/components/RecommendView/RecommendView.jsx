import "./RecommendView.css";
import { lazy, Suspense, useEffect, useState } from "react";
import { shuffle, sortByFrequency, toCapitalize } from "../../utils/utils";
import { Link } from "react-router";
import { api } from "../../utils/api";
import InfinitePlaylistGridSkeleton from "../InfinitePlaylistGrid/Skeleton";
import TopGenresSkeleton from "../TopGenres/Skeleton";
import { useAuth } from "../../hooks/useAuth";

const TopGenres = lazy(() => import("../TopGenres/TopGenres"));
const RecommendGrid = lazy(() => import("./RecommendGrid"));

export default function RecommendView() {
  const isSignedIn = useAuth();
  const [topGenres, setTopGenres] = useState([]);
  const [recommendedGenre, setRecommendedGenre] = useState(null);

  useEffect(() => {
    if (isSignedIn) {
      console.log("isSignedIn");
      api.me.top().then((data) => {
        const genres = data.items.map((artist) => artist.genres).flat();
        const sortedGenres = sortByFrequency(genres);
        setTopGenres(sortedGenres.slice(0, 10).map((g) => g.item));
      });
    }
  }, [isSignedIn]);

  useEffect(() => {
    if (topGenres.length > 0) {
      setRecommendedGenre(shuffle(topGenres)[0]);
    }
  }, [topGenres]);

  return (
    <div className="recommend-view">
      <h2>Your Top Genres</h2>
      <Suspense fallback={<TopGenresSkeleton />}>
        <TopGenres topGenres={topGenres} />
      </Suspense>
      <h2 className="recommended__header-title">
        Because you like
        {topGenres.length > 0 && recommendedGenre ? (
          <span className="recommended-genre">
            {toCapitalize(recommendedGenre)}...
          </span>
        ) : (
          <span className="recommended-genre skeleton"></span>
        )}
      </h2>
      <Suspense fallback={<InfinitePlaylistGridSkeleton amount={10} />}>
        <RecommendGrid
          topGenres={topGenres}
          recommendedGenre={recommendedGenre}
        />
      </Suspense>
      <div className="view-more">
        {recommendedGenre ? (
          <Link to={`/search?q=${recommendedGenre}`}>See more</Link>
        ) : (
          <span className="skeleton"></span>
        )}
      </div>
    </div>
  );
}
