"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function NotificationBell() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    loadNotifications();

    const interval = setInterval(() => {
      loadNotifications();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const loadNotifications = async () => {
    try {
      const res = await fetch("/api/notifications", {
        cache: "no-store",
      });

      const data = await res.json();

      if (Array.isArray(data)) {
        setCount(
          data.filter(
            (n: any) => !n.isRead
          ).length
        );
      }
    } catch {}
  };

  return (
    <Link
      href="/notifications"
      className="relative flex items-center"
    >
      <span className="text-2xl">
        🔔
      </span>

      {count > 0 && (
        <span
          className="
            absolute
            -top-2
            -right-2
            bg-red-600
            text-white
            text-[10px]
            font-bold
            rounded-full
            min-w-[18px]
            h-[18px]
            flex
            items-center
            justify-center
            px-1
          "
        >
          {count > 99
            ? "99+"
            : count}
        </span>
      )}
    </Link>
  );
}