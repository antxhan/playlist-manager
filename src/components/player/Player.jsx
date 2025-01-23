import React, { useState, useEffect, useRef } from "react";
import {
	transferPlaybackToPlayer,
	togglePlayPause,
	skipToNextTrack,
	skipToPreviousTrack,
} from "./helperFunctions/spotifyPlayerHelpers";

const track = {
	name: "",
	album: {
		images: [{ url: "" }],
	},
	artists: [{ name: "" }],
};

function Player({ token }) {
	const [player, setPlayer] = useState(null);
	const [deviceId, setDeviceId] = useState(null);
	const [is_paused, setPaused] = useState(true);
	const [current_track, setTrack] = useState(track);

	const sdkInitializedRef = useRef(false);

	useEffect(() => {
		if (sdkInitializedRef.current) return;
		sdkInitializedRef.current = true;

		const embedSpotifyPlayerSDK = document.createElement("script");
		embedSpotifyPlayerSDK.src = "https://sdk.scdn.co/spotify-player.js";
		embedSpotifyPlayerSDK.async = true;
		document.body.appendChild(embedSpotifyPlayerSDK);

		window.onSpotifyWebPlaybackSDKReady = () => {
			const playerInstance = new window.Spotify.Player({
				name: "THE PLAYLIST MANAGER",
				getOAuthToken: (cb) => cb(token.access_token),
				volume: 0.5,
			});

			setPlayer(playerInstance);

			playerInstance.addListener("ready", ({ device_id }) => {
				console.log("Ready with Device ID:", device_id);
				setDeviceId(device_id);
				// Transfer playback to Web Playback SDK
				transferPlaybackToPlayer(device_id, token.access_token);
			});

			playerInstance.addListener("player_state_changed", (state) => {
				if (!state) return;
				setTrack(state.track_window.current_track);
				setPaused(state.paused);
			});

			playerInstance.connect().then((connected) => {
				if (connected) {
					if (player) {
						player.pause(); // Pause playback after the player connects
						console.log("Player connected but playback is paused.");
					} else {
						console.error("Player is not initialized yet.");
					}
				}
			});
		};

		return () => {
			if (player) player.disconnect();
		};
	}, [token.access_token]); //token.access_token

	return (
		<div className="player__container">
			<div className="player__main-wrapper">
				<img
					src={current_track.album.images[0]?.url || null}
					alt={current_track.name}
					className="now-playing__cover"
					width={200}
					height={200}
				/>
				<div className="now-playing__side">
					<div className="now-playing__name">{current_track.name}</div>
					<div className="now-playing__artist">
						{current_track.artists[0]?.name || "Unknown Artist"}
					</div>
					<button
						className="btn-spotify"
						onClick={() => skipToPreviousTrack(token.access_token)}>
						&lt;prev
					</button>
					<button
						className="btn-spotify"
						onClick={() => togglePlayPause(is_paused, token.access_token)}>
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
}

export default Player;
