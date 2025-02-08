import "./TrackPlayButton.css";
import StandardButton from "../StandardButton/StandardButton";
import AccentButton from "../AccentButton/AccentButton";
import PlayIcon from "../../../icons/PlayIcon";

export default function TrackPlayButton({ onClick }) {
  return (
    <StandardButton
      className="track-play-btn"
      onClick={onClick}
      children={<PlayIcon />}
      ariaLabel="Play"
    />
  );
}
