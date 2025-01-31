import "./RecommendView.css";
import { lazy, Suspense, useEffect, useState } from "react";
import { sortByFrequency, toCapitalize } from "../../utils/utils";
import { Link } from "react-router";
// import PlaylistGrid from "../PlaylistGrid/PlaylistGrid";
import { api } from "../../utils/api";
import InfinitePlaylistGridSkeleton from "../InfinitePlaylistGrid/Skeleton";
import TopGenresSkeleton from "../TopGenres/Skeleton";
// import TopGenres from "../TopGenres/TopGenres";

const TopGenres = lazy(() => import("../TopGenres/TopGenres"));

const RecommendGrid = lazy(() => import("./RecommendGrid"));

export default function RecommendView() {
  const [topGenres, setTopGenres] = useState([]);

  useEffect(() => {
    api.me.top().then((data) => {
      const genres = data.items.map((artist) => artist.genres).flat();
      const sortedGenres = sortByFrequency(genres);
      setTopGenres(sortedGenres.slice(0, 10).map((g) => g.item));
      // setIsLoading(false);
    });
  }, []);

  return (
    <div className="recommend-view">
      <h2>Your Top Genres</h2>
      <Suspense fallback={<TopGenresSkeleton />}>
        <TopGenres topGenres={topGenres} />
      </Suspense>
      <h2>Because you like {toCapitalize(topGenres.at(-1))}...</h2>
      <Suspense fallback={<InfinitePlaylistGridSkeleton amount={10} />}>
        <RecommendGrid topGenres={topGenres} />
      </Suspense>
      <Link to={`/search?q=${topGenres.at(-1)}`} className="view-more">
        See more
      </Link>
    </div>
  );
}
