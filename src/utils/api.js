import { db } from "./db";

export const api = {
  baseUrl: "https://api.spotify.com/v1/",
  get({ url = "", endpoint = "", params = null }) {
    // if no url, construct it from endpoint and params
    if (!url) {
      url = this._createUrl(endpoint, params);
    }

    // makes request to api and returns data
    return fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${db.token.get().access_token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => data)
      .catch((error) => console.error("Error fetching data:", error));
  },
  post({ endpoint = "", body = {}, returnJSON = false }) {
    return fetch(this.baseUrl + endpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${db.token.get().access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => {
        if (returnJSON) return res.json();
        else return res;
      })
      .then((data) => data)
      .catch((error) => console.error("Error posting data:", error));
  },
  put({ endpoint = "", body = {} }, returnJSON = false) {
    return fetch(this.baseUrl + endpoint, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${db.token.get().access_token}`,
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : null,
    })
      .then((res) => {
        if (returnJSON) return res.json();
        else return res;
      })
      .then((data) => data)
      .catch((error) => console.error("Error putting data:", error));
  },
  me: Object.assign(
    () => {
      return api.get({ endpoint: "me" });
    },
    {
      playlists() {
        return api.get({ endpoint: "me/playlists" });
      },
    }
  ),
  playlist: Object.assign(
    (id) => {
      const fields = ["images", "name", "description", "tracks(total)"].join(
        ","
      );
      return api.get({ endpoint: `playlists/${id}`, params: { fields } });
    },
    {
      tracks({ id, limit = 100, offset = 0 }) {
        return api.get({
          endpoint: `playlists/${id}/tracks`,
          params: { limit, offset },
        });
      },
    }
  ),
  search({ q, type = "playlist", limit = 50 }) {
    return this.get({ endpoint: "search", params: { q, type, limit } });
  },
  player: Object.assign(
    () => {
      return api.get({ endpoint: "me/player" });
    },
    {
      play() {
        return api.put({
          endpoint: "me/player/play",
        });
      },
    },
    {
      pause() {
        return api.put({
          endpoint: "me/player/pause",
        });
      },
    },
    {
      next(deviceId) {
        return api.post({
          endpoint: "me/player/next",
          body: { device_id: deviceId },
        });
      },
    },
    {
      previous(deviceId) {
        return api.post({
          endpoint: "me/player/previous",
          body: { device_id: deviceId },
        });
      },
    },
    {
      transferPlaybackToPlayer(deviceId) {
        return api.put({
          endpoint: "me/player",
          body: {
            device_ids: [deviceId],
            play: false,
          },
        });
      },
    }
  ),
  track: Object.assign(() => {}, {
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
  }),
  _createUrl(endpoint, params) {
    const url = new URL(this.baseUrl + endpoint);

    // appends params to url if their value exists
    if (params) {
      url.search = new URLSearchParams(
        Object.entries(params).filter(([key, value]) => value != null)
      );
    }

    return url;
  },
};
