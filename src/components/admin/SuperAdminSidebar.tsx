"use client";

import Link from "next/link";
import { useState } from "react";

const NAV_LINKS = [
  {
    href: "/admin/super",
    label: "Dashboard",
    icon: "📊",
  },
  {
    href: "/admin/super/users",
    label: "Manage Users",
    icon: "👥",
  },
  {
    href: "/admin/donors",
    label: "Manage Donors",
    icon: "🩸",
  },
  {
    href: "/admin/bookings",
    label: "Blood Requests",
    icon: "🆘",
  },
];

export default function SuperAdminSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile Header */}
      <header className="lg:hidden sticky top-0 z-40 h-16 bg-black text-white flex items-center justify-between px-4 shadow-md">
        <h2 className="text-lg font-bold">
          Super Admin
        </h2>

        <button
          onClick={() => setOpen(true)}
          className="text-3xl"
          aria-label="Open menu"
        >
          ☰
        </button>
      </header>

      {/* Overlay */}
      {open && (
        <button
          onClick={() => setOpen(false)}
          aria-label="Close menu"
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:sticky
          top-0 left-0
          z-50
          h-screen
          w-72
          bg-black
          text-white
          p-6
          flex flex-col
          transform transition-transform duration-300
          ${
            open
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
        `}
      >
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">
            Super Admin
          </h1>

          <button
            onClick={() => setOpen(false)}
            className="lg:hidden text-2xl"
          >
            ✕
          </button>
        </div>

        <nav className="flex flex-col gap-2 flex-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-xl px-3 py-3 text-white/80 hover:bg-white/10 hover:text-white transition"
            >
              <span className="text-lg">
                {link.icon}
              </span>

              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="border-t border-white/10 pt-4 text-white/60 hover:text-white"
        >
          ← Back Website
        </Link>
      </aside>
    </>
  );
}