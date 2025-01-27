import "./Player.css";
import { createContext, useState, useEffect } from "react";
import { api } from "../../utils/api";

export const PlayerContext = createContext(undefined);

function loadSDKScript() {
  // dynamically load the Spotify Web Playback SDK script
  const script = document.createElement("script");
  script.src = "https://sdk.scdn.co/spotify-player.js";
  script.async = true;
  document.body.appendChild(script);
}

function createPlayerInstance(
  token,
  setPlayer,
  setDeviceId,
  setIsPaused,
  setCurrentTrack
) {
  const playerInstance = new window.Spotify.Player({
    name: "THE PLAYLIST MANAGER",
    getOAuthToken: (cb) => cb(token.access_token),
    volume: 0.5,
  });

  playerInstance.addListener("ready", ({ device_id }) => {
    setDeviceId(device_id);
    api.player.transferPlaybackToPlayer(device_id);
  });

  playerInstance.addListener("player_state_changed", (state) => {
    if (!state) return;
    setCurrentTrack(state.track_window.current_track); // Update the currently playing track
    setIsPaused(state.paused); // Update the paused state
  });

  setPlayer(playerInstance);
  playerInstance.connect();
}

export const PlayerProvider = ({ token, children }) => {
  const [player, setPlayer] = useState(null);
  const [deviceId, setDeviceId] = useState(null);
  const [isPaused, setIsPaused] = useState(true);
  const [currentTrack, setCurrentTrack] = useState(null);

  useEffect(() => {
    if (player) return;

    loadSDKScript();

    window.onSpotifyWebPlaybackSDKReady = () =>
      createPlayerInstance(
        token,
        setPlayer,
        setDeviceId,
        setIsPaused,
        setCurrentTrack
      );

    return () => {
      if (player) player.disconnect();
    };
  }, [token, player]);

  const value = {
    player,
    currentTrack,
    isPaused,
    deviceId,
    setIsPaused,
  };

  return (
    <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
  );
};
