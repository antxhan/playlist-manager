import "./Home.css";

export default function Home() {
  return (
    <section className="home">
      <header>
        <h1>Welcome user!</h1>
      </header>
      <main>
        <h2>Your Playlists</h2>
        <div>{"(Users playlists)"}</div>
      </main>
    </section>
  );
}
