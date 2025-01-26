import "./Home.css";
import SearchBar from "../../components/SearchBar/SearchBar";
import PlaylistGrid from "../../components/PlaylistGrid/PlaylistGrid";
import { useEffect, useState } from "react";
import { api } from "../../utils/api";

export default function Home() {
  const [user, setUser] = useState(null);
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    api.me().then((user) => {
      console.log(user);
      setUser(user);
    });
    api.me.playlists().then((playlists) => setPlaylists(playlists.items));
  }, []);

  const handleChange = (e) => {
    console.log(e.target.value);
  };

  return (
    <div className="home-wrapper">
      <section className="home">
        <header>
          <h1>Welcome {user ? user.display_name : ""}!</h1>
        </header>
        <main>
          <div className="main__header">
            <h2>Your Playlists</h2>
            <SearchBar
              placeholder="Search your playlists..."
              onChange={handleChange}
            />
          </div>
          <PlaylistGrid playlists={playlists} />
        </main>
      </section>
    </div>
  );
}
