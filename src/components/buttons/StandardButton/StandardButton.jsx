import './StandardButton.css'

export default function StandardButton({
  type = "button",
  onClick,
  children,
  className,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`standard-btn ${className || ""}`}
    >
      {children}
    </button>
  );
}
