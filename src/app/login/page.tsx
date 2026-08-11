"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { t } from "@/lib/translations";
import { safeFetch, isOfflineError } from "@/lib/safeFetch";

export default function LoginPage() {

  const router = useRouter();

  const { lang } = useLanguage();

  const [form, setForm] = useState({
    identifier: "",
    password: "",
    rememberMe: false,
  });

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    safeFetch("/api/me", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {

        if (!data.user) return;

        if (data.user.role === "superadmin") {
          router.replace("/admin/super");
          return;
        }

        if (data.user.role === "admin") {
          router.replace("/admin");
          return;
        }

        router.replace("/");

      })
      .catch(() => {
        // Offline or otherwise unable to check — just stay on the login form.
      });
  }, [router]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    const {
      name,
      value,
      type,
      checked,
    } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {

    e.preventDefault();

    try {

      const res = await safeFetch(
        "/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            identifier:
              form.identifier,
            password:
              form.password,
          }),
        }
      );

      const data = await res.json();

      console.log(
        "LOGIN RESPONSE:",
        data
      );

      if (!res.ok) {

        alert(
          data.message ||
            t(
              lang,
              "login_failed"
            )
        );

        return;
      }

      alert(
        t(
          lang,
          "login_success"
        )
      );
            // ==========================
      // Password change required
      // ==========================
      if (data.mustChangePassword) {
        router.replace("/profile/change-password");
        return;
      }

      // ==========================
      // Redirect by role
      // ==========================
      if (data.user?.role === "superadmin") {
        router.replace("/admin/super");
        return;
      }

      if (data.user?.role === "admin") {
        router.replace("/admin");
        return;
      }

      router.replace("/donors");

    } catch (error) {

      console.error(
        "Login Error:",
        error
      );

      if (isOfflineError(error)) {
        alert("You're offline. Please check your connection and try again.");
        return;
      }

      alert(
        t(
          lang,
          "something_wrong"
        )
      );

    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center px-4">

      <div className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-md">

        {/* Heading */}

        <div className="text-center mb-8">

          <h1 className="text-3xl font-bold text-red-600">
            {t(
              lang,
              "login_title"
            )}
          </h1>

          <p className="text-gray-500 mt-2">
            {t(
              lang,
              "login_subtitle"
            )}
          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            type="text"
            name="identifier"
            placeholder={t(
              lang,
              "email_or_phone"
            )}
            value={form.identifier}
            onChange={handleChange}
            className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          />

          <div className="relative">
            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              name="password"
              placeholder={t(
                lang,
                "password"
              )}
              value={form.password}
              onChange={handleChange}
              className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(
                  !showPassword
                )
              }
              className="absolute right-3 top-3 text-gray-500"
            >
              {showPassword
                ? t(
                    lang,
                    "hide"
                  )
                : t(
                    lang,
                    "show"
                  )}
            </button>
          </div>

          {/* Remember + Forgot */}

          <div className="flex justify-between items-center text-sm">

            <label className="flex items-center gap-2">

              <input
                type="checkbox"
                name="rememberMe"
                checked={
                  form.rememberMe
                }
                onChange={
                  handleChange
                }
              />

              {t(
                lang,
                "remember_me"
              )}

            </label>

            <Link
              href="/forgot-password"
              className="text-red-600 hover:underline"
            >
              {t(
                lang,
                "forgot_password"
              )}
            </Link>

          </div>

          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-xl transition"
          >
            {t(
              lang,
              "login"
            )}
          </button>

        </form>

        <div className="text-center mt-6">

          <p className="text-gray-600">
            {t(
              lang,
              "dont_have_account"
            )}
          </p>

          <Link
            href="/signup"
            className="text-red-600 font-semibold hover:underline"
          >
            {t(
              lang,
              "create_account"
            )}
          </Link>

        </div>

      </div>

    </div>
  );
}