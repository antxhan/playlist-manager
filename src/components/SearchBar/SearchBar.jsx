import "./SearchBar.css";
import SearchIcon from "../../icons/SearchIcon";

export default function SearchBar({
  q = "",
  placeholder = "Search playlists...",
  onSubmit = (e) => {
    e.preventDefault();
  },
  onChange = null,
}) {
  return (
    <form className="search-bar" onSubmit={onSubmit}>
      <SearchIcon />
      <input
        type="text"
        name="q"
        placeholder={placeholder}
        defaultValue={q}
        onChange={onChange}
      />
    </form>
  );
}
