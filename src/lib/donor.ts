export function isEligibleForDonation(lastDonationDate?: string) {
  if (!lastDonationDate) return true;

  const lastDate = new Date(lastDonationDate);
  const today = new Date();

  const diffTime = today.getTime() - lastDate.getTime();
  const diffDays = diffTime / (1000 * 3600 * 24);

  return diffDays >= 90;
}