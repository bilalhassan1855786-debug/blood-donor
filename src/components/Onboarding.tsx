"use client";

import { useState } from "react";
import Link from "next/link";

type OnboardingProps = {
  onFinish: () => void;
};

export default function Onboarding({
  onFinish,
}: OnboardingProps) {
  const [step, setStep] = useState(0);

  return (
    <div className="fixed inset-0 z-[99998] bg-white">

      {/* SCREEN 1 */}

      {step === 0 && (
        <div className="h-screen flex flex-col items-center justify-center p-3 sm:p-4 md:p-6 text-center bg-gradient-to-br from-red-700 to-red-900 text-white">

          <div className="text-5xl sm:text-6xl md:text-7xl mb-3 sm:mb-4 md:mb-6 animate-pulse">
            🩸
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black mb-2 sm:mb-3 md:mb-4">
            Emergency Blood
            <br />
            Donation Network
          </h1>

          <p className="text-base sm:text-lg md:text-lg opacity-90 mb-6 sm:mb-8 md:mb-10">
            Save Lives Through
            <br />
            Blood Donation
          </p>

          <button
            onClick={() => setStep(1)}
            className="bg-white text-red-600 px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 rounded-lg sm:rounded-lg md:rounded-xl font-bold hover:scale-105 transition text-sm sm:text-base"
          >
            Continue
          </button>

        </div>
      )}

      {/* SCREEN 2 */}

      {step === 1 && (
        <div className="h-screen flex flex-col justify-center p-3 sm:p-4 md:p-8 bg-green-50">

          <div className="max-w-lg mx-auto text-center">

            <div className="text-4xl sm:text-5xl md:text-6xl mb-3 sm:mb-4 md:mb-6">
              📖
            </div>

            <h2 className="text-xl sm:text-2xl md:text-2xl font-black mb-3 sm:mb-4 md:mb-6">
              Quran
            </h2>

            <p className="text-base sm:text-lg md:text-xl leading-8 sm:leading-9 md:leading-10 font-semibold">
              وَمَنْ أَحْيَاهَا
              فَكَأَنَّمَا أَحْيَا
              النَّاسَ جَمِيعًا
            </p>

            <p className="mt-4 sm:mt-5 md:mt-6 text-gray-700 text-sm sm:text-base">
              Aur jis ne ek jaan bachai,
              goya us ne tamam
              insaniyat ko bacha liya.
            </p>

            <p className="mt-1 sm:mt-1.5 md:mt-2 text-xs sm:text-sm text-gray-500">
              Surah Al-Ma'idah 5:32
            </p>

            <button
              onClick={() => setStep(2)}
              className="mt-6 sm:mt-8 md:mt-10 bg-red-600 text-white px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 rounded-lg sm:rounded-lg md:rounded-xl font-bold hover:bg-red-700 transition text-sm sm:text-base"
            >
              Next
            </button>

          </div>

        </div>
      )}

      {/* SCREEN 3 */}

      {step === 2 && (
        <div className="h-screen flex flex-col justify-center p-3 sm:p-4 md:p-8 bg-blue-50">

          <div className="max-w-lg mx-auto text-center">

            <div className="text-4xl sm:text-5xl md:text-6xl mb-3 sm:mb-4 md:mb-6">
              🤝
            </div>

            <h2 className="text-xl sm:text-2xl md:text-2xl font-black mb-3 sm:mb-4 md:mb-6">
              Hadith
            </h2>

            <p className="text-base sm:text-lg md:text-xl leading-8 sm:leading-9 md:leading-9 font-semibold">
              Allah Ta'ala bande ki
              madad mein rehta hai,
              jab tak banda apne
              bhai ki madad mein rehta hai.
            </p>

            <p className="mt-4 sm:mt-5 md:mt-6 text-gray-500 text-sm sm:text-base">
              Sahih Muslim 2699
            </p>

            <button
              onClick={() => setStep(3)}
              className="mt-6 sm:mt-8 md:mt-10 bg-red-600 text-white px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 rounded-lg sm:rounded-lg md:rounded-xl font-bold hover:bg-red-700 transition text-sm sm:text-base"
            >
              Next
            </button>

          </div>

        </div>
      )}

      {/* SCREEN 4 */}

      {step === 3 && (
        <div className="h-screen flex flex-col justify-center p-3 sm:p-4 md:p-8 bg-red-600 text-white">

          <div className="max-w-lg mx-auto text-center">

            <div className="text-5xl sm:text-6xl md:text-7xl mb-3 sm:mb-4 md:mb-6">
              ❤️
            </div>

            <h2 className="text-xl sm:text-2xl md:text-3xl font-black mb-2 sm:mb-3 md:mb-4">
              Become a Lifesaver
            </h2>

            <p className="text-sm sm:text-base md:text-lg mb-6 sm:mb-8 md:mb-10">
              Join Pakistan's
              Emergency Blood
              Donation Network
            </p>

            <div className="space-y-2 sm:space-y-3 md:space-y-4">

              <Link
                href="/signup"
                onClick={onFinish}
                className="block bg-white text-red-600 py-2 sm:py-3 md:py-4 rounded-lg sm:rounded-lg md:rounded-xl font-bold text-sm sm:text-base hover:bg-gray-50 transition"
              >
                Sign Up
              </Link>

              <Link
                href="/login"
                onClick={onFinish}
                className="block border-2 border-white py-2 sm:py-3 md:py-4 rounded-lg sm:rounded-lg md:rounded-xl font-bold text-sm sm:text-base hover:bg-white/10 transition"
              >
                Login
              </Link>

              <button
                onClick={onFinish}
                className="w-full bg-black/20 py-2 sm:py-3 md:py-4 rounded-lg sm:rounded-lg md:rounded-xl font-bold text-sm sm:text-base hover:bg-black/30 transition"
              >
                Continue to App
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}