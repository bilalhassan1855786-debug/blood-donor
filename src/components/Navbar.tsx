"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Space_Grotesk } from "next/font/google";
import NotificationBell from "@/components/NotificationBell";
import { useLanguage } from "@/context/LanguageContext";
import { navbarTranslations } from "@/lib/translations/navbar-translations";
import { safeFetch, isOfflineError } from "@/lib/safeFetch";

const display = Space_Grotesk({ subsets: ["latin"], weight: ["700"] });

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  const { lang, setLang } = useLanguage();
  const nt = navbarTranslations[lang];

  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await safeFetch("/api/me", {
          credentials: "include",
          cache: "no-store",
        });

        const data = await res.json();

        if (data?.user) {
          setUser(data.user);
        }
      } catch {
        // Includes offline failures — silently keep user logged-out in UI.
        // The global OfflineBanner already tells the user they're offline.
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const logout = async () => {
    try {
      await safeFetch("/api/auth/logout", { method: "POST" });
    } catch (err) {
      if (isOfflineError(err)) {
        alert("You're offline. Please connect to the internet and try again.");
        return;
      }
    }
    window.location.href = "/login";
  };

  const isAdmin = user?.role === "admin" || user?.role === "superadmin";

  // Single source of truth for the main nav links — used by both
  // desktop and mobile menus so they never drift out of sync.
  const NAV_LINKS = [
    { href: "/", label: nt.home },
    { href: "/about", label: nt.about },
    { href: "/team", label: nt.team },
    { href: "/donors", label: nt.donors },
    { href: "/bookings", label: nt.bookings || "Bookings" },
    { href: "/become-donor", label: nt.become_donor },
    { href: "/book-blood", label: nt.request_blood },
    { href: "/health-tips", label: nt.health_tips || "Health Tips" },
    { href: "/activity", label: nt.activity },
    { href: "/contact", label: nt.contact },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-black/5 shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-12 h-12 rounded-full overflow-hidden shadow-md transition duration-300 group-hover:scale-105">
              <Image
                src="/logo.png"
                alt="Emergency Blood Donation Network"
                fill
                priority
                className="object-cover"
              />
           
              <p className="text-[10px] text-[#5B5964] tracking-widest font-semibold">
                DONATION NETWORK
              </p>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-5 text-sm font-semibold text-[#15141A]">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-[#C81E3A] transition">
                {link.label}
              </Link>
            ))}

            {/* Emergency Button */}
            <Link
              href="/book-blood"
              className="bg-[#C81E3A] text-white px-4 py-2 rounded-full shadow-sm hover:bg-[#A11530] hover:scale-105 transition"
            >
              🚨 {nt.emergency}
            </Link>

            {/* Logged-in only: My Requests, Profile, Notifications — every
                role gets these, not just admins. */}
            {!loading && user && (
              <Link href="/my-requests" className="hover:text-[#C81E3A] transition">
                {nt.my_requests}
              </Link>
            )}
            {!loading && user && (
              <Link href="/bookings" className="hover:text-[#C81E3A] transition">
                {nt.bookings}
              </Link>
            )}

            {!loading && user && (
              <Link href="/profile" className="hover:text-[#C81E3A] transition">
                {nt.profile}
              </Link>
            )}

            {!loading && user && <NotificationBell />}

            {/* Language */}
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value as any)}
              className="border border-black/10 rounded-lg px-2 py-1.5 text-xs font-semibold bg-white"
              aria-label="Language"
            >
              <option value="en">EN</option>
              <option value="ur">UR</option>
              <option value="roman">ROM</option>
            </select>

            {!loading && !user && (
              <>
                <Link href="/login" className="hover:text-[#C81E3A] transition">
                  {nt.login}
                </Link>

                <Link
                  href="/signup"
                  className="bg-[#15141A] text-white px-4 py-2 rounded-lg hover:bg-black transition"
                >
                  {nt.signup}
                </Link>
              </>
            )}

            {/* Admin-only extra links */}
            {!loading && isAdmin && (
              <>
                <Link href="/admin" className="hover:text-[#0F6E66] transition">
                  {nt.admin_panel}
                </Link>

                <Link href="/admin/bookings" className="hover:text-[#0F6E66] transition">
                  {nt.bookings || "Bookings"}
                </Link>

                <Link href="/admin/add-donor" className="hover:text-[#0F6E66] transition">
                  {nt.add_donor}
                </Link>
              </>
            )}

            {/* Logout — every logged-in user gets this, not just admins */}
            {!loading && user && (
              <button onClick={logout} className="text-[#C81E3A] font-semibold">
                {nt.logout}
              </button>
            )}
          </div>

          {/* Mobile controls */}
          <div className="lg:hidden flex items-center gap-3">
            {!loading && user && <NotificationBell />}
            <button
              className="text-3xl text-[#15141A]"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="lg:hidden py-4 border-t border-black/5 space-y-4">
            <select
              aria-label="Language"
              value={lang}
              onChange={(e) => setLang(e.target.value as any)}
              className="border border-black/10 rounded-lg p-2 text-sm w-full"
            >
              <option value="en">English</option>
              <option value="ur">Urdu</option>
              <option value="roman">Roman Urdu</option>
            </select>

            <div className="flex flex-col gap-3 text-[#15141A] font-medium">
              {NAV_LINKS.map((link) => (
                <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>
                  {link.label}
                </Link>
              ))}

              <Link
                href="/book-blood"
                onClick={() => setMenuOpen(false)}
                className="bg-[#C81E3A] text-white p-3 rounded-lg text-center font-semibold"
              >
                🚨 {nt.emergency}
              </Link>

              {!loading && user && (
                <Link href="/my-requests" onClick={() => setMenuOpen(false)}>
                  {nt.my_requests}
                </Link>
              )}

              {!loading && user && (
                <Link href="/profile" onClick={() => setMenuOpen(false)}>
                  {nt.profile}
                </Link>
              )}

              {!loading && !user && (
                <>
                  <Link href="/login" onClick={() => setMenuOpen(false)}>
                    {nt.login}
                  </Link>

                  <Link
                    href="/signup"
                    onClick={() => setMenuOpen(false)}
                    className="bg-[#15141A] text-white p-2 rounded text-center"
                  >
                    {nt.signup}
                  </Link>
                </>
              )}

              {!loading && isAdmin && (
                <>
                  <Link href="/admin" onClick={() => setMenuOpen(false)}>
                    {nt.admin_panel}
                  </Link>

                  <Link href="/admin/bookings" onClick={() => setMenuOpen(false)}>
                    {nt.bookings || "Bookings"}
                  </Link>

                  <Link href="/admin/add-donor" onClick={() => setMenuOpen(false)}>
                    {nt.add_donor}
                  </Link>
                </>
              )}

              {!loading && user && (
                <button
                  onClick={logout}
                  className="text-left text-[#C81E3A] font-semibold"
                >
                  {nt.logout}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}