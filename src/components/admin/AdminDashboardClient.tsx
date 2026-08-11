"use client";

import { useLanguage } from "@/context/LanguageContext";
import { commonTranslations } from "@/lib/translations/common";
import { adminTranslations } from "@/lib/translations/admin";

type BookingItem = {
  _id: string;
  patientName: string;
  bloodGroup: string;
  city: string;
  contactNumber: string;
  status: string;
};

type DonorItem = {
  _id: string;
  fullName: string;
  bloodGroup: string;
  city: string;
  whatsappNumber: string;
};

export default function AdminDashboardClient({
  stats,
  recentRequests,
  recentDonors,
}: {
  stats: {
    totalUsers: number;
    totalDonors: number;
    totalRequests: number;
    pendingRequests: number;
    approvedRequests: number;
  };
  recentRequests: BookingItem[];
  recentDonors: DonorItem[];
}) {
  const { lang } = useLanguage();

  // Merge common + admin translations into one lookup object.
  // Page-specific (admin) keys win if a name repeats in both.
  const t = {
    ...commonTranslations[lang],
    ...adminTranslations[lang],
  };

  return (
    <div className="min-h-screen bg-[#FBF7F1] p-4 md:p-8">
      {/* HEADER */}
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-[#15141A]">
        {t.dashboard_title}
      </h1>

      {/* STATS */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        <Stat title={t.stat_users} value={stats.totalUsers} />
        <Stat title={t.stat_donors} value={stats.totalDonors} />
        <Stat title={t.stat_requests} value={stats.totalRequests} />
        <Stat title={t.stat_pending} value={stats.pendingRequests} />
        <Stat title={t.stat_approved} value={stats.approvedRequests} />
      </div>

      {/* RECENT REQUESTS */}
      <Section title={t.recent_blood_requests}>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recentRequests.map((r) => (
            <Card key={r._id}>
              <h2 className="font-bold text-[#15141A]">{r.patientName}</h2>
              <p className="text-sm text-[#5B5964]">🩸 {r.bloodGroup}</p>
              <p className="text-sm text-[#5B5964]">📍 {r.city}</p>
              <p className="text-sm text-[#5B5964]">📱 {r.contactNumber}</p>

              <span className="text-xs px-2 py-1 rounded bg-black/5 mt-2 inline-block font-semibold text-[#15141A]">
                {t[r.status] || r.status}
              </span>
            </Card>
          ))}
        </div>
      </Section>

      {/* RECENT DONORS */}
      <Section title={t.recent_donors}>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recentDonors.map((d) => (
            <Card key={d._id}>
              <h2 className="font-bold text-[#15141A]">{d.fullName}</h2>
              <p className="text-sm text-[#5B5964]">🩸 {d.bloodGroup}</p>
              <p className="text-sm text-[#5B5964]">📍 {d.city}</p>
              <p className="text-sm text-[#5B5964]">📱 {d.whatsappNumber}</p>
            </Card>
          ))}
        </div>
      </Section>
    </div>
  );
}

function Stat({ title, value }: { title: string; value: number }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-black/5 p-4">
      <p className="text-[#5B5964] text-sm">{title}</p>
      <h2 className="text-2xl font-bold text-[#15141A]">{value}</h2>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-3 text-[#15141A]">{title}</h2>
      {children}
    </div>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-black/5 hover:shadow-md transition">
      {children}
    </div>
  );
}