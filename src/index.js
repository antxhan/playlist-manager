import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router";
import Playlists from "./pages/Playlists/Playlists";
import Playlist from "./pages/Playlist/Playlist";
import Callback from "./utils/callback/Callback";
import NotFound from "./pages/NotFound/NotFound";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Search from "./pages/Search/Search";
import { PlayerProvider } from "./components/player/PlayerContext";
import { db } from "./utils/db";

const token = db.token.get();
const routes = (
  <Routes>
    <Route path="/" element={<App />} />
    <Route path="callback" element={<Callback />} />
    <Route path="*" element={<NotFound />} />
    <Route element={<ProtectedRoute loading={<div>Loading...</div>} />}>
      <Route path="playlists" element={<Playlists />} />
    </Route>
    <Route element={<ProtectedRoute loading={<div>Loading...</div>} />}>
      <Route path="/playlists/:id" element={<Playlist />} />
    </Route>
    <Route element={<ProtectedRoute loading={<div>Loading...</div>} />}>
      <Route path="/search?" element={<Search />} />
    </Route>
  </Routes>
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <React.StrictMode>
      {token ? (
        <PlayerProvider token={token}>{routes}</PlayerProvider>
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
