import "./AccentButton.css";
import StandardButton from "../StandardButton/StandardButton";

export default function AccentButton({
  type = "button",
  onClick,
  children,
  className,
  ariaLabel,
}) {
  return (
    <StandardButton
      type={type}
      onClick={onClick}
      className={`accent-btn ${className || ""}`}
      ariaLabel={ariaLabel}
    >
      {children}
    </StandardButton>
  );
}
