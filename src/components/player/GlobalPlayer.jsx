import { usePlayer } from "../../hooks/usePlayer";
import { api } from "../../utils/api";

export default function GlobalPlayer() {
  const player = usePlayer();
  if (!player) return null;
  const { currentTrack, isPaused, deviceId, setIsPaused } = player;
  if (!currentTrack) return null;
  return (
    <div className="global-player">
      <img
        src={currentTrack.album.images[0]?.url}
        alt={currentTrack.name}
        width={100}
        height={100}
      />

      <div>
        <div>{currentTrack.name}</div>
        <div>{currentTrack.artists[0]?.name}</div>
      </div>

      <button onClick={() => api.player.previous(deviceId)}>Prev</button>
      <button
        onClick={() => {
          isPaused ? api.player.play() : api.player.pause();
          setIsPaused(!isPaused);
        }}
      >
        {isPaused ? "Play" : "Pause"}
      </button>
      <button onClick={() => api.player.next(deviceId)}>Next</button>
    </div>
  );
}
