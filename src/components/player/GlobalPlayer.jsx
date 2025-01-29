import { usePlayer } from "../../hooks/usePlayer";
import { api } from "../../utils/api";
import PlayIcon from "../../icons/PlayIcon";
import PauseIcon from "../../icons/PauseIcon";
import NextSongIcon from "../../icons/NextSongIcon";
import PreviousSongIcon from "../../icons/PreviousSongIcon";

export default function GlobalPlayer() {
  const player = usePlayer();
  if (!player) return null;

  const {
    currentTrack,
    isPaused,
    deviceId,
    setIsPaused,
    isSDKReady,
    isLoading,
  } = player;

  //always render the player structure, but change content based on state
  return (
    <div className="global-player">
      <div className="player--wrapper__left">
        {isLoading || !currentTrack ? (
          //loading state
          <>
            <div className="player--img skeleton" />
            <div className="player--info__wrapper">
              <div className="player--currentTrackName skeleton" />
              <div className="player--currentTrackArtists skeleton" />
            </div>
          </>
        ) : (
          //actual player
          <>
            <img
              src={currentTrack.album.images[0]?.url}
              alt={currentTrack.name}
              className="player--img"
            />
            <div className="player--info__wrapper">
              <div className="player--currentTrackName">
                {currentTrack.name}
              </div>
              <div className="player--currentTrackArtists">
                {currentTrack.artists[0]?.name}
              </div>
            </div>
          </>
        )}
      </div>
      <div className="player--wrapper__right">
        <button
          className="player--button"
          onClick={() => !isLoading && api.player.previous(deviceId)}
          disabled={isLoading || !isSDKReady}
        >
          <PreviousSongIcon />
        </button>

        <button
          className="player--button"
          onClick={() => {
            if (!isLoading) {
              isPaused ? api.player.play() : api.player.pause();
              setIsPaused(!isPaused);
            }
          }}
          disabled={isLoading || !isSDKReady}
        >
          {isPaused ? <PlayIcon /> : <PauseIcon />}
        </button>

        <button
          className="player--button"
          onClick={() => !isLoading && api.player.next(deviceId)}
          disabled={isLoading || !isSDKReady}
        >
          <NextSongIcon />
        </button>
      </div>
    </div>
  );
}
