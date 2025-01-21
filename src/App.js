// import { api } from "./utils/api";

import { useEffect, useState } from "react";
import { db } from "./utils/db";
import SignInOutButton from "./components/SignInOutButton/SignInOutButton";

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const token = db.token.get();
    if (token && token.expires_at > Date.now()) {
      setIsSignedIn(true);
    } else {
      setIsSignedIn(false);
    }
  }, []);

  return (
    <div className="App">
      <div>Hello world</div>
      <SignInOutButton isSignedIn={isSignedIn} />
    </div>
  );
}

export default App;
