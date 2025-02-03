import { useState, useRef, useEffect } from "react";
import { usePlayer } from "../../hooks/usePlayer";
import "./VolumeControl.css";
import VolumeOnIcon from "../../icons/VolumeOnIcon";
import VolumeOffIcon from "../../icons/VolumeOffIcon";

export default function VolumeControl({ disabled }) {
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

	useEffect(() => {
		const preventScroll = (event) => {
			if (showSlider) {
				event.preventDefault();
			}
		};

		if (showSlider) {
			document.addEventListener("touchmove", preventScroll, { passive: false });
		} else {
			document.removeEventListener("touchmove", preventScroll);
		}

		return () => {
			document.removeEventListener("touchmove", preventScroll);
		};
	}, [showSlider]);

	// Early return if no player context
	if (!playerContext || disabled) {
		return (
			<div className="volume-control" role="group" aria-label="Volume controls">
				<button className="volume-button" disabled>
					<VolumeOnIcon />
				</button>
				<div className="volume-slider-wrapper">
					<input
						className="volume-slider disabled"
						type="range"
						min="0"
						max="100"
						step="1"
						value={50}
						disabled
						aria-label="Volume"
					/>
				</div>
			</div>
		);
	}

	const { volume, setVolume, isSDKReady, deviceId, isLoading } = playerContext;

	const toggleMute = () => {
		if (!isMobile) {
			if (volume > 0) {
				console.log("muted");
				setPrevVolume(volume);
				setLocalVolume(0);
				setVolume(0, deviceId);
			} else {
				console.log("sound on");
				setLocalVolume(prevVolume);
				setVolume(prevVolume, deviceId);
			}
		}

		if (isMobile) {
			setShowSlider(!showSlider);
		}
	};

	const handleVolumeChange = (event) => {
		if (disabled || !isSDKReady || isLoading || !deviceId) return;

		const newVolume = Number(event.target.value);
		setLocalVolume(newVolume);

		if (debouncedSetVolume.current) {
			clearTimeout(debouncedSetVolume.current);
		}

		debouncedSetVolume.current = setTimeout(() => {
			if (playerContext && playerContext.setVolume) {
				playerContext.setVolume(newVolume, deviceId);
			}
		}, 200);
	};

	return (
		<div
			className={`volume-control ${disabled ? "disabled" : ""}`}
			role="group"
			aria-label="Volume controls"
			ref={sliderRef}>
			<button
				className="volume-button"
				onClick={toggleMute}
				disabled={disabled || !isSDKReady || isLoading}
				aria-label={volume > 0 ? "Mute" : "Unmute"}>
				{volume > 0 ? <VolumeOnIcon /> : <VolumeOffIcon />}
				<span className="volumeSpan">
					{window.innerWidth < 600 ? "Volume" : volume > 0 ? "Mute" : "Unmute"}
				</span>
			</button>
			<div className={`volume-slider-wrapper ${showSlider ? "visible" : ""}`}>
				<input
					className={`volume-slider ${disabled ? "disabled" : ""}`}
					type="range"
					min="0"
					max="100"
					step="1"
					value={localVolume}
					onChange={handleVolumeChange}
					disabled={disabled || !isSDKReady || isLoading}
					aria-label="Volume"
				/>
			</div>
		</div>
	);
}
