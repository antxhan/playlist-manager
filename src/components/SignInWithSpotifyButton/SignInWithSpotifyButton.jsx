import "./SignInWithSpotifyButton.css";
import { auth } from "../../utils/auth";

export default function SignInWithSpotifyButton() {
  return (
    <button
      className="sign-in-with-spotify-button"
      onClick={() => auth.signIn()}
    >
      <span>Sign in with</span>
      <img src="/images/spotify.svg" alt="spotify" width={128} />
    </button>
  );
}
