export function isAvailable(lastDonationDate: Date | null) {
  if (!lastDonationDate) return true;

  const diffDays =
    (Date.now() - new Date(lastDonationDate).getTime()) /
    (1000 * 60 * 60 * 24);

  return diffDays >= 90;
}