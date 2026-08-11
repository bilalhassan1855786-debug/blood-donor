"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { forgotPasswordTranslations } from "@/lib/translations/forgotPassword";

export default function ForgotPasswordPage() {
  const { lang } = useLanguage();

  const t =
    forgotPasswordTranslations[
      lang as keyof typeof forgotPasswordTranslations
    ];

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero */}

      <section className="relative overflow-hidden bg-gradient-to-br from-red-700 via-red-600 to-red-900 text-white">

        <div className="absolute top-0 right-0 text-[220px] opacity-10">
          🔑
        </div>

        <div className="absolute bottom-0 left-0 text-[180px] opacity-10">
          🛡️
        </div>

        <div className="max-w-6xl mx-auto px-6 py-20 relative">

          <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-5 py-2 mb-6">
            <span className="text-sm font-bold">
              {t.step}
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-black mb-6">
            🔑 {t.hero_title}
          </h1>

          <p className="text-xl text-white/90 max-w-3xl leading-9">
            {t.hero_desc}
          </p>

        </div>

      </section>

      <div className="max-w-5xl mx-auto px-6 py-16">

        {/* Progress */}

        <div className="flex items-center justify-center mb-14">

          <div className="flex items-center gap-3">

            <div className="w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center font-bold">
              1
            </div>

            <div className="w-24 h-1 bg-red-600"></div>

            <div className="w-12 h-12 rounded-full bg-gray-300"></div>

          </div>

        </div>

        {/* Information */}

        <div className="bg-white rounded-3xl shadow-xl p-10">

          <div className="text-center">

            <div className="text-7xl mb-6">
              🔐
            </div>

            <h2 className="text-4xl font-black text-red-600 mb-6">
              {t.contact_admin}
            </h2>

            <p className="text-lg text-gray-700 leading-9 max-w-3xl mx-auto">
              {t.description}
            </p>

          </div>

          {/* Steps */}

          <div className="grid md:grid-cols-3 gap-6 mt-12">

            <Step
              icon="👤"
              title={t.step1}
            />

            <Step
              icon="🛡️"
              title={t.step2}
            />

            <Step
              icon="🔑"
              title={t.step3}
            />

          </div>

          {/* Buttons */}

          <div className="flex flex-wrap justify-center gap-5 mt-14">

            <a
              href="tel:+923456665997"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-bold transition"
            >
              📞 {t.call}
            </a>

            <a
              href="https://wa.me/923456665997"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-xl font-bold transition"
            >
              💬 {t.whatsapp}
            </a>

          </div>

          <div className="text-center mt-10">

            <Link
              href="/profile/change-password"
              className="text-red-600 font-bold hover:underline"
            >
              ← {t.back}
            </Link>

          </div>

        </div>

      </div>

    </div>
  );
}

function Step({
  icon,
  title,
}: {
  icon: string;
  title: string;
}) {
  return (
    <div className="bg-red-50 rounded-2xl p-6 text-center">

      <div className="text-5xl mb-4">
        {icon}
      </div>

      <h3 className="text-xl font-bold text-gray-800">
        {title}
      </h3>

    </div>
  );
}