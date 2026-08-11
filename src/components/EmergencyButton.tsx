"use client";

export default function EmergencyButton() {
  return (
    <div className="fixed bottom-6 right-6 z-50">

      <a
        href="https://wa.me/923456665997"
        target="_blank"
        rel="noopener"
        className="
          flex
          items-center
          gap-3
          bg-red-600
          text-white
          px-6
          py-4
          rounded-full
          shadow-2xl
          animate-pulse
          hover:scale-105
          transition
        "
      >
        🚨 Emergency
      </a>

    </div>
  );
}