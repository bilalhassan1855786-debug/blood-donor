"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Space_Grotesk, IBM_Plex_Mono } from "next/font/google";
import { useLanguage } from "@/context/LanguageContext";
import { myRequestsTranslations } from "@/lib/translations/my-requests-translations";
import { timeAgo } from "@/lib/timeAgo";
import { safeFetch, isOfflineError } from "@/lib/safeFetch";
import OfflineCard from "@/components/network/OfflineCard";

const display = Space_Grotesk({ subsets: ["latin"], weight: ["600", "700"] });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"] });

// Matches the Booking model (the form actually used at /book-blood),
// not the separate BloodRequest model.
type BookingItem = {
  _id: string;
  patientName: string;
  bloodGroup: string;
  hospital: string;
  city: string;
  bloodUnits: number;
  urgency: string;
  status: "pending" | "approved" | "cancelled";
  createdAt: string;
};

type DonorStatus = {
  status: "pending" | "approved" | "rejected";
  rejectionReason?: string;
  bloodGroup: string;
  city: string;
} | null;

export default function MyRequestsPage() {
  const router = useRouter();
  const { lang } = useLanguage();
  const mt = myRequestsTranslations[lang];

  const [loading, setLoading] = useState(true);
  const [offline, setOffline] = useState(false);
  const [bookings, setBookings] = useState<BookingItem[]>([]);
  const [donorStatus, setDonorStatus] = useState<DonorStatus>(null);
  const [hasDonorApplication, setHasDonorApplication] = useState(false);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    setLoading(true);
    setOffline(false);

    try {
      const [bookingsRes, donorRes] = await Promise.all([
        safeFetch("/api/bookings/mine"),
        safeFetch("/api/donors/status"),
      ]);

      if (bookingsRes.status === 401 || donorRes.status === 401) {
        router.push("/login?redirect=/my-requests");
        return;
      }

      const bookingsData = await bookingsRes.json();
      const donorData = await donorRes.json();

      setBookings(bookingsData.bookings || []);
      setHasDonorApplication(!!donorData.alreadyRegistered);
      setDonorStatus(donorData.donor || null);
    } catch (err) {
      if (isOfflineError(err)) setOffline(true);
    } finally {
      setLoading(false);
    }
  };

  if (offline) {
    return (
      <div className="min-h-screen bg-[#FBF7F1] flex items-center justify-center px-4">
        <OfflineCard
          title="Internet Required"
          description="Your requests can't be loaded right now. Reconnect and try again."
          onRetry={load}
        />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FBF7F1] flex items-center justify-center">
        <p className="text-[#5B5964]">{mt.loading}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FBF7F1] py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className={`${display.className} text-3xl md:text-4xl font-bold text-[#C81E3A] mb-3`}>
            {mt.title}
          </h1>
          <p className="text-[#5B5964]">{mt.desc}</p>
        </div>

        {/* Donor Application Status */}
        <Section title={mt.donor_status_title}>
          {!hasDonorApplication ? (
            <EmptyState
              text={mt.no_donor_application}
              ctaText={mt.become_donor_cta}
              ctaHref="/become-donor"
            />
          ) : (
            donorStatus && (
              <div className="bg-white rounded-2xl shadow-sm border border-black/5 p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className={`${mono.className} text-sm font-semibold text-[#C81E3A]`}>
                    {donorStatus.bloodGroup} · {donorStatus.city}
                  </span>
                  <StatusBadge status={donorStatus.status} context="donor" />
                </div>

                <p className="text-sm text-[#5B5964]">
                  {donorStatus.status === "pending" && mt.donor_status_pending}
                  {donorStatus.status === "approved" && mt.donor_status_approved}
                  {donorStatus.status === "rejected" && mt.donor_status_rejected}
                </p>

                {donorStatus.status === "rejected" && donorStatus.rejectionReason && (
                  <p className="text-xs text-black/40 mt-2">
                    {mt.rejection_reason_label}: {donorStatus.rejectionReason}
                  </p>
                )}
              </div>
            )
          )}
        </Section>

        {/* Blood Requests (Bookings) */}
        <Section title={mt.requests_title}>
          {bookings.length === 0 ? (
            <EmptyState
              text={mt.no_requests}
              ctaText={mt.new_request_cta}
              ctaHref="/book-blood"
            />
          ) : (
            <div className="space-y-4">
              {bookings.map((b) => (
                <div
                  key={b._id}
                  className="bg-white rounded-2xl shadow-sm border border-black/5 p-6"
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <p className={`${display.className} font-bold text-[#15141A]`}>
                        {b.patientName}
                      </p>
                      <p className={`${mono.className} text-xs text-[#5B5964] mt-1`}>
                        {b.bloodGroup} · {b.bloodUnits} {mt.units_label}
                      </p>
                    </div>
                    <StatusBadge status={b.status} context="request" />
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs text-[#5B5964]">
                    <p>
                      <span className="font-semibold text-[#15141A]">{mt.hospital_label}:</span>{" "}
                      {b.hospital}
                    </p>
                    <p>
                      <span className="font-semibold text-[#15141A]">{mt.city_label}:</span> {b.city}
                    </p>
                  </div>

                  <p className="text-[11px] text-black/30 mt-3">
                    {mt.submitted_label}: {timeAgo(b.createdAt)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </Section>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-12">
      <h2 className={`${display.className} text-xl font-bold text-[#15141A] mb-4`}>{title}</h2>
      {children}
    </div>
  );
}

function EmptyState({
  text,
  ctaText,
  ctaHref,
}: {
  text: string;
  ctaText: string;
  ctaHref: string;
}) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-black/5 p-8 text-center">
      <p className="text-[#5B5964] mb-5">{text}</p>
      <Link
        href={ctaHref}
        className="inline-block bg-[#C81E3A] hover:bg-[#A11530] text-white px-6 py-2.5 rounded-xl font-semibold text-sm transition"
      >
        {ctaText}
      </Link>
    </div>
  );
}

const STATUS_STYLES: Record<string, { bg: string; text: string }> = {
  pending: { bg: "#B4530918", text: "#B45309" },
  approved: { bg: "#0F6E6618", text: "#0F6E66" },
  rejected: { bg: "#C81E3A18", text: "#C81E3A" },
  cancelled: { bg: "#00000012", text: "#5B5964" },
};

function StatusBadge({
  status,
  context,
}: {
  status: string;
  context: "donor" | "request";
}) {
  const { lang } = useLanguage();
  const mt = myRequestsTranslations[lang];
  const style = STATUS_STYLES[status] || STATUS_STYLES.pending;

  const labelKey =
    context === "donor" ? `donor_badge_${status}` : `status_${status}`;

  const label = mt[labelKey] || status;

  return (
    <span
      className="text-[11px] font-bold px-3 py-1 rounded-full shrink-0"
      style={{ backgroundColor: style.bg, color: style.text }}
    >
      {label}
    </span>
  );
}