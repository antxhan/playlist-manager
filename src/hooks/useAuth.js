import { useEffect, useState } from "react";
import { db } from "../utils/db";

export function useAuth() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const token = db.token.get();
    if (!token) {
      setIsSignedIn(false);
    } else {
      setIsSignedIn(true);
    }
  }, []);
  return isSignedIn;
}
