import { usePlayer } from "../../hooks/usePlayer";
import { api } from "../../utils/api";
import PlayIcon from "../../icons/PlayIcon";
import PauseIcon from "../../icons/PauseIcon";
import NextSongIcon from "../../icons/NextSongIcon";
import PreviousSongIcon from "../../icons/PreviousSongIcon";
import { useState } from "react";

export default function GlobalPlayer() {
	const player = usePlayer();
	const [volume, setVolume] = useState(50);
	if (!player)
		return (
			<div className="global-player">
				<div className="player--wrapper__left">
					<div className="player--img disabled" />
					<div className="player--info__wrapper">
						<div className="player--currentTrackName disabled" />
						<div className="player--currentTrackArtists disabled" />
					</div>
				</div>
				<div className="player--wrapper__right">
					<button className="player--button" disabled={true}>
						<PreviousSongIcon />
					</button>

					<button className="player--button" disabled={true}>
						<PlayIcon />
					</button>

					<button className="player--button" disabled={true}>
						<NextSongIcon />
					</button>
				</div>
			</div>
		);

	const {
		currentTrack,
		isPaused,
		deviceId,
		setIsPaused,
		isSDKReady,
		isLoading,
	} = player;

	const handleVolumeChange = async (event) => {
		const newVolume = event.target.value;
		if (!isNaN(newVolume)) {
			setVolume(newVolume);
			await api.player.setVolume(newVolume);

			console.log(newVolume);
		}
	};

	//always render the player structure, but change content based on state
	return (
		<div className="global-player">
			<div className="player--wrapper__left">
				{isLoading || !currentTrack ? (
					//loading state
					<>
						<div className="player--img skeleton" />
						<div className="player--info__wrapper">
							<div className="player--currentTrackName skeleton" />
							<div className="player--currentTrackArtists skeleton" />
						</div>
					</>
				) : (
					//actual player
					<>
						<img
							src={currentTrack.album.images[0]?.url}
							alt={currentTrack.name}
							className="player--img"
						/>
						<div className="player--info__wrapper">
							<div className="player--currentTrackName">
								{currentTrack.name}
							</div>
							<div className="player--currentTrackArtists">
								{currentTrack.artists[0]?.name}
							</div>
						</div>
					</>
				)}
			</div>
			<div className="player--wrapper__right">
				<button
					className="player--button"
					onClick={() => !isLoading && api.player.previous(deviceId)}
					disabled={isLoading || !isSDKReady}>
					<PreviousSongIcon />
				</button>

				<button
					className="player--button"
					onClick={() => {
						if (!isLoading) {
							isPaused ? api.player.play() : api.player.pause();
							setIsPaused(!isPaused);
						}
					}}
					disabled={isLoading || !isSDKReady}>
					{isPaused ? <PlayIcon /> : <PauseIcon />}
				</button>

				<button
					className="player--button"
					onClick={() => !isLoading && api.player.next(deviceId)}
					disabled={isLoading || !isSDKReady}>
					<NextSongIcon />
				</button>
			</div>
			<div className="player--volume-wrapper">
				<input
					className="player--volume-slider"
					type="range"
					min="0"
					max="100"
					step="1"
					value={volume ?? 50}
					onChange={handleVolumeChange}
				/>
			</div>
		</div>
	);
}
