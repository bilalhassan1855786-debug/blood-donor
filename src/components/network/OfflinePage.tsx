"use client";

import RetryButton from "./RetryButton";

export default function OfflinePage() {
  const handleRetry = () => {
    // If the connection is back, a full reload is the simplest way to
    // resume whatever the user was doing. NetworkProvider will also
    // pick up the "online" event automatically in the background.
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-[#FBF7F1] flex items-center justify-center px-4">
      <div className="text-center max-w-sm">
        <img
          src="/logo.png"
          alt="Emergency Blood Donation Network"
          className="w-16 h-16 mx-auto mb-6 rounded-full shadow-md"
        />

        <div className="text-6xl mb-6">📡</div>

        <h1 className="text-2xl font-bold text-[#15141A] mb-3">No Internet Connection</h1>

        <p className="text-[#5B5964] text-sm mb-8 leading-6">
          You're offline. Please connect to the internet and try again.
        </p>

        <RetryButton onRetry={handleRetry} />
      </div>
    </div>
  );
}