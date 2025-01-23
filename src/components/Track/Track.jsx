import "./Track.css";

export default function Track({ track }) {
  const msToMMSS = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <li key={track.id}>
      <button className="track">
        <img src={track.album?.images[2].url} alt="Track album cover" />
        <div className="track__info">
          <p className="track__name">{track.name}</p>
          <p className="track__artists">
            {track.artists.map((artist) => artist.name).join(", ")}
          </p>
        </div>
        <p className="track__duration">{msToMMSS(track.duration_ms)}</p>
      </button>
    </li>
  );
}
