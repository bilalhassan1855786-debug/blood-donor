"use client";
import { t } from "@/lib/translations";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Space_Grotesk, IBM_Plex_Mono } from "next/font/google";

import Hero from "@/components/Hero";
import Onboarding from "@/components/Onboarding";
import SplashScreen from "@/components/SplashScreen";
import { useLanguage } from "@/context/LanguageContext";

// ===============================
// FONTS
// Space Grotesk = headings (confident, geometric, modern-medical feel)
// IBM Plex Mono = stat numbers (reads like a monitor readout — ties to
// the "heartbeat" visual language used across the page)
// ===============================
const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "700"],
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

// ===============================
// STORAGE KEYS
// - Onboarding: shown once, ever  -> localStorage (survives closing the app)
// - Splash: shown once per app session -> sessionStorage (survives a page
//   refresh, but clears when the tab / app is actually closed and reopened)
// ===============================
const ONBOARDING_KEY = "bd_has_onboarded";
const SPLASH_SESSION_KEY = "bd_splash_shown_session";

export default function Home() {
  const { lang } = useLanguage();

  // null = "still checking storage" -> prevents a flash of the wrong screen
  const [showSplash, setShowSplash] = useState<boolean | null>(null);
  const [showOnboarding, setShowOnboarding] = useState<boolean | null>(null);

  // Decide what to show ONCE, on real mount, based on persisted state.
  useEffect(() => {
    const hasOnboarded = localStorage.getItem(ONBOARDING_KEY) === "true";
    const splashShownThisSession =
      sessionStorage.getItem(SPLASH_SESSION_KEY) === "true";

    setShowOnboarding(!hasOnboarded);
    setShowSplash(!splashShownThisSession);
  }, []);

  // Auto-dismiss splash after 5s, and mark this session as "splash seen"
  // so refreshing the home page never triggers it again.
  useEffect(() => {
    if (showSplash !== true) return;

    const timer = setTimeout(() => {
      sessionStorage.setItem(SPLASH_SESSION_KEY, "true");
      setShowSplash(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, [showSplash]);

  const dismissSplash = () => {
    sessionStorage.setItem(SPLASH_SESSION_KEY, "true");
    setShowSplash(false);
  };

  const finishOnboarding = () => {
    localStorage.setItem(ONBOARDING_KEY, "true");
    setShowOnboarding(false);
  };

  // Still checking storage — render nothing for a beat rather than flashing
  // the full page before we know if splash/onboarding should show.
  if (showSplash === null || showOnboarding === null) {
    return <div className="min-h-screen bg-[#FBF7F1]" />;
  }

  if (showSplash) {
    return <SplashScreen onFinish={dismissSplash} />;
  }

  return (
    <div className={`min-h-screen bg-[#FBF7F1] text-[#15141A]`}>
      {/*
        Onboarding is a fixed/full-screen overlay (z-[99998]) that renders
        itself on top of everything else. It's only mounted while the user
        hasn't completed it yet; once they hit "Continue to App" / Sign Up /
        Login, onFinish() fires, saves the localStorage flag, and this
        unmounts for good.
      */}
      {showOnboarding && <Onboarding onFinish={finishOnboarding} />}

      <Hero />

      {/* WHY DONATE */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-14">
          <h2
            className={`${display.className} text-4xl md:text-5xl font-bold text-[#15141A]`}
          >
            {t(lang, "why_donate_title")}
          </h2>
          <p className="text-[#5B5964] mt-4 max-w-2xl mx-auto leading-7">
            {t(lang, "why_donate_desc")}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card
            icon="❤️"
            title={t(lang, "save_lives")}
            text={t(lang, "save_lives_desc")}
          />
          <Card
            icon="🧠"
            title={t(lang, "health_benefits")}
            text={t(lang, "health_benefits_desc")}
          />
          <Card
            icon="🤝"
            title={t(lang, "strong_community")}
            text={t(lang, "strong_community_desc")}
          />
        </div>
      </section>

      <PulseDivider />

      {/* OUR IMPACT */}
      <section className="relative bg-[#15141A] text-white py-24 overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(600px circle at 20% 20%, rgba(200,30,58,0.35), transparent 60%), radial-gradient(500px circle at 85% 80%, rgba(15,110,102,0.25), transparent 60%)",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className={`${display.className} text-4xl md:text-5xl font-bold`}>
              {t(lang, "our_impact")}
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <StatCard value="1000+" title={t(lang, "registered_donors")} />
            <StatCard value="50+" title={t(lang, "cities_covered")} />
            <StatCard value="5000+" title={t(lang, "lives_saved")} />
            <StatCard value="24/7" title={t(lang, "emergency_support")} />
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2
            className={`${display.className} text-4xl md:text-5xl font-bold text-[#15141A]`}
          >
            {t(lang, "how_it_works")}
          </h2>
        </div>

        <div className="relative grid md:grid-cols-4 gap-6">
          {/* connecting line behind the steps on desktop */}
          <div className="hidden md:block absolute top-8 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C81E3A]/30 to-transparent" />

          <Step number="1" title={t(lang, "register")} text={t(lang, "register_desc")} />
          <Step number="2" title={t(lang, "verification")} text={t(lang, "verification_desc")} />
          <Step number="3" title={t(lang, "request")} text={t(lang, "request_desc")} />
          <Step number="4" title={t(lang, "support")} text={t(lang, "support_desc")} />
        </div>
      </section>

      {/* DONOR PRIVACY */}
      <section className="py-10">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-white border border-[#0F6E66]/15 rounded-[2rem] p-10 md:p-12 text-center shadow-sm">
            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-[#0F6E66]/10 flex items-center justify-center text-3xl">
              🔒
            </div>
            <h2
              className={`${display.className} text-2xl md:text-3xl font-bold text-[#0F6E66] mb-4`}
            >
              {t(lang, "privacy_title")}
            </h2>
            <p className="text-[#5B5964] leading-8 max-w-2xl mx-auto">
              {t(lang, "privacy_desc")}
            </p>
          </div>
        </div>
      </section>

      <PulseDivider />

      {/* EMERGENCY */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <div className="relative bg-[#C81E3A] rounded-[2rem] p-10 md:p-14 shadow-xl overflow-hidden">
            <div
              className="pointer-events-none absolute inset-0 opacity-30"
              style={{
                background:
                  "radial-gradient(400px circle at 90% 10%, rgba(255,255,255,0.25), transparent 60%)",
              }}
            />
            <h2
              className={`${display.className} relative text-3xl md:text-4xl font-bold text-white mb-4`}
            >
              🚨 {t(lang, "emergency_title")}
            </h2>
            <p className="relative text-white/85 mb-9 leading-8 max-w-2xl mx-auto">
              {t(lang, "emergency_desc")}
            </p>

           <div className="relative flex justify-center gap-4 flex-wrap">
  <a
    href="tel:+923456665997"
    className="motion-safe:animate-pulse bg-white text-[#C81E3A] px-8 py-4 rounded-xl font-bold shadow-lg hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white transition"
  >
    📞 {t(lang, "call_now")}
  </a>

  <a
    href="https://wa.me/923456665997"
    target="_blank"
    rel="noopener noreferrer"
    className="bg-[#15141A] text-white px-8 py-4 rounded-xl font-bold hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white transition"
  >
    💬 {t(lang, "whatsapp")}
  </a>
</div>
          </div>
        </div>
      </section>

      {/* OUR TEAM */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-14">
          <h2
            className={`${display.className} text-4xl md:text-5xl font-bold text-[#15141A]`}
          >
            {t(lang, "our_team")}
          </h2>
          <p className="text-[#5B5964] mt-4">{t(lang, "team_desc")}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <TeamCard name="Muhammad Irfan" role={t(lang, "super_admin")} />
          <TeamCard name="Muhammad Amjad" role={t(lang, "admin")} />
          <TeamCard name="Ghulam Shabir" role={t(lang, "admin")} />
        </div>
      </section>

      {/* CTA */}
      <section className="relative bg-[#15141A] text-white py-24 overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 opacity-50"
          style={{
            background:
              "radial-gradient(700px circle at 50% 0%, rgba(200,30,58,0.35), transparent 65%)",
          }}
        />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <h2 className={`${display.className} text-4xl md:text-6xl font-bold mb-6`}>
            {t(lang, "cta_title")}
          </h2>
          <p className="text-lg md:text-xl mb-9 leading-8 text-white/80">
            {t(lang, "cta_desc")}
          </p>
          <Link
            href="/become-donor"
            className="inline-block bg-[#C81E3A] text-white px-10 py-4 rounded-xl font-bold hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white transition"
          >
            🩸 {t(lang, "become_donor")}
          </Link>
        </div>
      </section>
    </div>
  );
}

// ===============================
// SIGNATURE ELEMENT: pulse / ECG divider
// A recurring heartbeat line used sparingly between sections — ties every
// part of the page back to the app's core idea: a heartbeat kept going.
// ===============================
function PulseDivider() {
  return (
    <div className="w-full overflow-hidden h-12 text-[#C81E3A]/40" aria-hidden="true">
      <svg viewBox="0 0 400 40" preserveAspectRatio="none" className="w-full h-full">
        <path
          d="M0 20 H140 L152 6 L164 34 L176 14 L186 20 H400"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

// ===============================
// CARD COMPONENT
// ===============================
function Card({ icon, title, text }: { icon: string; title: string; text: string }) {
  return (
    <div className="bg-white rounded-3xl p-8 border border-black/5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-[#FBE7E8] text-3xl mb-6">
        {icon}
      </div>
      <h3 className={`${display.className} text-xl font-bold text-[#15141A] mb-3`}>
        {title}
      </h3>
      <p className="text-[#5B5964] leading-7">{text}</p>
    </div>
  );
}

// ===============================
// STAT CARD COMPONENT
// ===============================
function StatCard({ value, title }: { value: string; title: string }) {
  return (
    <div className="bg-white/5 backdrop-blur rounded-3xl p-6 md:p-8 text-center border border-white/10 hover:border-[#C81E3A]/40 transition">
      <h3 className={`${mono.className} text-3xl md:text-5xl font-semibold mb-3 text-white`}>
        {value}
      </h3>
      <p className="text-sm md:text-base font-medium text-white/70 tracking-wide">
        {title}
      </p>
    </div>
  );
}

// ===============================
// STEP COMPONENT
// ===============================
function Step({ number, title, text }: { number: string; title: string; text: string }) {
  return (
    <div className="relative bg-white rounded-3xl p-8 border border-black/5 shadow-sm hover:shadow-xl transition-all duration-300 text-center">
      <div
        className={`${mono.className} w-14 h-14 mx-auto mb-5 rounded-2xl bg-[#C81E3A] text-white flex items-center justify-center text-xl font-semibold`}
      >
        {number}
      </div>
      <h3 className={`${display.className} text-lg font-bold text-[#15141A] mb-3`}>
        {title}
      </h3>
      <p className="text-[#5B5964] leading-7 text-sm">{text}</p>
    </div>
  );
}

// ===============================
// TEAM CARD COMPONENT
// ===============================
function TeamCard({ name, role }: { name: string; role: string }) {
  return (
    <div className="bg-white rounded-3xl p-8 border border-black/5 shadow-sm hover:shadow-xl transition-all duration-300 text-center">
      <div className="w-24 h-24 mx-auto mb-5 rounded-full bg-[#FBE7E8] flex items-center justify-center text-4xl">
        👤
      </div>
      <h3 className={`${display.className} text-lg font-bold text-[#15141A]`}>{name}</h3>
      <p className="text-[#C81E3A] font-semibold mt-2 text-sm">{role}</p>
    </div>
  );
}