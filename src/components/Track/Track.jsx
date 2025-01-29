import "./Track.css";
import missingAlbumCover from "../../img/daniel-schludi-l8cvrt3Hpec-unsplash.jpg";

export default function Track({ track }) {
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
    <button className="track">
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
    </button>
  );
}
