import connectDB from "@/lib/mongodb";
import Booking from "@/models/bookings";
import Donor from "@/models/Donor";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import Link from "next/link";

// Public "latest blood requests" page.
//
// Contact details (patient name, phone, hospital address) are only
// revealed to APPROVED donors (or admins) — not to the general public.
// This lets a donor step in and contact the patient directly if no
// admin is available, without exposing personal details to everyone.
// Only "approved" (phone-verified) requests are listed at all.
export default async function BookingsPage() {
  await connectDB();

  const canSeeContactDetails = await checkCanSeeContactDetails();

  const bookings = await Booking.find({ status: "approved" })
    .sort({ createdAt: -1 })
    .lean();

  return (
    <div className="min-h-screen bg-[#FBF7F1] py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#C81E3A] mb-2">Blood Requests</h1>
          <p className="text-[#5B5964] text-sm">
            Latest verified blood requests from patients in need.
          </p>
        </div>

        {!canSeeContactDetails && (
          <div className="bg-[#0F6E6612] border border-[#0F6E6640] rounded-2xl p-5 mb-8 flex items-center justify-between flex-wrap gap-3">
            <p className="text-sm text-[#0F6E66]">
              🔒 Contact details are only visible to approved donors, so patients
              stay protected from spam.
            </p>
            <Link
              href="/become-donor"
              className="bg-[#0F6E66] hover:bg-[#0C5751] text-white text-sm font-semibold px-4 py-2 rounded-lg transition shrink-0"
            >
              Become a Donor
            </Link>
          </div>
        )}

        {bookings.length === 0 ? (
          <div className="bg-white rounded-2xl p-16 text-center text-[#5B5964] shadow-sm border border-black/5">
            No blood requests right now.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-5">
            {bookings.map((booking: any) => (
              <div
                key={booking._id.toString()}
                className="bg-white rounded-2xl shadow-sm border border-black/5 p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="text-2xl font-bold text-[#C81E3A]">
                    {booking.bloodGroup}
                  </span>

                  {booking.urgency && (
                    <span
                      className={`text-[11px] font-bold px-3 py-1 rounded-full ${
                        booking.urgency === "Critical"
                          ? "bg-[#C81E3A18] text-[#C81E3A]"
                          : booking.urgency === "Urgent"
                          ? "bg-[#B4530918] text-[#B45309]"
                          : "bg-black/5 text-[#5B5964]"
                      }`}
                    >
                      {booking.urgency}
                    </span>
                  )}
                </div>

                <div className="space-y-1.5 text-sm text-[#15141A]">
                  <p>📍 City: {booking.city}</p>

                  {booking.dateNeeded && (
                    <p>
                      📅 Date Needed: {new Date(booking.dateNeeded).toLocaleDateString()}
                    </p>
                  )}

                  {booking.bloodUnits && <p>🩸 Units Needed: {booking.bloodUnits}</p>}

                  {canSeeContactDetails ? (
                    <>
                      <div className="mt-3 pt-3 border-t border-black/5 space-y-1.5">
                        <p>
                          🧑 Patient: <strong>{booking.patientName}</strong>
                        </p>
                        <p>🏥 Hospital: {booking.hospital}</p>
                        {booking.location && <p>📌 Hospital Address: {booking.location}</p>}
                        <p>
                          📞 Contact: <strong>{booking.contactNumber}</strong>
                        </p>
                      </div>

                      <div className="flex gap-2 mt-4">
                        <a
                          href={`tel:${booking.contactNumber}`}
                          className="flex-1 text-center bg-[#0F6E66] hover:bg-[#0C5751] text-white text-xs font-semibold py-2 rounded-lg transition"
                        >
                          📞 Call
                        </a>
                        <a
                          href={`https://wa.me/${booking.contactNumber}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 text-center bg-[#C81E3A] hover:bg-[#A11530] text-white text-xs font-semibold py-2 rounded-lg transition"
                        >
                          💬 WhatsApp
                        </a>
                      </div>
                    </>
                  ) : (
                    <p className="text-xs text-black/30 mt-3 pt-3 border-t border-black/5">
                      🔒 Patient name, hospital, and contact number are hidden until you
                      become an approved donor.
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

async function checkCanSeeContactDetails(): Promise<boolean> {
  try {
    const token = (await cookies()).get("token")?.value;
    if (!token) return false;

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

    // Admins/superadmins/developers can always see full details.
    if (["admin", "superadmin", "developer"].includes(decoded.role)) {
      return true;
    }

    // Everyone else needs an approved donor record.
    const donor = await Donor.findOne({
      userId: decoded.id,
      status: "approved",
    }).lean();

    return !!donor;
  } catch {
    return false;
  }
}