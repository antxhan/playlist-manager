import { useState, useEffect } from "react";
import Dialog from "../../Dialog/Dialog";
import "./PlaylistDialog.css";
import "./CreatePlaylistDialog.css";
import "./EditPlaylistDialog.css";

// a new consolidated playlist dialog component instead of having multiple playlist dialog components
export default function ConsolidatedPlaylistDialog({
  isOpen,
  onClose,
  onSubmit,
  title,
  children,
  initialName = "",
  initialDescription = "",
  addTopTracksOption = false,
  initialAddTopTracks = false,
}) {
  const DESCRIPTION_LIMIT = 300;
  const [formData, setFormData] = useState({
    name: initialName,
    description: initialDescription,
    addTopTracks: initialAddTopTracks,
  });

  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: initialName,
        description: initialDescription,
        addTopTracks: initialAddTopTracks,
      });
    }
  }, [isOpen, initialName, initialDescription, initialAddTopTracks]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData.name, formData.description, formData.addTopTracks);
    setFormData({ name: "", description: "", addTopTracks: false });
    onClose();
  };

  return (
    <Dialog isOpen={isOpen} onClose={onClose} title={title}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Playlist name (required)"
          aria-label="Playlist name"
          required
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Playlist description"
          aria-label="Playlist description"
          maxLength={DESCRIPTION_LIMIT}
        ></textarea>
        <div className="create-playlist-counter-label">
          <span className="create-playlist-counter-text">
            {formData.description.length}
          </span>
          <span className="create-playlist-counter-limit">
            /{DESCRIPTION_LIMIT}
          </span>
        </div>
        {addTopTracksOption && (
          <div className="playlist-dialog__checkbox-wrapper">
            <input
              type="checkbox"
              name="addTopTracks"
              id="addTopTracks"
              checked={formData.addTopTracks}
              onChange={handleChange}
            />
            <label htmlFor="addTopTracks">Add your top 20 tracks</label>
          </div>
        )}
        <div className="dialog__button-wrapper">{children}</div>
      </form>
    </Dialog>
  );
}
