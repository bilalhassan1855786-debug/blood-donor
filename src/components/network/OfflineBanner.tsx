"use client";

import { useNetwork } from "@/context/NetworkContext";

export default function OfflineBanner() {
  const { isOnline, justReconnected } = useNetwork();

  if (isOnline && !justReconnected) return null;

  return (
    <div
      className={`sticky top-0 z-[60] text-center text-sm font-semibold py-2 px-4 flex items-center justify-center gap-2 transition-colors ${
        isOnline ? "bg-[#0F6E66] text-white" : "bg-[#C81E3A] text-white"
      }`}
      style={{ animation: "offlineSlideDown 0.3s ease" }}
    >
      <style>{`
        @keyframes offlineSlideDown {
          from { transform: translateY(-100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>

      {isOnline ? (
        <>🟢 Back online</>
      ) : (
        <>🔴 No Internet Connection — some features are unavailable</>
      )}
    </div>
  );
}