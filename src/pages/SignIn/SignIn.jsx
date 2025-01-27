import "./SignIn.css";
import SignInWithSpotifyButton from "../../components/SignInWithSpotifyButton/SignInWithSpotifyButton";

export default function SignIn() {
  return (
    <>
      <header className="sign-in__header">
        <h1>Playlist Manager</h1>
      </header>
      <main className="sign-in__main">
        <div className="sing-in__window">
          <p>Please sign in to continue</p>
          <SignInWithSpotifyButton />
        </div>
      </main>
    </>
  );
}
