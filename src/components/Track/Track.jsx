import "./Track.css";
import { easeInOut, motion } from "framer-motion";
import missingAlbumCover from "../../img/placeholder.webp";

export default function Track({ track, index }) {
  const msToMMSS = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  if (!track) return null;

  return (
    <motion.button
      className="track"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.2,
        ease: easeInOut,
        delay: index < 20 ? 0.05 * index : 0,
      }}
    >
      <img
        src={track?.album?.images?.[2]?.url || missingAlbumCover}
        alt="Track album cover"
      />
      <div className="track__info">
        <p className="track__name">{track?.name || "Unknown Track"}</p>
        <p className="track__artists">
          {track?.artists.map((artist) => artist.name).join(", ") ||
            "Unknown Artist"}
        </p>
      </div>
      <p className="track__duration">
        {track.duration_ms ? msToMMSS(track.duration_ms) : "--:--"}
      </p>
    </motion.button>
  );
}
