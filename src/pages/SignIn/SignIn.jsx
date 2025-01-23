import "./SignIn.css";
import SignInWithSpotifyButton from "../../components/SignInWithSpotifyButton/SignInWithSpotifyButton";

export default function SignIn() {
  return (
    <section className="sign-in">
      <header>
        <h1>Playlist Manager</h1>
      </header>
      <main>
        <div className="sing-in__window">
          <p>Please sign in to continue</p>
          <SignInWithSpotifyButton />
        </div>
      </main>
    </section>
  );
}
