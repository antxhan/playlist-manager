import ToolTip from "../../ToolTip/ToolTip";
import "./StandardButton.css";

export default function StandardButton({
  type = "button",
  onClick,
  children,
  className,
  ariaLabel = "",
}) {
  return (
    <div className="standard-btn-wrapper">
      <button
        type={type}
        onClick={onClick}
        className={`standard-btn ${className || ""}`}
        aria-label={ariaLabel}
      >
        {children}
      </button>
      {ariaLabel && <ToolTip text={ariaLabel} />}
    </div>
  );
}
