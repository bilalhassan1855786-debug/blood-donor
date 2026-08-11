"use client";

import { useEffect, useState } from "react";
import { Space_Grotesk, IBM_Plex_Mono } from "next/font/google";
import { useLanguage } from "@/context/LanguageContext";
import { teamTranslations } from "@/lib/translations/team";
import { safeFetch, isOfflineError } from "@/lib/safeFetch";
import OfflineCard from "@/components/network/OfflineCard";

const display = Space_Grotesk({ subsets: ["latin"], weight: ["600", "700"] });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"] });

type Member = {
  _id: string;
  fullName: string;
  role: "superadmin" | "admin" | "developer" | string;
  email: string;
  whatsappNumber?: string;
  localNumber?: string;
  city?: string;
  bloodGroup?: string;
  photo?: string;
};

export default function TeamPage() {
  const { lang } = useLanguage();
  const tt = teamTranslations[lang];

  const [team, setTeam] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [offline, setOffline] = useState(false);

  useEffect(() => {
    loadTeam();
  }, []);

  const loadTeam = () => {
    setLoading(true);
    setOffline(false);

    safeFetch("/api/team")
      .then((res) => res.json())
      .then((data) => {
        setTeam(data.team || []);
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
      <section className="relative overflow-hidden bg-[#15141A] text-white py-24">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(600px circle at 15% 20%, rgba(200,30,58,0.35), transparent 60%), radial-gradient(500px circle at 85% 80%, rgba(15,110,102,0.25), transparent 60%)",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <div className="text-6xl mb-6">❤️</div>

          <h1 className={`${display.className} text-4xl md:text-6xl font-bold mb-6`}>
            {tt.hero_title}
          </h1>

          <p className="text-lg text-white/70 max-w-3xl mx-auto leading-8">
            {tt.hero_desc}
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-20">
        {offline ? (
          <OfflineCard
            title="Internet Required"
            description="Our team page can't be loaded right now. Reconnect and try again."
            onRetry={loadTeam}
          />
        ) : loading ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4 motion-safe:animate-pulse">🩸</div>
            <p className="text-[#5B5964]">{tt.loading_text}</p>
          </div>
        ) : team.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🩸</div>
            <p className="text-[#5B5964]">{tt.empty_text}</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member) => (
              <MemberCard key={member._id} member={member} tt={tt} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function MemberCard({
  member,
  tt,
}: {
  member: Member;
  tt: Record<string, string>;
}) {
  const isSuperAdmin = member.role === "superadmin";
  const isDeveloper = member.role === "developer";

  const badgeColor = isSuperAdmin ? "#C81E3A" : isDeveloper ? "#4338CA" : "#0F6E66";
  const roleLabel = isSuperAdmin ? tt.super_admin : isDeveloper ? tt.developer : tt.admin;

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-black/5 p-8 text-center hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
      <img
        src={member.photo || "/team/default-avatar.png"}
        alt={member.fullName}
        className="w-28 h-28 rounded-full mx-auto object-cover border-4"
        style={{ borderColor: `${badgeColor}22` }}
      />

      <h2 className={`${display.className} text-xl font-bold mt-5 text-[#15141A]`}>
        {member.fullName}
      </h2>

      <div
        className="inline-block mt-3 px-4 py-1.5 rounded-full font-semibold text-xs"
        style={{ backgroundColor: `${badgeColor}18`, color: badgeColor }}
      >
        {roleLabel}
      </div>

      <div className={`${mono.className} mt-6 space-y-2 text-xs text-[#5B5964]`}>
        <p className="truncate">📧 {member.email}</p>
        {(member.whatsappNumber || member.localNumber) && (
          <p>📱 {member.localNumber || member.whatsappNumber}</p>
        )}
        {member.city && <p>📍 {member.city}</p>}
        {member.bloodGroup && <p>🩸 {member.bloodGroup}</p>}
      </div>

      <div className="flex justify-center gap-2 mt-8 flex-wrap">
        <a
          href={`mailto:${member.email}`}
          className="bg-[#15141A] hover:bg-black text-white text-xs font-semibold px-4 py-2 rounded-lg transition"
        >
          {tt.email_label}
        </a>

        {member.localNumber && (
          <a
            href={`tel:${member.localNumber}`}
            className="bg-[#0F6E66] hover:bg-[#0C5751] text-white text-xs font-semibold px-4 py-2 rounded-lg transition"
          >
            {tt.call_label}
          </a>
        )}

        {member.whatsappNumber && (
          <a
            href={`https://wa.me/${member.whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#C81E3A] hover:bg-[#A11530] text-white text-xs font-semibold px-4 py-2 rounded-lg transition"
          >
            {tt.whatsapp_label}
          </a>
        )}
      </div>
    </div>
  );
}