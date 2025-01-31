import "./Player.css";
import { createContext, useState, useEffect, useCallback, useRef } from "react";
import { api } from "../../utils/api";

export const PlayerContext = createContext(undefined);

function loadSDKScript() {
	// dynamically load the Spotify Web Playback SDK script
	const script = document.createElement("script");
	script.src = "https://sdk.scdn.co/spotify-player.js";
	script.async = true;
	document.body.appendChild(script);
}

function createPlayerInstance(
	token,
	setPlayer,
	setDeviceId,
	setIsPaused,
	setCurrentTrack,
	setIsSDKReady,
	setIsLoading,
	setVolumeState
) {
	const playerInstance = new window.Spotify.Player({
		name: "THE PLAYLIST MANAGER",
		getOAuthToken: (cb) => cb(token.access_token),
		volume: 0.5,
	});

	playerInstance.addListener("ready", ({ device_id }) => {
		setDeviceId(device_id);
		api.player.transferPlaybackToPlayer(device_id);
		playerInstance.getVolume().then((vol) => {
			setVolumeState(vol * 100);
		});
		setIsSDKReady(true);
		setIsLoading(false);
	});

	playerInstance.addListener("not_ready", ({ device_id }) => {
		console.log("device id has gone offline", device_id);
		setIsSDKReady(false);
	});

	playerInstance.addListener("player_state_changed", (state) => {
		if (!state) return;
		setCurrentTrack(state.track_window.current_track); // Update the currently playing track
		setIsPaused(state.paused); // Update the paused state
	});

	playerInstance.connect().then((success) => {
		if (success) {
			console.log("Spotify Player Connected");
		}
	});

	setPlayer(playerInstance);
}

export const PlayerProvider = ({ token, children }) => {
	const [player, setPlayer] = useState(null);
	const [deviceId, setDeviceId] = useState(null);
	const [isPaused, setIsPaused] = useState(true);
	const [currentTrack, setCurrentTrack] = useState(null);
	const [isSDKReady, setIsSDKReady] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [userIsPremium, setUserIsPremium] = useState(false);
	const [volume, setVolumeState] = useState(50);

	const debouncedApiSetVolume = useRef(null);

	const setVolume = useCallback(
		(newVolume) => {
			setVolumeState(newVolume);

			//set volume in local player immediately
			if (player) {
				player.setVolume(newVolume / 100, deviceId);
			}

			//debounce API calls to Spotify
			if (debouncedApiSetVolume.current) {
				clearTimeout(debouncedApiSetVolume.current);
			}

			debouncedApiSetVolume.current = setTimeout(() => {
				if (isSDKReady && deviceId) {
					api.player.setVolume(newVolume);
				}
			}, 200);
		},
		[player, isSDKReady, deviceId]
	);

	// useEffect(() => {
	// 	api.me().then((user) => {
	// 		setUserIsPremium(user.product === "premium");
	// 	});
	// }, []);

	useEffect(() => {
		if (token) {
			api
				.me()
				.then((user) => {
					console.log("User API response:", user);
					setUserIsPremium(user.product === "premium");
				})
				.catch((err) => console.error("Error fetching user data:", err));
		}
	}, [token]);

	// useEffect(() => {
	// 	if (userIsPremium) {
	// 		if (!player) {
	// 			if (!token) {
	// 				setPlayer(null);
	// 				setIsLoading(false);
	// 				setIsSDKReady(false);
	// 			}

	// 			if (token) {
	// 				let scriptLoaded = false;

	// 				const initializePlayer = () => {
	// 					console.log("Initializing Spotify Player");
	// 					createPlayerInstance(
	// 						token,
	// 						setPlayer,
	// 						setDeviceId,
	// 						setIsPaused,
	// 						setCurrentTrack,
	// 						setIsSDKReady,
	// 						setIsLoading,
	// 						setVolumeState
	// 					);
	// 					scriptLoaded = true;
	// 				};

	// 				if (!scriptLoaded) {
	// 					setIsLoading(true);
	// 					loadSDKScript();

	// 					// Set up the SDK Ready callback
	// 					window.onSpotifyWebPlaybackSDKReady = initializePlayer;

	// 					// Check if SDK is already loaded
	// 					if (window.Spotify) {
	// 						initializePlayer();
	// 					}
	// 				}
	// 			}
	// 		}
	// 	}

	// 	return () => {
	// 		if (player) {
	// 			console.log("Disconnecting Spotify Player");
	// 			player.disconnect();
	// 		}
	// 	};
	// }, [token, player, userIsPremium]);

	useEffect(() => {
		if (!userIsPremium || !token) {
			console.warn(
				"User is not premium or token is missing. Skipping player initialization."
			);
			return;
		}

		if (!player) {
			console.log("Initializing Spotify Player...");

			const initializePlayer = () => {
				console.log("Creating Spotify Player instance...");
				createPlayerInstance(
					token,
					setPlayer,
					setDeviceId,
					setIsPaused,
					setCurrentTrack,
					setIsSDKReady,
					setIsLoading,
					setVolumeState
				);
			};

			// Check if SDK is already loaded
			if (!window.Spotify) {
				console.log("Spotify SDK not loaded yet. Loading...");
				setIsLoading(true);
				loadSDKScript();

				window.onSpotifyWebPlaybackSDKReady = initializePlayer;
			} else {
				initializePlayer();
			}
		}
	}, [token, player, userIsPremium]);

	// useEffect(() => {
	// 	if (isSDKReady && deviceId) {
	// 		api.player.setVolume(volume);
	// 	}
	// }, [isSDKReady, deviceId, volume]);

	useEffect(() => {
		if (isSDKReady && deviceId) {
			api.player
				.setVolume(volume)
				.catch((err) => console.error("Failed to set volume:", err));
		} else {
			console.warn("Skipping API calls - SDK not ready or deviceId missing");
		}
	}, [isSDKReady, deviceId, volume]);

	// const value =
	// 	token && userIsPremium
	// 		? {
	// 				player,
	// 				currentTrack,
	// 				isPaused,
	// 				deviceId,
	// 				setIsPaused,
	// 				isSDKReady,
	// 				isLoading,
	// 				volume,
	// 				setVolume,
	// 		  }
	// 		: null;

	//fixes usePlayer must be used within a PlayerProvider Error Component Stack
	const value = {
		player,
		currentTrack,
		isPaused,
		deviceId,
		setIsPaused,
		isSDKReady,
		isLoading,
		volume,
		setVolume,
		userIsPremium,
	};

	return (
		<PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
	);
};
