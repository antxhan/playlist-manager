import { useEffect, useState } from "react";
import { db } from "../utils/db";

export function useAuth() {
  const [isSignedIn, setIsSignedIn] = useState(null);

  useEffect(() => {
    const token = db.token.get();
    setIsSignedIn(!!token);
  }, []);

  return isSignedIn;
}
