import "./Track.css";
import missingAlbumCover from "../../img/placeholder.webp";
import { msToMMSS } from "../../utils/utils";

export default function Track({ track, onClick }) {
  return (
    <>
      <div onClick={onClick}>
        {!track ? null : (
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
        )}
      </div>
    </>
  );
}
