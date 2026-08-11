"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { safeFetch, isOfflineError } from "@/lib/safeFetch";
import OfflineCard from "@/components/network/OfflineCard";

export default function BookingDetailsPage() {
  const { id } = useParams();

  const [booking, setBooking] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [offline, setOffline] = useState(false);

  const loadBooking = async () => {
    setLoading(true);
    try {
      const res = await safeFetch(
        `/api/admin/booking/${id}`
      );

      const data = await res.json();

      if (data.success) {
        setBooking(data.booking);
      }
      setOffline(false);
    } catch (error) {
      console.error(error);
      setOffline(isOfflineError(error));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      loadBooking();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="p-8">
        Loading...
      </div>
    );
  }

  if (offline) {
    return (
      <div className="p-8">
        <OfflineCard onRetry={loadBooking} />
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="p-8">
        Request not found
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">

      <div className="bg-white rounded-3xl shadow-lg p-8">

        <h1 className="text-3xl font-bold text-red-600 mb-8">
          Blood Request Details
        </h1>

        <div className="grid md:grid-cols-2 gap-6">

          <Info label="Requester Name" value={booking.requesterName} />
          <Info label="Patient Name" value={booking.patientName} />
          <Info label="Gender" value={booking.gender} />
          <Info label="Blood Group" value={booking.bloodGroup} />
          <Info label="Disease" value={booking.disease} />
          <Info label="Hospital" value={booking.hospital} />
          <Info label="Location" value={booking.location} />
          <Info label="City" value={booking.city} />
          <Info label="Contact Number" value={booking.contactNumber} />
          <Info label="Urgency" value={booking.urgency} />
          <Info label="Status" value={booking.status} />

          <Info
            label="Date Needed"
            value={
              new Date(
                booking.dateNeeded
              ).toLocaleDateString()
            }
          />

          <Info
            label="Created At"
            value={
              new Date(
                booking.createdAt
              ).toLocaleString()
            }
          />

        </div>

        {booking.notes && (
          <div className="mt-8">

            <h2 className="font-bold text-lg mb-2">
              Notes
            </h2>

            <div className="bg-gray-100 p-4 rounded-xl">
              {booking.notes}
            </div>

          </div>
        )}

        <div className="flex flex-wrap gap-3 mt-8">

          <a
            href={`tel:${booking.contactNumber}`}
            className="bg-blue-600 text-white px-5 py-3 rounded-xl"
          >
            📞 Call
          </a>

          <a
            href={`https://wa.me/${booking.contactNumber}`}
            target="_blank"
            className="bg-green-600 text-white px-5 py-3 rounded-xl"
          >
            WhatsApp
          </a>

        </div>

      </div>

    </div>
  );
}

function Info({
  label,
  value,
}: {
  label: string;
  value: any;
}) {
  return (
    <div className="bg-gray-50 border rounded-xl p-4">
      <p className="text-sm text-gray-500">
        {label}
      </p>

      <p className="font-semibold mt-1">
        {value || "-"}
      </p>
    </div>
  );
}