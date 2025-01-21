import { useAuth } from "../../hooks/useAuth";
import { auth } from "../../utils/auth";

export default function SignInOutButton() {
  const isSignedIn = useAuth();
  return !isSignedIn ? (
    <button onClick={() => auth.signIn()}>Sign In</button>
  ) : (
    <button onClick={() => auth.signOut()}>Sign Out</button>
  );
}
