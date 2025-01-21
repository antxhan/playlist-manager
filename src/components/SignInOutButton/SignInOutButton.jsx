import { auth } from "../../utils/auth";

export default function SignInOutButton({ isSignedIn }) {
  return !isSignedIn ? (
    <button onClick={() => auth.signIn()}>Sign In</button>
  ) : (
    <button onClick={() => auth.signOut()}>Sign Out</button>
  );
}
