"use client";

import { createContext, useContext, useEffect, useState } from "react";

type NetworkContextType = {
  isOnline: boolean;
  justReconnected: boolean;
};

const NetworkContext = createContext<NetworkContextType>({
  isOnline: true,
  justReconnected: false,
});

export function NetworkProvider({ children }: { children: React.ReactNode }) {
  // Start optimistic (true) — navigator isn't available during SSR, and
  // this avoids a flash of the offline banner on every page load.
  const [isOnline, setIsOnline] = useState(true);
  const [justReconnected, setJustReconnected] = useState(false);

  useEffect(() => {
    // Sync to the real state once we're actually in the browser.
    setIsOnline(navigator.onLine);

    const handleOnline = () => {
      setIsOnline(true);
      setJustReconnected(true);
      // Briefly show a "back online" state, then clear it.
      setTimeout(() => setJustReconnected(false), 3000);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setJustReconnected(false);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <NetworkContext.Provider value={{ isOnline, justReconnected }}>
      {children}
    </NetworkContext.Provider>
  );
}

export function useNetwork() {
  return useContext(NetworkContext);
}