import { auth } from "./auth";

export const db = {
  token: {
    get() {
      const token = JSON.parse(localStorage.getItem("token"));
      if (!token) {
        // user needs to sign in: auth.signIn();
        // auth.signIn();
        return null;
      } else if (token.expires_at < Date.now()) {
        if (token.refresh_token) {
          auth.refreshToken(token.refresh_token);
        } else {
          // user needs to sign in: auth.signIn();
          // do it automatically
          auth.signIn();
          return null;
        }
      }
      return token;
    },
    set(token) {
      token.expires_at = Date.now() + token.expires_in * 1000;
      // token.expires_at = Date.now() + 3 * 1000; // expires after 3 seconds for testing
      localStorage.setItem("token", JSON.stringify(token));
    },
    delete() {
      localStorage.removeItem("token");
    },
  },
  state: {
    // state for spotify auth
    get() {
      return sessionStorage.getItem("spotify_auth_state");
    },
    set(state) {
      sessionStorage.setItem("spotify_auth_state", state);
    },
  },
  returnTo: {
    // where to redirect the user after signing in
    get() {
      return sessionStorage.getItem("return_to");
    },
    set(url) {
      sessionStorage.setItem("return_to", url);
    },
  },
};
