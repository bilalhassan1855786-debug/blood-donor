import connectDB from "@/lib/mongodb";
import User from "@/models/user";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";

export default async function UsersPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string }>;
}) {
  const { search = "" } = await searchParams;
  await connectDB();

  const token = (await cookies()).get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  const decoded: any = jwt.verify(
    token,
    process.env.JWT_SECRET!
  );

  if (decoded.role !== "superadmin") {
    redirect("/admin");
  }

  

  const users = await User.find(
    search
      ? {
          $or: [
            {
              fullName: {
                $regex: search,
                $options: "i",
              },
            },
            {
              email: {
                $regex: search,
                $options: "i",
              },
            },
            {
              phone: {
                $regex: search,
                $options: "i",
              },
            },
          ],
        }
      : {}
  )
    .select("-password")
    .sort({ createdAt: -1 })
    .lean();

  return (
    <div className="p-3 sm:p-4 md:p-8">

      <div className="flex justify-between items-center mb-3 sm:mb-4 md:mb-6">

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
          User Management
        </h1>

        <form>
          <input
            type="text"
            name="search"
            placeholder="Search User..."
            defaultValue={search}
            className="border p-3 rounded-xl"
          />
        </form>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 md:gap-4">

  {users.map((user: any) => (
    <div
      key={user._id.toString()}
      className="bg-white shadow rounded-lg sm:rounded-lg md:rounded-xl p-3 sm:p-4 md:p-4 border hover:shadow-lg transition"
    >

      {/* USER INFO */}
      <div className="space-y-1 mb-2 sm:mb-3">
        <h2 className="text-lg sm:text-lg md:text-lg font-bold text-gray-800">
          {user.fullName}
        </h2>

        <p className="text-sm text-gray-600">
          📧 {user.email}
        </p>

        <p className="text-sm text-gray-600">
          📱 {user.phone}
        </p>

        <p className="text-sm text-gray-600">
          📍 {user.city}
        </p>

        <p className="text-sm text-gray-600">
          🩸 {user.bloodGroup}
        </p>

        <p className="text-sm text-gray-600">
          🆔 CNIC: {user.cnic || "N/A"}
        </p>

        <span className="inline-block mt-1 px-2 py-1 text-xs rounded-lg bg-gray-100">
          Role: {user.role}
        </span>
      </div>

      {/* ACTIONS */}
      <div className="flex flex-wrap gap-1 sm:gap-2">

        <a
          href={`/admin/users/${user._id}`}
          className="bg-blue-600 text-white px-2 py-1 sm:px-3 sm:py-1.5 text-xs rounded-lg"
        >
          Profile
        </a>
        <a
  href={`/admin/users/edit/${user._id}`}
  className="bg-purple-600 text-white px-2 py-1 sm:px-3 sm:py-1.5 text-xs rounded-lg"
>
  Edit
</a>

       

        {user.phone && (
          <a
            href={`https://wa.me/${user.phone}`}
            className="bg-green-600 text-white px-2 py-1 sm:px-3 sm:py-1.5 text-xs rounded-lg"
          >
            WhatsApp
          </a>
        )}

        {user.phone && (
          <a
            href={`tel:${user.phone}`}
            className="bg-yellow-500 text-white px-2 py-1 sm:px-3 sm:py-1.5 text-xs rounded-lg"
          >
            Call
          </a>
        )}

        {user.role === "user" && (
          <form action={`/api/admin/promote?id=${user._id}`} method="POST">
            <button className="bg-indigo-600 text-white px-2 py-1 sm:px-3 sm:py-1.5 text-xs rounded-lg">
              Make Admin
            </button>
          </form>
        )}

        {user.role === "admin" && (
          <form action={`/api/admin/remove-admin?id=${user._id}`} method="POST">
            <button className="bg-orange-600 text-white px-2 py-1 sm:px-3 sm:py-1.5 text-xs rounded-lg">
              Remove
            </button>
          </form>
        )}

        <form action={`/api/admin/delete-user?id=${user._id}`} method="POST">
          <button className="bg-red-600 text-white px-2 py-1 sm:px-3 sm:py-1.5 text-xs rounded-lg">
            Delete
          </button>
        </form>

      </div>
    </div>
  ))}

</div>

    </div>
  );
}