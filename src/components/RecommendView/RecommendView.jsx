import "./RecommendView.css";
import { lazy, Suspense, useEffect, useState } from "react";
import { shuffle, sortByFrequency, toCapitalize } from "../../utils/utils";
import { Link } from "react-router";
import { api } from "../../utils/api";
import InfinitePlaylistGridSkeleton from "../InfinitePlaylistGrid/Skeleton";
import TopGenresSkeleton from "../TopGenres/Skeleton";
import { useAuth } from "../../hooks/useAuth";
import StandardButton from "../buttons/StandardButton/StandardButton";

const TopGenres = lazy(() => import("../TopGenres/TopGenres"));
const RecommendGrid = lazy(() => import("./RecommendGrid"));

export default function RecommendView() {
  const isSignedIn = useAuth();
  const [topGenres, setTopGenres] = useState([]);
  const [recommendedGenre, setRecommendedGenre] = useState(null);
  const [numberOfCards, setNumberOfCards] = useState(10);
  const numberOfGenres = 10;

  const calculateNumberOfCards = () => {
    const container = document.querySelector(".page-wrapper");

    if (container) {
      const containerPadding =
        container.offsetWidth < 610 ? 2 * 16 : 2 * 4 * 16;
      const containerWidth = container.offsetWidth - containerPadding;
      const cardWidth = 150; // Minimum width of each card
      const gap = 16; // 1rem gap converted to pixels
      const columns = Math.floor((containerWidth + gap) / (cardWidth + gap));
      const rows = columns === 1 ? 4 : 2;
      setNumberOfCards(columns * rows);
    }
  };

  useEffect(() => {
    calculateNumberOfCards();
    window.addEventListener("resize", calculateNumberOfCards);
    return () => window.removeEventListener("resize", calculateNumberOfCards);
  }, []);

  useEffect(() => {
    if (isSignedIn) {
      api.me.top().then((data) => {
        const genres = data.items.map((artist) => artist.genres).flat();
        const sortedGenres = sortByFrequency(genres);

        setTopGenres(
          sortedGenres
            .filter((g) => g.item !== "visa")
            .slice(0, numberOfGenres)
            .map((g) => g.item)
        );
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
          <>
            <span className="recommended-genre skeleton"></span>
          </>
        )}
      </h2>
      <Suspense
        fallback={<InfinitePlaylistGridSkeleton amount={numberOfCards} />}
      >
        <RecommendGrid
          topGenres={topGenres}
          recommendedGenre={recommendedGenre}
          numberOfCards={numberOfCards}
        />
      </Suspense>
      <div className="view-more">
        {recommendedGenre ? (
          <Link to={`/search?q=${recommendedGenre}`}>
            <StandardButton>See more</StandardButton>
          </Link>
        ) : (
          <span className="skeleton"></span>
        )}
      </div>
    </div>
  );
}
