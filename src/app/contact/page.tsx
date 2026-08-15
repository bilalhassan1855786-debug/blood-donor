"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { commonTranslations } from "@/lib/translations/common";
import { contactTranslations } from "@/lib/translations/contact";
import { safeFetch, isOfflineError } from "@/lib/safeFetch";
import OfflineCard from "@/components/network/OfflineCard";

type TeamMember = {
  _id: string;
  fullName: string;
  role: "superadmin" | "admin" | "developer" | string;
  email?: string;
  whatsappNumber?: string;
  localNumber?: string;
  city?: string;
  photo?: string;
};

export default function ContactPage() {
  const { lang } = useLanguage();

  const t = {
    ...commonTranslations[lang],
    ...contactTranslations[lang],
  };

  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loadingTeam, setLoadingTeam] = useState(true);
  const [teamOffline, setTeamOffline] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [sending, setSending] = useState(false);
  const [submitOfflineMsg, setSubmitOfflineMsg] = useState(false);

  useEffect(() => {
    loadTeam();
  }, []);

  const loadTeam = () => {
    setLoadingTeam(true);
    setTeamOffline(false);

    safeFetch("/api/team", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setTeam(data.team || []);
      })
      .catch((err) => {
        if (isOfflineError(err)) setTeamOffline(true);
      })
      .finally(() => setLoadingTeam(false));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitOfflineMsg(false);

    try {
      setSending(true);

      const res = await safeFetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {
        alert(t.message_sent_success);

        setForm({
          fullName: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      } else {
        alert(data.message || t.message_failed);
      }
    } catch (error) {
      if (isOfflineError(error)) {
        setSubmitOfflineMsg(true);
      } else {
        console.error(error);
        alert(t.something_wrong);
      }
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FBF7F1]">
      {/* HERO */}
      <div className="bg-gradient-to-r from-[#C81E3A] to-[#A11530] text-white py-6 sm:py-10 md:py-16 px-3 sm:px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 md:mb-4">{t.hero_title}</h1>
          <p className="text-white/80 text-lg">{t.hero_desc}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-6 sm:py-10 md:py-12">
        <div className="grid lg:grid-cols-2 gap-3 sm:gap-6 md:gap-8">
          {/* LEFT */}
          <div className="space-y-6">
            {/* TEAM */}
            <div className="bg-white p-3 sm:p-4 md:p-6 rounded-lg sm:rounded-xl md:rounded-2xl shadow-sm border border-black/5">
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 md:mb-5 text-[#15141A]">{t.our_team_title}</h2>

              {teamOffline ? (
                <OfflineCard
                  title="Internet Required"
                  description="Team info can't be loaded. Reconnect and try again."
                  onRetry={loadTeam}
                />
              ) : loadingTeam ? (
                <p className="text-[#5B5964]">{t.loading}</p>
              ) : (
                <div className="space-y-2 sm:space-y-3 md:space-y-4">
                  {team.map((member) => {
                    const phone = member.localNumber || member.whatsappNumber;

                    return (
                      <div
                        key={member._id}
                        className="border border-black/5 rounded-lg sm:rounded-lg md:rounded-xl p-3 sm:p-4 hover:shadow-md transition"
                      >
                        <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
                          <img
                            src={member.photo || "/team/default-avatar.png"}
                            alt={member.fullName}
                            className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full object-cover border"
                          />

                          <div>
                            <h3 className="font-bold text-base sm:text-lg text-[#15141A]">
                              {member.fullName}
                            </h3>

                            <p className="text-xs sm:text-sm text-[#5B5964]">
                              {member.role === "superadmin"
                                ? `👑 ${t.role_superadmin || "Super Admin"}`
                                : member.role === "developer"
                                ? `💻 ${t.role_developer || "Developer"}`
                                : `🛡 ${t.role_admin || "Admin"}`}
                            </p>

                            <p className="text-xs sm:text-sm text-[#5B5964]">📍 {member.city || "-"}</p>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 sm:gap-3 mt-3 sm:mt-4">
                          {phone && (
                            <a
                              href={`tel:${phone}`}
                              className="bg-[#0F6E66] text-white px-3 py-2 rounded-lg text-xs sm:text-sm"
                            >
                              📞 {t.call}
                            </a>
                          )}

                          {member.whatsappNumber && (
                            <a
                              href={`https://wa.me/${member.whatsappNumber}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-[#C81E3A] text-white px-3 py-2 rounded-lg text-xs sm:text-sm"
                            >
                              {t.whatsapp}
                            </a>
                          )}

                          {member.email && (
                            <a
                              href={`mailto:${member.email}`}
                              className="bg-[#15141A] text-white px-3 py-2 rounded-lg text-xs sm:text-sm"
                            >
                              {t.email}
                            </a>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* EMERGENCY */}
            <div className="bg-[#C81E3A] text-white p-3 sm:p-4 md:p-6 rounded-lg sm:rounded-xl md:rounded-2xl shadow-sm">
              <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 md:mb-3">{t.emergency_title}</h2>
              <p className="mb-4 text-white/90">{t.emergency_desc}</p>

              <div className="flex flex-wrap gap-2 sm:gap-3">
                <a
                  href="/book-blood"
                  className="bg-white text-[#C81E3A] px-4 sm:px-5 py-2 sm:py-3 rounded-lg font-semibold text-sm sm:text-base"
                >
                  {t.request_blood}
                </a>

                <a href="/donors" className="bg-[#A11530] px-5 py-2 rounded-lg">
                  {t.find_donors}
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT FORM */}
          <div className="bg-white p-3 sm:p-4 md:p-6 rounded-lg sm:rounded-xl md:rounded-2xl shadow-sm border border-black/5">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-[#15141A]">{t.send_message_title}</h2>

            {submitOfflineMsg && (
              <div className="bg-[#C81E3A12] border border-[#C81E3A40] rounded-xl p-4 mb-4 text-sm text-[#C81E3A]">
                📡 You're offline. Please reconnect and try sending your message again.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-2 sm:space-y-3 md:space-y-4">
              <input
                placeholder={t.full_name}
                value={form.fullName}
                onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                className="w-full border rounded-xl p-3"
                required
              />

              <input
                placeholder={t.email}
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full border rounded-xl p-3"
                required
              />

              <input
                placeholder={t.contact_number_label}
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full border rounded-xl p-3"
                required
              />

              <input
                placeholder={t.subject_placeholder}
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                className="w-full border rounded-xl p-3"
                required
              />

              <textarea
                placeholder={t.message_placeholder}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full border rounded-xl p-3"
                rows={5}
                required
              />

              <button
                type="submit"
                disabled={sending}
                className="w-full bg-[#C81E3A] hover:bg-[#A11530] disabled:opacity-60 text-white py-2 sm:py-3 md:py-4 rounded-xl font-semibold transition"
              >
                {sending ? t.loading : t.send_message_btn}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}