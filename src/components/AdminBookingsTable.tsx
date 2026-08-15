"use client";

import { useRouter } from "next/navigation";
import { safeFetch, isOfflineError } from "@/lib/safeFetch";

export default function AdminBookingsTable({
  bookings,
}: {
  bookings: any[];
}) {
  const router = useRouter();

  const updateStatus = async (
    id: string,
    status: string
  ) => {
    try {
      const res = await safeFetch(`/api/bookings/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      const data = await res.json();

      if (data.success) {
        router.refresh();
      }
    } catch (err) {
      if (isOfflineError(err)) {
        alert("You're offline. Please check your connection and try again.");
        return;
      }
      alert("Something went wrong. Please try again.");
    }
  };

  const deleteBooking = async (id: string) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this request?"
    );

    if (!confirmDelete) return;

    try {
      const res = await safeFetch(`/api/bookings/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (data.success) {
        router.refresh();
      }
    } catch (err) {
      if (isOfflineError(err)) {
        alert("You're offline. Please check your connection and try again.");
        return;
      }
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="overflow-x-auto bg-white rounded-lg sm:rounded-lg md:rounded-xl shadow">
      <table className="w-full text-xs sm:text-sm">
        <thead>
          <tr className="bg-red-600 text-white">
            <th className="p-1.5 sm:p-2 md:p-3 text-xs sm:text-sm">Patient</th>
            <th className="p-1.5 sm:p-2 md:p-3 text-xs sm:text-sm">Blood</th>
            <th className="p-1.5 sm:p-2 md:p-3 text-xs sm:text-sm">Hospital</th>
            <th className="p-1.5 sm:p-2 md:p-3 text-xs sm:text-sm">City</th>
            <th className="p-1.5 sm:p-2 md:p-3 text-xs sm:text-sm">Contact</th>
            <th className="p-1.5 sm:p-2 md:p-3 text-xs sm:text-sm">Urgency</th>
            <th className="p-1.5 sm:p-2 md:p-3 text-xs sm:text-sm">Status</th>
            <th className="p-1.5 sm:p-2 md:p-3 text-xs sm:text-sm">Actions</th>
          </tr>
        </thead>

        <tbody>
          {bookings.map((booking) => (
            <tr
              key={booking._id}
              className="border-b"
            >
              <td className="p-1.5 sm:p-2 md:p-3">
                {booking.patientName}
              </td>

              <td className="p-1.5 sm:p-2 md:p-3">
                {booking.bloodGroup}
              </td>

              <td className="p-1.5 sm:p-2 md:p-3">
                {booking.hospital}
              </td>

              <td className="p-1.5 sm:p-2 md:p-3">
                {booking.city}
              </td>

              <td className="p-1.5 sm:p-2 md:p-3">
                {booking.contactNumber}
              </td>

              <td className="p-1.5 sm:p-2 md:p-3">
                <span
                  className={`px-1.5 sm:px-2 md:px-2 py-0.5 sm:py-0.75 md:py-1 rounded text-xs sm:text-sm text-white ${
                    booking.urgency === "Critical"
                      ? "bg-red-600"
                      : booking.urgency === "Urgent"
                      ? "bg-yellow-500"
                      : "bg-green-600"
                  }`}
                >
                  {booking.urgency}
                </span>
              </td>

              <td className="p-1.5 sm:p-2 md:p-3">
                {booking.status}
              </td>

              <td className="p-1.5 sm:p-2 md:p-3 flex gap-1 sm:gap-1.5 md:gap-2">
                <button
                  onClick={() =>
                    updateStatus(
                      booking._id,
                      "approved"
                    )
                  }
                  className="bg-green-600 text-white px-1.5 sm:px-2 md:px-3 py-0.5 sm:py-0.75 md:py-1 rounded text-xs sm:text-sm whitespace-nowrap"
                >
                  Approve
                </button>

                <button
                  onClick={() =>
                    updateStatus(
                      booking._id,
                      "completed"
                    )
                  }
                  className="bg-blue-600 text-white px-1.5 sm:px-2 md:px-3 py-0.5 sm:py-0.75 md:py-1 rounded text-xs sm:text-sm whitespace-nowrap"
                >
                  Complete
                </button>

                <button
                  onClick={() =>
                    deleteBooking(
                      booking._id
                    )
                  }
                  className="bg-red-600 text-white px-1.5 sm:px-2 md:px-3 py-0.5 sm:py-0.75 md:py-1 rounded text-xs sm:text-sm whitespace-nowrap"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}