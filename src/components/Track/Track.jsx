import "./Track.css";
import missingAlbumCover from "../../img/placeholder.webp";
import { msToMMSS } from "../../utils/utils";
import { api } from "../../utils/api";
import { useHandleError } from "../../hooks/useHandleError";

export default function Track({ track, playlistId, player }) {
  const handleError = useHandleError();
  return (
    <>
      <div
        onClick={() =>
          api.track
            .play({
              trackUri: track.uri,
              playlistId: playlistId,
              deviceId: player.deviceId,
            })
            .catch((error) => handleError(error, "Failed to play track."))
        }
      >
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
