"use client";

import Link from "next/link";
import { useState } from "react";

const NAV_LINKS = [
  { href: "/admin", label: "Dashboard", icon: "📊" },
  { href: "/admin/users", label: "Users", icon: "👥" },
  { href: "/admin/donors", label: "Manage Donors", icon: "🩸" },
  { href: "/admin/bookings", label: "Blood Requests", icon: "🆘" },
  { href: "/admin/add-donor", label: "Add Donor", icon: "➕" },
  { href: "/admin/import-donors", label: "Import Donors", icon: "📥" },
  { href: "/admin/import-history", label: "Import History", icon: "🕓" },
  { href: "/admin/messages", label: "Messages", icon: "✉️" },
];

export default function AdminSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile Header */}
      <header className="lg:hidden sticky top-0 z-40 h-16 bg-[#15141A] text-white flex items-center justify-between px-4 shadow-md">
        <h2 className="text-lg font-bold">
          <span className="text-[#C81E3A]">Admin</span> Panel
        </h2>

        <button
          onClick={() => setOpen(true)}
          className="text-3xl leading-none"
          aria-label="Open admin menu"
        >
          ☰
        </button>
      </header>

      {/* Mobile Overlay */}
      {open && (
        <button
          aria-label="Close menu"
          onClick={() => setOpen(false)}
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
          bg-[#15141A]
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
          <h2 className="text-2xl font-bold">
            <span className="text-[#C81E3A]">Admin</span> Panel
          </h2>

          <button
            onClick={() => setOpen(false)}
            className="lg:hidden text-2xl"
          >
            ✕
          </button>
        </div>

        <nav className="space-y-1 flex-1 overflow-y-auto">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 transition"
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
          className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-white/50 hover:text-white hover:bg-white/5 transition border-t border-white/10 pt-4"
        >
          <span>←</span>
          Back Website
        </Link>
      </aside>
    </>
  );
}