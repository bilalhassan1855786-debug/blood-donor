"use client";

import { useState } from "react";
import Link from "next/link";
import { Space_Grotesk } from "next/font/google";
import { useLanguage } from "@/context/LanguageContext";
import { healthTranslations } from "@/lib/translations/health-check";

const display = Space_Grotesk({ subsets: ["latin"], weight: ["600", "700"] });

export default function HealthCheckPage() {
  const { lang } = useLanguage();
  const t = healthTranslations[lang];

  const [agree, setAgree] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  return (
    <div className="min-h-screen bg-[#FBF7F1]">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#15141A] text-white">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(600px circle at 85% 10%, rgba(200,30,58,0.35), transparent 60%), radial-gradient(500px circle at 10% 90%, rgba(15,110,102,0.25), transparent 60%)",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-6 py-20">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/10 rounded-full px-5 py-2 mb-6">
            <span className="text-sm font-semibold">{t.step}</span>
          </div>

          <h1 className={`${display.className} text-4xl md:text-6xl font-bold mb-6`}>
            {t.hero_title}
          </h1>

          <p className="text-lg text-white/70 max-w-3xl leading-8">{t.hero_desc}</p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-16">
        <ProgressSteps current={1} />

        {/* Before Donate */}
        <Panel title={`✅ ${t.before_title}`}>
          <div className="grid md:grid-cols-2 gap-5">
            <Item text={t.age} />
            <Item text={t.weight} />
            <Item text={t.healthy} />
            <Item text={t.sleep} />
            <Item text={t.water} />
            <Item text={t.food} />
          </div>
        </Panel>

        {/* Cannot Donate */}
        <Panel title={`❌ ${t.cannot_title}`}>
          <div className="grid md:grid-cols-2 gap-5">
            <Item text={t.fever} />
            <Item text={t.surgery} />
            <Item text={t.pregnant} />
            <Item text={t.antibiotics} />
            <Item text={t.hepatitis} />
            <Item text={t.hiv} />
          </div>
        </Panel>

        {/* After Donation */}
        <Panel title={`❤️ ${t.after_title}`}>
          <div className="grid md:grid-cols-2 gap-5">
            <Item text={t.rest} />
            <Item text={t.drink} />
            <Item text={t.exercise} />
            <Item text={t.smoking} />
            <Item text={t.alcohol} />
          </div>
        </Panel>

        {/* Important Notice */}
        <div className="bg-[#0F6E6612] border border-[#0F6E6640] rounded-3xl p-8 mb-10">
          <div className="flex items-start gap-5">
            <div className="text-4xl">🩺</div>
            <div>
              <h3 className={`${display.className} text-xl font-bold text-[#0F6E66] mb-3`}>
                {t.notice_title}
              </h3>
              <p className="text-[#5B5964] leading-8">{t.notice_desc}</p>
            </div>
          </div>
        </div>

        {/* Agreement */}
        <div className="bg-white rounded-3xl shadow-sm border border-black/5 p-8">
          <label className="flex items-start gap-4 cursor-pointer">
            <input
              type="checkbox"
              checked={agree}
              onChange={(e) => {
                setAgree(e.target.checked);
                if (e.target.checked) setShowAlert(false);
              }}
              className="mt-1 w-5 h-5 accent-[#C81E3A]"
            />
            <span className="text-base text-[#15141A]">{t.agree}</span>
          </label>

          {showAlert && (
            <p className="mt-4 text-sm text-[#C81E3A] font-medium">{t.agree_alert}</p>
          )}

          <div className="mt-10 flex justify-end">
            <Link
              href="/privacy-policy"
              onClick={(e) => {
                if (!agree) {
                  e.preventDefault();
                  setShowAlert(true);
                  return;
                }
                localStorage.setItem(
                  "healthCheck",
                  JSON.stringify({
                    passed: true,
                    completedAt: new Date().toISOString(),
                  })
                );
              }}
              className={`px-10 py-4 rounded-xl font-bold transition ${
                agree
                  ? "bg-[#C81E3A] hover:bg-[#A11530] text-white"
                  : "bg-black/10 text-black/40 cursor-not-allowed"
              }`}
            >
              {t.continue} →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-3xl shadow-sm border border-black/5 p-8 md:p-10 mb-10">
      <h2 className={`${display.className} text-2xl md:text-3xl font-bold text-[#C81E3A] mb-8`}>
        {title}
      </h2>
      {children}
    </div>
  );
}

function Item({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-4 bg-[#C81E3A0A] rounded-2xl p-5 hover:shadow-md transition">
      <div className="w-9 h-9 shrink-0 rounded-full bg-[#C81E3A] text-white flex items-center justify-center font-bold text-sm">
        ✓
      </div>
      <p className="text-[#15141A] font-medium text-sm leading-6">{text}</p>
    </div>
  );
}

// Shared 4-step progress indicator: Health Check → Privacy → Terms → Become Donor
function ProgressSteps({ current }: { current: number }) {
  return (
    <div className="flex items-center justify-center mb-14">
      <div className="flex items-center gap-3">
        {[1, 2, 3, 4].map((step, i) => (
          <div key={step} className="flex items-center gap-3">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm ${
                step < current
                  ? "bg-[#0F6E66] text-white"
                  : step === current
                  ? "bg-[#C81E3A] text-white"
                  : "bg-black/10 text-black/30"
              }`}
            >
              {step < current ? "✓" : step}
            </div>
            {i < 3 && (
              <div
                className={`w-16 md:w-24 h-1 rounded-full ${
                  step < current ? "bg-[#0F6E66]" : "bg-black/10"
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}