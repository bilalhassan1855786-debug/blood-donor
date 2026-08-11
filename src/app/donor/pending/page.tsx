"use client";

import Link from "next/link";
import { Space_Grotesk } from "next/font/google";
import { useLanguage } from "@/context/LanguageContext";
import { donorPendingTranslations } from "@/lib/translations/donor-pending";

const display = Space_Grotesk({ subsets: ["latin"], weight: ["600", "700"] });

export default function DonorPendingPage() {
  const { lang } = useLanguage();
  const dp = donorPendingTranslations[lang];

  return (
    <div className="min-h-screen bg-[#FBF7F1] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-xl p-10 text-center">
        <div className="text-7xl mb-6 motion-safe:animate-pulse">🩸</div>

        <h1 className={`${display.className} text-3xl font-bold text-[#15141A] mb-4`}>
          {dp.title}
        </h1>

        <p className="text-[#5B5964] leading-8 mb-8">{dp.desc}</p>

        <div className="bg-[#0F6E6612] border border-[#0F6E6640] rounded-2xl p-6 mb-8 text-left">
          <h2 className={`${display.className} text-sm font-bold text-[#0F6E66] mb-4`}>
            {dp.what_next_title}
          </h2>

          <ul className="space-y-3">
            <NextItem text={dp.what_next_1} />
            <NextItem text={dp.what_next_2} />
            <NextItem text={dp.what_next_3} />
          </ul>
        </div>

        <div className="flex flex-col gap-3">
          <Link
            href="/profile"
            className="bg-[#C81E3A] hover:bg-[#A11530] text-white py-3 rounded-xl font-semibold transition"
          >
            {dp.go_profile}
          </Link>
          <Link
            href="/"
            className="border border-black/10 text-[#15141A] py-3 rounded-xl font-semibold hover:bg-black/5 transition"
          >
            {dp.go_home}
          </Link>
        </div>
      </div>
    </div>
  );
}

function NextItem({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-3 text-sm text-[#15141A]">
      <span className="mt-0.5 w-5 h-5 shrink-0 rounded-full bg-[#0F6E66] text-white flex items-center justify-center text-[10px] font-bold">
        ✓
      </span>
      {text}
    </li>
  );
}