import "./StandardButton.css";

export default function StandardButton({
  type = "button",
  onClick,
  children,
  className,
  ariaLabel = "",
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`standard-btn ${className || ""}`}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
