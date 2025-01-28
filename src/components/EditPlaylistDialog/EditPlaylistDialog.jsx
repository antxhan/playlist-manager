import "./EditPlaylistDialog.css";
import { useState } from "react";
import StandardButton from "../buttons/StandardButton/StandardButton";
import AccentButton from "../buttons/AccentButton/AccentButton";

export default function EditPlaylistDialog({
  isOpen,
  onClose,
  onSubmit,
  initialName,
  initialDescription,
}) {
  const [name, setName] = useState(initialName);
  const [description, setDescription] = useState(initialDescription);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(name, description);
  };

  return (
    isOpen && (
      <dialog className="edit-dialog">
        <div className="edit-dialog__form-wrapper">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Playlist name"
            />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Playlist description"
            ></textarea>
            <div className="edit-dialog__button-wrapper">
              <AccentButton type="submit">Save</AccentButton>
              <StandardButton onClick={onClose}>Cancel</StandardButton>
            </div>
          </form>
        </div>
      </dialog>
    )
  );
}
