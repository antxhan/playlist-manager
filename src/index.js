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
import { Toaster } from "react-hot-toast";
import SearchSkeleton from "./pages/Search/Skeleton";

const token = db.token.get();

// refactor to its own component
const AppRoutes = () => (
  <Routes>
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
  </Routes>
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <React.StrictMode>
      {token ? (
        <PlayerProvider token={token}>
          {/* refactor for readability */}
          <AppRoutes />
          <GlobalPlayer />
        </PlayerProvider>
      ) : (
        <AppRoutes />
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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
