import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import { Toaster } from "react-hot-toast";
import "./index.css";
import App from "./App.jsx";
import Playlist from "./pages/Playlist/Playlist";
import Callback from "./utils/callback/Callback";
import NotFound from "./pages/NotFound/NotFound";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Search from "./pages/Search/Search";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import { PlayerProvider } from "./components/Player/PlayerContext";
import { db } from "./utils/db";
import GlobalPlayer from "./components/Player/GlobalPlayer";
import SearchSkeleton from "./pages/Search/Skeleton";

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
    <Route element={<ProtectedRoute loading={<SearchSkeleton />} />}>
      <Route path="/search?" element={<Search />} />
    </Route>
  </>
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <React.StrictMode>
      {token ? (
        <PlayerProvider token={token}>
          <Routes>{routes}</Routes>
          <GlobalPlayer />
        </PlayerProvider>
      ) : (
        <Routes>{routes}</Routes>
      )}
      <Toaster
        toastOptions={{
          className: "",
          style: {
            border: "1px solid #713200",
            padding: "16px",
            color: "#713200",
          },
        }}
      />
    </React.StrictMode>
  </BrowserRouter>
);
