"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FaEdit,
  FaCog,
  FaSignOutAlt,
  FaLock,
  FaTint,
  FaPhone,
  FaMapMarkerAlt,
  FaIdCard,
  FaUser,
} from "react-icons/fa";
import { useLanguage } from "@/context/LanguageContext";
import { t } from "@/lib/translations-backup";


export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const { lang } = useLanguage();

  const defaultAvatar = "/images/default-avatar.png";
  useEffect(() => {
    fetch("/api/profile")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setUser(data.user);
        }
        setLoading(false);
      });
  }, []);

  const logout = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
    });

    window.location.href = "/";
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="text-xl font-semibold">
          {t(lang, "loading_profile")}
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        User not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">

      <div className="max-w-6xl mx-auto">

        {/* Cover */}
        <div className="bg-gradient-to-r from-red-600 to-red-800 rounded-t-3xl h-52 relative shadow-xl">

          {/* Avatar */}
          <div className="absolute -bottom-16 left-8">

            {user.photo ? (
              <Image
  src={user.photo || defaultAvatar}
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
            ) : (
              <div
                className="
                  w-[130px]
                  h-[130px]
                  rounded-full
                  bg-white
                  border-4
                  border-white
                  flex
                  items-center
                  justify-center
                  text-5xl
                  shadow-xl
                "
              >
                👤
              </div>
            )}

          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-b-3xl shadow-xl pt-20 pb-8 px-8">

          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6">

            <div>
              <h1 className="text-3xl font-black">
                {user.fullName}
              </h1>
              <p>
  <strong>{t(lang, "gender")}:</strong>
  {" "}
  {user.gender || "-"}
</p>

<p>
  <strong>{t(lang, "age")}:</strong>
  {" "}
  {user.age || "-"}
</p>

<p>
  <strong>{t(lang, "weight")}:</strong>
  {" "}
  {user.weight || "-"} KG
</p>

              <p className="text-gray-500 mt-1">
                {user.email}
              </p>

              <div className="mt-3 inline-block px-4 py-2 rounded-full bg-red-100 text-red-700 font-semibold">
                {user.role}
              </div>
            </div>

            <div className="flex flex-wrap gap-3">

              <Link
                href="/profile/edit"
                className="
                  bg-red-600
                  text-white
                  px-5
                  py-3
                  rounded-xl
                  flex
                  items-center
                  gap-2
                  hover:bg-red-700
                "
              >
                <FaEdit />
                {t(lang, "edit_profile")}
              </Link>

              <Link
                href="/profile/change-password"
                className="
                  bg-blue-600
                  text-white
                  px-5
                  py-3
                  rounded-xl
                  flex
                  items-center
                  gap-2
                "
              >
                <FaLock />
                Change Password
              </Link>

              <button
                onClick={logout}
                className="
                  bg-black
                  text-white
                  px-5
                  py-3
                  rounded-xl
                  flex
                  items-center
                  gap-2
                "
              >
                <FaSignOutAlt />
                Logout
              </button>

            </div>

          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-6 mt-10">

            <div className="bg-red-50 rounded-2xl p-6 text-center">
              <div className="text-4xl mb-2">🩸</div>
              <div className="text-3xl font-black">
                {user.totalDonations || 0}
              </div>
              <div className="text-gray-600">
                Total Donations
              </div>
            </div>

            <div className="bg-green-50 rounded-2xl p-6 text-center">
              <div className="text-4xl mb-2">✅</div>
              <div className="text-2xl font-bold">
                {user.isEligible
                  ? "Eligible"
                  : "Not Eligible"}
              </div>
              <div className="text-gray-600">
                Eligibility
              </div>
            </div>

            <div className="bg-blue-50 rounded-2xl p-6 text-center">
              <div className="text-4xl mb-2">📍</div>
              <div className="text-2xl font-bold">
                {user.availabilityStatus}
              </div>
              <div className="text-gray-600">
                Availability
              </div>
            </div>

          </div>

          {/* Personal Information */}
          <div className="mt-10">

            <h2 className="text-2xl font-black mb-6">
              {t(lang, "profile_title")}
            </h2>

            <div className="grid md:grid-cols-2 gap-5">

              <InfoCard
                icon={<FaUser />}
                label={t(lang, "full_name")}
                value={user.fullName}
              />

              <InfoCard
                icon={<FaUser />}
                label={t(lang, "father_name")}
                value={user.fatherName}
              />

              <InfoCard
                icon={<FaPhone />}
                label={t(lang, "whatsapp_number")}
                value={user.whatsappNumber}
              />

              <InfoCard
                icon={<FaPhone />}
                label={t(lang, "local_number")}
                value={user.localNumber}
              />

              <InfoCard
                icon={<FaTint />}
                label={t(lang, "blood_group")}
                value={user.bloodGroup}
              />

              <InfoCard
                icon={<FaMapMarkerAlt />}
                label={t(lang, "city")}
                value={user.city}
              />

              <InfoCard
                icon={<FaIdCard />}
                label={t(lang, "cnic")}
                value={user.cnic}
              />

              <InfoCard
                icon={<FaMapMarkerAlt />}
                label={t(lang, "present_address")}
                value={user.presentAddress}
              />

              <InfoCard
                icon={<FaMapMarkerAlt />}
                label={t(lang, "permanent_address")}
                value={user.permanentAddress}
              />

            </div>
          </div>

          {/* Settings */}
          <div className="mt-12">

            <h2 className="text-2xl font-black mb-6 flex items-center gap-3">
              <FaCog />
              Settings
            </h2>

            <div className="grid md:grid-cols-2 gap-5">

              <Link
                href="/profile/change-password"
                className="
                  bg-white
                  border
                  rounded-2xl
                  p-5
                  shadow
                  hover:shadow-lg
                "
              >
                🔐 Change Password
              </Link>

              <button
                onClick={logout}
                className="
                  bg-white
                  border
                  rounded-2xl
                  p-5
                  shadow
                  hover:shadow-lg
                  text-left
                "
              >
                🚪 Logout
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

function InfoCard({
  icon,
  label,
  value,
}: any) {
  return (
    <div className="bg-gray-50 rounded-2xl p-5">

      <div className="flex items-center gap-2 text-red-600 font-bold">
        {icon}
        {label}
      </div>

      <div className="mt-2 text-lg">
        {value || "-"}
      </div>

    </div>
  );
}