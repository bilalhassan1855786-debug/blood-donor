import { Lang } from "./index";

export const importHistoryTranslations: Record<
  Lang,
  Record<string, string>
> = {
  en: {
    title: "Import History",
    desc: "Every bulk import you've run, with the option to undo one if something went wrong.",

    col_file: "File",
    col_date: "Date",
    col_admin: "Imported By",
    col_imported: "Imported",
    col_skipped: "Skipped",
    col_failed: "Failed",
    col_action: "Action",

    undo_btn: "Undo",
    undone_label: "Undone",
    undoing: "Undoing...",
    confirm_undo:
      "This will permanently delete every donor and account this import created. Are you sure?",
    undo_success: "Import undone successfully",

    loading: "Loading history...",
    empty: "No imports yet.",
  },

  ur: {
    title: "امپورٹ ہسٹری",
    desc: "آپ نے جتنے بھی بلک امپورٹ کیے، اور اگر کچھ غلط ہو جائے تو واپس (undo) کرنے کا آپشن۔",

    col_file: "فائل",
    col_date: "تاریخ",
    col_admin: "امپورٹ کرنے والا",
    col_imported: "امپورٹ شدہ",
    col_skipped: "نظر انداز شدہ",
    col_failed: "ناکام",
    col_action: "عمل",

    undo_btn: "واپس کریں",
    undone_label: "واپس ہو گیا",
    undoing: "واپس ہو رہا ہے...",
    confirm_undo:
      "اس سے اس امپورٹ کے بنائے گئے تمام ڈونرز اور اکاؤنٹس ہمیشہ کے لیے حذف ہو جائیں گے۔ کیا آپ کو یقین ہے؟",
    undo_success: "امپورٹ کامیابی سے واپس ہو گیا",

    loading: "ہسٹری لوڈ ہو رہی ہے...",
    empty: "ابھی تک کوئی امپورٹ نہیں ہوا۔",
  },

  roman: {
    title: "Import History",
    desc: "Aapne jitne bhi bulk imports kiye, aur agar kuch ghalat ho jaye to undo karne ka option.",

    col_file: "File",
    col_date: "Tareekh",
    col_admin: "Import Karne Wala",
    col_imported: "Imported",
    col_skipped: "Skipped",
    col_failed: "Failed",
    col_action: "Action",

    undo_btn: "Undo Karein",
    undone_label: "Undone",
    undoing: "Undo Ho Raha Hai...",
    confirm_undo:
      "Is se is import ke banaye gaye tamam donors aur accounts hamesha ke liye delete ho jayenge. Kya aap ko yaqeen hai?",
    undo_success: "Import kamyabi se undo ho gaya",

    loading: "History load ho rahi hai...",
    empty: "Abhi tak koi import nahi hua.",
  },
};