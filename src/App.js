import "./App.css";
import SignInWithSpotifyButton from "./components/SignInWithSpotifyButton/SignInWithSpotifyButton";
import { useAuth } from "./hooks/useAuth";
import Layout from "./Layout";

function App() {
  const isSignedIn = useAuth();

  return (
    <Layout>
      <section className="home">
        <header>
          <h1>{isSignedIn ? "Welcome user!" : "Playlist Manager"}</h1>
        </header>
        {isSignedIn ? <HomeView /> : <SignInView />}
      </section>
    </Layout>
  );
}

function HomeView() {
  return (
    <main>
      <h2>Your Playlists</h2>
      <div>{"(Users playlists)"}</div>
    </main>
  );
}

function SignInView() {
  return (
    <main className="home__main--sign-in">
      <div className="home__sing-in-window">
        <p>Please sign in to continue</p>
        <SignInWithSpotifyButton />
      </div>
    </main>
  );
}

export default App;
