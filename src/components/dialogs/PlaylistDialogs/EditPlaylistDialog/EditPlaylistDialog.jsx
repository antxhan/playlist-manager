import "../PlaylistDialog/PlaylistDialog.css";
import "./EditPlaylistDialog.css";
import { useState } from "react";
import Dialog from "../../Dialog/Dialog";

export default function EditPlaylistDialog({
  isOpen,
  onClose,
  onSubmit,
  title,
  children,
  initialName,
  initialDescription,
}) {
  const DESCRIPTION_LIMIT = 300;
  // can be made into an object with keys for each input field
  const [formState, setFormState] = useState({
    name: initialName,
    description: initialDescription,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formState.name, formState.description);
    onClose();
  };

  return (
    <Dialog isOpen={isOpen} onClose={onClose} title={title}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={formState.name}
          onChange={handleChange}
          placeholder="Playlist name (required)"
          aria-label="Playlist name"
          required
        />
        <textarea
          name="description"
          value={formState.description}
          onChange={handleChange}
          placeholder="Playlist description"
          aria-label="Playlist description"
          maxLength={DESCRIPTION_LIMIT}
        ></textarea>
        <div className="edit-playlist-counter-label">
          <span className="edit-playlist-counter-text">
            {formState.description.length}
          </span>
          <span className="edit-playlist-counter-limit">
            /{DESCRIPTION_LIMIT}
          </span>
        </div>
        <div className="dialog__button-wrapper">{children}</div>
      </form>
    </Dialog>
  );
}
