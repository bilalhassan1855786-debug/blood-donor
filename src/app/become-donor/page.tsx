"use client";

import { useEffect, useState, ChangeEvent } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Space_Grotesk } from "next/font/google";

import { useLanguage } from "@/context/LanguageContext";
import { becomeDonorTranslations } from "@/lib/translations/become-donor";
import { safeFetch, isOfflineError } from "@/lib/safeFetch";

// Font
const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["600", "700"],
});

// Location picker
const LocationPicker = dynamic(() => import("@/components/LocationPicker"), {
  ssr: false,
});

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

interface FormState {
  userId: string;
  photo: string;
  photoPublicId: string;
  fullName: string;
  fatherName: string;
  email: string;
  whatsappNumber: string;
  localNumber: string;
  age: string | number;
  weight: string | number;
  cnic: string;
  bloodGroup: string;
  city: string;
  presentAddress: string;
  permanentAddress: string;
  locationAddress: string;
  lastDonationDate: string;
  availabilityStatus: string;
  transportSupport: string;
  bio: string;
  healthChecked: boolean;
  healthCheckedAt: string;
  termsAccepted: boolean;
  termsAcceptedAt: string;
}

const INITIAL_FORM: FormState = {
  userId: "",
  photo: "",
  photoPublicId: "",
  fullName: "",
  fatherName: "",
  email: "",
  whatsappNumber: "",
  localNumber: "",
  age: "",
  weight: "",
  cnic: "",
  bloodGroup: "",
  city: "",
  presentAddress: "",
  permanentAddress: "",
  locationAddress: "",
  lastDonationDate: "",
  availabilityStatus: "available",
  transportSupport: "no",
  bio: "",
  healthChecked: false,
  healthCheckedAt: "",
  termsAccepted: false,
  termsAcceptedAt: "",
};

type PageState =
  | "loading"
  | "offline"
  | "already_registered"
  | "form";

export default function BecomeDonorPage() {
  // Hooks MUST stay inside the component
  const router = useRouter();

  const { lang } = useLanguage();
  const bt = becomeDonorTranslations[lang];

  const [pageState, setPageState] =
    useState<PageState>("loading");

  const [uploading, setUploading] =
    useState(false);

  const [position, setPosition] =
    useState<[number, number] | null>(null);

  const [form, setForm] =
    useState<FormState>(INITIAL_FORM);

  const [submitError, setSubmitError] =
    useState("");

  const AVAILABILITY_OPTIONS = [
    {
      value: "available",
      label: bt.available,
    },
    {
      value: "busy",
      label: bt.busy,
    },
    {
      value: "out_of_city",
      label: bt.out_of_city,
    },
    {
      value: "unavailable",
      label: bt.unavailable,
    },
  ];

  const TRANSPORT_OPTIONS = [
    {
      value: "yes",
      label: bt.transport_yes,
    },
    {
      value: "partial",
      label: bt.transport_partial,
    },
    {
      value: "no",
      label: bt.transport_no,
    },
  ];

  useEffect(() => {
    async function loadUser() {
      try {
        const res = await safeFetch("/api/me");
        const data = await res.json();

        if (!data.success) {
          router.push("/login");
          return;
        }

        const health =
          localStorage.getItem("healthCheck");

        if (!health) {
          router.push("/health-check");
          return;
        }

        const terms =
          localStorage.getItem(
            "donor_terms_accepted"
          );

        if (!terms) {
          router.push("/privacy-policy");
          return;
        }

        const statusRes =
          await safeFetch("/api/donors/status");

        const statusData =
          await statusRes.json();

        if (
          statusData.success &&
          statusData.alreadyRegistered
        ) {
          setPageState("already_registered");
          return;
        }

        const user = data.user;
        const healthData = JSON.parse(health);

        setForm((prev) => ({
          ...prev,
          userId: user.id,
          fullName: user.fullName || "",
          email: user.email || "",
          whatsappNumber:
            user.whatsappNumber || "",
          city: user.city || "",
          age: user.age || "",
          weight: user.weight || "",
          cnic: user.cnic || "",
          photo: user.photo || "",
          healthChecked:
            healthData.passed,
          healthCheckedAt:
            new Date().toISOString(),
          termsAccepted: true,
          termsAcceptedAt:
            localStorage.getItem(
              "donor_terms_accepted_at"
            ) || "",
        }));

        setPageState("form");
      } catch (err) {
        if (isOfflineError(err)) {
          setPageState("offline");
        } else {
          router.push("/login");
        }
      }
    }

    loadUser();
  }, [router]);

  const handleChange = <
    K extends keyof FormState
  >(
    key: K,
    value: FormState[K]
  ) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleImageUpload = async (
    e: ChangeEvent<HTMLInputElement>
  ) => {
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
              image:
                (reader.result as string) ||
                null,
            }),
          }
        );

        const data = await res.json();

        if (data.success) {
          setForm((prev) => ({
            ...prev,
            photo: data.url,
            photoPublicId:
              data.publicId,
          }));
        }
      } catch (err) {
        if (isOfflineError(err)) {
          alert(
            "You're offline. Please reconnect and try uploading your photo again."
          );
        }
      } finally {
        setUploading(false);
      }
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();
    setSubmitError("");

    if (!form.healthChecked) {
      alert(bt.health_failed);
      return;
    }

    const body = {
      ...form,
      latitude:
        position?.[0] || null,
      longitude:
        position?.[1] || null,
    };

    try {
      const res = await safeFetch(
        "/api/donors",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(
          data.message ||
            bt.something_wrong
        );
        return;
      }

      alert(bt.donor_request_sent);

      router.push("/donor/pending");
    } catch (err) {
      if (isOfflineError(err)) {
        setSubmitError(
          "📡 You're offline. Please reconnect and submit your application again."
        );
      } else {
        alert(bt.something_wrong);
      }
    }
  };

  if (pageState === "loading") {
    return (
      <div className="min-h-screen bg-[#FBF7F1] flex items-center justify-center">
        <p className="text-[#5B5964]">
          {bt.loading}
        </p>
      </div>
    );
  }

  if (pageState === "offline") {
    return (
      <div className="min-h-screen bg-[#FBF7F1] flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-10 text-center">
          <div className="text-6xl mb-6">
            📡
          </div>

          <h1
            className={`${display.className} text-2xl font-bold text-[#15141A] mb-3`}
          >
            No Internet Connection
          </h1>

          <p className="text-[#5B5964] leading-7 mb-8">
            Please reconnect to continue
            with your donor application.
          </p>

          <button
            onClick={() =>
              window.location.reload()
            }
            className="bg-[#C81E3A] hover:bg-[#A11530] text-white px-8 py-3 rounded-xl font-semibold transition"
          >
            🔄 Retry
          </button>
        </div>
      </div>
    );
  }

  if (pageState === "already_registered") {
    return (
      <div className="min-h-screen bg-[#FBF7F1] flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-10 text-center">
          <div className="text-6xl mb-6">
            🩸
          </div>

          <h1
            className={`${display.className} text-2xl font-bold text-[#15141A] mb-3`}
          >
            {bt.already_registered_title}
          </h1>

          <p className="text-[#5B5964] leading-7 mb-8">
            {bt.already_registered_desc}
          </p>

          <div className="flex flex-col gap-3">
            <Link
              href="/profile"
              className="bg-[#C81E3A] hover:bg-[#A11530] text-white py-3 rounded-xl font-semibold transition"
            >
              {bt.go_to_profile}
            </Link>

            <Link
              href="/"
              className="border border-black/10 text-[#15141A] py-3 rounded-xl font-semibold hover:bg-black/5 transition"
            >
              {bt.back_home}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FBF7F1] py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Hero */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-[#15141A] text-white rounded-full px-5 py-2 mb-6 text-sm font-semibold">
            {bt.step}
          </div>

          <h1
            className={`${display.className} text-3xl md:text-4xl font-bold text-[#C81E3A]`}
          >
            {bt.become_donor}
          </h1>

          <p className="text-[#5B5964] mt-3">
            {bt.become_donor_desc}
          </p>
        </div>

        <ProgressSteps current={4} />

        {submitError && (
          <div className="bg-[#C81E3A12] border border-[#C81E3A40] rounded-xl p-4 mb-6 text-sm text-[#C81E3A] text-center max-w-2xl mx-auto">
            {submitError}
          </div>
        )}

        <div className="bg-white rounded-3xl shadow-sm border border-black/5 p-8 md:p-10">
          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >
                        {/* PHOTO */}
            <Field
              label={bt.profile_photo}
              htmlFor="profile-photo"
            >
              <input
                id="profile-photo"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full border border-black/10 rounded-xl p-3"
              />

              {uploading && (
                <p className="text-[#C81E3A] mt-2 text-sm">
                  {bt.uploading_image}
                </p>
              )}

              {form.photo && (
                <img
                  src={form.photo}
                  alt="profile"
                  className="w-28 h-28 rounded-full object-cover mt-4 border-4 border-[#C81E3A22]"
                />
              )}
            </Field>

            {/* NAME */}
            <div className="grid md:grid-cols-2 gap-4">
              <Field
                label={bt.full_name}
                htmlFor="fullName"
              >
                <input
                  id="fullName"
                  value={form.fullName}
                  onChange={(e) =>
                    handleChange(
                      "fullName",
                      e.target.value
                    )
                  }
                  className="w-full border border-black/10 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#C81E3A]/30"
                  required
                />
              </Field>

              <Field
                label={bt.father_name}
                htmlFor="fatherName"
              >
                <input
                  id="fatherName"
                  value={form.fatherName}
                  onChange={(e) =>
                    handleChange(
                      "fatherName",
                      e.target.value
                    )
                  }
                  className="w-full border border-black/10 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#C81E3A]/30"
                  required
                />
              </Field>
            </div>

            {/* CONTACT */}
            <div className="grid md:grid-cols-2 gap-4">
              <Field
                label={bt.email}
                htmlFor="email"
              >
                <input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) =>
                    handleChange(
                      "email",
                      e.target.value
                    )
                  }
                  className="w-full border border-black/10 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#C81E3A]/30"
                />
              </Field>

              <Field
                label={bt.whatsapp_number}
                htmlFor="whatsappNumber"
              >
                <input
                  id="whatsappNumber"
                  value={form.whatsappNumber}
                  onChange={(e) =>
                    handleChange(
                      "whatsappNumber",
                      e.target.value
                    )
                  }
                  className="w-full border border-black/10 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#C81E3A]/30"
                  required
                />
              </Field>
            </div>

            {/* AGE / WEIGHT / CNIC */}
            <div className="grid md:grid-cols-3 gap-4">
              <Field
                label={bt.age}
                htmlFor="age"
              >
                <input
                  id="age"
                  type="number"
                  value={form.age}
                  onChange={(e) =>
                    handleChange(
                      "age",
                      e.target.value
                    )
                  }
                  className="w-full border border-black/10 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#C81E3A]/30"
                  required
                />
              </Field>

              <Field
                label={bt.weight}
                htmlFor="weight"
              >
                <input
                  id="weight"
                  type="number"
                  value={form.weight}
                  onChange={(e) =>
                    handleChange(
                      "weight",
                      e.target.value
                    )
                  }
                  className="w-full border border-black/10 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#C81E3A]/30"
                />
              </Field>

              <Field
                label={bt.cnic}
                htmlFor="cnic"
              >
                <input
                  id="cnic"
                  value={form.cnic}
                  onChange={(e) =>
                    handleChange(
                      "cnic",
                      e.target.value
                    )
                  }
                  className="w-full border border-black/10 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#C81E3A]/30"
                />
              </Field>
            </div>

            {/* BLOOD GROUP */}
            <Field
              label={bt.blood_group}
              htmlFor="bloodGroup"
            >
              <select
                id="bloodGroup"
                value={form.bloodGroup}
                onChange={(e) =>
                  handleChange(
                    "bloodGroup",
                    e.target.value
                  )
                }
                className="w-full border border-black/10 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#C81E3A]/30"
                required
              >
                <option value="">
                  {bt.select_blood_group}
                </option>

                {BLOOD_GROUPS.map((group) => (
                  <option
                    key={group}
                    value={group}
                  >
                    {group}
                  </option>
                ))}
              </select>
            </Field>

            {/* CITY */}
            <Field
              label={bt.city}
              htmlFor="city"
            >
              <input
                id="city"
                value={form.city}
                onChange={(e) =>
                  handleChange(
                    "city",
                    e.target.value
                  )
                }
                className="w-full border border-black/10 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#C81E3A]/30"
                required
              />
            </Field>

            {/* PRESENT ADDRESS */}
            <Field
              label={bt.present_address}
              htmlFor="presentAddress"
            >
              <input
                id="presentAddress"
                value={form.presentAddress}
                onChange={(e) =>
                  handleChange(
                    "presentAddress",
                    e.target.value
                  )
                }
                className="w-full border border-black/10 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#C81E3A]/30"
                required
              />
            </Field>

            {/* PERMANENT ADDRESS */}
            <Field
              label={bt.permanent_address}
              htmlFor="permanentAddress"
            >
              <input
                id="permanentAddress"
                value={form.permanentAddress}
                onChange={(e) =>
                  handleChange(
                    "permanentAddress",
                    e.target.value
                  )
                }
                className="w-full border border-black/10 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#C81E3A]/30"
                required
              />
            </Field>

            {/* MAP */}
            <Field
              label={bt.optional_live_location}
            >
              <LocationPicker
                position={position}
                setPosition={setPosition}
              />
            </Field>

            {/* AVAILABILITY */}
            <Field
              label={bt.availability}
              htmlFor="availabilityStatus"
            >
              <select
                id="availabilityStatus"
                value={form.availabilityStatus}
                onChange={(e) =>
                  handleChange(
                    "availabilityStatus",
                    e.target.value
                  )
                }
                className="w-full border border-black/10 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#C81E3A]/30"
              >
                {AVAILABILITY_OPTIONS.map(
                  (option) => (
                    <option
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </option>
                  )
                )}
              </select>
            </Field>

            {/* TRANSPORT */}
            <Field
              label={bt.transport_support}
            >
              <select
                value={form.transportSupport}
                onChange={(e) =>
                  handleChange(
                    "transportSupport",
                    e.target.value
                  )
                }
                className="w-full border border-black/10 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#C81E3A]/30"
                aria-label={
                  bt.transport_support
                }
              >
                {TRANSPORT_OPTIONS.map(
                  (option) => (
                    <option
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </option>
                  )
                )}
              </select>
            </Field>

            {/* BIO */}
            <Field
              label={bt.bio}
              htmlFor="bio"
            >
              <textarea
                id="bio"
                rows={4}
                value={form.bio}
                onChange={(e) =>
                  handleChange(
                    "bio",
                    e.target.value
                  )
                }
                className="w-full border border-black/10 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#C81E3A]/30"
                placeholder={
                  bt.bio_placeholder
                }
                aria-label={bt.bio}
              />
            </Field>

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={uploading}
              className="w-full bg-[#C81E3A] hover:bg-[#A11530] disabled:opacity-50 disabled:cursor-not-allowed text-white py-4 rounded-xl font-bold transition"
            >
              {bt.submit_donor_request}
            </button>
          </form>
        </div>
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
  htmlFor?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="font-semibold block mb-2 text-sm text-[#15141A]"
      >
        {label}
      </label>

      {children}
    </div>
  );
}

function ProgressSteps({
  current,
}: {
  current: number;
}) {
  return (
    <div className="flex items-center justify-center mb-10">
      <div className="flex items-center gap-3">
        {[1, 2, 3, 4].map(
          (step, i) => (
            <div
              key={step}
              className="flex items-center gap-3"
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs ${
                  step < current
                    ? "bg-[#0F6E66] text-white"
                    : step === current
                    ? "bg-[#C81E3A] text-white"
                    : "bg-black/10 text-black/30"
                }`}
              >
                {step < current
                  ? "✓"
                  : step}
              </div>

              {i < 3 && (
                <div
                  className={`w-10 md:w-16 h-1 rounded-full ${
                    step < current
                      ? "bg-[#0F6E66]"
                      : "bg-black/10"
                  }`}
                />
              )}
            </div>
          )
        )}
      </div>
    </div>
  );
}