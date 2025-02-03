import { lazy, Suspense, useEffect, useState } from "react";
import { api } from "../../utils/api";
import InfinitePlaylistGridSkeleton from "../InfinitePlaylistGrid/Skeleton";
const PlaylistGrid = lazy(() => import("../PlaylistGrid/PlaylistGrid"));

export default function RecommendGrid({
  topGenres,
  recommendedGenre,
  numberOfCards,
}) {
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
  return (
    <>
      {isLoading ? (
        <InfinitePlaylistGridSkeleton amount={numberOfCards} />
      ) : (
        <Suspense
          fallback={<InfinitePlaylistGridSkeleton amount={numberOfCards} />}
        >
          <PlaylistGrid
            playlists={recommendedResults
              .filter((res) => !!res)
              .slice(0, numberOfCards)}
          />
        </Suspense>
      )}
    </>
  );
}
