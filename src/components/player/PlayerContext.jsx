import React, {
	createContext,
	useContext,
	useState,
	useEffect,
	useRef,
} from "react";
import {
	transferPlaybackToPlayer,
	togglePlayPause,
	skipToNextTrack,
	skipToPreviousTrack,
} from "./helperFunctions/spotifyPlayerHelpers";
import "./Player.css";

// Create a context to manage player-related state and functionality
const PlayerContext = createContext();

// Hook to consume the PlayerContext
export const usePlayer = () => {
	const context = useContext(PlayerContext);
	if (!context) {
		console.warn("usePlayer must be used within a PlayerProvider");
		return null;
	}
	return context;
};

export const PlayerProvider = ({ token, children }) => {
	const [player, setPlayer] = useState(null);
	const [deviceId, setDeviceId] = useState(null);
	const [isPaused, setIsPaused] = useState(true);
	const [currentTrack, setCurrentTrack] = useState(null);
	// Ref to ensure the Spotify SDK is only initialized once
	const sdkInitializedRef = useRef(false);
	const [playlist, setPlaylist] = useState(null);
	const [currentPlaylistId, setCurrentPlaylistId] = useState(null);

	useEffect(() => {
		if (sdkInitializedRef.current) return; // Avoid re-initializing the SDK
		sdkInitializedRef.current = true; // Mark SDK as initialized

		// Dynamically load the Spotify Web Playback SDK script
		const script = document.createElement("script");
		script.src = "https://sdk.scdn.co/spotify-player.js";
		script.async = true;
		document.body.appendChild(script);

		// When the SDK is ready, create a player instance
		window.onSpotifyWebPlaybackSDKReady = () => {
			const playerInstance = new window.Spotify.Player({
				name: "THE PLAYLIST MANAGER",
				getOAuthToken: (cb) => cb(token.access_token),
				volume: 0.5,
			});

			setPlayer(playerInstance);

			playerInstance.addListener("ready", ({ device_id }) => {
				setDeviceId(device_id);
				transferPlaybackToPlayer(device_id, token.access_token); // Transfer playback to this device
			});

			playerInstance.addListener("player_state_changed", (state) => {
				if (!state) return;
				setCurrentTrack(state.track_window.current_track); // Update the currently playing track
				setIsPaused(state.paused); // Update the paused state
			});

			playerInstance.connect();
		};

		// Cleanup: Disconnect the player when the component unmounts
		return () => {
			if (player) player.disconnect();
		};
	}, [token.access_token]);

	const playTrack = async (track, playlistId) => {
		if (!deviceId) return;

		try {
			await fetch("https://api.spotify.com/v1/me/player/play", {
				method: "PUT",
				headers: {
					Authorization: `Bearer ${token.access_token}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					context_uri: `spotify:playlist:${playlistId}`,
					offset: { uri: track.uri },
					device_id: deviceId,
				}),
			});
			setCurrentTrack(track); // Update the currently playing track
			setCurrentPlaylistId(playlistId); // Save the playlist ID
			setIsPaused(false); // Ensure the player is not paused
		} catch (error) {
			console.error("Error playing track:", error);
		}
	};

	// Value to provide to the context consumers
	const value = {
		player, // The Spotify player instance
		currentTrack,
		isPaused,
		playTrack, // Function to play a specific track
		togglePlayPause: () => {
			togglePlayPause(isPaused, token.access_token);
			setIsPaused(!isPaused);
		},
		skipToNext: () => skipToNextTrack(token.access_token, deviceId),
		skipToPrevious: () => skipToPreviousTrack(token.access_token, deviceId),
	};

	return (
		<PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
	);
};
