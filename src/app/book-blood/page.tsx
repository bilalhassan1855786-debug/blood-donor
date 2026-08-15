"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useLanguage } from "@/context/LanguageContext";
import { commonTranslations } from "@/lib/translations/common";
import { bookBloodTranslations } from "@/lib/translations/book-blood";
import { safeFetch, isOfflineError } from "@/lib/safeFetch";

const BookBloodMap = dynamic(() => import("@/components/BookBloodMap"), {
  ssr: false,
});

export default function BookBloodPage() {
  const { lang } = useLanguage();

  const t = {
    ...commonTranslations[lang],
    ...bookBloodTranslations[lang],
  };

  // "loading" = checking login, "guest" = not logged in, "ready" = show form
  const [authState, setAuthState] = useState<"loading" | "guest" | "ready">("loading");

  const [form, setForm] = useState({
    requesterName: "",
    patientName: "",
    patientage: "",
    gender: "",
    disease: "",
    bloodGroup: "",
    bloodUnits: "",
    patientHb: "",
    hospital: "",
    location: "",
    city: "",
    latitude: "",
    longitude: "",
    contactNumber: "",
    dateNeeded: "",
    urgency: "Normal",
    notes: "",
    canProvideTransport: "",
  });

  const [submitError, setSubmitError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    safeFetch("/api/profile")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setAuthState("ready");
          // Pre-fill requester name / contact from the account — still editable.
          setForm((prev) => ({
            ...prev,
            requesterName: data.user.fullName || "",
            contactNumber:
              data.user.localNumber || data.user.whatsappNumber || "",
            city: data.user.city || "",
          }));
        } else {
          setAuthState("guest");
        }
      })
      .catch(() => setAuthState("guest"));
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert(t.location_not_supported);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setForm((prev) => ({
          ...prev,
          latitude: position.coords.latitude.toString(),
          longitude: position.coords.longitude.toString(),
        }));
      },
      () => {
        alert(t.location_unavailable);
      }
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");
    setSubmitting(true);

    try {
      const res = await safeFetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.status === 401) {
        setAuthState("guest");
        setSubmitting(false);
        return;
      }

      if (data.success) {
        alert(t.blood_request_success);

        setForm((prev) => ({
          ...prev,
          patientName: "",
          patientage: "",
          gender: "",
          disease: "",
          bloodGroup: "",
          bloodUnits: "",
          patientHb: "",
          hospital: "",
          location: "",
          latitude: "",
          longitude: "",
          dateNeeded: "",
          urgency: "Normal",
          notes: "",
          canProvideTransport: "",
        }));
      } else {
        setSubmitError(data.message || t.error_generic || "Something went wrong.");
      }
    } catch (err) {
      if (isOfflineError(err)) {
        setSubmitError("📡 You're offline. Please reconnect and submit your request again.");
      } else {
        setSubmitError(t.error_generic || "Something went wrong. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (authState === "loading") {
    return (
      <div className="min-h-screen bg-[#FBF7F1] flex items-center justify-center">
        <p className="text-[#5B5964]">{t.loading}</p>
      </div>
    );
  }

  if (authState === "guest") {
    return (
      <div className="min-h-screen bg-[#FBF7F1] flex items-center justify-center px-3 sm:px-4">
        <div className="w-full max-w-md bg-white rounded-lg sm:rounded-2xl md:rounded-3xl shadow-xl p-3 sm:p-6 md:p-8 lg:p-10 text-center">
          <div className="text-6xl mb-6">🔒</div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#15141A] mb-3">
            Please Login First
          </h1>
          <p className="text-[#5B5964] leading-7 mb-8">
            To keep our donor and patient data safe and stop fake requests, you
            need to be logged in to submit a blood request. It only takes a
            minute.
          </p>

          <div className="flex flex-col gap-2 sm:gap-3 md:gap-4">
            <Link
              href="/login?redirect=/book-blood"
              className="bg-[#C81E3A] hover:bg-[#A11530] text-white py-2 sm:py-3 md:py-4 rounded-xl font-semibold transition"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="border border-black/10 text-[#15141A] py-3 rounded-xl font-semibold hover:bg-black/5 transition"
            >
              Create Account
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FBF7F1] py-4 sm:py-8 md:py-10 px-3 sm:px-4">
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-lg sm:rounded-xl md:rounded-2xl p-3 sm:p-6 md:p-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-[#C81E3A] mb-4 sm:mb-6 md:mb-8">
          {t.blood_request_form}
        </h1>

        {submitError && (
          <div className="bg-[#C81E3A12] border border-[#C81E3A40] rounded-xl p-4 mb-6 text-sm text-[#C81E3A]">
            {submitError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-2 sm:space-y-3 md:space-y-5">
          {/* Requester */}
          <div>
            <label htmlFor="requesterName" className="font-semibold block mb-1 sm:mb-2 text-xs sm:text-sm">
              {t.your_name}
            </label>
            <input
              id="requesterName"
              name="requesterName"
              value={form.requesterName}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
              placeholder={t.your_name}
              required
            />
          </div>

          {/* Patient */}
          <div>
            <label htmlFor="patientName" className="font-semibold block mb-1 sm:mb-2 text-xs sm:text-sm">
              {t.patient_name}
            </label>
            <input
              id="patientName"
              name="patientName"
              value={form.patientName}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
              placeholder={t.patient_name}
              required
            />
          </div>

          {/* Gender */}
          <div>
            <label htmlFor="gender" className="font-semibold block mb-1 sm:mb-2 text-xs sm:text-sm">
              {t.select_gender}
            </label>
            <select
              id="gender"
              name="gender"
              value={form.gender}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
              title={t.select_gender}
              required
            >
              <option value="">{t.select_gender}</option>
              <option value="Male">{t.male}</option>
              <option value="Female">{t.female}</option>
              <option value="Child">{t.child}</option>
            </select>
          </div>

          {/* Age */}
          <div>
            <label className="font-semibold block mb-1 sm:mb-2 text-xs sm:text-sm">{t.patient_age}</label>
            <input
              name="patientage"
              value={form.patientage}
              onChange={handleChange}
              type="number"
              placeholder={t.patient_age}
              className="w-full border rounded-lg p-3"
              required
            />
          </div>

          {/* Disease */}
          <div>
            <label className="font-semibold block mb-1 sm:mb-2 text-xs sm:text-sm">{t.disease_reason}</label>
            <input
              name="disease"
              value={form.disease}
              onChange={handleChange}
              placeholder={t.disease_reason}
              className="w-full border rounded-lg p-3"
              required
            />
          </div>

          {/* Blood Group */}
          <div>
            <label htmlFor="bloodGroup" className="font-semibold block mb-1 sm:mb-2 text-xs sm:text-sm">
              {t.select_blood_group}
            </label>
            <select
              id="bloodGroup"
              name="bloodGroup"
              aria-label={t.select_blood_group}
              value={form.bloodGroup}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
              required
            >
              <option value="">{t.select_blood_group}</option>
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

          {/* Units */}
          <div>
            <label htmlFor="bloodUnits" className="font-semibold block mb-1 sm:mb-2 text-xs sm:text-sm">
              {t.blood_units}
            </label>
            <input
              id="bloodUnits"
              type="number"
              name="bloodUnits"
              value={form.bloodUnits}
              onChange={handleChange}
              placeholder={t.blood_units}
              className="w-full border rounded-lg p-3"
              required
            />
          </div>

          {/* HB */}
          <div>
            <label htmlFor="patientHb" className="font-semibold block mb-1 sm:mb-2 text-xs sm:text-sm">
              {t.patient_hb}
            </label>
            <input
              id="patientHb"
              name="patientHb"
              value={form.patientHb}
              onChange={handleChange}
              placeholder="e.g. 12.5"
              className="w-full border rounded-lg p-3"
            />
          </div>

          {/* Hospital */}
          <div>
            <label htmlFor="hospital" className="font-semibold block mb-1 sm:mb-2 text-xs sm:text-sm">
              {t.hospital_name}
            </label>
            <input
              id="hospital"
              name="hospital"
              value={form.hospital}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
              placeholder={t.hospital_name}
              required
            />
          </div>

          {/* Address */}
          <div>
            <label htmlFor="location" className="font-semibold block mb-1 sm:mb-2 text-xs sm:text-sm">
              {t.hospital_location}
            </label>
            <input
              id="location"
              name="location"
              value={form.location}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
              placeholder={t.hospital_location}
              required
            />
          </div>

          {/* City */}
          <div>
            <label htmlFor="city" className="font-semibold block mb-1 sm:mb-2 text-xs sm:text-sm">
              {t.city}
            </label>
            <input
              id="city"
              name="city"
              value={form.city}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
              placeholder={t.city}
              required
            />
          </div>

          {/* GPS */}
          <button
            type="button"
            onClick={getCurrentLocation}
            className="bg-[#0F6E66] text-white px-4 py-2 rounded-lg"
          >
            {t.use_current_location}
          </button>

          <div className="grid grid-cols-2 gap-1 sm:gap-2 md:gap-3">
            <input
              value={form.latitude}
              readOnly
              placeholder={t.latitude}
              aria-label={t.latitude}
              title={t.latitude}
              className="border rounded-lg p-3"
            />
            <input
              value={form.longitude}
              readOnly
              placeholder={t.longitude}
              aria-label={t.longitude}
              title={t.longitude}
              className="border rounded-lg p-3"
            />
          </div>

          <BookBloodMap
            latitude={form.latitude}
            longitude={form.longitude}
            setForm={setForm as any}
          />

          {/* Contact */}
          <div>
            <label htmlFor="contactNumber" className="font-semibold block mb-1 sm:mb-2 text-xs sm:text-sm">
              {t.contact_number}
            </label>
            <input
              id="contactNumber"
              type="tel"
              name="contactNumber"
              placeholder={t.contact_number}
              title={t.contact_number}
              aria-label={t.contact_number}
              value={form.contactNumber}
              onChange={(e) =>
                setForm({
                  ...form,
                  contactNumber: e.target.value.replace(/\D/g, "").slice(0, 11),
                })
              }
              className="w-full border rounded-lg p-3"
              required
            />
          </div>

          {/* Date */}
          <div>
            <label htmlFor="dateNeeded" className="font-semibold block mb-1 sm:mb-2 text-xs sm:text-sm">
              {t.date_needed}
            </label>
            <input
              id="dateNeeded"
              type="date"
              name="dateNeeded"
              title={t.date_needed}
              value={form.dateNeeded}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
              required
            />
          </div>

          {/* Urgency */}
          <div>
            <label htmlFor="urgency" className="font-semibold block mb-1 sm:mb-2 text-xs sm:text-sm">
              {t.urgency}
            </label>
            <select
              id="urgency"
              name="urgency"
              title={t.urgency}
              aria-label={t.urgency}
              value={form.urgency}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            >
              <option value="Normal">{t.normal}</option>
              <option value="Urgent">{t.urgent}</option>
              <option value="Critical">{t.critical}</option>
            </select>
          </div>

          {/* Notes */}
          <textarea
            name="notes"
            value={form.notes}
            onChange={handleChange}
            placeholder={t.additional_notes}
            className="w-full border rounded-lg p-3 h-28"
          />

          {/* Transport */}
          <select
            value={form.canProvideTransport}
            aria-label={t.transport_support}
            onChange={(e) =>
              setForm({ ...form, canProvideTransport: e.target.value })
            }
            className="w-full border rounded-lg p-3"
          >
            <option value="">{t.transport_support}</option>
            <option value="yes">{t.transport_yes}</option>
            <option value="partial">{t.transport_partial}</option>
            <option value="no">{t.transport_no}</option>
          </select>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-[#C81E3A] hover:bg-[#A11530] disabled:opacity-60 text-white py-2 sm:py-3 md:py-4 rounded-lg font-bold transition"
          >
            {submitting ? "..." : t.submit_request}
          </button>
        </form>
      </div>
    </div>
  );
}