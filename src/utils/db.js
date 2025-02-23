import { auth } from "./auth";

// break down the storage object into smaller functions
const storage = {
  get: (key, storageType = localStorage) =>
    JSON.parse(storageType.getItem(key)),
  set: (key, value, storageType = localStorage) =>
    storageType.setItem(key, JSON.stringify(value)),
  delete: (key, storageType = localStorage) => storageType.removeItem(key),
};

// handle token expiration
const handleTokenExpiration = (token) => {
  if (token.expires_at < Date.now()) {
    if (token.refresh_token) {
      auth.refreshToken(token.refresh_token);
    } else {
      return null;
    }
  }
  return token;
};

export const db = {
  // refactor the token object for better readability
  token: {
    get() {
      const token = storage.get("token");
      return token ? handleTokenExpiration(token) : null;
    },
    set(token) {
      token.expires_at = Date.now() + token.expires_in * 1000;
      storage.set("token", token);
    },
    delete() {
      storage.delete("token");
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
  returnTo: {
    get() {
      return sessionStorage.getItem("return_to");
    },
    set(url) {
      sessionStorage.setItem("return_to", url);
    },
  },
};
