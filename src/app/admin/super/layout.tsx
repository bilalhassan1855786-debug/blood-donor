import Link from "next/link";

export default function SuperAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex">

      <aside className="w-72 bg-black text-white p-5">

        <h1 className="text-2xl font-bold mb-8">
          Super Admin
        </h1>

        <div className="flex flex-col gap-3">

          <Link href="/admin/super">
            Dashboard
          </Link>

          <Link href="/admin/super/users">
            Manage Users
          </Link>

          <Link href="/admin/donors">
            Manage Donors
          </Link>

          <Link href="/admin/bookings">
            Blood Requests
          </Link>

        </div>

      </aside>

      <main className="flex-1 bg-gray-100">
        {children}
      </main>

    </div>
  );
}