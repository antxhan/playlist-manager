import "./FrequencyBars.css";
import { motion, easeInOut } from "framer-motion";

export default function FrequencyBars({ type = "nav" }) {
  return (
    <motion.div
      className={`frequency-bars frequency-bars-${type}`}
      initial={{ scaleY: 0, opacity: 0 }}
      animate={{ scaleY: 1, opacity: 1 }}
      transition={{ duration: 0.5, ease: easeInOut }}
    >
      {Array.from({ length: type === "nav" ? 10 : 30 }).map((_, index) => (
        <motion.span
          key={index}
          className="bar"
          initial={{ scaleY: Math.random() * 0.5 + 0.5 }}
          animate={{
            scaleY: [Math.random() * 0.5 + 0.5, Math.random() * 1 + 1],
            opacity: [0.8, Math.random() * 0.3 + 0.7],
          }}
          transition={{
            duration: Math.random(0.8, 1) * 0.8 + 0.25,
            repeat: Infinity,
            repeatType: "spring",
          }}
        ></motion.span>
      ))}
    </motion.div>
  );
}
