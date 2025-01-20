import { Buffer } from "buffer";

// functions/spotify-auth.js
// import fetch from "node-fetch";

// We'll store the token and its expiration in memory
// Note: This will reset when the function cold starts
let cachedToken = null;
let tokenExpiration = null;

export default async function handler(request, context) {
  const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;

  // Check if we have a valid cached token
  if (cachedToken && tokenExpiration && Date.now() < tokenExpiration) {
    return new Response(JSON.stringify({ access_token: cachedToken }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  }

  try {
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(
          `${clientId}:${clientSecret}`
        ).toString("base64")}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "grant_type=client_credentials",
    });

    if (!response.ok) {
      throw new Error(`Spotify API responded with status: ${response.status}`);
    }

    const data = await response.json();

    // Cache the token and set expiration
    cachedToken = data.access_token;
    // Set expiration 5 minutes early to be safe
    tokenExpiration = Date.now() + (data.expires_in - 300) * 1000;

    return new Response(
      JSON.stringify({
        access_token: data.access_token,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  } catch (error) {
    console.error("Function error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
