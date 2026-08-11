"use client";

import { useEffect, useState } from "react";
import { Space_Grotesk, IBM_Plex_Mono } from "next/font/google";
import { useLanguage } from "@/context/LanguageContext";
import { notificationTranslations } from "@/lib/translations/notifications";
import { safeFetch, isOfflineError } from "@/lib/safeFetch";
import OfflineCard from "@/components/network/OfflineCard";

const display = Space_Grotesk({ subsets: ["latin"], weight: ["600", "700"] });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400"] });

type NotificationItem = {
  _id: string;
  type: string;
  title: string;
  message: string;
  link?: string;
  isRead: boolean;
  createdAt: string;
};

export default function NotificationsPage() {
  const { lang } = useLanguage();
  const nt = notificationTranslations[lang];

  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [offline, setOffline] = useState(false);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    setLoading(true);
    setOffline(false);
    try {
      const res = await safeFetch("/api/notifications");
      const data = await res.json();
      setNotifications(data.notifications || []);
    } catch (err) {
      if (isOfflineError(err)) setOffline(true);
      setNotifications([]);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n._id === id ? { ...n, isRead: true } : n))
    );

    try {
      await safeFetch("/api/notifications/mark-read", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notificationId: id }),
      });
    } catch {
      loadNotifications();
    }
  };

  const markAllAsRead = async () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));

    try {
      await safeFetch("/api/notifications/mark-read", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });
    } catch {
      loadNotifications();
    }
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div className="min-h-screen bg-[#FBF7F1] py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className={`${display.className} text-3xl font-bold text-[#15141A]`}>
            {nt.notifications}
            {unreadCount > 0 && (
              <span className="ml-3 align-middle text-sm font-semibold bg-[#C81E3A] text-white rounded-full px-3 py-1">
                {unreadCount}
              </span>
            )}
          </h1>

          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="text-sm font-semibold text-[#0F6E66] hover:underline"
            >
              {nt.mark_all_read}
            </button>
          )}
        </div>

        {offline ? (
          <OfflineCard
            title="Internet Required"
            description="Notifications can't be loaded right now. Reconnect and try again."
            onRetry={loadNotifications}
          />
        ) : loading ? (
          <div className="bg-white rounded-2xl p-16 text-center text-[#5B5964]">{nt.loading}</div>
        ) : notifications.length === 0 ? (
          <div className="bg-white rounded-2xl p-16 text-center text-[#5B5964] shadow-sm border border-black/5">
            <div className="text-5xl mb-4">🔔</div>
            {nt.no_notifications}
          </div>
        ) : (
          <div className="space-y-3">
            {notifications.map((n) => (
              <button
                key={n._id}
                onClick={() => !n.isRead && markAsRead(n._id)}
                className={`w-full text-left bg-white rounded-2xl shadow-sm p-5 border-l-4 transition hover:shadow-md ${
                  n.isRead ? "border-black/10" : "border-[#C81E3A]"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{typeIcon(n.type)}</span>
                    <h2 className={`${display.className} font-bold text-sm text-[#15141A]`}>
                      {n.title}
                    </h2>
                  </div>

                  {!n.isRead && (
                    <span className="shrink-0 text-[10px] font-bold bg-[#C81E3A] text-white rounded-full px-2 py-0.5">
                      {nt.new}
                    </span>
                  )}
                </div>

                <p className="text-[#5B5964] text-sm mt-2 leading-6">{n.message}</p>

                <p className={`${mono.className} text-[11px] text-black/30 mt-3`}>
                  {new Date(n.createdAt).toLocaleString()}
                </p>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function typeIcon(type: string) {
  switch (type) {
    case "donor_request":
      return "🩸";
    case "donor_approved":
      return "✅";
    case "donor_rejected":
      return "❌";
    case "blood_request":
      return "🆘";
    case "emergency_request":
      return "🚨";
    case "donation_completed":
      return "❤️";
    case "achievement":
      return "🏆";
    case "announcement":
      return "📢";
    default:
      return "🔔";
  }
}