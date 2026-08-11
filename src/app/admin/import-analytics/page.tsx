"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { importAnalyticsTranslations } from "@/lib/translations/import-analytics";
import { safeFetch, isOfflineError } from "@/lib/safeFetch";
import OfflineCard from "@/components/network/OfflineCard";

type Analytics = {
  totalImports: number;
  todayImports: number;
  totalImportedDonors: number;
  lastImport: { fileName: string; imported: number; createdAt: string } | null;
  topCities: { city: string; count: number }[];
  topBloodGroups: { bloodGroup: string; count: number }[];
};

export default function ImportAnalyticsPage() {
  const { lang } = useLanguage();
  const t = importAnalyticsTranslations[lang];

  const [data, setData] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [offline, setOffline] = useState(false);

  useEffect(() => {
    load();
  }, []);

  const load = () => {
    setLoading(true);
    setOffline(false);

    safeFetch("/api/admin/import/analytics")
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => {
        if (isOfflineError(err)) setOffline(true);
      })
      .finally(() => setLoading(false));
  };

  if (offline) {
    return (
      <div className="min-h-screen bg-[#FBF7F1] flex items-center justify-center px-4">
        <OfflineCard
          title="Internet Required"
          description="Import analytics can't be loaded. Reconnect and try again."
          onRetry={load}
        />
      </div>
    );
  }

  if (loading || !data) {
    return (
      <div className="min-h-screen bg-[#FBF7F1] flex items-center justify-center">
        <p className="text-[#5B5964]">{t.loading}</p>
      </div>
    );
  }

  const maxCity = Math.max(...data.topCities.map((c) => c.count), 1);
  const maxGroup = Math.max(...data.topBloodGroups.map((g) => g.count), 1);

  return (
    <div className="min-h-screen bg-[#FBF7F1] py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#C81E3A] mb-2">{t.title}</h1>
          <p className="text-[#5B5964] text-sm">{t.desc}</p>
        </div>

        {/* Top stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          <StatCard label={t.total_imports} value={data.totalImports} color="#15141A" />
          <StatCard label={t.today_imports} value={data.todayImports} color="#0F6E66" />
          <StatCard
            label={t.total_donors_via_import}
            value={data.totalImportedDonors}
            color="#C81E3A"
          />
        </div>

        {/* Last import */}
        <div className="bg-white rounded-2xl border border-black/5 shadow-sm p-6 mb-8">
          <p className="text-xs uppercase tracking-wider text-black/40 font-semibold mb-2">
            {t.last_import}
          </p>
          {data.lastImport ? (
            <div className="flex items-center justify-between flex-wrap gap-2">
              <p className="font-semibold text-[#15141A]">{data.lastImport.fileName}</p>
              <p className="text-sm text-[#5B5964]">
                {data.lastImport.imported} donors ·{" "}
                {new Date(data.lastImport.createdAt).toLocaleString()}
              </p>
            </div>
          ) : (
            <p className="text-[#5B5964] text-sm">{t.last_import_none}</p>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Top cities */}
          <div className="bg-white rounded-2xl border border-black/5 shadow-sm p-6">
            <h2 className="font-bold text-[#15141A] mb-5">{t.top_cities_title}</h2>
            {data.topCities.length === 0 ? (
              <p className="text-sm text-[#5B5964]">{t.no_data}</p>
            ) : (
              <div className="space-y-4">
                {data.topCities.map((c) => (
                  <BarRow key={c.city} label={c.city} count={c.count} max={maxCity} color="#C81E3A" />
                ))}
              </div>
            )}
          </div>

          {/* Top blood groups */}
          <div className="bg-white rounded-2xl border border-black/5 shadow-sm p-6">
            <h2 className="font-bold text-[#15141A] mb-5">{t.top_blood_groups_title}</h2>
            {data.topBloodGroups.length === 0 ? (
              <p className="text-sm text-[#5B5964]">{t.no_data}</p>
            ) : (
              <div className="space-y-4">
                {data.topBloodGroups.map((g) => (
                  <BarRow
                    key={g.bloodGroup}
                    label={g.bloodGroup}
                    count={g.count}
                    max={maxGroup}
                    color="#0F6E66"
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="bg-white rounded-2xl border border-black/5 shadow-sm p-6">
      <p className="text-3xl font-bold" style={{ color }}>
        {value}
      </p>
      <p className="text-xs text-[#5B5964] mt-1">{label}</p>
    </div>
  );
}

function BarRow({
  label,
  count,
  max,
  color,
}: {
  label: string;
  count: number;
  max: number;
  color: string;
}) {
  return (
    <div>
      <div className="flex justify-between mb-1.5 text-sm">
        <span className="font-semibold text-[#15141A]">{label}</span>
        <span className="font-semibold" style={{ color }}>
          {count}
        </span>
      </div>
      <div className="h-2 bg-black/5 rounded-full overflow-hidden">
        <div
          className="h-2 rounded-full transition-all"
          style={{ width: `${(count / max) * 100}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}