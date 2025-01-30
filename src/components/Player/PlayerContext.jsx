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
	setVolumeState,
	setVolume
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

	useEffect(() => {
		api.me().then((user) => {
			setUserIsPremium(user.product === "premium");
		});
	}, []);

	useEffect(() => {
		if (userIsPremium) {
			if (!player) {
				if (!token) {
					setPlayer(null);
					setIsLoading(false);
					setIsSDKReady(false);
				}

				if (token) {
					let scriptLoaded = false;

					const initializePlayer = () => {
						console.log("Initializing Spotify Player");
						createPlayerInstance(
							token,
							setPlayer,
							setDeviceId,
							setIsPaused,
							setCurrentTrack,
							setIsSDKReady,
							setIsLoading,
							setVolume
						);
						scriptLoaded = true;
					};

					if (!scriptLoaded) {
						setIsLoading(true);
						loadSDKScript();

						// Set up the SDK Ready callback
						window.onSpotifyWebPlaybackSDKReady = initializePlayer;

						// Check if SDK is already loaded
						if (window.Spotify) {
							initializePlayer();
						}
					}
				}
			}
		}

		return () => {
			if (player) {
				console.log("Disconnecting Spotify Player");
				player.disconnect();
			}
		};
	}, [token, player, userIsPremium]);

	useEffect(() => {
		if (isSDKReady && deviceId) {
			api.player.setVolume(volume, deviceId);
		}
	}, [isSDKReady, deviceId, volume]);

	const value =
		token && userIsPremium
			? {
					player,
					currentTrack,
					isPaused,
					deviceId,
					setIsPaused,
					isSDKReady,
					isLoading,
					volume,
					setVolume,
			  }
			: null;

	return (
		<PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
	);
};
