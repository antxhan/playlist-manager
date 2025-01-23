import "./SearchBar.css";
import SearchIcon from "../../icons/SearchIcon";

export default function SearchBar({ q }) {
  return (
    <form className="search-bar">
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
