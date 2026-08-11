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
        <div className="h-screen flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-red-700 to-red-900 text-white">

          <div className="text-8xl mb-6 animate-pulse">
            🩸
          </div>

          <h1 className="text-4xl font-black mb-4">
            Emergency Blood
            <br />
            Donation Network
          </h1>

          <p className="text-lg opacity-90 mb-10">
            Save Lives Through
            <br />
            Blood Donation
          </p>

          <button
            onClick={() => setStep(1)}
            className="bg-white text-red-600 px-8 py-4 rounded-xl font-bold hover:scale-105 transition"
          >
            Continue
          </button>

        </div>
      )}

      {/* SCREEN 2 */}

      {step === 1 && (
        <div className="h-screen flex flex-col justify-center p-8 bg-green-50">

          <div className="max-w-lg mx-auto text-center">

            <div className="text-6xl mb-6">
              📖
            </div>

            <h2 className="text-2xl font-black mb-6">
              Quran
            </h2>

            <p className="text-xl leading-10 font-semibold">
              وَمَنْ أَحْيَاهَا
              فَكَأَنَّمَا أَحْيَا
              النَّاسَ جَمِيعًا
            </p>

            <p className="mt-6 text-gray-700">
              Aur jis ne ek jaan bachai,
              goya us ne tamam
              insaniyat ko bacha liya.
            </p>

            <p className="mt-2 text-sm text-gray-500">
              Surah Al-Ma'idah 5:32
            </p>

            <button
              onClick={() => setStep(2)}
              className="mt-10 bg-red-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-red-700 transition"
            >
              Next
            </button>

          </div>

        </div>
      )}

      {/* SCREEN 3 */}

      {step === 2 && (
        <div className="h-screen flex flex-col justify-center p-8 bg-blue-50">

          <div className="max-w-lg mx-auto text-center">

            <div className="text-6xl mb-6">
              🤝
            </div>

            <h2 className="text-2xl font-black mb-6">
              Hadith
            </h2>

            <p className="text-xl leading-9 font-semibold">
              Allah Ta'ala bande ki
              madad mein rehta hai,
              jab tak banda apne
              bhai ki madad mein rehta hai.
            </p>

            <p className="mt-6 text-gray-500">
              Sahih Muslim 2699
            </p>

            <button
              onClick={() => setStep(3)}
              className="mt-10 bg-red-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-red-700 transition"
            >
              Next
            </button>

          </div>

        </div>
      )}

      {/* SCREEN 4 */}

      {step === 3 && (
        <div className="h-screen flex flex-col justify-center p-8 bg-red-600 text-white">

          <div className="max-w-lg mx-auto text-center">

            <div className="text-7xl mb-6">
              ❤️
            </div>

            <h2 className="text-3xl font-black mb-4">
              Become a Lifesaver
            </h2>

            <p className="mb-10">
              Join Pakistan's
              Emergency Blood
              Donation Network
            </p>

            <div className="space-y-4">

              <Link
                href="/signup"
                onClick={onFinish}
                className="block bg-white text-red-600 py-4 rounded-xl font-bold"
              >
                Sign Up
              </Link>

              <Link
                href="/login"
                onClick={onFinish}
                className="block border-2 border-white py-4 rounded-xl font-bold"
              >
                Login
              </Link>

              <button
                onClick={onFinish}
                className="w-full bg-black/20 py-4 rounded-xl font-bold hover:bg-black/30 transition"
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