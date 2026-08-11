import { Lang } from "./index";

export const activityTranslations: Record<
  Lang,
  Record<string, string>
> = {
  en: {
    title:
      "Live Activity",

    desc:
      "A real-time look at our coordination team in action — every entry below is anonymized to protect donor and patient privacy.",

    empty:
      "No recent activity yet. Check back soon!",

    loading:
      "Loading activity...",

    request_verified:
      "blood request verified — team is finding a donor",

    request_fulfilled:
      "blood request fulfilled",

    donor_approved:
      "new donor approved",

    in_city:
      "in",
  },

  ur: {
    title:
      "لائیو سرگرمی",

    desc:
      "ہماری کوآرڈینیشن ٹیم کی حقیقی وقت میں سرگرمی — نیچے دی گئی ہر انٹری ڈونر اور مریض کی رازداری کے تحفظ کے لیے گمنام رکھی گئی ہے۔",

    empty:
      "ابھی تک کوئی حالیہ سرگرمی نہیں۔ جلد دوبارہ دیکھیں!",

    loading:
      "سرگرمی لوڈ ہو رہی ہے...",

    request_verified:
      "خون کی درخواست تصدیق شدہ — ٹیم ڈونر تلاش کر رہی ہے",

    request_fulfilled:
      "خون کی درخواست مکمل ہوگئی",

    donor_approved:
      "نیا ڈونر منظور ہوا",

    in_city:
      "میں",
  },

  roman: {
    title:
      "Live Activity",

    desc:
      "Hamari coordination team ki real-time activity — neechay har entry donor aur patient ki privacy ke liye anonymous rakhi gayi hai.",

    empty:
      "Abhi tak koi recent activity nahi. Jald dobara check karein!",

    loading:
      "Activity load ho rahi hai...",

    request_verified:
      "blood request verify hui — team donor talash kar rahi hai",

    request_fulfilled:
      "blood request mukammal hui",

    donor_approved:
      "naya donor approve hua",

    in_city:
      "mein",
  },
};