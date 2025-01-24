import { db } from "./db";

export const api = {
  get({ url = "", endpoint = "", params = null, method = "GET" }) {
    // if no url, construct it from endpoint and params
    if (!url) {
      url = this._createUrl(endpoint, params);
    }

    // makes request to api and returns data
    return fetch(url, {
      method: method,
      headers: {
        Authorization: `Bearer ${db.token.get().access_token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => data)
      .catch((error) => console.error("Error fetching data:", error));
  },
  _createUrl(endpoint, params) {
    const baseUrl = "https://api.spotify.com/v1/";
    const url = new URL(baseUrl + endpoint);

    // appends params to url if their value exists
    if (params) {
      url.search = new URLSearchParams(
        Object.entries(params).filter(([key, value]) => value != null)
      );
    }

    return url;
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
    info: {
      get(id) {
        return fetch(
          `https://api.spotify.com/v1/playlists/${id}?fields=images,name,description,tracks(total)`,
          {
            headers: {
              Authorization: `Bearer ${db.token.get().access_token}`,
            },
          }
        )
          .then((res) => res.json())
          .then((data) => data)
          .catch((error) => console.error("Error fetching playlist:", error));
      },
    },
    tracks: {
      get(id, limit, offset) {
        return fetch(
          `https://api.spotify.com/v1/playlists/${id}/tracks?limit=${limit}&offset=${offset}`,
          {
            headers: {
              Authorization: `Bearer ${db.token.get().access_token}`,
            },
          }
        )
          .then((res) => res.json())
          .then((data) => data)
          .catch((error) => console.error("Error fetching playlists:", error));
      },
    },
  },
  search({ q, type = "playlist", limit = 50 }) {
    return this.get({ endpoint: "search", params: { q, type, limit } });
  },
};
