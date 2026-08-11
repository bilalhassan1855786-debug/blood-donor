"use client";

import RetryButton from "./RetryButton";

export default function OfflineCard({
  title = "Internet Required",
  description = "This content couldn't be loaded. Please check your connection and try again.",
  onRetry,
}: {
  title?: string;
  description?: string;
  onRetry?: () => void | Promise<void>;
}) {
  return (
    <div className="bg-white rounded-3xl border border-black/5 shadow-sm p-10 text-center max-w-md mx-auto">
      <div className="text-5xl mb-4">📡</div>
      <h2 className="text-xl font-bold text-[#15141A] mb-2">{title}</h2>
      <p className="text-[#5B5964] text-sm mb-6 leading-6">{description}</p>
      {onRetry && <RetryButton onRetry={onRetry} />}
    </div>
  );
}