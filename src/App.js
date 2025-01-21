// import { api } from "./utils/api";

import { useEffect, useState } from "react";
import { auth } from "./utils/auth";
import { db } from "./utils/db";

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const token = db.token.get();
    if (token && token.expires_at > Date.now() && token.refresh_token) {
      setIsSignedIn(true);
    } else {
      setIsSignedIn(false);
    }
  }, []);

  return (
    <div className="App">
      <div>Hello world</div>
      {!isSignedIn ? (
        <button onClick={() => auth.signIn()}>Sign In</button>
      ) : (
        <button onClick={() => auth.signOut()}>Sign Out</button>
      )}
    </div>
  );
}

export default App;
