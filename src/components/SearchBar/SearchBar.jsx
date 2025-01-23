import "./SearchBar.css";
import SearchIcon from "../../icons/SearchIcon";
import { useNavigate } from "react-router";

export default function SearchBar({ q }) {
  let navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const q = e.target.q.value;
    navigate(`/search?q=${q}`);
  };
  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <SearchIcon />
      <input
        type="text"
        name="q"
        placeholder="Search playlists..."
        defaultValue={q}
      />
    </form>
  );
}
