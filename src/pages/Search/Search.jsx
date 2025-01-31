import "./Search.css";
import SearchBar from "../../components/SearchBar/SearchBar";
import Layout from "../../Layout";
import { useSearchParams } from "react-router";
import { useEffect, useState, lazy, Suspense, use } from "react";
import { api } from "../../utils/api";
import InfinitePlaylistGridSkeleton from "../../components/InfinitePlaylistGrid/Skeleton";
import { sortByFrequency } from "../../utils/utils";
import RecommendView from "../../components/RecommendView/RecommendView";
const InfinitePlaylistGrid = lazy(() =>
  import("../../components/InfinitePlaylistGrid/InfinitePlaylistGrid")
);

export default function Search() {
  const [searchResults, setSearchResults] = useState([]);
  const [topGenres, setTopGenres] = useState([]);
  const [recommendedResults, setRecommendedResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [nextPage, setNextPage] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get("q");

  useEffect(() => {
    if (q) {
      // setIsLoading(true);
      api.search({ q }).then((results) => {
        setSearchResults(results.playlists.items);
        setNextPage(results.playlists.next);
        setIsLoading(false);
      });
    } else {
      // setIsLoading(true);
      api.me.top().then((data) => {
        const genres = data.items.map((artist) => artist.genres).flat();
        const sortedGenres = sortByFrequency(genres);
        setTopGenres(sortedGenres.slice(0, 10).map((g) => g.item));
        setIsLoading(false);
      });
    }
  }, [q]);

  useEffect(() => {
    // setIsLoading(true);
    if (topGenres.length > 0) {
      api.search({ q: topGenres.at(-1), limit: 25 }).then((results) => {
        setRecommendedResults(results.playlists.items);
        setIsLoading(false);
      });
    }
  }, [topGenres]);

  const getNextPage = () => {
    api.get({ url: nextPage }).then((results) => {
      setSearchResults([...searchResults, ...results.playlists.items]);
      setNextPage(results.playlists.next);
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const q = e.target.q.value;
    setSearchResults([]);
    setSearchParams({ q });
  };

  return (
    <Layout>
      <header className="page-header">
        <SearchBar q={q} onSubmit={handleSearch} />
      </header>
      <main>
        {searchResults.length > 0 ? (
          <Suspense fallback={<InfinitePlaylistGridSkeleton />}>
            <InfinitePlaylistGrid
              playlists={searchResults.filter((res) => !!res)}
              getNextPage={getNextPage}
              hasMore={nextPage}
            />
          </Suspense>
        ) : isLoading ? (
          <InfinitePlaylistGridSkeleton />
        ) : (
          <RecommendView
            topGenres={topGenres}
            recommendedResults={recommendedResults}
          />
        )}
      </main>
    </Layout>
  );
}
