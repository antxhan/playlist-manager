import "./Search.css";
import SearchBar from "../../components/SearchBar/SearchBar";
import Layout from "../../Layout";
import { useNavigate, useSearchParams } from "react-router";
import { useEffect, useState } from "react";
import { api } from "../../utils/api";
import PlaylistGrid from "../../components/PlaylistGrid/PlaylistGrid";

export default function Search() {
  let navigate = useNavigate();
  const [searchResults, setSearchResults] = useState([]);
  const [nextPage, setNextPage] = useState(null);
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q");

  useEffect(() => {
    if (q) {
      api.search.get(q).then((results) => {
        setSearchResults(results.playlists.items);
        setNextPage(results.playlists.next);
      });
    }
  }, [q]);

  const getNextPage = () => {
    api.get(nextPage).then((results) => {
      setSearchResults([...searchResults, ...results.playlists.items]);
      setNextPage(results.playlists.next);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const q = e.target.q.value;
    navigate(`/search?q=${q}`);
  };

  return (
    <Layout>
      <section className="search">
        <header>
          <SearchBar q={q} onSubmit={handleSubmit} />
        </header>
        <main>
          <PlaylistGrid playlists={searchResults.filter((res) => !!res)} />
          {searchResults.length > 0 ? (
            nextPage ? (
              <button onClick={() => getNextPage()}>Load more</button>
            ) : (
              <p>No more results</p>
            )
          ) : (
            ""
          )}
        </main>
      </section>
    </Layout>
  );
}
