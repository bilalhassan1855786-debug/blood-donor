"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Space_Grotesk, IBM_Plex_Mono } from "next/font/google";
import SearchBar from "@/components/SearchBar";
import { useLanguage } from "@/context/LanguageContext";
import { donorsTranslations } from "@/lib/translations/donors";
import { safeFetch, isOfflineError } from "@/lib/safeFetch";
import OfflineCard from "@/components/network/OfflineCard";

const display = Space_Grotesk({ subsets: ["latin"], weight: ["600", "700"] });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500", "600"] });

type CountItem = { _id: string; count: number };

type Stats = {
  totalDonors: number;
  eligible: number;
  notEligible: number;
  bloodStats: CountItem[];
  cityStats: CountItem[];
  eligibleBloodGroups: CountItem[];
  eligibleCities: CountItem[];
};

const EMPTY_STATS: Stats = {
  totalDonors: 0,
  eligible: 0,
  notEligible: 0,
  bloodStats: [],
  cityStats: [],
  eligibleBloodGroups: [],
  eligibleCities: [],
};

export default function DonorsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FBF7F1]" />}>
      <DonorsPageContent />
    </Suspense>
  );
}

function DonorsPageContent() {
  const { lang } = useLanguage();
  const dt = donorsTranslations[lang];
  const searchParams = useSearchParams();

  const [stats, setStats] = useState<Stats>(EMPTY_STATS);
  const [loading, setLoading] = useState(true);
  const [offline, setOffline] = useState(false);

  useEffect(() => {
    loadStats();
  }, [searchParams]);

  const loadStats = () => {
    const bloodGroup = searchParams.get("bloodGroup") || "";
    const city = searchParams.get("city") || "";

    const query = new URLSearchParams();
    if (bloodGroup) query.set("bloodGroup", bloodGroup);
    if (city) query.set("city", city);

    setLoading(true);
    setOffline(false);

    safeFetch(`/api/donors/stats?${query.toString()}`)
      .then((res) => res.json())
      .then((data: Stats) => {
        setStats(data);
        setLoading(false);
      })
      .catch((err) => {
        if (isOfflineError(err)) setOffline(true);
        setLoading(false);
      });
  };

  return (
    <div className="min-h-screen bg-[#FBF7F1]">
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#15141A] text-white">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(600px circle at 85% 10%, rgba(200,30,58,0.35), transparent 60%), radial-gradient(500px circle at 10% 90%, rgba(15,110,102,0.25), transparent 60%)",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-6 py-20">
          <h1 className={`${display.className} text-4xl md:text-6xl font-bold mb-6`}>
            {dt.hero_title}
          </h1>

          <p className="text-lg max-w-3xl text-white/70 leading-8">{dt.hero_desc}</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Search */}
        <div className="mb-10 -mt-10 relative z-10">
          <Suspense fallback={<div>Loading...</div>}>
            <SearchBar />
          </Suspense>
        </div>

        {offline ? (
          <OfflineCard
            title="Internet Required"
            description="Donor stats can't be loaded. Reconnect and try again."
            onRetry={loadStats}
          />
        ) : loading ? (
          <div className="text-center py-24">
            <div className="text-6xl mb-4 motion-safe:animate-pulse">🩸</div>
            <p className="text-[#5B5964]">{dt.loading_text}</p>
          </div>
        ) : (
          <>
            {/* Top Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-10">
              <StatTile icon="🩸" value={stats.totalDonors} label={dt.total_donors} color="#C81E3A" />
              <StatTile icon="✅" value={stats.eligible} label={dt.eligible} color="#0F6E66" />
              <StatTile icon="❌" value={stats.notEligible} label={dt.not_eligible} color="#B45309" />
              <StatTile icon="🏙️" value={stats.cityStats.length} label={dt.cities} color="#1D4ED8" />
            </div>

            {/* Blood Availability */}
            <Panel title={`🩸 ${dt.blood_availability_title}`}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                {stats.bloodStats.map((item) => {
                  const tone =
                    item.count > 50
                      ? { bg: "#0F6E6612", border: "#0F6E6640", text: "#0F6E66" }
                      : item.count > 20
                      ? { bg: "#B4530912", border: "#B4530940", text: "#B45309" }
                      : { bg: "#C81E3A12", border: "#C81E3A40", text: "#C81E3A" };

                  return (
                    <div
                      key={item._id}
                      className="rounded-2xl p-5 text-center border-2"
                      style={{ backgroundColor: tone.bg, borderColor: tone.border }}
                    >
                      <div className={`${display.className} text-2xl font-bold`} style={{ color: tone.text }}>
                        {item._id}
                      </div>
                      <div className={`${mono.className} text-4xl font-semibold mt-2 text-[#15141A]`}>
                        {item.count}
                      </div>
                      <div className="text-[#5B5964] text-sm mt-2">{dt.available_label}</div>
                    </div>
                  );
                })}
              </div>
            </Panel>

            {/* Eligible Blood Groups */}
            <Panel title={`✅ ${dt.eligible_groups_title}`}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                {stats.eligibleBloodGroups.map((item) => (
                  <div
                    key={item._id}
                    className="bg-[#0F6E6612] border-2 border-[#0F6E6640] rounded-2xl p-5 text-center"
                  >
                    <div className={`${display.className} text-2xl font-bold text-[#0F6E66]`}>
                      {item._id}
                    </div>
                    <div className={`${mono.className} text-4xl font-semibold mt-2 text-[#15141A]`}>
                      {item.count}
                    </div>
                    <div className="text-[#5B5964] text-sm mt-2">{dt.eligible_label}</div>
                  </div>
                ))}
              </div>
            </Panel>

            {/* City Distribution */}
            <Panel title={`🏙️ ${dt.city_distribution_title}`}>
              <div className="space-y-5">
                {stats.cityStats.map((city) => (
                  <BarRow key={city._id} label={city._id} count={city.count} max={100} color="#C81E3A" />
                ))}
              </div>
            </Panel>

            {/* Eligible Cities */}
            <Panel title={`🏙️ ${dt.eligible_cities_title}`}>
              <div className="space-y-5">
                {stats.eligibleCities.map((city) => (
                  <BarRow key={city._id} label={city._id} count={city.count} max={100} color="#0F6E66" scale={5} />
                ))}
              </div>
            </Panel>

            {/* Privacy Notice */}
            <div className="bg-white border border-[#0F6E66]/15 rounded-3xl p-10 mb-10 shadow-sm text-center">
              <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-[#0F6E66]/10 flex items-center justify-center text-3xl">
                🔒
              </div>
              <h2 className={`${display.className} text-2xl md:text-3xl font-bold text-[#0F6E66] mb-4`}>
                {dt.privacy_title}
              </h2>
              <p className="text-[#5B5964] max-w-3xl mx-auto leading-8">{dt.privacy_desc}</p>
            </div>

            {/* Emergency Section */}
            <div className="relative bg-[#C81E3A] rounded-3xl p-10 md:p-12 text-center overflow-hidden">
              <div
                className="pointer-events-none absolute inset-0 opacity-30"
                style={{
                  background:
                    "radial-gradient(400px circle at 90% 10%, rgba(255,255,255,0.25), transparent 60%)",
                }}
              />
              <h2 className={`${display.className} relative text-3xl md:text-4xl font-bold text-white mb-4`}>
                🚨 {dt.emergency_title}
              </h2>
              <p className="relative text-white/85 mb-8 max-w-2xl mx-auto">{dt.emergency_desc}</p>

              <div className="relative flex flex-wrap justify-center gap-4">
                <a
                  href="tel:+923456665997"
                  className="motion-safe:animate-pulse bg-white text-[#C81E3A] px-8 py-4 rounded-xl font-bold shadow-lg hover:scale-105 transition"
                >
                  📞 {dt.call_now}
                </a>
                <a
                  href="https://wa.me/923456665997"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#15141A] text-white px-8 py-4 rounded-xl font-bold hover:scale-105 transition"
                >
                  💬 {dt.whatsapp}
                </a>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function StatTile({
  icon,
  value,
  label,
  color,
}: {
  icon: string;
  value: number;
  label: string;
  color: string;
}) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-black/5 p-6 text-center hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
      <div className="text-4xl mb-3">{icon}</div>
      <div className={`${mono.className} text-4xl font-semibold`} style={{ color }}>
        {value}
      </div>
      <div className="text-[#5B5964] mt-1 text-sm">{label}</div>
    </div>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-black/5 p-8 mb-10">
      <h2 className={`${display.className} text-2xl md:text-3xl font-bold mb-6 text-[#15141A]`}>
        {title}
      </h2>
      {children}
    </div>
  );
}

function BarRow({
  label,
  count,
  max,
  color,
  scale = 3,
}: {
  label: string;
  count: number;
  max: number;
  color: string;
  scale?: number;
}) {
  return (
    <div>
      <div className="flex justify-between mb-1.5 text-sm">
        <span className="font-semibold text-[#15141A]">{label}</span>
        <span className={`${mono.className} font-semibold`} style={{ color }}>
          {count}
        </span>
      </div>
      <div className="h-2.5 bg-black/5 rounded-full overflow-hidden">
        <div
          className="h-2.5 rounded-full transition-all"
          style={{
            width: `${Math.min(count * scale, max)}%`,
            backgroundColor: color,
          }}
        />
      </div>
    </div>
  );
}