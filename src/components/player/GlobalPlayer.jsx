import React from "react";
import { usePlayer } from "./PlayerContext";
import NextSongIcon from "../../icons/NextSongIcon";
import PreviousSongIcon from "../../icons/PreviousSongIcon";
import PlayIcon from "../../icons/PlayIcon";
import PauseIcon from "../../icons/PauseIcon";

const GlobalPlayer = () => {
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

	return (
		<div className="global-player">
			<div className="player--wrapper__left">
				<img
					className="player--img"
					src={currentTrack.album.images[0]?.url}
					alt={currentTrack.name}
					width={100}
					height={100}
				/>

				<div className="player--info__wrapper">
					<div className="player--currentTrackName">{currentTrack.name}</div>
					<div className="player--currentTrackArtists">
						{currentTrack.artists[0]?.name}
					</div>
				</div>
			</div>
			<div className="player--wrapper__right">
				<button className="player--button" onClick={skipToPrevious}>
					<PreviousSongIcon />
				</button>

				<button className="player--button" onClick={togglePlayPause}>
					{isPaused ? <PlayIcon /> : <PauseIcon />}{" "}
				</button>

				<button className="player--button" onClick={skipToNext}>
					<NextSongIcon />
				</button>
			</div>
		</div>
	);
};

export default GlobalPlayer;
