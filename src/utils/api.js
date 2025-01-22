import { db } from "./db";

export const api = {
  playlists: {
    get() {
      return fetch("https://api.spotify.com/v1/me/playlists", {
        headers: {
          Authorization: `Bearer ${db.token.get().access_token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => data)
        .catch((error) => console.error("Error fetching playlists:", error));
    },
  },
};
