import { db } from "./db";
import { generateRandomString } from "./utils";
import { Buffer } from "buffer";

export const auth = {
  client_id: process.env.REACT_APP_SPOTIFY_CLIENT_ID,
  client_secret: process.env.REACT_APP_SPOTIFY_CLIENT_SECRET,
  redirect_uri: window.location.origin + "/callback",

  async logIn() {
    const scope = "user-read-private user-read-email";
    const state = generateRandomString(16); // Generate a random state
    sessionStorage.setItem("spotify_auth_state", state); // Store the state in sessionStorage

    const params = new URLSearchParams({
      client_id: this.client_id,
      redirect_uri: this.redirect_uri,
      response_type: "code",
      scope,
      state, // Include the generated state in the request
    });
    const url = `https://accounts.spotify.com/authorize?${params.toString()}`;
    window.location.href = url; // Redirect to Spotify
  },

  getAuthCode() {
    const url = new URL(window.location.href);
    const code = url.searchParams.get("code");
    const returnedState = url.searchParams.get("state"); // Get the state from the query params
    const storedState = sessionStorage.getItem("spotify_auth_state"); // Retrieve the stored state
    const error = url.searchParams.get("error");

    if (error) {
      console.error("Spotify error:", error);
      window.location.href =
        "/#" +
        new URLSearchParams({
          error: error,
        }).toString();
      return;
    }

    if (returnedState === null || returnedState !== storedState) {
      console.error("State mismatch");
      console.log("Returned state:", returnedState);
      console.log("Stored state:", storedState);

      window.location.href =
        "/#" +
        new URLSearchParams({
          error: "state_mismatch",
        }).toString();
      return;
    }

    if (code) {
      console.log("Authorization code received:", code);
      this.getToken(code); // Exchange the code for a token
    } else {
      window.location.href =
        "/#" +
        new URLSearchParams({
          error: "no-code",
        }).toString();
    }
  },

  getToken(code) {
    console.log("Authorization code:", code);

    // If token is already valid, redirect to home
    const existingToken = db.getToken();
    if (
      existingToken &&
      existingToken.access_token &&
      existingToken.expires_at > Date.now()
    ) {
      window.location.href = "/";
      return;
    }

    const url = "https://accounts.spotify.com/api/token";
    console.log("Fetching token...");
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          Buffer.from(this.client_id + ":" + this.client_secret).toString(
            "base64"
          ),
      },
      body: new URLSearchParams({
        code: code,
        redirect_uri: this.redirect_uri,
        grant_type: "authorization_code",
      }).toString(),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          console.error("Error fetching token:", data.error);
          return;
        }
        console.log("Token received:", data);
        db.setToken(data); // Save the token
        window.location.href = "/"; // Redirect to home
      })
      .catch((error) => console.error("Error fetching token:", error));
  },
};
