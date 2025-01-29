import "./Dialog.css";
import StandardButton from "../../buttons/StandardButton/StandardButton";
import XIcon from "../../../icons/XIcon";

export default function Dialog({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <dialog open className="dialog">
      <div className="dialog__content">
        <header className="dialog__header">
          <h3>{title}</h3>
          <StandardButton onClick={onClose} className={'small-btn'}>
            <XIcon />
          </StandardButton>
        </header>
        <main className="dialog__body">{children}</main>
      </div>
    </dialog>
  );
}
