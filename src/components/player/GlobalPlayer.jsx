// GlobalPlayer.jsx
import React from "react";
import { usePlayer } from "./PlayerContext";

const GlobalPlayer = () => {
	// Access player context using the custom `usePlayer` hook
	const playerContext = usePlayer();

	if (!playerContext) return null;

	const {
		currentTrack,
		isPaused,
		togglePlayPause,
		skipToNext,
		skipToPrevious,
	} = playerContext;

	// If there is no current track, do not render the player
	if (!currentTrack) return null;

	// Render the global player UI
	return (
		<div className="global-player">
			<img
				src={currentTrack.album.images[0]?.url}
				alt={currentTrack.name}
				width={100}
				height={100}
			/>

			<div>
				<div>{currentTrack.name}</div>
				<div>{currentTrack.artists[0]?.name}</div>
			</div>

			<button onClick={skipToPrevious}>Prev</button>

			<button onClick={togglePlayPause}>{isPaused ? "Play" : "Pause"} </button>

			<button onClick={skipToNext}>Next</button>
		</div>
	);
};

export default GlobalPlayer;
