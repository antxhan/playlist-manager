import { auth } from "./auth";

export const db = {
  token: {
    get() {
      const token = JSON.parse(localStorage.getItem("token"));
      if (!token) {
        // user needs to sign in: auth.signIn();
        return null;
      } else if (token.expires_at < Date.now()) {
        if (token.refresh_token) {
          auth.refreshToken(token.refresh_token);
          // return this.get();
        } else {
          // user needs to sign in: auth.signIn();
          return null;
        }
      }
      return token;
    },
    set(token) {
      // token.expires_at = Date.now() + token.expires_in * 1000;
      token.expires_at = Date.now() + 3 * 1000;
      localStorage.setItem("token", JSON.stringify(token));
    },
    delete() {
      localStorage.removeItem("token");
    },
  },
  state: {
    get() {
      return sessionStorage.getItem("spotify_auth_state");
    },
    set(state) {
      sessionStorage.setItem("spotify_auth_state", state);
    },
  },
};
