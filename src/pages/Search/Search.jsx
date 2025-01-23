import "./Search.css";
import SearchBar from "../../components/SearchBar/SearchBar";
import Layout from "../../Layout";
import { Link, useSearchParams } from "react-router";
import { useEffect, useState } from "react";
import { api } from "../../utils/api";

export default function Search() {
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

  return (
    <Layout>
      <section className="search">
        <header>
          <SearchBar q={q} />
        </header>
        <main>
          <ul>
            {searchResults
              .filter((res) => !!res)
              .map((result) => (
                <li key={result.id}>
                  <Link to={`/playlists/${result.id}`}>{result.name}</Link>
                </li>
              ))}
          </ul>
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
