import { db } from "./db";
import FetchError from "./fetchError";

const BASE_URL = "https://api.spotify.com/v1/";

// break out function for readability
const handleResponse = (res) => {
  if (!res.ok) {
    throw new FetchError("HTTP error!", res.status);
  }
  return res.json();
};

// break out function for readability
const handleError = (error) => {
  console.error("Error:", error);
  throw error;
};

// break out duplicate code for readability
const getHeaders = () => ({
  Authorization: `Bearer ${db.token.get().access_token}`,
  "Content-Type": "application/json",
});

export const api = {
  // refactor for better readability
  baseUrl: BASE_URL,

  get({ url = "", endpoint = "", params = null }) {
    if (!url) {
      url = this._createUrl(endpoint, params);
    }
    return fetch(url, {
      method: "GET",
      headers: getHeaders(),
    })
      .then(handleResponse)
      .catch(handleError);
  },

  post({ endpoint = "", body = {}, returnJSON = false }) {
    return fetch(this.baseUrl + endpoint, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(body),
    })
      .then((res) => (returnJSON ? handleResponse(res) : res))
      .catch(handleError);
  },

  put({ endpoint = "", body = {} }, returnJSON = false) {
    return fetch(this.baseUrl + endpoint, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(body),
    })
      .then((res) => (returnJSON ? handleResponse(res) : res))
      .catch(handleError);
  },

  delete({ url = "", endpoint = "", params = null }) {
    if (!url) {
      url = this._createUrl(endpoint, params);
    }
    return fetch(url.href, {
      method: "DELETE",
      headers: getHeaders(),
    })
      .then((res) => res.text())
      .then((data) => (data ? JSON.parse(data) : null))
      .catch(handleError);
  },

  me: {
    get: () => api.get({ endpoint: "me" }),
    playlists: () => api.get({ endpoint: "me/playlists" }),
    top: (type = "artists", limit = 50) =>
      api.get({ endpoint: `me/top/${type}`, params: { limit } }),
  },

  playlist: {
    get: (id) => {
      const fields = [
        "images",
        "name",
        "description",
        "tracks",
        "owner(display_name)",
      ].join(",");
      return api.get({ endpoint: `playlists/${id}`, params: { fields } });
    },
    tracks: ({ id, limit = 100, offset = 0 }) =>
      api.get({
        endpoint: `playlists/${id}/tracks`,
        params: { limit, offset },
      }),
  },

  search: ({ q, type = "playlist", limit = 50 }) =>
    api.get({ endpoint: "search", params: { q, type, limit } }),

  player: {
    get: () => api.get({ endpoint: "me/player" }),
    play: () => api.put({ endpoint: "me/player/play" }),
    pause: () => api.put({ endpoint: "me/player/pause" }),
    next: (deviceId) =>
      api.post({ endpoint: "me/player/next", body: { device_id: deviceId } }),
    previous: (deviceId) =>
      api.post({
        endpoint: "me/player/previous",
        body: { device_id: deviceId },
      }),
    transferPlaybackToPlayer: (deviceId) =>
      api.put({
        endpoint: "me/player",
        body: { device_ids: [deviceId], play: false },
      }),
    setVolume: (volumePercent) =>
      api.put({ endpoint: `me/player/volume?volume_percent=${volumePercent}` }),
  },

  track: {
    play: ({ trackUri, playlistId, deviceId }) => {
      if (!deviceId) throw new Error("No device ID found");
      return api.put({
        endpoint: `me/player/play`,
        body: {
          context_uri: `spotify:playlist:${playlistId}`,
          offset: { uri: trackUri },
          device_id: deviceId,
        },
      });
    },
  },

  _createUrl(endpoint, params) {
    const url = new URL(this.baseUrl + endpoint);
    if (params) {
      url.search = new URLSearchParams(
        Object.entries(params).filter(([key, value]) => value != null)
      );
    }
    return url;
  },
};

export default api;
