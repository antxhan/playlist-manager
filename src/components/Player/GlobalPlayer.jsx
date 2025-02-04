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
    if (player) {
      setIsWaitingForPlayer(false);
    }
  }, [player]);

  // space to toggle play and pause, m for mute and unmute
  useEffect(() => {
    const handleKeyDown = (event) => {
      //prevent keyboard events if player is not ready or loading
      if (isWaitingForPlayer || !player || player.isLoading) return;

      //space key for play/pause
      if (event.code === "Space") {
        //prevent space from scrolling
        event.preventDefault();
        if (!player.isLoading) {
          player.isPaused ? api.player.play() : api.player.pause();
          player.setIsPaused(!player.isPaused);
        }
      }

      //m key for mute/unmute
      if (event.code === "KeyM") {
        const { volume, setVolume, deviceId } = player;
        if (volume > 0) {
          setVolume(0, deviceId);
        } else {
          //restore to previous volume or default to 50
          setVolume(50, deviceId);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

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
          <button className="player--button" disabled={true}>
            <PreviousSongIcon />
          </button>

          <button className="player--button" disabled={true}>
            <PlayIcon />
          </button>

          <button className="player--button" disabled={true}>
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
          children={isPaused ? <PlayIcon /> : <PauseIcon />}
        />

        <StandardButton
          onClick={() => !isLoading && api.player.previous(deviceId)}
          disabled={isLoading || !isSDKReady || !player.userIsPremium}
          ariaLabel="Previous"
          children={<NextSongIcon />}
        />
      </div>
      <VolumeControl
        disabled={isLoading || !isSDKReady || !player.userIsPremium}
      />
    </div>
  );
}
