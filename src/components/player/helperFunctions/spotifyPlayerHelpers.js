// Transfer playback to the Web Playback SDK
export const transferPlaybackToPlayer = async (deviceId, token) => {
	try {
		await fetch("https://api.spotify.com/v1/me/player", {
			method: "PUT",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				device_ids: [deviceId],
				play: true,
			}),
		});
		console.log("Playback transferred to Web Playback SDK.");
	} catch (err) {
		console.error("Error transferring playback:", err);
	}
};

// Toggle play/pause state
export const togglePlayPause = async (is_paused, token) => {
	const endpoint = is_paused
		? "https://api.spotify.com/v1/me/player/play"
		: "https://api.spotify.com/v1/me/player/pause";

	try {
		await fetch(endpoint, {
			method: "PUT",
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
	} catch (err) {
		console.error("Error toggling play/pause:", err);
	}
};

// Skip to the next track
export const skipToNextTrack = async (token) => {
	try {
		await fetch("https://api.spotify.com/v1/me/player/next", {
			method: "POST",
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		console.log("Skipped to the next track.");
	} catch (err) {
		console.error("Error skipping to the next track:", err);
	}
};

// Skip to the previous track
export const skipToPreviousTrack = async (token) => {
	try {
		await fetch("https://api.spotify.com/v1/me/player/previous", {
			method: "POST",
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		console.log("Skipped to the previous track.");
	} catch (err) {
		console.error("Error skipping to the previous track:", err);
	}
};
