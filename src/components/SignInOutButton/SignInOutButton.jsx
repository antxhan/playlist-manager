import "./SignInOutButton.css";
import { useAuth } from "../../hooks/useAuth";
import { auth } from "../../utils/auth";

export default function SignInOutButton() {
  const isSignedIn = useAuth();
  return (
    <button
      className="sign-in-out-button"
      onClick={isSignedIn ? () => auth.signOut() : () => auth.signIn()}
    >
      {isSignedIn ? "Sign Out" : "Sign In"}
    </button>
  );
}
