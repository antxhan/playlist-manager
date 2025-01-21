import React, { useState, useEffect } from "react";

//define the track JSON object
const track = {
	name: "",
	album: {
		images: [{ url: "" }],
	},
	artists: [{ name: "" }],
};

function Player(props) {
	const [player, setPlayer] = useState(null);
	const [is_paused, setPaused] = useState(false);
	const [is_active, setActive] = useState(false);
	const [current_track, setTrack] = useState(track);

	useEffect(() => {
		//embeds the spotify web playback sdk with a script tag to body
		const embedSpotifyPlayerSDK = document.createElement("script");
		embedSpotifyPlayerSDK.src = "https://sdk.scdn.co/spotify-player.js";
		embedSpotifyPlayerSDK.async = true;

		document.body.appendChild(embedSpotifyPlayerSDK);

		window.onSpotifyWebPlaybackSDKReady = () => {
			const player = new window.Spotify.Player({
				name: "Web Playback SDK",
				getOAuthToken: (cb) => {
					cb(props.token);
				},
				volume: 0.5,
			});

			setPlayer(player);

			//ready,  emitted when the SDK is connected and ready to stream content.
			player.addListener("ready", ({ device_id }) => {
				console.log("Ready with Device ID", device_id);
			});

			//not_ready, in case the connection is broken.
			player.addListener("not_ready", ({ device_id }) => {
				console.log("Device ID has gone offline", device_id);
			});

			//player_state_changed, emitted when the state of the local playback has changed (i.e., change of track).
			player.addListener("player_state_changed", (state) => {
				if (!state) return;

				setTrack(state.track_window.current_track);
				setPaused(state.paused);

				player.getCurrentState().then((state) => {
					if (!state) {
						setActive(false);
					} else {
						setActive(true);
					}
				});
			});

			//connect(), the method calls to connect method to perform the connection of our new Spotify instance.
			player.connect();
		};
	}, []);

	return (
		<>
			<div className="player__container">
				<div className="player__main-wrapper">
					<img
						src={current_track.album.images[0].url}
						alt={current_track.name}
						className="now-playing__cover"
					/>
					<div className="now-playing__side">
						<div className="now-playing__name">{current_track.name}</div>
						<div className="now-playing__artist">
							{current_track.artists[0].name}
						</div>
						<button
							className="btn-spotify"
							onClick={() => {
								player.previousTrack();
							}}>
							&lt;prev
						</button>

						<button
							className="btn-spotify"
							onClick={() => {
								player.togglePlay();
							}}>
							{is_paused ? "play" : "pause"}
						</button>

						<button
							className="btn-spotify"
							onClick={() => {
								player.nextTrack();
							}}>
							next&gt;
						</button>
					</div>
				</div>
			</div>
		</>
	);
}

export default Player;
