import { lazy, Suspense, useEffect, useState } from "react";
// import PlaylistGrid from "../PlaylistGrid/PlaylistGrid";
import { api } from "../../utils/api";
import InfinitePlaylistGridSkeleton from "../InfinitePlaylistGrid/Skeleton";
const PlaylistGrid = lazy(() => import("../PlaylistGrid/PlaylistGrid"));

export default function RecommendGrid({ topGenres, recommendedGenre }) {
  const [recommendedResults, setRecommendedResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (topGenres.length > 0 && recommendedGenre) {
      api.search({ q: recommendedGenre, limit: 25 }).then((results) => {
        setRecommendedResults(results.playlists.items);
        setIsLoading(false);
      });
    }
  }, [topGenres, recommendedGenre]);
  return (
    <>
      {isLoading ? (
        <InfinitePlaylistGridSkeleton amount={10} />
      ) : (
        <Suspense fallback={<InfinitePlaylistGridSkeleton amount={10} />}>
          <PlaylistGrid
            playlists={recommendedResults.filter((res) => !!res).slice(0, 10)}
          />
        </Suspense>
      )}
    </>
  );
}
