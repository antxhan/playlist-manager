import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router";
import Playlists from "./pages/Playlists/Playlists";
import Nav from "./components/Nav/Nav";
import Callback from "./utils/callback/Callback";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <Nav />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="playlists" element={<Playlists />} />
        <Route path="callback" element={<Callback />} />
      </Routes>
    </React.StrictMode>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
