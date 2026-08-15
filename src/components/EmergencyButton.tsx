"use client";

export default function EmergencyButton() {
  return (
    <div className="fixed bottom-4 sm:bottom-5 md:bottom-6 right-4 sm:right-5 md:right-6 z-50">

      <a
        href="https://wa.me/923456665997"
        target="_blank"
        rel="noopener"
        className="
          flex
          items-center
          gap-2 sm:gap-3
          bg-red-600
          text-white
          px-4 sm:px-5 md:px-6
          py-2.5 sm:py-3 md:py-4
          rounded-full
          shadow-2xl
          animate-pulse
          hover:scale-105
          transition
          text-xs sm:text-sm md:text-base
          font-semibold
        "
      >
        🚨 Emergency
      </a>

    </div>
  );
}