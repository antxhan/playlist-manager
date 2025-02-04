import "./Track.css";
import { easeInOut, motion } from "framer-motion";
import { api } from "../../utils/api";
import { msToMMSS } from "../../utils/utils";
import { useHandleError } from "../../hooks/useHandleError";
import missingAlbumCover from "../../img/placeholder.webp";

export default function Track({ track, playlistId, player, index }) {
  const handleError = useHandleError();
  return (
    <>
      <motion.button
        onClick={() =>
          api.track
            .play({
              trackUri: track.uri,
              playlistId: playlistId,
              deviceId: player.deviceId,
            })
            .catch((error) => handleError(error, "Failed to play track."))
        }
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          duration: 0.2,
          ease: easeInOut,
          delay: index < 20 ? 0.05 * index : 0,
        }}
      >
        {!track ? null : (
          <div className="track">
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
          </div>
        )}
      </motion.button>
    </>
  );
}
