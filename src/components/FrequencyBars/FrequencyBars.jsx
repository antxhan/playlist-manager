import "./FrequencyBars.css";
import { motion, easeInOut } from "framer-motion";

// Generates a number of bars based on the type of frequency bars
const generateBars = (type) => {
  const barCount = type === "nav" ? 10 : 30;
  return Array.from({ length: barCount }).map((_, index) => (
    <motion.span
      key={index}
      className="bar"
      initial={{ scaleY: Math.random() * 0.5 + 0.5 }}
      animate={{
        scaleY: [Math.random() * 0.5 + 0.5, Math.random() * 1 + 1],
        opacity: [0.8, Math.random() * 0.3 + 0.7],
      }}
      transition={{
        duration: Math.random() * 0.8 + 0.25,
        repeat: Infinity,
        repeatType: "spring",
      }}
    ></motion.span>
  ));
};

// FrequencyBars generation moved to its own component for better readability
export default function FrequencyBars({ type = "nav" }) {
  return (
    <motion.div
      className={`frequency-bars frequency-bars-${type}`}
      initial={{ scaleY: 0, opacity: 0 }}
      animate={{ scaleY: 1, opacity: 1 }}
      transition={{ duration: 0.5, ease: easeInOut }}
    >
      {generateBars(type)}
    </motion.div>
  );
}
