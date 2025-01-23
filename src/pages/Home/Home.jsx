import "./Home.css";
import SearchBar from "../../components/SearchBar/SearchBar";

export default function Home() {
  const handleChange = (e) => {
    console.log(e.target.value);
  };
  return (
    <section className="home">
      <header>
        <h1>Welcome user!</h1>
        <SearchBar
          placeholder="Search your playlists..."
          onChange={handleChange}
        />
      </header>
      <main>
        <h2>Your Playlists</h2>
        <div>{"(Users playlists)"}</div>
      </main>
    </section>
  );
}
