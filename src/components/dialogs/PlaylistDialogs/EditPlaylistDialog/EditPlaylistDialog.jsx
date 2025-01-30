import "../PlaylistDialog/PlaylistDialog.css";
import "./EditPlaylistDialog.css";
import { useState } from "react";
import Dialog from "../../Dialog/Dialog";

export default function PlaylistDialog({
  isOpen,
  onClose,
  onSubmit,
  title,
  children,
  initialName,
  initialDescription,
}) {
  const [name, setName] = useState(initialName);
  const [description, setDescription] = useState(initialDescription);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(name, description);
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
        <div className="dialog__button-wrapper">{children}</div>
      </form>
    </Dialog>
  );
}
