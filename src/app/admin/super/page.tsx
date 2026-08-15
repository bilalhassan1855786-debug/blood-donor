"use client";

import { useEffect, useState } from "react";
import { safeFetch, isOfflineError } from "@/lib/safeFetch";
import OfflineCard from "@/components/network/OfflineCard";

export default function SuperAdminPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [offline, setOffline] = useState(false);

  const loadUsers = async () => {
    setLoading(true);

    try {
      const res = await safeFetch("/api/admin/users");
      const data = await res.json();

      setUsers(data.users || []);
      setOffline(false);
    } catch (err) {
      setOffline(isOfflineError(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const makeAdmin = async (id: string) => {
    try {
      await safeFetch("/api/admin/promote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: id, role: "admin" }),
      });

      loadUsers();
    } catch (err) {
      if (isOfflineError(err)) {
        alert("You're offline. Please check your connection and try again.");
      } else {
        alert("Something went wrong. Please try again.");
      }
    }
  };

  const makeDeveloper = async (id: string) => {
    try {
      await safeFetch("/api/admin/promote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: id, role: "developer" }),
      });

      loadUsers();
    } catch (err) {
      if (isOfflineError(err)) {
        alert("You're offline. Please check your connection and try again.");
      } else {
        alert("Something went wrong. Please try again.");
      }
    }
  };

  const removeAdmin = async (id: string) => {
    try {
      await safeFetch("/api/admin/remove-admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: id }),
      });

      loadUsers();
    } catch (err) {
      if (isOfflineError(err)) {
        alert("You're offline. Please check your connection and try again.");
      } else {
        alert("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-3 sm:p-4 md:p-8">

      <h1 className="text-2xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 md:mb-6">
        Super Admin Dashboard
      </h1>

      {/* STATS */}
      <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-4 md:mb-6">

        <Stat title="Users" value={users.length} />
        <Stat title="Admins" value={users.filter(u => u.role === "admin").length} />
        <Stat title="Super Admins" value={users.filter(u => u.role === "superadmin").length} />

      </div>

      {/* USERS */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 md:gap-4">

        {loading ? (
          <p>Loading...</p>
        ) : offline ? (
          <OfflineCard onRetry={loadUsers} />
        ) : (
          users.map((u) => (
            <div
              key={u._id}
              className="bg-white p-3 sm:p-4 md:p-4 rounded-lg sm:rounded-lg md:rounded-xl shadow hover:shadow-lg"
            >
              <h2 className="font-bold text-sm sm:text-sm">{u.fullName}</h2>
              <p className="text-xs sm:text-sm text-gray-500">{u.email}</p>
              <p className="text-xs sm:text-sm">🩸 {u.bloodGroup || "-"}</p>
              <p className="text-xs sm:text-sm">📍 {u.city || "-"}</p>

              <span className="text-xs px-2 py-1 bg-gray-200 rounded-lg mt-2 inline-block">
                {u.role}
              </span>

              <div className="flex gap-1 sm:gap-2 mt-2 sm:mt-3 flex-wrap">

                {(u.role === "user" || u.role === "developer") && (
                  <button
                    onClick={() => makeAdmin(u._id)}
                    className="bg-green-600 text-white px-2 py-1 sm:px-3 sm:py-1.5 text-xs rounded-lg"
                  >
                    Make Admin
                  </button>
                )}

                {u.role !== "developer" && u.role !== "superadmin" && (
                  <button
                    onClick={() => makeDeveloper(u._id)}
                    className="bg-indigo-600 text-white px-2 py-1 sm:px-3 sm:py-1.5 text-xs rounded-lg"
                  >
                    Make Developer
                  </button>
                )}

                {u.role === "admin" && (
                  <button
                    onClick={() => removeAdmin(u._id)}
                    className="bg-orange-600 text-white px-3 py-1 text-xs rounded"
                  >
                    Remove
                  </button>
                )}

                {u.role === "developer" && (
                  <button
                    onClick={() => removeAdmin(u._id)}
                    className="bg-orange-600 text-white px-3 py-1 text-xs rounded"
                  >
                    Remove
                  </button>
                )}

              </div>
            </div>
          ))
        )}

      </div>
    </div>
  );
}

/* reuse */
function Stat({ title, value }: any) {
  return (
    <div className="bg-white p-3 sm:p-4 md:p-4 rounded-lg sm:rounded-lg md:rounded-xl shadow">
      <p className="text-xs sm:text-sm text-gray-500">{title}</p>
      <h2 className="text-xl sm:text-2xl md:text-2xl font-bold">{value}</h2>
    </div>
  );
}