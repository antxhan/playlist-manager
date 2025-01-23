import React, { useState, useEffect } from "react";
import Nav from "./components/Nav/Nav";

export default function Layout({ children }) {
	return (
		<>
			<Nav />
			{children}
		</>
	);
}
