import { Lang } from "./index";

export const importAnalyticsTranslations: Record<
  Lang,
  Record<string, string>
> = {
  en: {
    title: "Import Analytics",
    desc: "A quick look at how bulk imports have grown your donor base.",

    total_imports: "Total Imports",
    today_imports: "Imported Today",
    total_donors_via_import: "Donors From Imports",
    last_import: "Last Import",
    last_import_none: "No imports yet",

    top_cities_title: "Top Cities",
    top_blood_groups_title: "Top Blood Groups",
    no_data: "Not enough data yet",

    loading: "Loading analytics...",
  },

  ur: {
    title: "امپورٹ اینالیٹکس",
    desc: "بلک امپورٹس نے آپ کے ڈونر بیس کو کیسے بڑھایا، اس پر ایک نظر۔",

    total_imports: "کل امپورٹس",
    today_imports: "آج امپورٹ ہوئے",
    total_donors_via_import: "امپورٹس سے ڈونرز",
    last_import: "آخری امپورٹ",
    last_import_none: "ابھی تک کوئی امپورٹ نہیں",

    top_cities_title: "سرِفہرست شہر",
    top_blood_groups_title: "سرِفہرست بلڈ گروپس",
    no_data: "ابھی کافی ڈیٹا نہیں",

    loading: "اینالیٹکس لوڈ ہو رہی ہے...",
  },

  roman: {
    title: "Import Analytics",
    desc: "Bulk imports ne aapka donor base kaise barhaya, ek nazar.",

    total_imports: "Kul Imports",
    today_imports: "Aaj Import Hue",
    total_donors_via_import: "Imports Se Donors",
    last_import: "Aakhri Import",
    last_import_none: "Abhi tak koi import nahi",

    top_cities_title: "Top Cities",
    top_blood_groups_title: "Top Blood Groups",
    no_data: "Abhi kaafi data nahi",

    loading: "Analytics load ho rahi hai...",
  },
};