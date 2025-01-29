// import "./Search.css";
import SearchBar from "../../components/SearchBar/SearchBar";
import Layout from "../../Layout";
import { useSearchParams } from "react-router";
import { useEffect, useState } from "react";
import { api } from "../../utils/api";
import InfinitePlaylistGrid from "../../components/InfinitePlaylistGrid/InfinitePlaylistGrid";

export default function Search() {
  const [searchResults, setSearchResults] = useState([]);
  const [nextPage, setNextPage] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get("q");

  useEffect(() => {
    if (q) {
      api.search({ q }).then((results) => {
        setSearchResults(results.playlists.items);
        setNextPage(results.playlists.next);
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
    const q = e.target.q.value;
    setSearchParams({ q });
  };

  return (
    <Layout>
      <header>
        <SearchBar q={q} onSubmit={handleSearch} />
      </header>
      <main>
        <InfinitePlaylistGrid
          playlists={searchResults.filter((res) => !!res)}
          getNextPage={getNextPage}
          hasMore={nextPage}
        />
      </main>
    </Layout>
  );
}
