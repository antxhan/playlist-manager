import { useContext } from "react";
import { PlayerContext } from "../components/Player/PlayerContext";

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context) {
    console.warn("usePlayer must be used within a PlayerProvider");
    return null;
  }
  return context;
};
