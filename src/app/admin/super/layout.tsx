import SuperAdminSidebar from "@/components/admin/SuperAdminSidebar";

export default function SuperAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-100 lg:flex">

      <SuperAdminSidebar />

      <main className="min-w-0 flex-1 bg-gray-100 p-4 sm:p-6 overflow-x-hidden">
        {children}
      </main>

    </div>
  );
}