import { db } from "./db";

export const api = {
  get(url) {
    // generic GET request with all headers
    return fetch(url, {
      headers: {
        Authorization: `Bearer ${db.token.get().access_token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => data)
      .catch((error) => console.error("Error fetching data:", error));
  },
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
  playlist: {
    get(playlistID) {
      return fetch(`https://api.spotify.com/v1/playlists/${playlistID}`, {
        headers: {
          Authorization: `Bearer ${db.token.get().access_token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => data)
        .catch((error) => console.error("Error fetching playlist:", error));
    },
  },
  search: {
    get(q, limit = 10) {
      return fetch(
        `https://api.spotify.com/v1/search?q=${q}&type=playlist&limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${db.token.get().access_token}`,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => data)
        .catch((error) =>
          console.error("Error fetching search results:", error)
        );
    },
  },
};
