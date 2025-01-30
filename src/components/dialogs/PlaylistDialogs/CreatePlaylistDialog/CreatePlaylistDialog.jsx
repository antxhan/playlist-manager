import "../PlaylistDialog/PlaylistDialog.css";
import "./CreatePlaylistDialog.css";
import { useState } from "react";
import Dialog from "../../Dialog/Dialog";

export default function CreatePlaylistDialog({
  isOpen,
  onClose,
  onSubmit,
  title,
  children,
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [addTopTracks, setAddTopTracks] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(name, description, addTopTracks);
    setName("");
    setDescription("");
    setAddTopTracks(false);
    onClose();
  };

  return (
    <Dialog isOpen={isOpen} onClose={onClose} title={title}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Playlist name (required)"
          aria-label="Playlist name"
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Playlist description"
          aria-label="Playlist description"
        ></textarea>
        <div className="playlist-dialog__checkbox-wrapper">
          <input
            type="checkbox"
            id="addTopTracks"
            checked={addTopTracks}
            onChange={(e) => setAddTopTracks(e.target.checked)}
          />
          <label htmlFor="addTopTracks">
            Add your top 20 tracks
          </label>
        </div>
        <div className="dialog__button-wrapper">{children}</div>
      </form>
    </Dialog>
  );
}
