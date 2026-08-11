"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useParams } from "next/navigation";
import { safeFetch, isOfflineError } from "@/lib/safeFetch";

export default function EditDonorPage() {
  const { id } = useParams();
  const [resetting, setResetting] = useState(false);

  const [form, setForm] = useState<any>({
    fullName: "",
    fatherName: "",
    email: "",
    bloodGroup: "",
    whatsappNumber: "",
    localNumber: "",
    cnic: "",
    age: "",

    city: "",
    presentAddress: "",
    permanentAddress: "",
    availabilityStatus: "available",
    transportSupport: "no",
    bio: "",
    totalDonations: 0,
    status: "pending",
    rejectionReason: "",
    lastDonationDate: "",
  });

  useEffect(() => {
    const loadDonor = async () => {
      try {
        const res = await safeFetch(`/api/admin/donor/${id}`);
        const data = await res.json();

        if (data?.donor) {
          setForm({
            ...data.donor,
            lastDonationDate: data.donor.lastDonationDate
              ? data.donor.lastDonationDate.split("T")[0]
              : "",
          });
        }
      } catch (error) {
        console.error(error);
        if (isOfflineError(error)) {
          alert("You're offline. Please check your connection and reload this page.");
        }
      }
    };

    if (id) loadDonor();
  }, [id]);

  const handleChange = (key: string, value: any) => {
    setForm((prev: any) => ({ ...prev, [key]: value }));
  };

  const updateDonor = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await safeFetch(`/api/admin/update-donor/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {
        alert("Donor updated successfully");
      } else {
        alert(data.message || "Update failed");
      }
    } catch (error) {
      console.error(error);
      if (isOfflineError(error)) {
        alert("You're offline. Please check your connection and try again.");
      } else {
        alert("Something went wrong");
      }
    }
  };

  const resetPassword = async () => {
    if (!form.userId) return;

    if (
      !confirm(
        "Reset this donor's login password to 123456? They'll be required to change it on next login."
      )
    ) {
      return;
    }

    setResetting(true);
    try {
      const res = await safeFetch("/api/admin/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: form.userId }),
      });
      const data = await res.json();
      alert(data.message || (data.success ? "Password reset" : "Reset failed"));
    } catch (error) {
      console.error(error);
      if (isOfflineError(error)) {
        alert("You're offline. Please check your connection and try again.");
      } else {
        alert("Something went wrong");
      }
    } finally {
      setResetting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-6">
        <h1 className="text-3xl font-bold text-red-600 mb-6">Edit Donor</h1>

        <form onSubmit={updateDonor} className="grid md:grid-cols-2 gap-5">
          {/* Basic */}
          <Field label="Full Name" htmlFor="fullName">
            <input
              id="fullName"
              value={form.fullName || ""}
              onChange={(e) => handleChange("fullName", e.target.value)}
              placeholder="Full Name"
              className="border p-3 rounded-lg w-full"
            />
          </Field>

          <Field label="Father Name" htmlFor="fatherName">
            <input
              id="fatherName"
              value={form.fatherName || ""}
              onChange={(e) => handleChange("fatherName", e.target.value)}
              placeholder="Father Name"
              className="border p-3 rounded-lg w-full"
            />
          </Field>

          <Field label="Email" htmlFor="email">
            <input
              id="email"
              value={form.email || ""}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="Email"
              className="border p-3 rounded-lg w-full"
            />
          </Field>

          <Field label="CNIC" htmlFor="cnic">
            <input
              id="cnic"
              value={form.cnic || ""}
              onChange={(e) => handleChange("cnic", e.target.value)}
              placeholder="CNIC"
              className="border p-3 rounded-lg w-full"
            />
          </Field>

          <Field label="Age" htmlFor="age">
            <input
              id="age"
              type="number"
              value={form.age || ""}
              onChange={(e) => handleChange("age", e.target.value)}
              placeholder="Age"
              className="border p-3 rounded-lg w-full"
            />
          </Field>

          {/* Blood */}
          <Field label="Blood Group" htmlFor="bloodGroup">
            <select
              id="bloodGroup"
              value={form.bloodGroup}
              onChange={(e) => handleChange("bloodGroup", e.target.value)}
              className="border p-3 rounded-lg w-full"
            >
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

          <Field label="Last Donation Date" htmlFor="lastDonationDate">
            <input
              id="lastDonationDate"
              type="date"
              value={form.lastDonationDate || ""}
              onChange={(e) => handleChange("lastDonationDate", e.target.value)}
              className="border p-3 rounded-lg w-full"
            />
          </Field>

          {/* Contact */}
          <Field label="WhatsApp Number" htmlFor="whatsappNumber">
            <input
              id="whatsappNumber"
              value={form.whatsappNumber || ""}
              onChange={(e) => handleChange("whatsappNumber", e.target.value)}
              placeholder="WhatsApp"
              className="border p-3 rounded-lg w-full"
            />
          </Field>

          <Field label="Local Number" htmlFor="localNumber">
            <input
              id="localNumber"
              value={form.localNumber || ""}
              onChange={(e) => handleChange("localNumber", e.target.value)}
              placeholder="Local Number"
              className="border p-3 rounded-lg w-full"
            />
          </Field>

          {/* Address */}
          <Field label="City" htmlFor="city">
            <input
              id="city"
              value={form.city || ""}
              onChange={(e) => handleChange("city", e.target.value)}
              placeholder="City"
              className="border p-3 rounded-lg w-full"
            />
          </Field>

          <Field label="Availability Status" htmlFor="availabilityStatus">
            <select
              id="availabilityStatus"
              value={form.availabilityStatus}
              onChange={(e) => handleChange("availabilityStatus", e.target.value)}
              className="border p-3 rounded-lg w-full"
            >
              <option value="available">Available</option>
              <option value="busy">Busy</option>
              <option value="out_of_city">Out Of City</option>
              <option value="unavailable">Unavailable</option>
            </select>
          </Field>

          <div className="md:col-span-2">
            <Field label="Present Address" htmlFor="presentAddress">
              <textarea
                id="presentAddress"
                value={form.presentAddress || ""}
                onChange={(e) => handleChange("presentAddress", e.target.value)}
                placeholder="Present Address"
                className="border p-3 rounded-lg w-full"
              />
            </Field>
          </div>

          <div className="md:col-span-2">
            <Field label="Permanent Address" htmlFor="permanentAddress">
              <textarea
                id="permanentAddress"
                value={form.permanentAddress || ""}
                onChange={(e) => handleChange("permanentAddress", e.target.value)}
                placeholder="Permanent Address"
                className="border p-3 rounded-lg w-full"
              />
            </Field>
          </div>

          {/* Extra */}
          <Field label="Transport Support" htmlFor="transportSupport">
            <select
              id="transportSupport"
              value={form.transportSupport}
              onChange={(e) => handleChange("transportSupport", e.target.value)}
              className="border p-3 rounded-lg w-full"
            >
              <option value="yes">Yes</option>
              <option value="partial">Partial</option>
              <option value="no">No</option>
            </select>
          </Field>

          <Field label="Total Donations" htmlFor="totalDonations">
            <input
              id="totalDonations"
              type="number"
              value={form.totalDonations || 0}
              onChange={(e) => handleChange("totalDonations", e.target.value)}
              placeholder="Total Donations"
              className="border p-3 rounded-lg w-full"
            />
          </Field>

          <Field label="Status" htmlFor="status">
            <select
              id="status"
              value={form.status}
              onChange={(e) => handleChange("status", e.target.value)}
              className="border p-3 rounded-lg w-full"
            >
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </Field>

          <Field label="Rejection Reason" htmlFor="rejectionReason">
            <textarea
              id="rejectionReason"
              value={form.rejectionReason || ""}
              onChange={(e) => handleChange("rejectionReason", e.target.value)}
              placeholder="Rejection Reason"
              className="border p-3 rounded-lg w-full"
            />
          </Field>

          <div className="md:col-span-2">
            <Field label="Bio" htmlFor="bio">
              <textarea
                id="bio"
                value={form.bio || ""}
                onChange={(e) => handleChange("bio", e.target.value)}
                placeholder="Bio"
                className="border p-3 rounded-lg w-full"
              />
            </Field>
          </div>

          <button
            type="submit"
            className="md:col-span-2 bg-red-600 hover:bg-red-700 text-white py-4 rounded-xl font-semibold"
          >
            Update Donor
          </button>

          {form.userId ? (
            <button
              type="button"
              onClick={resetPassword}
              disabled={resetting}
              className="md:col-span-2 border border-[#B45309] text-[#B45309] hover:bg-[#B45309]/10 disabled:opacity-50 py-4 rounded-xl font-semibold transition"
            >
              {resetting ? "Resetting..." : "🔑 Reset Password to Default (123456)"}
            </button>
          ) : (
            <p className="md:col-span-2 text-center text-sm text-gray-400">
              This donor has no linked login account — nothing to reset.
            </p>
          )}
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
      <label htmlFor={htmlFor} className="block mb-1.5 text-sm font-semibold text-gray-700">
        {label}
      </label>
      {children}
    </div>
  );
}