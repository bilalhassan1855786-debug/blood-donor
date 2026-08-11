"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const slides = [
  {
    icon: "📖",
    title: "قرآن مجید",
    arabic:
      "وَمَنْ أَحْيَاهَا فَكَأَنَّمَا أَحْيَا النَّاسَ جَمِيعًا",
    urdu:
      "اور جس نے ایک جان بچائی گویا اس نے پوری انسانیت کو بچا لیا۔",
    source: "سورۃ المائدہ 5:32",
  },
  {
    icon: "🤝",
    title: "حدیث مبارکہ",
    arabic:
      "وَاللَّهُ فِي عَوْنِ الْعَبْدِ مَا كَانَ الْعَبْدُ فِي عَوْنِ أَخِيهِ",
    urdu:
      "اللہ تعالیٰ بندے کی مدد میں رہتا ہے جب تک بندہ اپنے بھائی کی مدد میں رہتا ہے۔",
    source: "صحیح مسلم 2699",
  },
];

type SplashScreenProps = {
  onFinish: () => void;
};

export default function SplashScreen({
  onFinish,
}: SplashScreenProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 2500);

    const finishTimer = setTimeout(() => {
      onFinish();
    }, 5000);

    return () => {
      clearInterval(slideInterval);
      clearTimeout(finishTimer);
    };
  }, [onFinish]);

  const current = slides[index];

  return (
    <div className="fixed inset-0 z-[99999] bg-gradient-to-br from-red-700 via-red-600 to-red-900 text-white">

      <div className="h-full flex flex-col items-center justify-center px-6">

        <Image
          src="/logo.png"
          alt="Logo"
          width={120}
          height={120}
          className="rounded-full mb-6 shadow-2xl"
          priority
        />

        <h1 className="text-2xl md:text-4xl font-black text-center mb-8">
          EMERGENCY BLOOD
          <br />
          DONATION NETWORK
        </h1>

        <div className="bg-white/10 backdrop-blur rounded-3xl p-8 max-w-2xl text-center">

          <div className="text-5xl mb-4">
            {current.icon}
          </div>

          <h2 className="text-2xl font-bold mb-6">
            {current.title}
          </h2>

          <p className="text-2xl leading-loose mb-6">
            {current.arabic}
          </p>

          <p className="text-lg mb-4">
            {current.urdu}
          </p>

          <p className="text-sm opacity-80">
            {current.source}
          </p>

        </div>

        <div className="mt-10 flex gap-2">

          {slides.map((_, i) => (
            <div
              key={i}
              className={`h-2 w-10 rounded-full transition-all ${
                i === index
                  ? "bg-white"
                  : "bg-white/30"
              }`}
            />
          ))}

        </div>

        <p className="mt-8 text-white/80 animate-pulse">
          Loading...
        </p>

      </div>

    </div>
  );
}