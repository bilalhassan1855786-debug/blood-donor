import { ParsedDonorRow } from "./types";

const aliases: Record<
  string,
  string[]
> = {
  fullName: [
    "name",
    "full name",
    "fullname",
    "donor",
    "donor name",
    "نام",
  ],

  fatherName: [
    "father",
    "father name",
    "fathername",
    "والد",
  ],

  whatsappNumber: [
    "phone",
    "mobile",
    "number",
    "contact",
    "whatsapp",
    "phone number",
    "موبائل",
  ],

  bloodGroup: [
    "blood",
    "blood group",
    "group",
    "bloodgroup",
    "بلڈ گروپ",
  ],

  city: [
    "city",
    "district",
    "شہر",
  ],

  presentAddress: [
    "address",
    "present address",
    "موجودہ پتہ",
  ],

  permanentAddress: [
    "permanent address",
    "مستقل پتہ",
  ],

  cnic: [
    "cnic",
    "id",
    "شناختی کارڈ",
  ],

  age: [
    "age",
    "عمر",
  ],

  weight: [
    "weight",
    "وزن",
  ],

  email: [
    "email",
    "mail",
  ],
};

function findValue(
  row: Record<
    string,
    any
  >,
  keys: string[]
) {
  const entries =
    Object.entries(row);

  for (const [k, v] of entries) {
    const key = k
      .toLowerCase()
      .trim();

    if (
      keys.includes(key)
    ) {
      return v;
    }
  }

  return "";
}

export function mapExcelRow(
  row: Record<
    string,
    any
  >
): ParsedDonorRow {
  return {
    fullName: String(
      findValue(
        row,
        aliases.fullName
      )
    ),

    fatherName: String(
      findValue(
        row,
        aliases.fatherName
      )
    ),

    whatsappNumber:
      String(
        findValue(
          row,
          aliases.whatsappNumber
        )
      ),

    bloodGroup: String(
      findValue(
        row,
        aliases.bloodGroup
      )
    ),

    city: String(
      findValue(
        row,
        aliases.city
      )
    ),

    presentAddress:
      String(
        findValue(
          row,
          aliases.presentAddress
        )
      ),

    permanentAddress:
      String(
        findValue(
          row,
          aliases.permanentAddress
        )
      ),

    cnic: String(
      findValue(
        row,
        aliases.cnic
      )
    ),

    age: Number(
      findValue(
        row,
        aliases.age
      )
    ) || null,

    weight: Number(
      findValue(
        row,
        aliases.weight
      )
    ) || null,

    email: String(
      findValue(
        row,
        aliases.email
      )
    ),
  };
}