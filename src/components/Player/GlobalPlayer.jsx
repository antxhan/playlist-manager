import { useState, useEffect } from "react";
import { usePlayer } from "../../hooks/usePlayer";
import { api } from "../../utils/api";
import PlayIcon from "../../icons/PlayIcon";
import PauseIcon from "../../icons/PauseIcon";
import NextSongIcon from "../../icons/NextSongIcon";
import PreviousSongIcon from "../../icons/PreviousSongIcon";
import VolumeControl from "./VolumeControl";

export default function GlobalPlayer() {
	const player = usePlayer();
	const [isWaitingForPlayer, setIsWaitingForPlayer] = useState(true);

	// Wait for the player to be available
	useEffect(() => {
		if (player) {
			setIsWaitingForPlayer(false);
		}
	}, [player]);

	if (isWaitingForPlayer || !player)
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
				<VolumeControl />
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
					disabled={isLoading || !isSDKReady}
					aria-label="skip to previous song">
					<PreviousSongIcon />
					<span className="playerSpan">Previous</span>
				</button>

				<button
					className="player--button"
					onClick={() => {
						if (!isLoading) {
							isPaused ? api.player.play() : api.player.pause();
							setIsPaused(!isPaused);
						}
					}}
					disabled={isLoading || !isSDKReady}
					aria-label={isPaused ? "Play" : "Pause"}>
					{isPaused ? <PlayIcon /> : <PauseIcon />}
					<span className="playerSpan">{isPaused ? "Play" : "Pause"}</span>
				</button>

				<button
					className="player--button"
					onClick={() => !isLoading && api.player.next(deviceId)}
					disabled={isLoading || !isSDKReady}
					aria-label="skip to next song">
					<NextSongIcon />
					<span className="playerSpan">Next</span>
				</button>
			</div>
			<VolumeControl disabled={isLoading || !isSDKReady} />
		</div>
	);
}
