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

export const skipToNextTrack = async (accessToken, deviceId) => {
	try {
		await fetch("https://api.spotify.com/v1/me/player/next", {
			method: "POST",
			headers: {
				Authorization: `Bearer ${accessToken}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				device_id: deviceId,
			}),
		});
	} catch (error) {
		console.error("Error skipping to next track:", error);
	}
};

export const skipToPreviousTrack = async (accessToken, deviceId) => {
	try {
		await fetch("https://api.spotify.com/v1/me/player/previous", {
			method: "POST",
			headers: {
				Authorization: `Bearer ${accessToken}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				device_id: deviceId,
			}),
		});
	} catch (error) {
		console.error("Error skipping to previous track:", error);
	}
};

export const togglePlayPause = async (isPaused, accessToken) => {
	try {
		// Determine the action based on the current playback state.
		const action = isPaused ? "play" : "pause";
		await fetch(`https://api.spotify.com/v1/me/player/${action}`, {
			method: "PUT",
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});
	} catch (error) {
		console.error(`Error toggling play/pause: ${error}`);
	}
};
