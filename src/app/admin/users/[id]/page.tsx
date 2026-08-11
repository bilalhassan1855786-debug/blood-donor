import connectDB from "@/lib/mongodb";
import User from "@/models/user";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";

export default async function UserProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await connectDB();
  const { id } = await params;

  const token = (await cookies()).get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

    if (decoded.role !== "admin" && decoded.role !== "superadmin") {
      redirect("/login");
    }
  } catch {
    redirect("/login");
  }

  const user = await User.findById(id).select("-password").lean();

  if (!user) {
    return (
      <div className="p-10">
        <h1 className="text-3xl font-bold text-[#C81E3A]">User Not Found</h1>
      </div>
    );
  }

  const u: any = user;
  // WhatsApp / Local number are the real contact fields — "phone" never
  // existed on the User schema.
  const contactNumber = u.localNumber || u.whatsappNumber;

  return (
    <div className="min-h-screen bg-[#FBF7F1] p-4 md:p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-black/5 p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[#15141A]">User Profile</h1>

          <a
            href="/admin/users"
            className="bg-[#15141A] hover:bg-black text-white px-4 py-2 rounded-lg text-sm font-semibold transition"
          >
            Back
          </a>
        </div>

        {/* Avatar */}
        <div className="flex items-center gap-4 mb-8 pb-8 border-b border-black/5">
          <img
            src={u.photo || "/team/default-avatar.png"}
            alt={u.fullName}
            className="w-20 h-20 rounded-full object-cover border-4 border-[#C81E3A22]"
          />
          <div>
            <h2 className="text-xl font-bold text-[#15141A]">{u.fullName}</h2>
            <p className="text-sm text-[#5B5964] capitalize">{u.role}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Field label="Full Name" value={u.fullName} />
          <Field label="Email" value={u.email} />
          <Field label="WhatsApp Number" value={u.whatsappNumber} />
          <Field label="Local Number" value={u.localNumber} />
          <Field label="Age" value={u.age} />
          <Field label="Weight (kg)" value={u.weight} />
          <Field label="City" value={u.city} />
          <Field label="CNIC" value={u.cnic} />
          <Field label="Blood Group" value={u.bloodGroup} />
          <Field label="Role" value={u.role} capitalize />
          <Field
            label="Registered On"
            value={u.createdAt ? new Date(u.createdAt).toLocaleDateString() : ""}
          />
          <div className="md:col-span-2">
            <Field label="Address" value={u.presentAddress} />
          </div>
        </div>

        <div className="mt-10 flex flex-wrap gap-4">
          {contactNumber && (
            <a
              href={`https://wa.me/${contactNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#0F6E66] hover:bg-[#0C5751] text-white px-5 py-3 rounded-lg font-semibold transition"
            >
              WhatsApp
            </a>
          )}

          {contactNumber && (
            <a
              href={`tel:${contactNumber}`}
              className="bg-[#15141A] hover:bg-black text-white px-5 py-3 rounded-lg font-semibold transition"
            >
              Call User
            </a>
          )}

          {u.role === "user" && (
            <form action={`/api/admin/promote?id=${u._id}`} method="POST">
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-lg font-semibold transition">
                Make Admin
              </button>
            </form>
          )}

          {u.role === "admin" && (
            <form action={`/api/admin/remove-admin?id=${u._id}`} method="POST">
              <button className="bg-[#B45309] hover:bg-[#92430A] text-white px-5 py-3 rounded-lg font-semibold transition">
                Remove Admin
              </button>
            </form>
          )}

          <form action={`/api/admin/delete-user?id=${u._id}`} method="POST">
            <button className="bg-[#C81E3A] hover:bg-[#A11530] text-white px-5 py-3 rounded-lg font-semibold transition">
              Delete User
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  capitalize,
}: {
  label: string;
  value: any;
  capitalize?: boolean;
}) {
  return (
    <div>
      <label className="font-semibold text-[#5B5964] text-sm block mb-1">{label}</label>
      <p className={`text-lg text-[#15141A] ${capitalize ? "capitalize" : ""}`}>
        {value || "N/A"}
      </p>
    </div>
  );
}