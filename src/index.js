import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router";
import Playlist from "./pages/Playlist/Playlist";
import Callback from "./utils/callback/Callback";
import NotFound from "./pages/NotFound/NotFound";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Search from "./pages/Search/Search";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import { PlayerProvider } from "./components/Player/PlayerContext";
import { db } from "./utils/db";
import GlobalPlayer from "./components/Player/GlobalPlayer";

const token = db.token.get();
const routes = (
	<>
		<Route path="/" element={<App />} />
		<Route path="callback" element={<Callback />} />
		<Route path="*" element={<NotFound />} />
		<Route path="/error" element={<ErrorPage />} />
		<Route element={<ProtectedRoute loading={<div>Loading...</div>} />}>
			<Route path="/playlists/:id" element={<Playlist />} />
		</Route>
		<Route element={<ProtectedRoute loading={<div>Loading...</div>} />}>
			<Route path="/search?" element={<Search />} />
		</Route>
	</>
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<BrowserRouter>
		<React.StrictMode>
			{token ? (
				<PlayerProvider token={token}>
					{<Routes>{routes}</Routes>}
					<GlobalPlayer />
				</PlayerProvider>
			) : (
				<Routes>{routes}</Routes>
			)}
		</React.StrictMode>
	</BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
