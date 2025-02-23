import "./Track.css";
import { easeInOut, motion } from "framer-motion";
import { msToMMSS } from "../../utils/utils";
import TrackPlayButton from "../buttons/TrackPlayButton/TrackPlayButton";
import TrackLink from "../TrackLink/TrackLink";
import SpotifyIcon from "../../icons/SpotifyIcon";
import missingAlbumCover from "../../img/placeholder.webp";

export default function Track({ track, onClick, index }) {
  // refactor for better readability
  if (!track) return null;

  const { album, name, artists, duration_ms, id } = track;
  const albumCover = album?.images?.[2]?.url || missingAlbumCover;
  const trackName = name || "Unknown Track";
  const trackDuration = duration_ms ? msToMMSS(duration_ms) : "--:--";

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.2,
        ease: easeInOut,
        delay: index < 20 ? 0.05 * index : 0,
      }}
    >
      <div className="track">
        <TrackPlayButton onClick={onClick} />
        <img src={albumCover} alt="Track album cover" />
        <div className="track__info">
          <TrackLink endpoint={`track/${id}`}>
            <p className="track__name">{trackName}</p>
          </TrackLink>
          <div className="track__artists">
            {artists ? (
              artists.map((artist, index) => (
                <TrackLink key={artist.id} endpoint={`artist/${artist.id}`}>
                  <p>
                    {artist.name}
                    {index < artists.length - 1 && ","}
                  </p>
                </TrackLink>
              ))
            ) : (
              <p>Unknown Artist</p>
            )}
          </div>
        </div>
        <p className="track__duration">{trackDuration}</p>
        <SpotifyIcon />
      </div>
    </motion.div>
  );
}
