import "./SignIn.css";
import { easeInOut, motion } from "framer-motion";
import FrequencyBars from "../../components/FrequencyBars/FrequencyBars";
import SignInWithSpotifyButton from "../../components/SignInWithSpotifyButton/SignInWithSpotifyButton";

export default function SignIn() {
  return (
    <div className="sign-in">
      <motion.header
        className="sign-in__header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: easeInOut }}
      >
        <h1>Playlist Manager</h1>
      </motion.header>
      <FrequencyBars type={null} />
      <motion.main
        className="sign-in__main"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: easeInOut, delay: 0.75 }}
      >
        <div className="sign-in__window">
          <p>Please sign in to continue</p>
          <SignInWithSpotifyButton />
        </div>
      </motion.main>
    </div>
  );
}
