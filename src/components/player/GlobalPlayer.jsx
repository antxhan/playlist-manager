import { usePlayer } from "../../hooks/usePlayer";
import { api } from "../../utils/api";
import PlayIcon from "../../icons/PlayIcon";
import PauseIcon from "../../icons/PauseIcon";
import NextSongIcon from "../../icons/NextSongIcon";
import PreviousSongIcon from "../../icons/PreviousSongIcon";

export default function GlobalPlayer() {
	const player = usePlayer();
	if (!player) return null;
	const { currentTrack, isPaused, deviceId, setIsPaused } = player;
	if (!currentTrack) return null;
	return (
		<div className="global-player">
			<div className="player--wrapper__left">
				<img
					src={currentTrack.album.images[0]?.url}
					alt={currentTrack.name}
					className="player--img"
				/>

				<div className="player--info__wrapper">
					<div className="player--currentTrackName">{currentTrack.name}</div>
					<div className="player--currentTrackArtists">
						{currentTrack.artists[0]?.name}
					</div>
				</div>
			</div>
			<div className="player--wrapper__right">
				<button
					className="player--button"
					onClick={() => api.player.previous(deviceId)}>
					<PreviousSongIcon />
				</button>

				<button
					className="player--button"
					onClick={() => {
						isPaused ? api.player.play() : api.player.pause();
						setIsPaused(!isPaused);
					}}>
					{isPaused ? <PlayIcon /> : <PauseIcon />}
				</button>

				<button
					className="player--button"
					onClick={() => api.player.next(deviceId)}>
					<NextSongIcon />
				</button>
			</div>
		</div>
	);
}
