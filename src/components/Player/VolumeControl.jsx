import { useCallback, useState } from "react";
import { usePlayer } from "../../hooks/usePlayer";
import "./VolumeControl.css";

export default function VolumeControl() {
	const playerContext = usePlayer();
	const [prevVolume, setPrevVolume] = useState(50);
	const [localVolume, setLocalVolume] = useState(50);

	const debouncedSetVolume = useCallback(
		(newVolume) => {
			const timeout = setTimeout(() => {
				if (playerContext && playerContext.setVolume) {
					playerContext.setVolume(newVolume);
				}
			}, 500);
			return () => clearTimeout(timeout);
		},
		[playerContext]
	);

	// Early return if no player context
	if (!playerContext) {
		return null;
	}

	const { volume, setVolume } = playerContext;

	const toggleMute = () => {
		if (volume > 0) {
			console.log("muted");
			setPrevVolume(volume);
			setLocalVolume(0);
			setVolume(0);
		} else {
			console.log("sound on");
			setLocalVolume(prevVolume);
			setVolume(prevVolume);
		}
	};

	const handleVolumeChange = (event) => {
		const newVolume = Number(event.target.value);
		setLocalVolume(newVolume);
		debouncedSetVolume(newVolume);
		console.log(debouncedSetVolume(newVolume));
	};

	return (
		<div className="volume-control" role="group" aria-label="Volume controls">
			<button
				className="volume-button"
				onClick={toggleMute}
				aria-label={volume > 0 ? "Mute" : "Unmute"}>
				{volume > 0 ? "sound on" : "mute"}
			</button>
			<input
				className="volume-slider"
				type="range"
				min="0"
				max="100"
				step="1"
				value={volume}
				onChange={handleVolumeChange}
				aria-label="Volume"
			/>
		</div>
	);
}
