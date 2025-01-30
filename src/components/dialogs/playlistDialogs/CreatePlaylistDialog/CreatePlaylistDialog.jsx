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

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(name, description);
    setName("");
    setDescription("");
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
