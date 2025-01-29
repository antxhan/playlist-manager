import './AccentButton.css'
import StandardButton from "../StandardButton/StandardButton";

export default function AccentButton({
  type = "button",
  onClick,
  children,
  className,
}) {
  return (
    <StandardButton
      type={type}
      onClick={onClick}
      className={`accent-btn ${className || ""}`}
    >
      {children}
    </StandardButton>
  );
}
