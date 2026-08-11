"use client";

import { useEffect, useState } from "react";
import { safeFetch, isOfflineError } from "@/lib/safeFetch";
import OfflineCard from "@/components/network/OfflineCard";

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [offline, setOffline] = useState(false);

  const loadBookings = async () => {
    try {
      setLoading(true);

      const res = await safeFetch("/api/bookings");
      const data = await res.json();

      setBookings(data.bookings || []);
      setOffline(false);
    } catch (error) {
      console.error(error);
      setOffline(isOfflineError(error));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    try {
      const res = await safeFetch("/api/admin/booking-status", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bookingId: id,
          status,
        }),
      });

      const data = await res.json();

      if (data.success) {
        loadBookings();
      }
    } catch (err) {
      if (isOfflineError(err)) {
        alert("You're offline. Please check your connection and try again.");
      } else {
        alert("Something went wrong. Please try again.");
      }
    }
  };

  // FILTER LOGIC
  const filteredBookings = bookings.filter((b) => {
    if (filter === "all") return true;
    return b.status === filter;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">

      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Blood Requests Management
        </h1>
        <p className="text-gray-500 text-sm">
          Manage patient blood requests
        </p>
      </div>

      {/* FILTER BUTTONS */}
      <div className="flex flex-wrap gap-2 mb-6">

        <button
          onClick={() => setFilter("all")}
          className="px-3 py-1 bg-gray-200 rounded"
        >
          All
        </button>

        <button
          onClick={() => setFilter("pending")}
          className="px-3 py-1 bg-yellow-200 rounded"
        >
          Pending
        </button>

        <button
          onClick={() => setFilter("approved")}
          className="px-3 py-1 bg-green-200 rounded"
        >
          Approved
        </button>

        <button
          onClick={() => setFilter("cancelled")}
          className="px-3 py-1 bg-red-200 rounded"
        >
          Cancelled
        </button>

      </div>

      {/* LOADING */}
      {loading && (
        <div className="text-center py-20 text-gray-500">
          Loading requests...
        </div>
      )}

      {/* EMPTY STATE */}
      {!loading && filteredBookings.length === 0 && (
        <div className="text-center py-20 text-gray-500">
          No blood requests found 😕
        </div>
      )}

      {/* CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

        {filteredBookings.map((b) => (
          <div
            key={b._id}
            className="bg-white rounded-xl shadow hover:shadow-lg transition p-5 border"
          >

            {/* HEADER */}
            <div className="flex justify-between items-start mb-3">

              <h2 className="text-lg font-bold text-gray-800">
                {b.patientName}
              </h2>

              <span
                className={`text-xs px-2 py-1 rounded-full font-semibold
                  ${
                    b.status === "approved"
                      ? "bg-green-100 text-green-700"
                      : b.status === "cancelled"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
              >
                {b.status}
              </span>

            </div>

            {/* INFO */}
            <div className="space-y-1 text-sm text-gray-600 mb-4">

              <p>🩸 Blood Group: {b.bloodGroup}</p>
              <p>📍 City: {b.city}</p>
              <p>📱 Contact: {b.contactNumber}</p>

            </div>

            {/* ACTIONS */}
            <div className="flex flex-wrap gap-2">
              <a
  href={`/admin/bookings/${b._id}`}
  className="bg-blue-600 text-white px-3 py-1 rounded"
>
  View Details
</a>

              <button
                onClick={() => updateStatus(b._id, "approved")}
                className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 text-xs rounded"
              >
                Approve
              </button>

              <button
                onClick={() => updateStatus(b._id, "cancelled")}
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 text-xs rounded"
              >
                Reject
              </button>

              <a
                href={`tel:${b.contactNumber}`}
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 text-xs rounded"
              >
                Call
              </a>

              <a
                href={`https://wa.me/${b.contactNumber}`}
                target="_blank"
                className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 text-xs rounded"
              >
                WhatsApp
              </a>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}