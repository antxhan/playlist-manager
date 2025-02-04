import "./SignInWithSpotifyButton.css";
import { auth } from "../../utils/auth";
import StandardButton from "../buttons/StandardButton/StandardButton";

export default function SignInWithSpotifyButton() {
  return (
    <StandardButton
      className="sign-in-with-spotify-button"
      onClick={() => auth.signIn()}
    >
      <span>Sign in with</span>
      <img src="/images/spotify.svg" alt="spotify" width={128} />
    </StandardButton>
  );
}
