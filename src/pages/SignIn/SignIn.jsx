import "./SignIn.css";
import { motion } from "framer-motion";
import SignInWithSpotifyButton from "../../components/SignInWithSpotifyButton/SignInWithSpotifyButton";

export default function SignIn() {
  return (
    <div className="sign-in">
      <header className="sign-in__header">
        <h1>Playlist Manager</h1>
      </header>
      <div className="frequency-bars">
        {Array.from({ length: 30 }).map((_, index) => (
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
      </div>
      <main className="sign-in__main">
        <div className="sign-in__window">
          <p>Please sign in to continue</p>
          <SignInWithSpotifyButton />
        </div>
      </main>
    </div>
  );
}
