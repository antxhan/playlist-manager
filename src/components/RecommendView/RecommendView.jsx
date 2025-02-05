import "./RecommendView.css";
import { lazy, Suspense, useEffect, useState } from "react";
import { shuffle, sortByFrequency, toCapitalize } from "../../utils/utils";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import { api } from "../../utils/api";
import { calculateNumberOfCards } from "../../utils/utils";
import InfinitePlaylistGridSkeleton from "../InfinitePlaylistGrid/Skeleton";
import TopGenresSkeleton from "../TopGenres/Skeleton";
import StandardButton from "../buttons/StandardButton/StandardButton";
import { useHandleError } from "../../hooks/useHandleError";

const TopGenres = lazy(() => import("../TopGenres/TopGenres"));
const RecommendGrid = lazy(() => import("./RecommendGrid"));

export default function RecommendView() {
  const isSignedIn = useAuth();
  const [topGenres, setTopGenres] = useState([]);
  const [recommendedGenre, setRecommendedGenre] = useState(null);
  const [numberOfCards, setNumberOfCards] = useState(10);
  const cardWidth = 150;
  const cardGap = 16;
  const numberOfGenres = 10;

  const navigate = useNavigate();
  const handleError = useHandleError();

  useEffect(() => {
    setNumberOfCards(calculateNumberOfCards(cardWidth, cardGap));
  }, []);

  useEffect(() => {
    if (isSignedIn) {
      api.me
        .top()
        .then((data) => {
          const genres = data.items.map((artist) => artist.genres).flat();
          const sortedGenres = sortByFrequency(genres);

          setTopGenres(
            sortedGenres
              .filter((g) => g.item !== "visa")
              .slice(0, numberOfGenres)
              .map((g) => g.item)
          );
        })
        .catch((error) => {
          handleError(error, "Failed to fetch top genres.");
        });
    }
  }, [isSignedIn, navigate, handleError]);

  useEffect(() => {
    if (topGenres.length > 0) {
      setRecommendedGenre(shuffle(topGenres)[0]);
    }
  }, [topGenres]);

  return (
    <div className="recommend-view">
      <section className="recommend-view__header">
        <h2>Your Top Genres</h2>
        <Suspense fallback={<TopGenresSkeleton />}>
          <TopGenres topGenres={topGenres} />
        </Suspense>
      </section>
      <section className="recommend-view__body">
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
      </section>
    </div>
  );
}
