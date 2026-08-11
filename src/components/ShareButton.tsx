"use client";

import { useState } from "react";

export default function ShareButton({
  title,
  text,
  url,
  className = "",
  label = "Share",
}: {
  title: string;
  text?: string;
  url?: string;
  className?: string;
  label?: string;
}) {
  const [copied, setCopied] = useState(false);

  const shareUrl = url || (typeof window !== "undefined" ? window.location.href : "");

  const handleShare = async () => {
    // Native share sheet on phones (WhatsApp, SMS, etc. show up automatically).
    if (typeof navigator !== "undefined" && (navigator as any).share) {
      try {
        await (navigator as any).share({ title, text, url: shareUrl });
        return;
      } catch {
        // User cancelled the share sheet — do nothing.
        return;
      }
    }

    // Desktop / unsupported browsers — fall back to copying the link.
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("Copy this link:", shareUrl);
    }
  };

  return (
    <button
      onClick={handleShare}
      className={
        className ||
        "inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 border border-white/10 text-white text-sm font-semibold px-4 py-2 rounded-lg transition"
      }
    >
      {copied ? "Link copied ✓" : `📤 ${label}`}
    </button>
  );
}