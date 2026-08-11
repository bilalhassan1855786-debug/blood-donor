"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { aboutTranslations } from "@/lib/translations/about";

export default function AboutPage() {
  const { lang } = useLanguage();

  const t =
    aboutTranslations[
      lang as keyof typeof aboutTranslations
    ];

  return (
    <div className="min-h-screen bg-gray-50">

      {/* HERO */}

      <section className="bg-gradient-to-br from-red-700 via-red-600 to-red-900 text-white py-20">

        <div className="max-w-7xl mx-auto px-6 text-center">

          <div className="text-7xl mb-6">
            🩸
          </div>

          <h1 className="text-5xl md:text-6xl font-black mb-6">
            {t.hero_title}
          </h1>

          <p className="max-w-3xl mx-auto text-xl text-red-100">
            {t.hero_description}
          </p>

        </div>

      </section>

      <div className="max-w-7xl mx-auto px-6 py-16">

        {/* Mission */}

        <div className="bg-white rounded-3xl shadow-lg p-10 mb-10">

          <h2 className="text-4xl font-black text-red-600 mb-6">
            🎯 {t.mission_title}
          </h2>

          <p className="text-gray-700 leading-8 text-lg">
            {t.mission_description}
          </p>

        </div>

        {/* Features */}

        <div className="grid md:grid-cols-3 gap-6 mb-10">

          {/* Feature 1 */}

          <div className="bg-white rounded-2xl shadow-lg p-8 hover:-translate-y-2 transition">

            <div className="text-5xl mb-4">
              🩸
            </div>

            <h3 className="text-2xl font-bold text-red-600 mb-3">
              {t.feature1_title}
            </h3>

            <p className="text-gray-600">
              {t.feature1_description}
            </p>

          </div>

          {/* Feature 2 */}

          <div className="bg-white rounded-2xl shadow-lg p-8 hover:-translate-y-2 transition">

            <div className="text-5xl mb-4">
              🚨
            </div>

            <h3 className="text-2xl font-bold text-red-600 mb-3">
              {t.feature2_title}
            </h3>

            <p className="text-gray-600">
              {t.feature2_description}
            </p>

          </div>

          {/* Feature 3 */}

          <div className="bg-white rounded-2xl shadow-lg p-8 hover:-translate-y-2 transition">

            <div className="text-5xl mb-4">
              🔒
            </div>

            <h3 className="text-2xl font-bold text-red-600 mb-3">
              {t.feature3_title}
            </h3>

            <p className="text-gray-600">
              {t.feature3_description}
            </p>

          </div>

        </div>

        {/* Why Choose Us */}

        <div className="bg-white rounded-3xl shadow-lg p-10 mb-10">

          <h2 className="text-4xl font-black mb-8">
            {t.why_choose_title}
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-red-50 p-5 rounded-xl">
              ✅ {t.why1}
            </div>

            <div className="bg-red-50 p-5 rounded-xl">
              ✅ {t.why2}
            </div>

            <div className="bg-red-50 p-5 rounded-xl">
              ✅ {t.why3}
            </div>

            <div className="bg-red-50 p-5 rounded-xl">
              ✅ {t.why4}
            </div>

            <div className="bg-red-50 p-5 rounded-xl">
              ✅ {t.why5}
            </div>

            <div className="bg-red-50 p-5 rounded-xl">
              ✅ {t.why6}
            </div>

          </div>

        </div>

        {/* CTA */}

        <div className="bg-red-600 rounded-3xl p-10 text-center text-white">

          <h2 className="text-4xl font-black mb-4">
            {t.team_title}
          </h2>

          <p className="mb-8">
            {t.team_description}
          </p>

          <Link
            href="/team"
            className="bg-white text-red-600 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition"
          >
            {t.view_team}
          </Link>

        </div>

      </div>

    </div>
  );
}