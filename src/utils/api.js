import localSpotifyAuth from "./localSpotifyAuth";
// import { Buffer } from "buffer";
// import spotifyAuth from "../../netlify/functions/spotify-auth";

export async function getSpotifyToken() {
  if (process.env.NODE_ENV === "development") {
    return await localSpotifyAuth();
    // return "BQDa_l_zaXU3Y3xeRTR0Nc3ZOiXA6YeXIaJBLQkqijqo7DRTCTrxiav2bU5pyyU4ZkP9";
  } else {
    try {
      // Get the base URL depending on environment
      const baseUrl = "http://localhost:8888";

      const response = await fetch(
        `${baseUrl}/.netlify/functions/spotify-auth`
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch token");
      }
      const data = await response.json();
      return data.access_token;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }
}
