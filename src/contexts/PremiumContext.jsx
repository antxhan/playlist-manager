import React, { createContext, useState } from "react";

export const PremiumContext = createContext(null);

export default function PremiumContextProvider({ children }) {
  const [isPremium, setIsPremium] = useState(false);
  return (
    <PremiumContext.Provider value={{ isPremium, setIsPremium }}>
      {children}
    </PremiumContext.Provider>
  );
}
