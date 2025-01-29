import "./ConfirmDialog.css";
import Dialog from "../Dialog/Dialog";

export default function ConfirmDialog({ isOpen, onClose, onSubmit, message, children }) {
  return (
    <Dialog isOpen={isOpen} onClose={onClose} title={"Confirmation"}>
      <p>{message}</p>
      <div className="dialog__button-wrapper">{children}</div>
    </Dialog>
  );
}
