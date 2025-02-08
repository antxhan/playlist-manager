import "./Track.css";
import { Link } from "react-router-dom";
import { easeInOut, motion } from "framer-motion";
import { msToMMSS } from "../../utils/utils";
import TrackLink from "../TrackLink/TrackLink";
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
              <TrackLink
                endpoint={`track/${track.id}`}
              >
                <p className="track__name">{track?.name || "Unknown Track"}</p>
              </TrackLink>
              {track.artists ? (
                <div className="track__artists">
                  {track.artists.map((artist, index, array) => (
                    <TrackLink
                      endpoint={`artist/${artist.id}`}
                    >
                      <p>
                        {index === array.length - 1
                          ? artist.name
                          : `${artist.name},`}
                      </p>
                    </TrackLink>
                  ))}
                </div>
              ) : (
                <p>Unknown Artist</p>
              )}
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
