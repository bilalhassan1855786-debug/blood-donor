import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#FBF7F1] lg:flex">

      <AdminSidebar />

      <main className="min-w-0 flex-1 bg-[#FBF7F1] p-4 sm:p-6 overflow-x-hidden">
        {children}
      </main>

    </div>
  );
}