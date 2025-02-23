import { useState, useEffect } from "react";
import { usePlayer } from "../../hooks/usePlayer";
import { api } from "../../utils/api";
import PlayIcon from "../../icons/PlayIcon";
import PauseIcon from "../../icons/PauseIcon";
import NextSongIcon from "../../icons/NextSongIcon";
import PreviousSongIcon from "../../icons/PreviousSongIcon";
import VolumeControl from "./VolumeControl";
import StandardButton from "../buttons/StandardButton/StandardButton";

export default function GlobalPlayer() {
  const player = usePlayer();
  const [isWaitingForPlayer, setIsWaitingForPlayer] = useState(true);

  // Wait for the player to be available
  useEffect(() => {
    // can be one line
    if (player) setIsWaitingForPlayer(false);
  }, [player]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      //prevent keyboard events if player is not ready or loading
      if (isWaitingForPlayer || !player || player.isLoading) return;

      //check if the active element is an input or textarea
      const isInputActive =
        document.activeElement.tagName === "INPUT" ||
        document.activeElement.tagName === "TEXTAREA";

      //space key for play/pause - only if not in an input field
      if (event.code === "Space" && !isInputActive) {
        event.preventDefault(); // Prevent space from scrolling
        if (!player.isLoading) {
          player.isPaused ? api.player.play() : api.player.pause();
          player.setIsPaused(!player.isPaused);
        }
      }

      //m key for mute/unmute - only if not in an input field
      if (event.code === "KeyM" && !isInputActive) {
        const { volume, setVolume, deviceId } = player;
        // ternary operator can be used for readability
        setVolume(volume > 0 ? 0 : 50, deviceId);
      }
    };

    //add event listener
    window.addEventListener("keydown", handleKeyDown);

    //cleanup listener
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [player, isWaitingForPlayer]);

  if (isWaitingForPlayer || !player || !player.userIsPremium)
    return (
      <div className="global-player">
        <div className="player--wrapper__left">
          <div className="player--img disabled" />
          <div className="player--info__wrapper">
            <div className="player--currentTrackName disabled" />
            <div className="player--currentTrackArtists disabled" />
          </div>
        </div>
        <div className="player--wrapper__right">
          {/* dont need to do ={true} when true, it existing means its true */}
          <button className="player--button" disabled>
            <PreviousSongIcon />
          </button>

          {/* dont need to do ={true} when true, it existing means its true */}
          <button className="player--button" disabled>
            <PlayIcon />
          </button>

          {/* dont need to do ={true} when true, it existing means its true */}
          <button className="player--button" disabled>
            <NextSongIcon />
          </button>
        </div>
        <VolumeControl />
      </div>
    );

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
        <StandardButton
          onClick={() => !isLoading && api.player.previous(deviceId)}
          disabled={isLoading || !isSDKReady || !player.userIsPremium}
          ariaLabel="Previous"
          children={<PreviousSongIcon />}
        />

        <StandardButton
          onClick={() => {
            if (!isLoading) {
              isPaused ? api.player.play() : api.player.pause();
              setIsPaused(!isPaused);
            }
          }}
          disabled={isLoading || !isSDKReady || !player.userIsPremium}
          ariaLabel={isPaused ? "Play" : "Pause"}
        >
          {/* for readability its better to wrap the children in the component */}
          {isPaused ? <PlayIcon /> : <PauseIcon />}
        </StandardButton>
        <StandardButton
          onClick={() => !isLoading && api.player.next(deviceId)}
          disabled={isLoading || !isSDKReady || !player.userIsPremium}
          ariaLabel="Next"
        >
          {/* for readability its better to wrap the children in the component */}
          <NextSongIcon />
        </StandardButton>
      </div>
      <VolumeControl
        disabled={isLoading || !isSDKReady || !player.userIsPremium}
      />
    </div>
  );
}
