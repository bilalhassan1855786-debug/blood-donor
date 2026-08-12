import connectDB from "@/lib/mongodb";
import User from "@/models/user";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";

export default async function Something({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  await connectDB();

  const token = (await cookies()).get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  try {
    const decoded: any = jwt.verify(
      token,
      process.env.JWT_SECRET!
    );

    if (
      decoded.role !== "admin" &&
      decoded.role !== "superadmin"
    ) {
      redirect("/login");
    }
  } catch {
    redirect("/login");
  }

  const user = await User.findById(
    id
  ).select("-password");

  if (!user) {
    return (
      <div className="p-10">
        <h1 className="text-3xl font-bold text-red-600">
          User Not Found
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">

        <div className="flex justify-between items-center mb-8">

          <h1 className="text-4xl font-bold">
            User Profile
          </h1>

          <a
            href="/admin/users"
            className="bg-gray-700 text-white px-4 py-2 rounded-lg"
          >
            Back
          </a>

        </div>

        <div className="grid md:grid-cols-2 gap-6">

          <div>
            <label className="font-semibold text-gray-500">
              Full Name
            </label>

            <p className="text-xl">
              {user.fullName}
            </p>
          </div>

          <div>
            <label className="font-semibold text-gray-500">
              Email
            </label>

            <p className="text-xl">
              {user.email}
            </p>
          </div>

          <div>
            <label className="font-semibold text-gray-500">
              Phone Number
            </label>

            <p className="text-xl">
              {user.phone || "N/A"}
            </p>
          </div>

          <div>
            <label className="font-semibold text-gray-500">
              City
            </label>

            <p className="text-xl">
              {user.city || "N/A"}
            </p>
          </div>

          <div>
            <label className="font-semibold text-gray-500">
              Blood Group
            </label>

            <p className="text-xl">
              {user.bloodGroup || "N/A"}
            </p>
          </div>

          <div>
            <label className="font-semibold text-gray-500">
              Role
            </label>

            <p className="text-xl capitalize">
              {user.role}
            </p>
          </div>

          <div>
            <label className="font-semibold text-gray-500">
              Registered On
            </label>

            <p className="text-xl">
              {new Date(
                user.createdAt
              ).toLocaleDateString()}
            </p>
          </div>

        </div>

        <div className="mt-10 flex flex-wrap gap-4">

          {user.phone && (
            <a
              href={`https://wa.me/${user.phone}`}
              target="_blank"
              className="bg-green-600 text-white px-5 py-3 rounded-lg"
            >
              WhatsApp
            </a>
          )}

          {user.phone && (
            <a
              href={`tel:${user.phone}`}
              className="bg-blue-600 text-white px-5 py-3 rounded-lg"
            >
              Call User
            </a>
          )}

          {user.role === "user" && (
            <form
              action={`/api/admin/promote?id=${user._id}`}
              method="POST"
            >
              <button className="bg-indigo-600 text-white px-5 py-3 rounded-lg">
                Make Admin
              </button>
            </form>
          )}

          {user.role === "admin" && (
            <form
              action={`/api/admin/remove-admin?id=${user._id}`}
              method="POST"
            >
              <button className="bg-orange-600 text-white px-5 py-3 rounded-lg">
                Remove Admin
              </button>
            </form>
          )}

          <form
            action={`/api/admin/delete-user?id=${user._id}`}
            method="POST"
          >
            <button className="bg-red-600 text-white px-5 py-3 rounded-lg">
              Delete User
            </button>
          </form>

        </div>

      </div>

    </div>
  );
}