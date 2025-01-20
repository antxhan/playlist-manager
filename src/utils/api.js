import { Buffer } from "buffer";

export const api = {
  async auth() {
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

    // Encode credentials for Basic Auth
    const authString = Buffer.from(`${clientId}:${clientSecret}`).toString(
      "base64"
    );

    try {
      const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
          Authorization: `Basic ${authString}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: "grant_type=client_credentials",
      });

      const data = await response.json();

      return {
        data,
      };
    } catch (error) {
      return {
        body: JSON.stringify({ error: "Failed to fetch token" }),
      };
    }
  },
};
