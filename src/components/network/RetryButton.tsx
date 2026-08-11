"use client";

import { useState } from "react";

export default function RetryButton({
  onRetry,
  label = "Retry",
}: {
  onRetry: () => void | Promise<void>;
  label?: string;
}) {
  const [retrying, setRetrying] = useState(false);

  const handleClick = async () => {
    setRetrying(true);
    try {
      await onRetry();
    } finally {
      setRetrying(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={retrying}
      className="bg-[#C81E3A] hover:bg-[#A11530] disabled:opacity-60 text-white px-6 py-2.5 rounded-xl font-semibold text-sm transition"
    >
      {retrying ? "Retrying..." : `🔄 ${label}`}
    </button>
  );
}