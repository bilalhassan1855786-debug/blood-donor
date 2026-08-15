"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { isEligibleForDonation } from "@/lib/donor";
import { safeFetch, isOfflineError } from "@/lib/safeFetch";
import OfflineCard from "@/components/network/OfflineCard";

const BLOOD_GROUPS = [
  "A+",
  "A-",
  "B+",
  "B-",
  "AB+",
  "AB-",
  "O+",
  "O-",
];

type FilterStatus =
  | "all"
  | "pending"
  | "approved"
  | "rejected";

export default function AdminDonorsPage() {
  const [donors, setDonors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Search / filters
  const [nameSearch, setNameSearch] = useState("");
  const [citySearch, setCitySearch] = useState("");
  const [bloodGroupFilter, setBloodGroupFilter] =
    useState("");

  const [filter, setFilter] =
    useState<FilterStatus>("all");

  const [offline, setOffline] = useState(false);

  // =========================
  // LOAD DONORS
  // =========================

  const loadDonors = async () => {
    try {
      setLoading(true);

      const res = await safeFetch(
        "/api/admin/donors"
      );

      const data = await res.json();

      if (data.success) {
        setDonors(data.donors || []);
      } else {
        setDonors([]);
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

  // =========================
  // APPROVE DONOR
  // =========================

  const approveDonor = async (
    donorId: string
  ) => {
    try {
      const res = await safeFetch(
        "/api/admin/donors/approve",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            donorId,
          }),
        }
      );

      const data = await res.json();

      if (data.success) {
        alert("Donor approved successfully");
        loadDonors();
      } else {
        alert(
          data.message ||
            "Unable to approve donor"
        );
      }
    } catch (error) {
      console.error(error);

      if (isOfflineError(error)) {
        alert(
          "You're offline. Please check your connection and try again."
        );
      } else {
        alert(
          "Something went wrong. Please try again."
        );
      }
    }
  };

  // =========================
  // REJECT DONOR
  // =========================

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
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            donorId,
            reason,
          }),
        }
      );

      const data = await res.json();

      if (data.success) {
        alert("Donor rejected successfully");
        loadDonors();
      } else {
        alert(
          data.message ||
            "Unable to reject donor"
        );
      }
    } catch (error) {
      console.error(error);

      if (isOfflineError(error)) {
        alert(
          "You're offline. Please check your connection and try again."
        );
      } else {
        alert(
          "Something went wrong. Please try again."
        );
      }
    }
  };

  // =========================
  // DELETE DONOR
  // =========================

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
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            donorId,
          }),
        }
      );

      const data = await res.json();

      if (data.success) {
        loadDonors();
      } else {
        alert(
          data.message ||
            "Unable to delete donor"
        );
      }
    } catch (error) {
      console.error(error);

      if (isOfflineError(error)) {
        alert(
          "You're offline. Please check your connection and try again."
        );
      } else {
        alert(
          "Something went wrong. Please try again."
        );
      }
    }
  };

  // =========================
  // FILTER DONORS
  // =========================

  const filteredDonors = donors.filter(
    (d) => {
      const name = (
        d.fullName || ""
      ).toLowerCase();

      const city = (
        d.city || ""
      ).toLowerCase();

      const bloodGroup = (
        d.bloodGroup || ""
      ).toUpperCase();

      const searchName =
        nameSearch
          .trim()
          .toLowerCase();

      const searchCity =
        citySearch
          .trim()
          .toLowerCase();

      const matchesName =
        !searchName ||
        name.includes(searchName);

      const matchesCity =
        !searchCity ||
        city.includes(searchCity);

      const matchesBloodGroup =
        !bloodGroupFilter ||
        bloodGroup ===
          bloodGroupFilter;

      const matchesStatus =
        filter === "all" ||
        d.status === filter;

      return (
        matchesName &&
        matchesCity &&
        matchesBloodGroup &&
        matchesStatus
      );
    }
  );

  // =========================
  // STATS
  // =========================

  const stats = {
    total: donors.length,

    pending: donors.filter(
      (d) => d.status === "pending"
    ).length,

    approved: donors.filter(
      (d) => d.status === "approved"
    ).length,

    rejected: donors.filter(
      (d) => d.status === "rejected"
    ).length,
  };

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FBF7F1] flex items-center justify-center p-6">
        <p className="text-gray-600 text-sm sm:text-base">
          Loading donors...
        </p>
      </div>
    );
  }

  // =========================
  // OFFLINE
  // =========================

  if (offline) {
    return (
      <div className="min-h-screen bg-[#FBF7F1] p-4 sm:p-6 md:p-8">
        <OfflineCard onRetry={loadDonors} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-red-50 p-3 sm:p-4 md:p-6 lg:p-8">

      {/* =========================
          HEADER
      ========================= */}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-5 sm:mb-7">

        <div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
            Donor Management
          </h1>

          <p className="text-gray-500 text-xs sm:text-sm mt-1">
            Manage donor requests and donor records
          </p>
        </div>

        <Link
          href="/admin/add-donor"
          className="inline-flex items-center justify-center bg-red-600 hover:bg-red-700 text-white px-4 py-2.5 sm:px-5 sm:py-3 rounded-lg sm:rounded-xl text-sm font-semibold transition whitespace-nowrap"
        >
          + Add Donor
        </Link>
      </div>

      {/* =========================
          STATS
      ========================= */}

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 md:gap-4 mb-5 sm:mb-6">

        <div className="bg-white rounded-xl p-3 sm:p-4 shadow-sm border border-gray-100">
          <p className="text-xs sm:text-sm text-gray-500">
            Total
          </p>

          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mt-1">
            {stats.total}
          </h2>
        </div>

        <div className="bg-yellow-50 rounded-xl p-3 sm:p-4 shadow-sm border border-yellow-100">
          <p className="text-xs sm:text-sm text-yellow-700">
            Pending
          </p>

          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-yellow-800 mt-1">
            {stats.pending}
          </h2>
        </div>

        <div className="bg-green-50 rounded-xl p-3 sm:p-4 shadow-sm border border-green-100">
          <p className="text-xs sm:text-sm text-green-700">
            Approved
          </p>

          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-green-800 mt-1">
            {stats.approved}
          </h2>
        </div>

        <div className="bg-red-50 rounded-xl p-3 sm:p-4 shadow-sm border border-red-100">
          <p className="text-xs sm:text-sm text-red-700">
            Rejected
          </p>

          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-red-800 mt-1">
            {stats.rejected}
          </h2>
        </div>
      </div>

      {/* =========================
          SEARCH & FILTERS
      ========================= */}

      <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 shadow-sm border border-gray-100 mb-5 sm:mb-6">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">

          {/* NAME */}

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">
              Search by Name
            </label>

            <input
              type="text"
              placeholder="e.g. Asad Abbas"
              value={nameSearch}
              onChange={(e) =>
                setNameSearch(
                  e.target.value
                )
              }
              className="w-full border border-gray-300 rounded-lg p-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* CITY */}

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">
              Search by City
            </label>

            <input
              type="text"
              placeholder="e.g. Sargodha"
              value={citySearch}
              onChange={(e) =>
                setCitySearch(
                  e.target.value
                )
              }
              className="w-full border border-gray-300 rounded-lg p-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* BLOOD GROUP */}

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">
              Search by Blood Group
            </label>

            <select
              value={bloodGroupFilter}
              onChange={(e) =>
                setBloodGroupFilter(
                  e.target.value
                )
              }
              className="w-full border border-gray-300 rounded-lg p-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="">
                All Blood Groups
              </option>

              {BLOOD_GROUPS.map(
                (group) => (
                  <option
                    key={group}
                    value={group}
                  >
                    {group}
                  </option>
                )
              )}
            </select>
          </div>
        </div>

        {/* STATUS + CLEAR */}

        <div className="flex flex-wrap items-center gap-2 mt-4">

          {(
            [
              "all",
              "pending",
              "approved",
              "rejected",
            ] as FilterStatus[]
          ).map((item) => (
            <button
              key={item}
              type="button"
              onClick={() =>
                setFilter(item)
              }
              className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition ${
                filter === item
                  ? "bg-red-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {item
                .charAt(0)
                .toUpperCase() +
                item.slice(1)}
            </button>
          ))}

          {/* CLEAR */}

          {(nameSearch ||
            citySearch ||
            bloodGroupFilter ||
            filter !== "all") && (
            <button
              type="button"
              onClick={() => {
                setNameSearch("");
                setCitySearch("");
                setBloodGroupFilter("");
                setFilter("all");
              }}
              className="sm:ml-auto px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 transition"
            >
              Clear Filters
            </button>
          )}
        </div>

        {/* RESULT COUNT */}

        <div className="mt-3 text-xs text-gray-500">
          Showing{" "}
          <span className="font-semibold text-gray-700">
            {filteredDonors.length}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-gray-700">
            {donors.length}
          </span>{" "}
          donors
        </div>
      </div>

      {/* =========================
          DONORS
      ========================= */}

      {filteredDonors.length === 0 ? (
        <div className="bg-white rounded-xl sm:rounded-2xl p-8 sm:p-10 text-center shadow-sm border border-gray-100">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-600">
            No donors found
          </h2>

          <p className="text-sm text-gray-400 mt-1">
            Try changing your search or filters.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 md:gap-5">
                    {filteredDonors.map((d) => {
            const eligible =
              isEligibleForDonation(
                d.lastDonationDate
              );

            return (
              <div
                key={d._id}
                className="bg-white rounded-xl sm:rounded-2xl shadow-sm p-3 sm:p-4 md:p-5 border border-gray-100"
              >

                {/* PHOTO + NAME */}

                <div className="flex gap-3">

                  <img
                    src={
                      d.photo ||
                      "/user.png"
                    }
                    alt={
                      d.fullName ||
                      "Donor"
                    }
                    className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 shrink-0 rounded-full object-cover border border-gray-200"
                  />

                  <div className="min-w-0 flex-1">

                    <h2 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 truncate">
                      {d.fullName ||
                        "Unknown Donor"}
                    </h2>

                    {d.fatherName && (
                      <p className="text-gray-500 text-xs sm:text-sm truncate">
                        {d.fatherName}
                      </p>
                    )}

                    <div className="flex gap-1.5 mt-2 flex-wrap">

                      <span className="bg-red-100 text-red-700 px-2.5 py-1 rounded-full text-xs font-semibold">
                        {d.bloodGroup ||
                          "N/A"}
                      </span>

                      {d.status ===
                        "pending" && (
                        <span className="bg-yellow-100 text-yellow-700 px-2.5 py-1 rounded-full text-xs font-semibold">
                          Pending
                        </span>
                      )}

                      {d.status ===
                        "approved" && (
                        <span className="bg-green-100 text-green-700 px-2.5 py-1 rounded-full text-xs font-semibold">
                          Approved
                        </span>
                      )}

                      {d.status ===
                        "rejected" && (
                        <span className="bg-red-100 text-red-700 px-2.5 py-1 rounded-full text-xs font-semibold">
                          Rejected
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* INFO */}

                <div className="mt-4 space-y-1.5 text-xs sm:text-sm text-gray-700">

                  <p>
                    📍{" "}
                    <b>City:</b>{" "}
                    {d.city ||
                      "N/A"}
                  </p>

                  <p>
                    🪪{" "}
                    <b>CNIC:</b>{" "}
                    {d.cnic ||
                      "N/A"}
                  </p>

                  <p className="break-all">
                    📱{" "}
                    <b>WhatsApp:</b>{" "}
                    {d.whatsappNumber ||
                      "N/A"}
                  </p>

                  <p>
                    🎂{" "}
                    <b>Age:</b>{" "}
                    {d.age ||
                      "N/A"}
                  </p>

                  <p>
                    ⚖️{" "}
                    <b>Weight:</b>{" "}
                    {d.weight
                      ? `${d.weight} kg`
                      : "N/A"}
                  </p>

                  <p>
                    ❤️{" "}
                    <b>Eligible:</b>{" "}
                    <span
                      className={
                        eligible
                          ? "text-green-600 font-semibold"
                          : "text-red-600 font-semibold"
                      }
                    >
                      {eligible
                        ? "Yes"
                        : "No"}
                    </span>
                  </p>

                  <p>
                    🩺{" "}
                    <b>Health:</b>{" "}
                    {d.healthChecked
                      ? "Passed"
                      : "Failed"}
                  </p>

                  <p>
                    🚗{" "}
                    <b>
                      Transport:
                    </b>{" "}
                    {d.transportSupport ||
                      "N/A"}
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
                    <div className="bg-red-50 border border-red-200 rounded-lg p-2 mt-2 text-xs sm:text-sm">
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

                <div className="flex flex-wrap gap-2 mt-4">

                  <Link
                    href={`/admin/donors/${d._id}`}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition"
                  >
                    View
                  </Link>

                  <Link
                    href={`/admin/donors/edit/${d._id}`}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition"
                  >
                    Edit
                  </Link>

                  {d.whatsappNumber && (
                    <a
                      href={`https://wa.me/${String(
                        d.whatsappNumber
                      ).replace(
                        /\D/g,
                        ""
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition"
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
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition"
                    >
                      Call
                    </a>
                  )}

                  {d.status ===
                    "pending" && (
                    <>
                      <button
                        type="button"
                        onClick={() =>
                          approveDonor(
                            d._id
                          )
                        }
                        className="bg-green-700 hover:bg-green-800 text-white px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition"
                      >
                        Approve
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          rejectDonor(
                            d._id
                          )
                        }
                        className="bg-orange-600 hover:bg-orange-700 text-white px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition"
                      >
                        Reject
                      </button>
                    </>
                  )}

                  <button
                    type="button"
                    onClick={() =>
                      deleteDonor(
                        d._id
                      )
                    }
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition"
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