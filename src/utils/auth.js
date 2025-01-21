import { db } from "./db";
import { generateRandomString } from "./utils";
import { Buffer } from "buffer";

export const auth1 = {
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
    // // If token is already valid, redirect to home
    // const existingToken = db.getToken();
    // if (
    //   existingToken &&
    //   existingToken.expires_at > Date.now() &&
    //   existingToken.access_token
    // ) {
    //   console.log(existingToken.expires_at > Date.now());
    //   // window.location.href = "/";
    //   return;
    // } else if (existingToken && existingToken.refresh_token) {
    //   this.getRefreshToken();
    //   // window.location.href = "/";
    //   return;
    // }

    const existingToken = db.getToken();
    if (existingToken && existingToken.refresh_token) {
      this.getRefreshToken();
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
        db.setToken(data); // Save the token
        window.location.href = "/"; // Redirect to home
      })
      .catch((error) => console.error("Error fetching token:", error));
  },
  getRefreshToken() {
    const refreshToken = db.getToken().refresh_token;
    console.log("refresh token", refreshToken);
    // const url = "https://accounts.spotify.com/api/token";
    // const payload = {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/x-www-form-urlencoded",
    //   },
    //   body: new URLSearchParams({
    //     grant_type: "refresh_token",
    //     refresh_token: refreshToken,
    //     client_id: this.client_id,
    //   }),
    // };
    // fetch(url, payload)
    //   .then((response) => response.json())
    //   .then((data) => {
    //     db.setToken(data);
    //     window.location.href = "/";
    //   });
  },
};

export const auth = {
  client_id: process.env.REACT_APP_SPOTIFY_CLIENT_ID,
  client_secret: process.env.REACT_APP_SPOTIFY_CLIENT_SECRET,
  redirect_uri: window.location.origin + "/callback",
  signIn() {
    const state = generateRandomString(16);
    db.state.set(state);
    const params = new URLSearchParams({
      client_id: this.client_id,
      redirect_uri: this.redirect_uri,
      response_type: "code",
      scope: "user-read-private user-read-email",
      state,
    });
    const url = `https://accounts.spotify.com/authorize?${params.toString()}`;
    window.location.href = url; // redirect to spotify
    // this will then redirect to /callback which will get token
  },
  signOut() {
    db.token.delete();
    window.location.href = "/";
  },
  fetchToken(code) {
    const url = "https://accounts.spotify.com/api/token";
    console.log("Fetching new token...");
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
        db.token.set(data);
        window.location.href = "/";
      })
      .catch((error) => console.error("Error fetching token:", error));
  },
  refreshToken(refreshToken) {
    console.log(refreshToken);
    const url = "https://accounts.spotify.com/api/token";
    const payload = {
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
        grant_type: "refresh_token",
        refresh_token: refreshToken,
        // client_id: this.client_id,
      }),
    };
    fetch(url, payload)
      .then((response) => response.json())
      .then((data) => {
        db.token.set(data);
        // window.location.href = "/";
      });
  },
  authenticate() {
    const url = new URL(window.location.href);
    const code = url.searchParams.get("code");
    const returnedState = url.searchParams.get("state");
    const storedState = db.state.get();
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
      // console.log("Authorization code received:", code);
      this.fetchToken(code); // Exchange the code for a token
    } else {
      window.location.href =
        "/#" +
        new URLSearchParams({
          error: "no-code",
        }).toString();
    }
  },
};
