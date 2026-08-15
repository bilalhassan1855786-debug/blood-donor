"use client";

import { useState, type FormEvent } from "react";
import { safeFetch, isOfflineError } from "@/lib/safeFetch";

type DonorForm = {
  fullName: string;
  fatherName: string;
  bloodGroup: string;
  whatsappNumber: string;
  localNumber: string;
  email: string;
  cnic: string;
  city: string;
  presentAddress: string;
  permanentAddress: string;
  age: string;
  availabilityStatus: "available" | "busy" | "out_of_city" | "unavailable";
  transportSupport: "yes" | "partial" | "no";
  bio: string;
  lastDonationDate: string;
};

export default function AddDonorPage() {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState<DonorForm>({
    fullName: "",
    fatherName: "",
    bloodGroup: "",
    whatsappNumber: "",
    localNumber: "",
    email: "",
    cnic: "",
    city: "",
    presentAddress: "",
    permanentAddress: "",
    age: "",
    availabilityStatus: "available",
    transportSupport: "no",
    bio: "",
    lastDonationDate: "",
  });

  const change = <K extends keyof DonorForm>(
    key: K,
    value: DonorForm[K]
  ) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const submit = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await safeFetch(
        "/api/admin/add-donor",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            ...form,
            age: form.age
              ? Number(form.age)
              : null,
          }),
        }
      );

      const data =
        await res.json();

      if (data.success) {
        alert(
          "Donor added successfully"
        );

        setForm({
          fullName: "",
          fatherName: "",
          bloodGroup: "",
          whatsappNumber: "",
          localNumber: "",
          email: "",
          cnic: "",
          city: "",
          presentAddress: "",
          permanentAddress: "",
          age: "",
          availabilityStatus:
            "available",
          transportSupport:
            "no",
          bio: "",
          lastDonationDate:
            "",
        });
      } else {
        alert(
          data.message
        );
      }
    } catch (err) {
      if (isOfflineError(err)) {
        alert(
          "You're offline. Please check your connection and try again."
        );
      } else {
        alert(
          "Something went wrong"
        );
      }
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-3 sm:p-4 md:p-6">

      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-lg sm:rounded-lg md:rounded-2xl p-4 sm:p-6 md:p-8">

        <h1 className="text-2xl sm:text-2xl md:text-3xl font-bold text-red-600 mb-4 sm:mb-6 md:mb-8">
          Add Donor
        </h1>

        <form
          onSubmit={submit}
          className="grid md:grid-cols-2 gap-3 sm:gap-4 md:gap-5"
        >

          <div>
            <label htmlFor="fullName" className="font-medium text-sm">
              Full Name
            </label>

            <input
              id="fullName"
              value={form.fullName}
              onChange={(e) =>
                change(
                  "fullName",
                  e.target.value
                )
              }
              className="border p-2 sm:p-3 rounded-lg w-full text-sm"
              required
            />
          </div>

          <div>
            <label htmlFor="fatherName" className="font-medium text-sm">
              Father Name
            </label>

            <input
              id="fatherName"
              value={
                form.fatherName
              }
              onChange={(e) =>
                change(
                  "fatherName",
                  e.target.value
                )
              }
              className="border p-2 sm:p-3 rounded-lg w-full text-sm"
              required
            />
          </div>

          <div>
            <label htmlFor="cnic" className="font-medium text-sm">
              CNIC
            </label>

            <input
              id="cnic"
              value={form.cnic}
              onChange={(e) =>
                change(
                  "cnic",
                  e.target.value
                )
              }
              className="border p-2 sm:p-3 rounded-lg w-full text-sm"
            />
          </div>

          <div>
            <label htmlFor="age" className="font-medium text-sm">
              Age
            </label>

            <input
              id="age"
              type="number"
              value={form.age}
              onChange={(e) =>
                change(
                  "age",
                  e.target.value
                )
              }
              className="border p-2 sm:p-3 rounded-lg w-full text-sm"
            />
          </div>

          <div>
            <label htmlFor="bloodGroup" className="font-medium text-sm">
              Blood Group
            </label>

            <select
              id="bloodGroup"
              value={
                form.bloodGroup
              }
              onChange={(e) =>
                change(
                  "bloodGroup",
                  e.target.value
                )
              }
              className="border p-2 sm:p-3 rounded-lg w-full text-sm"
              required
            >
              <option value="">
                Select
              </option>

              <option>A+</option>
              <option>A-</option>
              <option>B+</option>
              <option>B-</option>
              <option>AB+</option>
              <option>AB-</option>
              <option>O+</option>
              <option>O-</option>
            </select>
          </div>

          <div>
            <label htmlFor="city" className="font-medium text-sm">
              City
            </label>

            <input
              id="city"
              value={form.city}
              onChange={(e) =>
                change(
                  "city",
                  e.target.value
                )
              }
              className="border p-2 sm:p-3 rounded-lg w-full text-sm"
              required
            />
          </div>

          <div>
            <label htmlFor="whatsappNumber" className="font-medium text-sm">
              WhatsApp
            </label>

            <input
              id="whatsappNumber"
              value={
                form.whatsappNumber
              }
              onChange={(e) =>
                change(
                  "whatsappNumber",
                  e.target.value
                )
              }
              className="border p-2 sm:p-3 rounded-lg w-full text-sm"
              required
            />
          </div>

          <div>
            <label htmlFor="localNumber" className="font-medium text-sm">
              Local Number
            </label>

            <input
              id="localNumber"
              value={
                form.localNumber
              }
              onChange={(e) =>
                change(
                  "localNumber",
                  e.target.value
                )
              }
              className="border p-2 sm:p-3 rounded-lg w-full text-sm"
            />
          </div>

          <div>
            <label htmlFor="email" className="font-medium text-sm">
              Email
            </label>

            <input
              id="email"
              type="email"
              value={
                form.email
              }
              onChange={(e) =>
                change(
                  "email",
                  e.target.value
                )
              }
              className="border p-2 sm:p-3 rounded-lg w-full text-sm"
            />
          </div>

          <div>
            <label htmlFor="lastDonationDate" className="font-medium text-sm">
              Last Donation Date
            </label>

            <input
              id="lastDonationDate"
              type="date"
              value={
                form.lastDonationDate
              }
              onChange={(e) =>
                change(
                  "lastDonationDate",
                  e.target.value
                )
              }
              className="border p-2 sm:p-3 rounded-lg w-full text-sm"
            />
          </div>

          <div>
            <label htmlFor="availabilityStatus" className="font-medium text-sm">
              Availability
            </label>

            <select
              id="availabilityStatus"
              value={
                form.availabilityStatus
              }
              onChange={(e) =>
                change(
                  "availabilityStatus",
                  e.target.value as DonorForm["availabilityStatus"]
                )
              }
              className="border p-2 sm:p-3 rounded-lg w-full text-sm"
            >
              <option value="available">
                Available
              </option>

              <option value="busy">
                Busy
              </option>

              <option value="out_of_city">
                Out Of City
              </option>

              <option value="unavailable">
                Unavailable
              </option>
            </select>
          </div>

          <div>
            <label htmlFor="transportSupport" className="font-medium text-sm">
              Transport Support
            </label>

            <select
              id="transportSupport"
              value={
                form.transportSupport
              }
              onChange={(e) =>
                change(
                  "transportSupport",
                  e.target.value as DonorForm["transportSupport"]
                )
              }
              className="border p-2 sm:p-3 rounded-lg w-full text-sm"
            >
              <option value="yes">
                Yes
              </option>

              <option value="partial">
                Partial
              </option>

              <option value="no">
                No
              </option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label htmlFor="presentAddress" className="font-medium text-sm">
              Present Address
            </label>

            <textarea
              id="presentAddress"
              value={
                form.presentAddress
              }
              onChange={(e) =>
                change(
                  "presentAddress",
                  e.target.value
                )
              }
              className="border p-2 sm:p-3 rounded-lg w-full text-sm"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label htmlFor="permanentAddress" className="font-medium text-sm">
              Permanent Address
            </label>

            <textarea
              id="permanentAddress"
              value={
                form.permanentAddress
              }
              onChange={(e) =>
                change(
                  "permanentAddress",
                  e.target.value
                )
              }
              className="border p-2 sm:p-3 rounded-lg w-full text-sm"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label htmlFor="bio" className="font-medium text-sm">
              Bio
            </label>

            <textarea
              id="bio"
              value={form.bio}
              onChange={(e) =>
                change(
                  "bio",
                  e.target.value
                )
              }
              className="border p-2 sm:p-3 rounded-lg w-full text-sm"
              rows={4}
            />
          </div>

          <button
            disabled={loading}
            className="md:col-span-2 bg-red-600 hover:bg-red-700 text-white py-2 sm:py-3 md:py-4 rounded-lg md:rounded-xl font-bold text-sm sm:text-base"
          >
            {loading
              ? "Adding..."
              : "Add Donor"}  
          </button>

        </form>

      </div>

    </div>
  );
}