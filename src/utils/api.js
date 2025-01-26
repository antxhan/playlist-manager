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
};
