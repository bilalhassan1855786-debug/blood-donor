export const onlyLetters = (value: string) =>
  value.replace(/[^a-zA-Z\s]/g, "");

export const onlyNumbers = (value: string) =>
  value.replace(/\D/g, "");

export const formatCNIC = (value: string) => {
  const digits = value.replace(/\D/g, "");

  if (digits.length <= 5)
    return digits;

  if (digits.length <= 12)
    return `${digits.slice(0, 5)}-${digits.slice(5)}`;

  return `${digits.slice(0, 5)}-${digits.slice(
    5,
    12
  )}-${digits.slice(12, 13)}`;
};