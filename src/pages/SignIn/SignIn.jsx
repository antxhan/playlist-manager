import "./SignIn.css";
import FrequencyBars from "../../components/FrequencyBars/FrequencyBars";
import SignInWithSpotifyButton from "../../components/SignInWithSpotifyButton/SignInWithSpotifyButton";

export default function SignIn() {
  return (
    <div className="sign-in">
      <header className="sign-in__header">
        <h1>Playlist Manager</h1>
      </header>
      <FrequencyBars />
      <main className="sign-in__main">
        <div className="sign-in__window">
          <p>Please sign in to continue</p>
          <SignInWithSpotifyButton />
        </div>
      </main>
    </div>
  );
}
