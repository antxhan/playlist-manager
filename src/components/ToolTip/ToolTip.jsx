import "./ToolTip.css";

export default function ToolTip({ text, postition = "top" }) {
  let style =
    postition === "top"
      ? {
          left: "50%",
          bottom: "100%",
          transform: "translateY(-50%) translateX(-50%)",
        }
      : {
          left: "calc(100% + 0.5rem)",
          top: "50%",
          transform: "translateY(-50%)",
        };
  return (
    <span className="tooltip" style={style}>
      {text}
    </span>
  );
}
