"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { changePasswordTranslations } from "@/lib/translations/changePassword";
import { safeFetch, isOfflineError } from "@/lib/safeFetch";

export default function ChangePasswordPage() {
  const { lang } = useLanguage();

  const t =
    changePasswordTranslations[
      lang as keyof typeof changePasswordTranslations
    ];

  const [currentPassword, setCurrentPassword] =
    useState("");

  const [newPassword, setNewPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [showCurrent, setShowCurrent] =
    useState(false);

  const [showNew, setShowNew] =
    useState(false);

  const [showConfirm, setShowConfirm] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    if (newPassword.length < 4) {
      alert(t.password_short);
      return;
    }

    if (newPassword !== confirmPassword) {
      alert(t.password_mismatch);
      return;
    }

    try {
      setLoading(true);

      const res = await safeFetch(
        "/api/profile/change-password",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            currentPassword,
            newPassword,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(
          data.message ||
            t.wrong_password
        );
        return;
      }

      alert(t.success);

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

    } catch (err) {
      if (isOfflineError(err)) {
        alert("You're offline. Please check your connection and try again.");
      } else {
        alert("Something went wrong.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero */}

      <section className="bg-gradient-to-br from-red-700 via-red-600 to-red-900 text-white">

        <div className="max-w-6xl mx-auto px-6 py-20">

          <h1 className="text-5xl font-black mb-6">
            🔒 {t.hero_title}
          </h1>

          <p className="text-xl text-white/90">
            {t.hero_desc}
          </p>

        </div>

      </section>

      <div className="max-w-xl mx-auto px-6 py-14">

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl shadow-xl p-8"
        >
                  {/* Current Password */}

          <div className="mb-6">

            <label className="block font-bold mb-2">
              {t.current_password}
            </label>

            <div className="relative">

              <input
                type={showCurrent ? "text" : "password"}
                value={currentPassword}
                onChange={(e) =>
                  setCurrentPassword(e.target.value)
                }
                placeholder={t.current_placeholder}
                className="w-full border rounded-xl p-4 pr-16"
                required
              />

              <button
                type="button"
                onClick={() =>
                  setShowCurrent(!showCurrent)
                }
                className="absolute right-4 top-4"
              >
                {showCurrent ? "🙈" : "👁"}
              </button>

            </div>

          </div>

          {/* New Password */}

          <div className="mb-6">

            <label className="block font-bold mb-2">
              {t.new_password}
            </label>

            <div className="relative">

              <input
                type={showNew ? "text" : "password"}
                value={newPassword}
                onChange={(e) =>
                  setNewPassword(e.target.value)
                }
                placeholder={t.new_placeholder}
                className="w-full border rounded-xl p-4 pr-16"
                required
              />

              <button
                type="button"
                onClick={() =>
                  setShowNew(!showNew)
                }
                className="absolute right-4 top-4"
              >
                {showNew ? "🙈" : "👁"}
              </button>

            </div>

          </div>

          {/* Confirm Password */}

          <div className="mb-6">

            <label className="block font-bold mb-2">
              {t.confirm_password}
            </label>

            <div className="relative">

              <input
                type={showConfirm ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(e.target.value)
                }
                placeholder={t.confirm_placeholder}
                className="w-full border rounded-xl p-4 pr-16"
                required
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirm(!showConfirm)
                }
                className="absolute right-4 top-4"
              >
                {showConfirm ? "🙈" : "👁"}
              </button>

            </div>

          </div>

          {/* Forgot Password */}

          <div className="mb-8 text-right">

            <Link
              href="/forgot-password"
              className="text-red-600 hover:underline font-semibold"
            >
              {t.forgot_password}
            </Link>

          </div>

          {/* Buttons */}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 text-white rounded-xl py-4 font-bold transition"
          >
            {loading
              ? t.loading
              : t.update_password}
          </button>

          <Link
            href="/profile"
            className="block text-center mt-6 text-gray-600 hover:text-red-600 font-semibold"
          >
            ← {t.back_profile}
          </Link>

        </form>

      </div>

    </div>
  );
}