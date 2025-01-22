import React, { useState, useEffect } from "react";
import Nav from "./components/Nav/Nav";
import Player from "./components/player/Player";
import { db } from "./utils/db";
import { auth } from "./utils/auth";

export default function Layout({ children }) {
	const [token, setToken] = useState(null);
	const isSignedIn = auth.signIn;

	useEffect(() => {
		// Simulate async token retrieval
		const fetchToken = async () => {
			const retrievedToken = await db.token.get();
			setToken(retrievedToken);
		};

		fetchToken();
	}, []);

	return (
		<>
			<Nav />
			<main>{children}</main>
			{isSignedIn ? token ? <Player token={token} /> : "" : <h1>Log in bro</h1>}
		</>
	);
}
