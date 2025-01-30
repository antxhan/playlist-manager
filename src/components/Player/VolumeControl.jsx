import { useState, useRef, useEffect } from "react";
import { usePlayer } from "../../hooks/usePlayer";
import "./VolumeControl.css";
import VolumeOnIcon from "../../icons/VolumeOnIcon";
import VolumeOffIcon from "../../icons/VolumeOffIcon";

export default function VolumeControl() {
	const playerContext = usePlayer();
	const [prevVolume, setPrevVolume] = useState(50);
	const [localVolume, setLocalVolume] = useState(50);
	const debouncedSetVolume = useRef(null);
	const [showSlider, setShowSlider] = useState(false);
	const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);
	const sliderRef = useRef(null);

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth <= 600);
		};
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	useEffect(() => {
		if (sliderRef.current) {
			sliderRef.current.style.setProperty(
				"--volume-percentage",
				`${localVolume}%`
			);
		}
	}, [localVolume]);

	// Early return if no player context
	if (!playerContext) {
		return null;
	}

	const { volume, setVolume } = playerContext;

	const toggleMute = () => {
		if (!isMobile) {
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
		}

		if (isMobile) {
			setShowSlider(!showSlider);
		}
	};

	const handleVolumeChange = (event) => {
		const newVolume = Number(event.target.value);
		setLocalVolume(newVolume);

		if (debouncedSetVolume.current) {
			clearTimeout(debouncedSetVolume.current);
		}

		debouncedSetVolume.current = setTimeout(() => {
			if (playerContext && playerContext.setVolume) {
				playerContext.setVolume(newVolume);
			}
		}, 200);
	};

	return (
		<div
			className="volume-control"
			role="group"
			aria-label="Volume controls"
			ref={sliderRef}>
			<button
				className="volume-button"
				onClick={toggleMute}
				aria-label={volume > 0 ? "Mute" : "Unmute"}>
				{volume > 0 ? <VolumeOnIcon /> : <VolumeOffIcon />}
			</button>
			{(showSlider || !isMobile) && (
				<input
					className="volume-slider"
					type="range"
					min="0"
					max="100"
					step="1"
					value={localVolume}
					onChange={handleVolumeChange}
					aria-label="Volume"
				/>
			)}
		</div>
	);
}
