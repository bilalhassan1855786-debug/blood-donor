import Link from "next/link";

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

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 shrink-0 bg-[#15141A] text-white p-6 flex flex-col">
        <h2 className="text-2xl font-bold mb-8 text-white">
          <span className="text-[#C81E3A]">Admin</span> Panel
        </h2>

        <nav className="space-y-1 flex-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 transition"
            >
              <span className="text-base">{link.icon}</span>
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/50 hover:text-white hover:bg-white/5 transition mt-4 border-t border-white/10 pt-4"
        >
          <span className="text-base">←</span>
          Back Website
        </Link>
      </aside>

      <main className="flex-1 bg-[#FBF7F1] p-6 overflow-x-auto">{children}</main>
    </div>
  );
}