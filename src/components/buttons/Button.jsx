import ToolTip from "../ToolTip/ToolTip";
import PlayIcon from "../../icons/PlayIcon";
import "./Button.css";

// could have one button component with a prop for variant instead of having multiple button components
export default function Button({
  type = "button",
  onClick,
  children,
  className,
  ariaLabel = "",
  variant = "standard", // "standard", "track-play", "accent"
}) {
  const getClassNames = () => {
    switch (variant) {
      case "track-play":
        return `button track-play-btn ${className || ""}`;
      case "accent":
        return `button accent-btn ${className || ""}`;
      default:
        return `button standard-btn ${className || ""}`;
    }
  };

  return (
    <div className="button-wrapper">
      <button
        type={type}
        onClick={onClick}
        className={getClassNames()}
        aria-label={ariaLabel}
      >
        {variant === "track-play" ? <PlayIcon /> : children}
      </button>
      {ariaLabel && <ToolTip text={ariaLabel} />}
    </div>
  );
}
