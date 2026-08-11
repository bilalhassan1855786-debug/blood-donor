import { isAvailable } from "./donorUtils";

export function enrichDonors(donors: any[]) {
  return donors.map((d) => ({
    ...d._doc,
    available: isAvailable(d.lastDonationDate),
  }));
}