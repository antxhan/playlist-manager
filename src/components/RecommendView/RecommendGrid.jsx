import { lazy, Suspense, useEffect, useState } from "react";
import { api } from "../../utils/api";
import InfinitePlaylistGridSkeleton from "../InfinitePlaylistGrid/Skeleton";

const PlaylistGrid = lazy(() => import("../PlaylistGrid/PlaylistGrid"));

export default function RecommendGrid({
  topGenres,
  recommendedGenre,
  numberOfCards,
}) {
  // to avoid undefined
  const [recommendedResults, setRecommendedResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (topGenres.length > 0 && recommendedGenre) {
      api.search({ q: recommendedGenre, limit: 50 }).then((results) => {
        setRecommendedResults(results.playlists.items);
        setIsLoading(false);
      });
    }
  }, [topGenres, recommendedGenre]);

  // break out the filter and slice
  const filteredResults = recommendedResults
    .filter((res) => !!res)
    .slice(0, numberOfCards);

  return (
    // can remove the fragment
    <Suspense
      fallback={<InfinitePlaylistGridSkeleton amount={numberOfCards} />}
    >
      {isLoading ? (
        <InfinitePlaylistGridSkeleton amount={numberOfCards} />
      ) : (
        <PlaylistGrid playlists={filteredResults} />
      )}
    </Suspense>
  );
}
