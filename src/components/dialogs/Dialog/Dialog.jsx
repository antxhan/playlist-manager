import "./Dialog.css";
import React, { useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import StandardButton from "../../buttons/StandardButton/StandardButton";
import XIcon from "../../../icons/XIcon";

export default function Dialog({ isOpen, onClose, title, children }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog) {
      if (isOpen) {
        dialog.showModal();
      } else {
        dialog.close();
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <dialog ref={dialogRef} className="dialog" onClose={onClose}>
      <div className="dialog__content">
        <header className="dialog__header">
          <h3>{title}</h3>
          <StandardButton
            onClick={onClose}
            className={"small-btn"}
            ariaLabel="Close"
          >
            <XIcon />
          </StandardButton>
        </header>
        <main className="dialog__body">{children}</main>
      </div>
    </dialog>,
    document.body
  );
}
