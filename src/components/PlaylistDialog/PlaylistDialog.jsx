import "./PlaylistDialog.css";
import { useState, useEffect } from "react";

export default function PlaylistDialog({
  isOpen,
  onClose,
  onSubmit,
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
    isOpen && (
      <dialog className="playlist-dialog">
        <div className="playlist-dialog__form-wrapper">
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
            <div className="playlist-dialog__button-wrapper">{children}</div>
          </form>
        </div>
      </dialog>
    )
  );
}
