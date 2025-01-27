import React, { useEffect } from "react";
import { usePlayer } from "./PlayerContext";
import { togglePlayPause } from "./helperFunctions/spotifyPlayerHelpers";

const Player = () => {
	const {
		currentTrack,
		isPaused,
		skipToNextTrack,
		skipToPreviousTrack,
		playPause,
		setCurrentTrack,
	} = usePlayer();

	const playTrack = async (track) => {
		if (!track) return;

		try {
			await fetch("https://api.spotify.com/v1/me/player/play", {
				method: "PUT",
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					uris: [`spotify:track:${track.id}`],
				}),
			});
			setCurrentTrack(track); // Update the current track in the player state
		} catch (error) {
			console.error("Error playing track:", error);
		}
	};

	useEffect(() => {
		if (currentTrack) {
			playTrack(currentTrack);
		}
	}, [currentTrack]); // Dependency array ensures this effect runs only when `currentTrack` changes

	const handlePlayPause = () => {
		playPause();
		togglePlayPause(isPaused); // Sync the visual state with the actual player state
	};
};

export default Player;
