import "./PlaylistDialog.css";
import { useState, useEffect } from "react";
import Dialog from "../Dialog/Dialog";

export default function PlaylistDialog({
  isOpen,
  onClose,
  onSubmit,
  title,
  children,
  initialName = "",
  initialDescription = "",
}) {
  const [name, setName] = useState(initialName);
  const [description, setDescription] = useState(initialDescription);

  useEffect(() => {
    if (isOpen) {
      setName(initialName);
      setDescription(initialDescription);
    }
  }, [isOpen, initialName, initialDescription]);

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
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Playlist description"
        ></textarea>
        <div className="dialog__button-wrapper">{children}</div>
      </form>
    </Dialog>
  );
}
