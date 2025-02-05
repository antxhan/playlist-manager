import "./Search.css";
import SearchBar from "../../components/SearchBar/SearchBar";
import Layout from "../../Layout";
import { useNavigate, useSearchParams } from "react-router";
import { useEffect, useState, lazy, Suspense } from "react";
import { api } from "../../utils/api";
import InfinitePlaylistGridSkeleton from "../../components/InfinitePlaylistGrid/Skeleton";
import RecommendView from "../../components/RecommendView/RecommendView";
const InfinitePlaylistGrid = lazy(() =>
  import("../../components/InfinitePlaylistGrid/InfinitePlaylistGrid")
);

export default function Search() {
  let navigate = useNavigate();
  const [searchResults, setSearchResults] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  const [nextPage, setNextPage] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get("q");

  useEffect(() => {
    if (q) {
      // setIsLoading(true);
      api.search({ q }).then((results) => {
        setSearchResults(results.playlists.items);
        setNextPage(results.playlists.next);
        // setIsLoading(false);
      });
    }
  }, [q]);

  const getNextPage = () => {
    api.get({ url: nextPage }).then((results) => {
      setSearchResults([...searchResults, ...results.playlists.items]);
      setNextPage(results.playlists.next);
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchResults([]);
    const q = e.target.q.value;
    if (!q) {
      navigate("/search");
      return;
    }
    setSearchParams({ q });
  };

  return (
    <Layout>
      <header className="page-header">
        <SearchBar q={searchParams.get("q")} onSubmit={handleSearch} />
      </header>
      <main>
        {q ? (
          searchResults.length > 0 ? (
            <Suspense fallback={<InfinitePlaylistGridSkeleton />}>
              <InfinitePlaylistGrid
                playlists={searchResults.filter((res) => !!res)}
                getNextPage={getNextPage}
                hasMore={nextPage}
              />
            </Suspense>
          ) : (
            <InfinitePlaylistGridSkeleton />
          )
        ) : (
          <RecommendView />
        )}
      </main>
    </Layout>
  );
}
