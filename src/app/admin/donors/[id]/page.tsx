import connectDB from "@/lib/mongodb";
import Donor from "@/models/Donor";
import Link from "next/link";

export default async function DonorProfile({
  params,
}: {
  params: { id: string };
}) {
  await connectDB();

  const donor: any = await Donor.findById(
    params.id
  )
    .populate("approvedBy", "fullName")
    .lean();

  if (!donor) {
    return (
      <div className="p-10">
        Donor Not Found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-8">

        <div className="flex justify-between items-center mb-8">

          <h1 className="text-3xl font-bold text-red-600">
            Donor Profile
          </h1>

          <Link
            href="/admin/donors"
            className="bg-gray-700 text-white px-4 py-2 rounded-lg"
          >
            Back
          </Link>

        </div>

        <div className="grid md:grid-cols-2 gap-5">

          <div>
            <strong>Full Name:</strong>
            <p>{donor.fullName}</p>
          </div>

          <div>
            <strong>Father Name:</strong>
            <p>{donor.fatherName}</p>
          </div>

          <div>
            <strong>Blood Group:</strong>
            <p>{donor.bloodGroup}</p>
          </div>

          <div>
            <strong>CNIC:</strong>
            <p>{donor.cnic || "N/A"}</p>
          </div>

          <div>
            <strong>Age:</strong>
            <p>{donor.age || "N/A"}</p>
          </div>

          <div>
            <strong>Email:</strong>
            <p>{donor.email || "N/A"}</p>
          </div>

          <div>
            <strong>WhatsApp:</strong>
            <p>{donor.whatsappNumber}</p>
          </div>

          <div>
            <strong>Local Number:</strong>
            <p>{donor.localNumber || "N/A"}</p>
          </div>

          <div>
            <strong>City:</strong>
            <p>{donor.city}</p>
          </div>

          <div>
            <strong>Status:</strong>
            <p className="capitalize">
              {donor.status}
            </p>
          </div>

          <div>
            <strong>Availability:</strong>
            <p>
              {donor.availabilityStatus}
            </p>
          </div>

          <div>
            <strong>Transport:</strong>
            <p>
              {donor.transportSupport}
            </p>
          </div>

          <div className="md:col-span-2">
            <strong>
              Present Address:
            </strong>
            <p>
              {donor.presentAddress}
            </p>
          </div>

          <div className="md:col-span-2">
            <strong>
              Permanent Address:
            </strong>
            <p>
              {
                donor.permanentAddress
              }
            </p>
          </div>

          <div className="md:col-span-2">
            <strong>Bio:</strong>
            <p>
              {donor.bio ||
                "No Bio"}
            </p>
          </div>

          <div>
            <strong>
              Last Donation:
            </strong>
            <p>
              {donor.lastDonationDate
                ? new Date(
                    donor.lastDonationDate
                  ).toLocaleDateString()
                : "Never"}
            </p>
          </div>

          <div>
            <strong>
              Total Donations:
            </strong>
            <p>
              {donor.totalDonations}
            </p>
          </div>

          <div>
            <strong>
              Health Check:
            </strong>
            <p>
              {donor.healthChecked
                ? "Yes"
                : "No"}
            </p>
          </div>

          <div>
            <strong>
              Eligible:
            </strong>
            <p>
              {donor.isEligible
                ? "Yes"
                : "No"}
            </p>
          </div>

          <div>
            <strong>
              Approved By:
            </strong>
            <p>
              {donor.approvedBy
                ?.fullName ||
                "N/A"}
            </p>
          </div>

        </div>

        <div className="mt-8 flex gap-3">

          <a
            href={`https://wa.me/${donor.whatsappNumber}`}
            target="_blank"
            className="bg-green-600 text-white px-4 py-2 rounded-lg"
          >
            WhatsApp
          </a>

          <a
            href={`tel:${
              donor.localNumber ||
              donor.whatsappNumber
            }`}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Call
          </a>

        </div>

      </div>

    </div>
  );
}