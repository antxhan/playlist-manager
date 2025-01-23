import React, { useState, useEffect, useRef } from "react";
import {
	transferPlaybackToPlayer,
	togglePlayPause,
	skipToNextTrack,
	skipToPreviousTrack,
} from "./helperFunctions/spotifyPlayerHelpers";
import "./Player.css";

const Player = ({ token, track }) => {
	const [player, setPlayer] = useState(null);
	const [deviceId, setDeviceId] = useState(null);
	const [is_paused, setPaused] = useState(true); // Start in paused state
	const [currentTrack, setCurrentTrack] = useState(track || {}); // Set initial track if available

	const sdkInitializedRef = useRef(false);

	useEffect(() => {
		if (sdkInitializedRef.current) return;
		sdkInitializedRef.current = true;

		// Load the Spotify SDK
		const embedSpotifyPlayerSDK = document.createElement("script");
		embedSpotifyPlayerSDK.src = "https://sdk.scdn.co/spotify-player.js";
		embedSpotifyPlayerSDK.async = true;
		document.body.appendChild(embedSpotifyPlayerSDK);

		// Initialize the player
		window.onSpotifyWebPlaybackSDKReady = () => {
			const playerInstance = new window.Spotify.Player({
				name: "THE PLAYLIST MANAGER",
				getOAuthToken: (cb) => cb(token.access_token),
				volume: 0.5,
			});

			setPlayer(playerInstance);

			playerInstance.addListener("ready", ({ device_id }) => {
				setDeviceId(device_id);
				transferPlaybackToPlayer(device_id, token.access_token); // Transfer playback to the web player
			});

			playerInstance.addListener("player_state_changed", (state) => {
				if (!state) return;
				setCurrentTrack(state.track_window.current_track);
				setPaused(state.paused);
			});

			playerInstance.connect().then((connected) => {
				if (connected) {
					console.log("Player connected.");
				} else {
					console.error("Player connection failed.");
				}
			});
		};

		return () => {
			if (player) player.disconnect();
		};
	}, [token.access_token]);

	// Play the selected track using the Spotify Web API
	useEffect(() => {
		if (track && deviceId) {
			const playTrack = async () => {
				try {
					await fetch("https://api.spotify.com/v1/me/player/play", {
						method: "PUT",
						headers: {
							Authorization: `Bearer ${token.access_token}`,
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							uris: [`spotify:track:${track.id}`], // Play the selected track
							device_id: deviceId, // Specify the Web Playback SDK device ID
						}),
					});
					setPaused(false); // Ensure the play button reflects the playing state
				} catch (error) {
					console.error("Error playing track:", error);
				}
			};

			playTrack();
		}
	}, [track, deviceId, token.access_token]);

	const handlePlayPause = async () => {
		togglePlayPause(is_paused, token.access_token);
		setPaused(!is_paused);
	};

	const albumImage = currentTrack?.album?.images?.[0]?.url || ""; // Default to empty string if not found
	const trackName = currentTrack?.name || "Unknown Track";
	const artistName = currentTrack?.artists?.[0]?.name || "Unknown Artist";

	return (
		<div className="player__container">
			<div className="player__main-wrapper">
				{albumImage && (
					<img
						src={albumImage}
						alt={trackName}
						className="now-playing__cover"
						width={200}
						height={200}
					/>
				)}
				<div className="now-playing__side">
					<div className="now-playing__name">{trackName}</div>
					<div className="now-playing__artist">{artistName}</div>
					<button
						className="btn-spotify"
						onClick={() => skipToPreviousTrack(token.access_token)}>
						&lt;prev
					</button>
					<button className="btn-spotify" onClick={handlePlayPause}>
						{is_paused ? "play" : "pause"}
					</button>
					<button
						className="btn-spotify"
						onClick={() => skipToNextTrack(token.access_token)}>
						next&gt;
					</button>
				</div>
			</div>
		</div>
	);
};

export default Player;
