import "./SearchBar.css";
import SearchIcon from "../../icons/SearchIcon";
import { useEffect, useState } from "react";

export default function SearchBar({
  // more descripive variable names
  q = "",
  placeholder = "Search playlists...",
  onSubmit = (e) => {
    e.preventDefault();
  },
}) {
  const [newQ, setNewQ] = useState(q);

  const onChange = (e) => {
    setNewQ(e.target.value);
  };

  useEffect(() => {
    onChange({ target: { value: q } });
  }, [q]);

  useEffect(() => {
    setNewQ(q ?? "");
  }, [q]);

  return (
    <form className="search-bar" onSubmit={onSubmit}>
      <SearchIcon />
      <input
        type="text"
        name="q"
        placeholder={placeholder}
        value={newQ || ""}
        onChange={onChange}
      />
    </form>
  );
}
