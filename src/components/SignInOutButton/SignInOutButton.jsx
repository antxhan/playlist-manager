import "./SignInOutButton.css";
import { useAuth } from "../../hooks/useAuth";
import { auth } from "../../utils/auth";
import SignInIcon from "../../icons/SignInIcon";
import SignOutIcon from "../../icons/SignOutIcon";
import ToolTip from "../ToolTip/ToolTip";

export default function SignInOutButton() {
  const isSignedIn = useAuth();
  return (
    <>
      <button
        className="sign-in-out-button"
        onClick={isSignedIn ? () => auth.signOut() : () => auth.signIn()}
        aria-label={isSignedIn ? "Sign Out" : "Sign In"}
      >
        {isSignedIn ? <SignOutIcon /> : <SignInIcon />}
      </button>
      <ToolTip text={isSignedIn ? "Sign Out" : "Sign In"} postition="right" />
    </>
  );
}
