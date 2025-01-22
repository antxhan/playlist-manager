import Nav from "./components/Nav/Nav";
import Player from "./components/player/Player";
import { db } from "./utils/db";
import { auth } from "./utils/auth";

export default function Layout({ children }) {
	const token = db.token.get();
	const isSignedIn = auth.signIn;

	return (
		<>
			<Nav />
			{children}
			{isSignedIn ? <Player token={token} /> : <h1>log in bro</h1>}
		</>
	);
}
