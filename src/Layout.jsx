import React, { useState, useEffect } from "react";
import Nav from "./components/Nav/Nav";
import GlobalPlayer from "./components/player/GlobalPlayer";

export default function Layout({ children }) {
	return (
		<>
			<Nav />
			{children}
			<GlobalPlayer />
		</>
	);
}
