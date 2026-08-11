"use client";

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import imageCompression from "browser-image-compression";
import { useLanguage } from "@/context/LanguageContext";
import { t } from "@/lib/translations-backup";
import { safeFetch, isOfflineError } from "@/lib/safeFetch";
import OfflineCard from "@/components/network/OfflineCard";
import {
  FaCamera,
  FaSave,
  FaArrowLeft,
  FaUserShield,
} from "react-icons/fa";
import Link from "next/link";

export default function EditProfilePage() {
  const router = useRouter();
  const { lang } = useLanguage();
  const defaultAvatar = "/images/default-avatar.png";

  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [offline, setOffline] = useState(false);

  
  const [form, setForm] = useState({
    fullName: "",
    fatherName: "",
    gender: "",
    age: "",
    weight: "",
    whatsappNumber: "",
    localNumber: "",
    bloodGroup: "",
    city: "",
    presentAddress: "",
    permanentAddress: "",
    cnic: "",
    lastDonationDate: "",
    availabilityStatus: "available",
    totalDonations: 0,
   photo: "",
photoPublicId: "",
  });

  const loadProfile = () => {
    setLoading(true);
    safeFetch("/api/profile")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setForm({
            fullName: data.user.fullName || "",
            fatherName: data.user.fatherName || "",
            gender: data.user.gender || "",
            age: data.user.age || "",
            weight: data.user.weight || "",
            whatsappNumber:
              data.user.whatsappNumber || "",
            localNumber:
              data.user.localNumber || "",
            bloodGroup:
              data.user.bloodGroup || "",
            city:
              data.user.city || "",
            presentAddress:
              data.user.presentAddress || "",
            permanentAddress:
              data.user.permanentAddress || "",
            cnic:
              data.user.cnic || "",
            lastDonationDate:
              data.user.lastDonationDate
                ? data.user.lastDonationDate
                    .split("T")[0]
                : "",
            availabilityStatus:
              data.user.availabilityStatus ||
              "available",
            totalDonations:
              data.user.totalDonations || 0,
            photo:
              data.user.photo || "",
            photoPublicId:
              data.user.photoPublicId || "",
          });
        }

        setOffline(false);
        setLoading(false);
      })
      .catch((err) => {
        setOffline(isOfflineError(err));
        setLoading(false);
      });
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement |
      HTMLSelectElement
    >
  ) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "number"
          ? Number(e.target.value)
          : e.target.value,
    });
  };

  const uploadPhoto = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
      const file = e.target.files?.[0];

      if (!file) return;

      setUploading(true);

      const reader = new FileReader();

      reader.onloadend = async () => {
        try {
          const res = await safeFetch(
            "/api/upload",
            {
              method: "POST",
              headers: {
                "Content-Type":
                  "application/json",
              },
              body: JSON.stringify({
                image: reader.result,
              }),
            }
          );

          const data = await res.json();

          if (data.success) {
            setForm((prev) => ({
              ...prev,
              photo: data.url,
            }));
          }
        } catch (err) {
          if (isOfflineError(err)) {
            alert("You're offline. Please check your connection and try again.");
          }
        } finally {
          setUploading(false);
        }
      };

      reader.readAsDataURL(file);
    } catch {
      setUploading(false);
    }
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      const res = await safeFetch(
        "/api/profile",
        {
          method: "PUT",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      const data = await res.json();

      if (data.success) {
        alert(
          t(
            lang,
            "profile_updated"
          )
        );

        router.push("/profile");
      } else {
        alert(
          data.message ||
            t(
              lang,
              "update_failed"
            )
        );
      }
    } catch (err) {
      if (isOfflineError(err)) {
        alert("You're offline. Please check your connection and try again.");
      } else {
        alert(t(lang, "update_failed"));
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl font-semibold">
          {t(
            lang,
            "loading_profile"
          )}
        </div>
      </div>
    );
  }

  if (offline) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <OfflineCard onRetry={loadProfile} />
      </div>
    );
  }
    return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">

      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Link
            href="/profile"
            className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow hover:shadow-lg transition"
          >
            <FaArrowLeft />
            Back
          </Link>

          <Link
            href="/profile/change-password"
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition"
          >
            <FaUserShield />
            Change Password
          </Link>
        </div>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

          {/* Cover */}
          <div className="h-36 bg-linear-to-r from-red-600 to-red-800" />

          {/* Profile Image */}
          <div className="-mt-16 flex justify-center">
            <div className="relative">

              <Image
  src={form.photo || defaultAvatar}
  alt="Profile"
  width={130}
  height={130}
  className="
    w-32
    h-32
    rounded-full
    object-cover
    border-4
    border-white
    shadow-xl
  "
/>

              <label
                className="
                  absolute
                  bottom-0
                  right-0
                  bg-red-600
                  text-white
                  p-3
                  rounded-full
                  cursor-pointer
                  shadow-lg
                "
              >
                <FaCamera />

                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={uploadPhoto}
                  aria-label="Upload profile photo"
                  title="Upload profile photo"
                />
              </label>

            </div>
          </div>

          <div className="text-center mt-4">
            <h1 className="text-3xl font-black">
              {t(lang, "edit_profile")}
            </h1>

            {uploading && (
              <p className="text-red-600 mt-2">
                Uploading image...
              </p>
            )}
          </div>

          <form
            onSubmit={handleSubmit}
            className="p-8 space-y-6"
          >

            <div className="grid md:grid-cols-2 gap-6">

              <div>
                <label htmlFor="fullName" className="font-semibold mb-2 block">
                  {t(lang, "full_name")}
                </label>

                <input
                  id="fullName"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  className="w-full border rounded-xl p-3"
                />
              </div>

              <div>
                <label htmlFor="fatherName" className="font-semibold mb-2 block">
                  {t(lang, "father_name")}
                </label>

                <input
                  id="fatherName"
                  name="fatherName"
                  value={form.fatherName}
                  onChange={handleChange}
                  className="w-full border rounded-xl p-3"
                />
              </div>
              <div>
  <label className="block mb-2 font-semibold">
    {t(lang, "age")}
  </label>

  <input
    type="number"
    name="age"
    min="18"
    max="60"
    value={form.age}
    onChange={handleChange}
    className="w-full border rounded-xl p-3"
  />
</div>
<div>
  <label className="block mb-2 font-semibold">
    {t(lang, "gender")}
  </label>

  <select
    name="gender"
    value={form.gender}
    onChange={handleChange}
    className="w-full border rounded-xl p-3"
  >
    <option value="">
      {t(lang, "select_gender")}
    </option>

    <option value="male">
      {t(lang, "male")}
    </option>

    <option value="female">
      {t(lang, "female")}
    </option>
  </select>
</div>
<div>
  <label className="block mb-2 font-semibold">
    {t(lang, "weight")}
  </label>

  <input
    type="number"
    name="weight"
    min="50"
    value={form.weight}
    onChange={handleChange}
    className="w-full border rounded-xl p-3"
  />
</div>

              <div>
                <label htmlFor="whatsappNumber" className="font-semibold mb-2 block">
                  {t(lang, "whatsapp_number")}
                </label>

                <input
                  id="whatsappNumber"
                  name="whatsappNumber"
                  value={form.whatsappNumber}
                  onChange={handleChange}
                  className="w-full border rounded-xl p-3"
                />
              </div>

              <div>
                <label htmlFor="localNumber" className="font-semibold mb-2 block">
                  {t(lang, "local_number")}
                </label>

                <input
                  id="localNumber"
                  name="localNumber"
                  value={form.localNumber}
                  onChange={handleChange}
                  className="w-full border rounded-xl p-3"
                />
              </div>

              <div>
                <label htmlFor="bloodGroup" className="font-semibold mb-2 block">
                  {t(lang, "blood_group")}
                </label>

                <select
                  id="bloodGroup"
                  name="bloodGroup"
                  value={form.bloodGroup}
                  onChange={handleChange}
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
              </div>

              <div>
                <label htmlFor="city" className="font-semibold mb-2 block">
                  {t(lang, "city")}
                </label>

                <input
                  id="city"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  className="w-full border rounded-xl p-3"
                />
              </div>

              <div>
                <label htmlFor="availabilityStatus" className="font-semibold mb-2 block">
                  Availability
                </label>

                <select
                  id="availabilityStatus"
                  name="availabilityStatus"
                  value={form.availabilityStatus}
                  onChange={handleChange}
                  className="w-full border rounded-xl p-3"
                >
                  <option value="available">
                    Available
                  </option>

                  <option value="busy">
                    Busy
                  </option>

                  <option value="out_of_city">
                    Out of City
                  </option>

                  <option value="unavailable">
                    Unavailable
                  </option>
                </select>
              </div>

              <div>
                <label htmlFor="totalDonations" className="font-semibold mb-2 block">
                  Total Donations
                </label>

                <input
                  type="number"
                  id="totalDonations"
                  name="totalDonations"
                  value={form.totalDonations}
                  onChange={handleChange}
                  className="w-full border rounded-xl p-3"
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="cnic" className="font-semibold mb-2 block">
                  {t(lang, "cnic")}
                </label>

                <input
                  id="cnic"
                  name="cnic"
                  value={form.cnic}
                  onChange={handleChange}
                  className="w-full border rounded-xl p-3"
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="presentAddress" className="font-semibold mb-2 block">
                  {t(lang, "present_address")}
                </label>

                <textarea
                  id="presentAddress"
                  name="presentAddress"
                  value={form.presentAddress}
                  onChange={handleChange}
                  rows={3}
                  className="w-full border rounded-xl p-3"
                />
              </div>
              

              <div className="md:col-span-2">
                <label htmlFor="permanentAddress" className="font-semibold mb-2 block">
                  {t(lang, "permanent_address")}
                </label>

                <textarea
                  id="permanentAddress"
                  name="permanentAddress"
                  value={form.permanentAddress}
                  onChange={handleChange}
                  rows={3}
                  className="w-full border rounded-xl p-3"
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="lastDonationDate" className="font-semibold mb-2 block">
                  Last Donation Date
                </label>

                <input
                  type="date"
                  id="lastDonationDate"
                  name="lastDonationDate"
                  value={form.lastDonationDate}
                  onChange={handleChange}
                  className="w-full border rounded-xl p-3"
                />
              </div>
              

            </div>

            <button
              type="submit"
              className="
                w-full
                bg-red-600
                hover:bg-red-700
                text-white
                py-4
                rounded-xl
                font-bold
                flex
                items-center
                justify-center
                gap-2
                transition
              "
            >
              <FaSave />
              {t(lang, "update_profile")}
            </button>

          </form>

        </div>
      </div>
    </div>
  );
}