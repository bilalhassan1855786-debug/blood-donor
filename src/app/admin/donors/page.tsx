"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { isEligibleForDonation } from "@/lib/donor";
import { safeFetch, isOfflineError } from "@/lib/safeFetch";
import OfflineCard from "@/components/network/OfflineCard";

export default function AdminDonorsPage() {
  const [donors, setDonors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState<
    "all" | "pending" | "approved" | "rejected"
  >("all");

  const [offline, setOffline] = useState(false);

  const loadDonors = async () => {
    try {
      setLoading(true);

      const res = await safeFetch("/api/admin/donors");

      const data = await res.json();

      if (data.success) {
        setDonors(data.donors);
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
    loadDonors();
  }, []);

  const approveDonor = async (donorId: string) => {
    try {
      const res = await safeFetch(
        "/api/admin/donors/approve",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            donorId,
          }),
        }
      );

      const data = await res.json();

      if (data.success) {
        alert(
          "Donor approved successfully"
        );
        loadDonors();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      if (isOfflineError(error)) {
        alert("You're offline. Please check your connection and try again.");
      } else {
        alert("Something went wrong. Please try again.");
      }
    }
  };

  const rejectDonor = async (
    donorId: string
  ) => {
    const reason = prompt(
      "Enter rejection reason"
    );

    if (reason === null) return;

    try {
      const res = await safeFetch(
        "/api/admin/donors/reject",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            donorId,
            reason,
          }),
        }
      );

      const data = await res.json();

      if (data.success) {
        alert(
          "Donor rejected successfully"
        );
        loadDonors();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      if (isOfflineError(error)) {
        alert("You're offline. Please check your connection and try again.");
      } else {
        alert("Something went wrong. Please try again.");
      }
    }
  };

  const deleteDonor = async (
    donorId: string
  ) => {
    const ok = confirm(
      "Delete this donor?"
    );

    if (!ok) return;

    try {
      const res = await safeFetch(
        "/api/admin/delete-donor",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            donorId,
          }),
        }
      );

      const data = await res.json();

      if (data.success) {
        loadDonors();
      }
    } catch (error) {
      console.error(error);
      if (isOfflineError(error)) {
        alert("You're offline. Please check your connection and try again.");
      } else {
        alert("Something went wrong. Please try again.");
      }
    }
  };

  const filteredDonors =
    donors.filter((d) => {
      const matchesSearch =
        d.fullName
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        d.city
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        d.bloodGroup
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        d.cnic?.includes(
          search
        );

      const matchesFilter =
        filter === "all"
          ? true
          : d.status === filter;

      return (
        matchesSearch &&
        matchesFilter
      );
    });

  const stats = {
    total: donors.length,
    pending: donors.filter(
      (d) =>
        d.status === "pending"
    ).length,
    approved: donors.filter(
      (d) =>
        d.status === "approved"
    ).length,
    rejected: donors.filter(
      (d) =>
        d.status === "rejected"
    ).length,
  };

  if (loading) {
    return (
      <div className="p-10">
        Loading...
      </div>
    );
  }

  if (offline) {
    return (
      <div className="p-10">
        <OfflineCard onRetry={loadDonors} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-red-50 p-4 md:p-8">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">

        <div>
          <h1 className="text-4xl font-bold">
            Donor Management
          </h1>

          <p className="text-gray-500">
            Manage donor requests
          </p>
        </div>

        <Link
          href="/admin/add-donor"
          className="bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-xl"
        >
          + Add Donor
        </Link>

      </div>

      {/* STATS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">

        <div className="bg-white rounded-xl p-5 shadow">
          <p>Total</p>
          <h2 className="text-3xl font-bold">
            {stats.total}
          </h2>
        </div>

        <div className="bg-yellow-100 rounded-xl p-5 shadow">
          <p>Pending</p>
          <h2 className="text-3xl font-bold">
            {stats.pending}
          </h2>
        </div>

        <div className="bg-green-100 rounded-xl p-5 shadow">
          <p>Approved</p>
          <h2 className="text-3xl font-bold">
            {stats.approved}
          </h2>
        </div>

        <div className="bg-red-100 rounded-xl p-5 shadow">
          <p>Rejected</p>
          <h2 className="text-3xl font-bold">
            {stats.rejected}
          </h2>
        </div>

      </div>

      {/* SEARCH */}
      <div className="bg-white rounded-xl p-5 shadow mb-6">

        <input
          type="text"
          placeholder="Search donor..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          className="w-full border rounded-xl p-3 mb-4"
        />

        <div className="flex gap-2 flex-wrap">

          {[
            "all",
            "pending",
            "approved",
            "rejected",
          ].map((item) => (
            <button
              key={item}
              onClick={() =>
                setFilter(
                  item as any
                )
              }
              className={`px-4 py-2 rounded-lg ${
                filter === item
                  ? "bg-red-600 text-white"
                  : "bg-gray-200"
              }`}
            >
              {item}
            </button>
          ))}

        </div>

      </div>
            {/* DONORS GRID */}
      {filteredDonors.length === 0 ? (
        <div className="bg-white rounded-2xl p-10 text-center shadow">
          <h2 className="text-xl font-semibold text-gray-600">
            No donors found
          </h2>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">

          {filteredDonors.map((d) => {
            const eligible =
              isEligibleForDonation(
                d.lastDonationDate
              );

            return (
              <div
                key={d._id}
                className="bg-white rounded-2xl shadow-lg p-5 border"
              >

                {/* PHOTO + NAME */}
                <div className="flex gap-4">

                  <img
                    src={
                      d.photo ||
                      "/user.png"
                    }
                    alt=""
                    className="w-20 h-20 rounded-full object-cover border"
                  />

                  <div className="flex-1">

                    <h2 className="text-xl font-bold">
                      {d.fullName}
                    </h2>

                    <p className="text-gray-500 text-sm">
                      {d.fatherName}
                    </p>

                    <div className="flex gap-2 mt-2 flex-wrap">

                      <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-semibold">
                        {d.bloodGroup}
                      </span>

                      {d.status ===
                        "pending" && (
                        <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
                          Pending
                        </span>
                      )}

                      {d.status ===
                        "approved" && (
                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                          Approved
                        </span>
                      )}

                      {d.status ===
                        "rejected" && (
                        <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">
                          Rejected
                        </span>
                      )}

                    </div>

                  </div>

                </div>

                {/* INFO */}
                <div className="mt-5 space-y-2 text-sm">

                  <p>
                    📍 <b>City:</b>{" "}
                    {d.city}
                  </p>

                  <p>
                    🪪 <b>CNIC:</b>{" "}
                    {d.cnic ||
                      "N/A"}
                  </p>

                  <p>
                    📱{" "}
                    <b>
                      WhatsApp:
                    </b>{" "}
                    {
                      d.whatsappNumber
                    }
                  </p>

                  <p>
                    🎂 <b>Age:</b>{" "}
                    {d.age ||
                      "N/A"}
                  </p>

                  <p>
                    ⚖️{" "}
                    <b>
                      Weight:
                    </b>{" "}
                    {d.weight ||
                      "N/A"}
                  </p>

                  <p>
                    ❤️{" "}
                    <b>
                      Eligible:
                    </b>{" "}
                    {eligible
                      ? "Yes"
                      : "No"}
                  </p>

                  <p>
                    🩺{" "}
                    <b>
                      Health:
                    </b>{" "}
                    {d.healthChecked
                      ? "Passed"
                      : "Failed"}
                  </p>

                  <p>
                    🚗{" "}
                    <b>
                      Transport:
                    </b>{" "}
                    {
                      d.transportSupport
                    }
                  </p>

                  {d.lastDonationDate && (
                    <p>
                      🩸{" "}
                      <b>
                        Last Donation:
                      </b>{" "}
                      {new Date(
                        d.lastDonationDate
                      ).toLocaleDateString()}
                    </p>
                  )}

                  {d.rejectionReason && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-2 mt-2">
                      <b>
                        Rejection:
                      </b>{" "}
                      {
                        d.rejectionReason
                      }
                    </div>
                  )}

                </div>

                {/* ACTIONS */}
                <div className="flex flex-wrap gap-2 mt-5">

                  <Link
                    href={`/admin/donors/${d._id}`}
                    className="bg-blue-600 text-white px-3 py-2 rounded-lg text-sm"
                  >
                    View
                  </Link>

                  <Link
                    href={`/admin/donors/edit/${d._id}`}
                    className="bg-purple-600 text-white px-3 py-2 rounded-lg text-sm"
                  >
                    Edit
                  </Link>

                  {d.whatsappNumber && (
                    <a
                      href={`https://wa.me/${d.whatsappNumber}`}
                      target="_blank"
                      className="bg-green-600 text-white px-3 py-2 rounded-lg text-sm"
                    >
                      WhatsApp
                    </a>
                  )}

                  {(d.localNumber ||
                    d.whatsappNumber) && (
                    <a
                      href={`tel:${
                        d.localNumber ||
                        d.whatsappNumber
                      }`}
                      className="bg-yellow-500 text-white px-3 py-2 rounded-lg text-sm"
                    >
                      Call
                    </a>
                  )}

                  {d.status ===
                    "pending" && (
                    <>
                      <button
                        onClick={() =>
                          approveDonor(
                            d._id
                          )
                        }
                        className="bg-green-700 text-white px-3 py-2 rounded-lg text-sm"
                      >
                        Approve
                      </button>

                      <button
                        onClick={() =>
                          rejectDonor(
                            d._id
                          )
                        }
                        className="bg-orange-600 text-white px-3 py-2 rounded-lg text-sm"
                      >
                        Reject
                      </button>
                    </>
                  )}

                  <button
                    onClick={() =>
                      deleteDonor(
                        d._id
                      )
                    }
                    className="bg-red-600 text-white px-3 py-2 rounded-lg text-sm"
                  >
                    Delete
                  </button>

                </div>

              </div>
            );
          })}

        </div>
      )}

    </div>
  
);
}