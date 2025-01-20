export async function getSpotifyToken() {
  try {
    const response = await fetch("/.netlify/functions/spotify-auth");
    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error("Error fetching token:", error);
  }
}
