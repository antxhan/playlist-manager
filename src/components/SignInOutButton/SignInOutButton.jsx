import "./SignInOutButton.css";
import { useAuth } from "../../hooks/useAuth";
import { auth } from "../../utils/auth";
import SignInIcon from "../../icons/SignInIcon";
import SignOutIcon from "../../icons/SignOutIcon";

export default function SignInOutButton() {
  const isSignedIn = useAuth();
  return (
    <>
      <button
        className="sign-in-out-button"
        onClick={isSignedIn ? () => auth.signOut() : () => auth.signIn()}
      >
        {/* {isSignedIn ? "Sign Out" : "Sign In"} */}
        {isSignedIn ? <SignOutIcon /> : <SignInIcon />}
      </button>
      <span>{isSignedIn ? "Sign Out" : "Sign In"}</span>
    </>
  );
}
