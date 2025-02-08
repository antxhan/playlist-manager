import "./Track.css";
import { Link } from "react-router-dom";
import { easeInOut, motion } from "framer-motion";
import { msToMMSS } from "../../utils/utils";
import missingAlbumCover from "../../img/placeholder.webp";

export default function Track({ track, onClick, index }) {
  return (
    <>
      <motion.div
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
            <button onClick={onClick}>Play</button>
            <img
              src={track?.album?.images?.[2]?.url || missingAlbumCover}
              alt="Track album cover"
            />
            <div className="track__info">
              <Link
                to={`https://open.spotify.com/track/${track.id}`}
                target="_blank"
              >
                <p className="track__name">{track?.name || "Unknown Track"}</p>
              </Link>
              {track.artists ? (
                <div className="track__artists">
                  {track.artists.map((artist, index, array) => (
                    <Link
                      to={`https://open.spotify.com/artist/${artist.id}`}
                      target="_blank"
                    >
                      <p>
                        {index === array.length - 1
                          ? artist.name
                          : `${artist.name},`}
                      </p>
                    </Link>
                  ))}
                </div>
              ) : (
                <p>Unknown Artist</p>
              )}
              {/* <Link
                to={`https://open.spotify.com/artist/0JeTRYMH7FoBiMcLXg1n8g`}
                target="_blank"
              >
                <p className="track__artists">
                  {track?.artists.map((artist) => artist.name).join(", ") ||
                    "Unknown Artist"}
                </p>
              </Link> */}
            </div>
            <p className="track__duration">
              {track.duration_ms ? msToMMSS(track.duration_ms) : "--:--"}
            </p>
          </div>
        )}
      </motion.div>
    </>
  );
}
