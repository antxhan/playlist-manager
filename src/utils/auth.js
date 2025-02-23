import { db } from "./db";
import { generateRandomString } from "./utils";
import { Buffer } from "buffer";

// break out constants for readability
const SPOTIFY_AUTH_URL = "https://accounts.spotify.com/authorize";
const SPOTIFY_TOKEN_URL = "https://accounts.spotify.com/api/token";
const SCOPES = [
  "streaming",
  "user-top-read",
  "user-read-private",
  "user-read-email",
  "user-read-playback-state",
  "user-modify-playback-state",
  "user-read-currently-playing",
  "playlist-modify-public",
  "playlist-modify-private",
  "playlist-read-private",
  "playlist-read-collaborative",
].join(" ");

// break out function for readability
const getAuthHeader = (clientId, clientSecret) =>
  "Basic " + Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

// break out function for readability
const handleError = (error) => {
  console.error("Spotify error:", error);
  window.location.href = `/#${new URLSearchParams({ error }).toString()}`;
};

export const auth = {
  // refactor function for better readability
  client_id: process.env.REACT_APP_SPOTIFY_CLIENT_ID,
  client_secret: process.env.REACT_APP_SPOTIFY_CLIENT_SECRET,
  redirect_uri: `${window.location.origin}/callback`,

  signIn() {
    const state = generateRandomString(16);
    db.state.set(state);
    db.returnTo.set(window.location.href);

    const params = new URLSearchParams({
      client_id: this.client_id,
      redirect_uri: this.redirect_uri,
      response_type: "code",
      scope: SCOPES,
      state,
    });

    window.location.href = `${SPOTIFY_AUTH_URL}?${params.toString()}`;
  },

  signOut() {
    db.token.delete();
    window.location.href = "/";
  },

  async fetchToken(code) {
    try {
      const response = await fetch(SPOTIFY_TOKEN_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: getAuthHeader(this.client_id, this.client_secret),
        },
        body: new URLSearchParams({
          code,
          redirect_uri: this.redirect_uri,
          grant_type: "authorization_code",
        }).toString(),
      });

      const data = await response.json();
      if (data.error) throw new Error(data.error);

      db.token.set(data);
      window.location.href = db.returnTo.get();
    } catch (error) {
      handleError(error.message);
    }
  },

  async refreshToken(refreshToken) {
    try {
      const response = await fetch(SPOTIFY_TOKEN_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: getAuthHeader(this.client_id, this.client_secret),
        },
        body: new URLSearchParams({
          grant_type: "refresh_token",
          refresh_token: refreshToken,
        }).toString(),
      });

      const data = await response.json();
      if (data.error) throw new Error(data.error);

      db.token.set(data);
    } catch (error) {
      handleError(error.message);
    }
  },

  authenticate() {
    const url = new URL(window.location.href);
    const code = url.searchParams.get("code");
    const returnedState = url.searchParams.get("state");
    const storedState = db.state.get();
    const error = url.searchParams.get("error");

    if (error) return handleError(error);
    if (returnedState !== storedState) return handleError("state_mismatch");
    if (code) return this.fetchToken(code);

    handleError("no-code");
  },
};
