import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Donor from "@/models/Donor";
import { isEligibleForDonation } from "@/lib/donor";

export async function GET(request: NextRequest) {
  await connectDB();

  const { searchParams } = new URL(request.url);
  const bloodGroup = searchParams.get("bloodGroup") || "";
  const city = searchParams.get("city") || "";

  const filter: any = {};
  if (bloodGroup) filter.bloodGroup = bloodGroup;
  if (city) filter.city = { $regex: city, $options: "i" };

  const donors = await Donor.find(filter).lean();

  const totalDonors = donors.length;

  const eligibleDonors = donors.filter((donor: any) =>
    isEligibleForDonation(donor.lastDonationDate)
  );

  const eligible = eligibleDonors.length;
  const notEligible = totalDonors - eligible;

  const bloodStats = await Donor.aggregate([
    { $match: filter },
    { $group: { _id: "$bloodGroup", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
  ]);

  const cityStats = await Donor.aggregate([
    { $match: filter },
    { $group: { _id: "$city", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 20 },
  ]);

  const eligibleBloodStats = eligibleDonors.reduce((acc: any, donor: any) => {
    acc[donor.bloodGroup] = (acc[donor.bloodGroup] || 0) + 1;
    return acc;
  }, {});

  const eligibleBloodGroups = Object.entries(eligibleBloodStats).map(
    ([group, count]) => ({ _id: group, count })
  );

  const eligibleCityStats = eligibleDonors.reduce((acc: any, donor: any) => {
    acc[donor.city] = (acc[donor.city] || 0) + 1;
    return acc;
  }, {});

  const eligibleCities = Object.entries(eligibleCityStats).map(
    ([city, count]) => ({ _id: city, count })
  );

  return NextResponse.json({
    totalDonors,
    eligible,
    notEligible,
    bloodStats,
    cityStats,
    eligibleBloodGroups,
    eligibleCities,
  });
}