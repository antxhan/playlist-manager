import "./PlaylistDialog.css";
import { useState, useEffect } from "react";
import Dialog from "../../Dialog/Dialog";

export default function PlaylistDialog({
  isOpen,
  onClose,
  onSubmit,
  title,
  children,
  initialName = "",
  initialDescription = "",
}) {
  // can be made into an object with keys for each input field
  const [formState, setFormState] = useState({
    name: initialName,
    description: initialDescription,
  });

  useEffect(() => {
    if (isOpen) {
      setFormState({
        name: initialName,
        description: initialDescription,
      });
    }
  }, [isOpen, initialName, initialDescription]);

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
          required
        />
        <textarea
          name="description"
          value={formState.description}
          onChange={handleChange}
          placeholder="Playlist description"
        ></textarea>
        <div className="dialog__button-wrapper">{children}</div>
      </form>
    </Dialog>
  );
}
