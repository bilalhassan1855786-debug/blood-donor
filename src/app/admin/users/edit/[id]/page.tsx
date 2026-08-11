"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { safeFetch, isOfflineError } from "@/lib/safeFetch";
import OfflineCard from "@/components/network/OfflineCard";

export default function EditUserPage() {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [resetting, setResetting] = useState(false);
  const [offline, setOffline] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    whatsappNumber: "",
    age: "",
    weight: "",
    city: "",
    presentAddress: "",
    cnic: "",
    bloodGroup: "",
    role: "user",
  });

  useEffect(() => {
    if (!id) return;
    loadUser();
  }, [id]);

  const loadUser = async () => {
    setLoading(true);
    setOffline(false);

    try {
      const res = await safeFetch(`/api/admin/users/${id}`);

      if (!res.ok) {
        throw new Error("User not found");
      }

      const data = await res.json();

      setForm({
        fullName: data.user?.fullName || "",
        email: data.user?.email || "",
        whatsappNumber: data.user?.whatsappNumber || "",
        age: data.user?.age || "",
        weight: data.user?.weight || "",
        city: data.user?.city || "",
        presentAddress: data.user?.presentAddress || "",
        cnic: data.user?.cnic || "",
        bloodGroup: data.user?.bloodGroup || "",
        role: data.user?.role || "user",
      });
    } catch (error) {
      if (isOfflineError(error)) {
        setOffline(true);
      } else {
        console.error(error);
        alert("Failed to load user");
      }
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await safeFetch(`/api/admin/update-user/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {
        alert("User updated successfully");
      } else {
        alert(data.message || "Update failed");
      }
    } catch (error) {
      if (isOfflineError(error)) {
        alert("You're offline. Please reconnect and try updating again.");
      } else {
        console.error(error);
        alert("Something went wrong");
      }
    }
  };

  const resetPassword = async () => {
    if (
      !confirm(
        "Reset this user's password to 123456? They'll be required to change it on next login."
      )
    ) {
      return;
    }

    setResetting(true);
    try {
      const res = await safeFetch("/api/admin/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: id }),
      });
      const data = await res.json();
      alert(data.message || (data.success ? "Password reset" : "Reset failed"));
    } catch (error) {
      if (isOfflineError(error)) {
        alert("You're offline. Please reconnect and try again.");
      } else {
        console.error(error);
        alert("Something went wrong");
      }
    } finally {
      setResetting(false);
    }
  };

  if (offline) {
    return (
      <div className="p-8">
        <OfflineCard
          title="Internet Required"
          description="This user's details couldn't be loaded. Reconnect and try again."
          onRetry={loadUser}
        />
      </div>
    );
  }

  if (loading) {
    return <div className="p-8 text-[#5B5964]">Loading...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-sm border border-black/5 p-6">
        <h1 className="text-3xl font-bold mb-6 text-[#15141A]">Edit User</h1>

        <form onSubmit={updateUser} className="grid md:grid-cols-2 gap-4">
          <Field label="Full Name" htmlFor="fullName">
            <input
              id="fullName"
              value={form.fullName}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              className="w-full border rounded-xl p-3"
              placeholder="Full Name"
            />
          </Field>

          <Field label="Email" htmlFor="email">
            <input
              id="email"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full border rounded-xl p-3"
              placeholder="Email"
            />
          </Field>

          <Field label="WhatsApp Number" htmlFor="whatsappNumber">
            <input
              id="whatsappNumber"
              value={form.whatsappNumber}
              onChange={(e) => setForm({ ...form, whatsappNumber: e.target.value })}
              className="w-full border rounded-xl p-3"
              placeholder="WhatsApp Number"
            />
          </Field>

          <Field label="Age" htmlFor="age">
            <input
              id="age"
              type="number"
              value={form.age}
              onChange={(e) => setForm({ ...form, age: e.target.value })}
              className="w-full border rounded-xl p-3"
              placeholder="Age"
            />
          </Field>

          <Field label="Weight (kg)" htmlFor="weight">
            <input
              id="weight"
              type="number"
              value={form.weight}
              onChange={(e) => setForm({ ...form, weight: e.target.value })}
              className="w-full border rounded-xl p-3"
              placeholder="Weight"
            />
          </Field>

          <Field label="City" htmlFor="city">
            <input
              id="city"
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
              className="w-full border rounded-xl p-3"
              placeholder="City"
            />
          </Field>

          <Field label="CNIC" htmlFor="cnic">
            <input
              id="cnic"
              value={form.cnic}
              onChange={(e) => setForm({ ...form, cnic: e.target.value })}
              className="w-full border rounded-xl p-3"
              placeholder="CNIC"
            />
          </Field>

          <Field label="Blood Group" htmlFor="bloodGroup">
            <select
              id="bloodGroup"
              value={form.bloodGroup}
              onChange={(e) => setForm({ ...form, bloodGroup: e.target.value })}
              className="w-full border rounded-xl p-3"
            >
              <option value="">Select</option>
              <option>A+</option>
              <option>A-</option>
              <option>B+</option>
              <option>B-</option>
              <option>AB+</option>
              <option>AB-</option>
              <option>O+</option>
              <option>O-</option>
            </select>
          </Field>

          <Field label="Role" htmlFor="role">
            <select
              id="role"
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              className="w-full border rounded-xl p-3"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
              <option value="superadmin">Super Admin</option>
              <option value="developer">Developer</option>
            </select>
          </Field>

          <div className="md:col-span-2">
            <Field label="Address" htmlFor="presentAddress">
              <textarea
                id="presentAddress"
                value={form.presentAddress}
                onChange={(e) => setForm({ ...form, presentAddress: e.target.value })}
                className="w-full border rounded-xl p-3"
                rows={4}
                placeholder="Address"
              />
            </Field>
          </div>

          <button className="bg-[#C81E3A] hover:bg-[#A11530] text-white p-3 rounded-xl md:col-span-2 font-semibold transition">
            Update User
          </button>

          <button
            type="button"
            onClick={resetPassword}
            disabled={resetting}
            className="border border-[#B45309] text-[#B45309] hover:bg-[#B45309]/10 disabled:opacity-50 p-3 rounded-xl md:col-span-2 font-semibold transition"
          >
            {resetting ? "Resetting..." : "🔑 Reset Password to Default (123456)"}
          </button>
        </form>
      </div>
    </div>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="block mb-1.5 text-sm font-semibold text-[#15141A]">
        {label}
      </label>
      {children}
    </div>
  );
}