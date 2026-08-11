"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { t } from "@/lib/translations";
import { safeFetch, isOfflineError } from "@/lib/safeFetch";

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

export default function SignupPage() {
  const { lang } = useLanguage();

  const [uploading, setUploading] =
    useState(false);

  const [form, setForm] =
    useState({
      photo: "",

      fullName: "",

      email: "", // optional

      password: "",

      whatsappNumber: "",

      city: "",

      presentAddress: "",

      bloodGroup: "",

      age: "",

      weight: "",

      cnic: "", // optional
      acceptedTerms: false,
    });

 const handleChange = (
  e: React.ChangeEvent<
    HTMLInputElement | HTMLSelectElement
  >
) => {
  const {
    name,
    value,
    type,
  } = e.target;

  setForm({
    ...form,
    [name]:
      type === "checkbox"
        ? (
            e.target as HTMLInputElement
          ).checked
        : value,
  });
};

  const handleImageUpload =
    async (
      e: React.ChangeEvent<HTMLInputElement>
    ) => {
      const file =
        e.target.files?.[0];

      if (!file) return;

      setUploading(true);

      const reader =
        new FileReader();

      reader.onloadend =
        async () => {
          try {
            const res =
              await safeFetch(
                "/api/upload",
                {
                  method:
                    "POST",
                  headers:
                    {
                      "Content-Type":
                        "application/json",
                    },
                  body:
                    JSON.stringify(
                      {
                        image:
                          reader.result,
                      }
                    ),
                }
              );

            const data =
              await res.json();

            if (
              data.success
            ) {
              setForm(
                (
                  prev
                ) => ({
                  ...prev,
                  photo:
                    data.url,
                })
              );
            }
          } catch (err) {
            if (isOfflineError(err)) {
              alert("You're offline. Please check your connection and try again.");
            }
          } finally {
            setUploading(
              false
            );
          }
        };

      reader.readAsDataURL(
        file
      );
    };

  const handleSubmit =
 
    async (
      e: React.FormEvent
    ) => {
      e.preventDefault();
       if (!form.acceptedTerms) {
  alert(
    "Please accept Terms and Privacy Policy"
  );
  return;
}

      try {
        const res =
          await safeFetch(
            "/api/auth/signup",
            {
              method:
                "POST",
              headers:
                {
                  "Content-Type":
                    "application/json",
                },
              body:
                JSON.stringify(
                  form
                ),
            }
          );

        const data =
          await res.json();

        if (
          !res.ok
        ) {
          alert(
            data.message
          );
          return;
        }

        alert(
          t(
            lang,
            "signup_success"
          )
        );

        window.location.href =
          "/login";
      } catch (err) {
        if (isOfflineError(err)) {
          alert("You're offline. Please check your connection and try again.");
        } else {
          alert("Something went wrong. Please try again.");
        }
      }
    };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">

      <div className="w-full max-w-xl bg-white rounded-3xl shadow-xl p-8">

        <div className="text-center mb-6">

          <h1 className="text-3xl font-bold text-red-600">
            {t(
              lang,
              "signup"
            )}
          </h1>

        </div>

        <form
          onSubmit={
            handleSubmit
          }
          className="space-y-4"
        >

         {/* PHOTO */}

<div>
  <label
    htmlFor="profilePhoto"
    className="block mb-2 font-medium"
  >
    {t(lang, "profile_photo")}
  </label>

  <input
    id="profilePhoto"
    type="file"
    accept="image/*"
    onChange={handleImageUpload}
    className="w-full border rounded-xl p-2"
  />

  {uploading && (
    <p className="text-sm text-red-500 mt-2">
      {t(lang, "uploading")}
    </p>
  )}

  {form.photo && (
    <img
      src={form.photo}
      alt="profile"
      className="w-24 h-24 rounded-full object-cover mt-3 border"
    />
  )}
</div>

{/* FULL NAME */}

<div>
  <label className="block mb-2 font-medium">
    {t(lang, "full_name")}
  </label>

  <input
    name="fullName"
    placeholder={t(lang, "full_name")}
    value={form.fullName}
    onChange={handleChange}
    required
    className="w-full border rounded-xl p-3"
  />
</div>

{/* EMAIL */}

<div>
  <label className="block mb-2 font-medium">
    {t(lang, "email_optional")}
  </label>

  <input
    name="email"
    type="email"
    placeholder={t(lang, "email_optional")}
    value={form.email}
    onChange={handleChange}
    className="w-full border rounded-xl p-3"
  />
</div>

{/* PASSWORD */}

<div>
  <label className="block mb-2 font-medium">
    {t(lang, "password")}
  </label>

  <input
    name="password"
    type="password"
    placeholder={t(lang, "password")}
    value={form.password}
    onChange={handleChange}
    required
    className="w-full border rounded-xl p-3"
  />
</div>

{/* WHATSAPP */}

<div>
  <label className="block mb-2 font-medium">
    {t(lang, "phone")}
  </label>

  <input
    name="whatsappNumber"
    placeholder={t(lang, "phone")}
    value={form.whatsappNumber}
    onChange={handleChange}
    required
    className="w-full border rounded-xl p-3"
  />
</div>

{/* AGE */}

<div>
  <label className="block mb-2 font-medium">
    {t(lang, "age")}
  </label>

  <input
    name="age"
    type="number"
    placeholder={t(lang, "age")}
    value={form.age}
    onChange={handleChange}
    required
    className="w-full border rounded-xl p-3"
  />
</div>

{/* WEIGHT */}

<div>
  <label className="block mb-2 font-medium">
    {t(lang, "weight_optional")}
  </label>

  <input
    name="weight"
    type="number"
    placeholder={t(lang, "weight_optional")}
    value={form.weight}
    onChange={handleChange}
    className="w-full border rounded-xl p-3"
  />
</div>

{/* CITY */}

<div>
  <label className="block mb-2 font-medium">
    {t(lang, "city")}
  </label>

  <input
    name="city"
    placeholder={t(lang, "city")}
    value={form.city}
    onChange={handleChange}
    required
    className="w-full border rounded-xl p-3"
  />
</div>

{/* ADDRESS */}

<div>
  <label className="block mb-2 font-medium">
    {t(lang, "address")}
  </label>

  <input
    name="presentAddress"
    placeholder={t(lang, "address")}
    value={form.presentAddress}
    onChange={handleChange}
    required
    className="w-full border rounded-xl p-3"
  />
</div>

{/* CNIC */}

<div>
  <label className="block mb-2 font-medium">
    {t(lang, "cnic_optional")}
  </label>

  <input
    name="cnic"
    placeholder={t(lang, "cnic_optional")}
    value={form.cnic}
    onChange={handleChange}
    className="w-full border rounded-xl p-3"
  />
</div>

{/* BLOOD GROUP */}

<div>
  <label htmlFor="bloodGroup" className="block mb-2 font-medium">
    {t(lang, "blood_group")}
  </label>

  <select
    id="bloodGroup"
    name="bloodGroup"
    value={form.bloodGroup}
    onChange={handleChange}
    required
    className="w-full border rounded-xl p-3"
  >
    <option value="">
      {t(lang, "select_blood_group")}
    </option>

    {BLOOD_GROUPS.map((group) => (
      <option key={group}>
        {group}
      </option>
    ))}
  </select>
</div>
<div className="flex items-start gap-3">

  <input
    id="acceptedTerms"
    type="checkbox"
    name="acceptedTerms"
    checked={form.acceptedTerms}
    onChange={handleChange}
    className="mt-1"
  />

  <label htmlFor="acceptedTerms" className="text-sm text-gray-700">
    I agree to the{" "}
    <Link
      href="/privacy"
      className="text-red-600 font-semibold"
    >
      Privacy Policy
    </Link>
    {" "}and{" "}
    <Link
      href="terms-conditions"
      className="text-red-600 font-semibold"
    >
      Terms of Service
    </Link>
  </label>

</div>
          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white rounded-xl py-3 font-semibold"
          >
            {t(
              lang,
              "signup"
            )}
          </button>

          <div className="text-center mt-4">

           <p className="text-gray-600">
  {t(lang, "already_account")}
</p>

            <Link
              href="/login"
              className="text-red-600 font-semibold"
            >
              {t(lang, "login")}
            </Link>

          </div>

        </form>

      </div>

    </div>
  );
}