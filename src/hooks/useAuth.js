import { useEffect, useState } from "react";
import { db } from "../utils/db";

export function useAuth() {
  const [isSignedIn, setIsSignedIn] = useState(null);

  useEffect(() => {
    // can be one line
    setIsSignedIn(!!db.token.get());
  }, []);

  return isSignedIn;
}
