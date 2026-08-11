"use client";

import { useEffect, useState } from "react";
import { Space_Grotesk } from "next/font/google";
import { useLanguage } from "@/context/LanguageContext";
import { activityTranslations } from "@/lib/translations/activity-translations";
import { timeAgo } from "@/lib/timeAgo";
import { safeFetch, isOfflineError } from "@/lib/safeFetch";
import OfflineCard from "@/components/network/OfflineCard";

const display = Space_Grotesk({ subsets: ["latin"], weight: ["600", "700"] });

type ActivityItem = {
  id: string;
  kind: "request_verified" | "request_fulfilled" | "donor_approved";
  bloodGroup: string;
  city: string;
  timestamp: string;
};

export default function ActivityPage() {
  const { lang } = useLanguage();
  const at = activityTranslations[lang];

  const [activity, setActivity] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [offline, setOffline] = useState(false);

  useEffect(() => {
    load();
    // Background refresh — a single missed poll while offline isn't
    // worth interrupting the page for, so this one fails quietly.
    const interval = setInterval(() => {
      safeFetch("/api/activity")
        .then((res) => res.json())
        .then((data) => setActivity(data.activity || []))
        .catch(() => {});
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const load = () => {
    setLoading(true);
    setOffline(false);

    safeFetch("/api/activity")
      .then((res) => res.json())
      .then((data) => setActivity(data.activity || []))
      .catch((err) => {
        if (isOfflineError(err)) setOffline(true);
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="min-h-screen bg-[#FBF7F1] py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <h1 className={`${display.className} text-3xl md:text-4xl font-bold text-[#C81E3A] mb-3`}>
            {at.title}
          </h1>
          <p className="text-[#5B5964] leading-7 max-w-lg mx-auto">{at.desc}</p>
        </div>

        {offline ? (
          <OfflineCard
            title="Internet Required"
            description="Live activity can't be loaded. Reconnect and try again."
            onRetry={load}
          />
        ) : loading ? (
          <div className="text-center py-16 text-[#5B5964]">{at.loading}</div>
        ) : activity.length === 0 ? (
          <div className="bg-white rounded-2xl p-16 text-center text-[#5B5964] shadow-sm border border-black/5">
            {at.empty}
          </div>
        ) : (
          <div className="space-y-3">
            {activity.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 bg-white rounded-2xl shadow-sm border border-black/5 p-5"
              >
                <div className="text-2xl shrink-0">{kindIcon(item.kind)}</div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm text-[#15141A]">
                    <span className="font-bold text-[#C81E3A]">{item.bloodGroup}</span>{" "}
                    {at[item.kind]} {at.in_city}{" "}
                    <span className="font-semibold">{item.city}</span>
                  </p>
                </div>

                <div className="text-xs text-black/40 shrink-0">{timeAgo(item.timestamp)}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function kindIcon(kind: ActivityItem["kind"]) {
  switch (kind) {
    case "request_verified":
      return "🆘";
    case "request_fulfilled":
      return "✅";
    case "donor_approved":
      return "🩸";
    default:
      return "🔔";
  }
}