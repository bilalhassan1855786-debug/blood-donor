import { Lang } from "./index";

export const importDonorsTranslations: Record<
  Lang,
  Record<string, string>
> = {
  en: {
    page_title: "Import Donors",
    page_desc:
      "Upload an Excel or CSV file to add many donors at once. Only Name and Blood Group are required — everything else is optional.",

    upload_title: "Upload File",
    upload_desc:
      "Supports .xlsx, .xls, .csv spreadsheets, or a photo/PDF of a donor register.",
    choose_file: "Choose File",
    parsing: "Reading and checking your file...",
    ocr_processing: "Reading text from your file — this can take a bit longer...",
    download_sample: "Download Sample File",

    preview_title: "Review Before Importing",
    preview_desc:
      "Rows marked valid will be imported. Duplicate or invalid rows are unchecked by default — you can still include them manually.",

    col_select: "Include",
    col_name: "Name",
    col_blood_group: "Blood Group",
    col_phone: "Phone",
    col_city: "City",
    col_status: "Status",
    col_reason: "Reason",

    status_valid: "Valid",
    status_duplicate: "Duplicate",
    status_invalid: "Invalid",

    selected_count: "selected of",
    confirm_import: "Confirm Import",
    importing: "Importing...",
    back_to_upload: "Upload a Different File",

    summary_title: "Import Complete",
    summary_total: "Total Rows",
    summary_imported: "Imported",
    summary_skipped: "Skipped",
    summary_failed: "Failed",
    default_password_notice:
      "All imported donors were given the default password 123456. They'll be asked to change it on first login.",
    import_another: "Import Another File",
    go_to_donors: "Go to Donor Management",

    error_no_file: "Please choose a file first",
    error_generic: "Something went wrong. Please try again.",
  },

  ur: {
    page_title: "ڈونرز امپورٹ کریں",
    page_desc:
      "ایک ساتھ کئی ڈونرز شامل کرنے کے لیے Excel یا CSV فائل اپ لوڈ کریں۔ صرف نام اور بلڈ گروپ ضروری ہیں — باقی سب اختیاری ہے۔",

    upload_title: "فائل اپ لوڈ کریں",
    upload_desc:
      "xlsx، xls، csv سپریڈشیٹس، یا ڈونر رجسٹر کی تصویر/PDF سپورٹ ہوتی ہے۔",
    choose_file: "فائل منتخب کریں",
    parsing: "آپ کی فائل پڑھی اور جانچی جا رہی ہے...",
    ocr_processing: "آپ کی فائل سے متن پڑھا جا رہا ہے — اس میں تھوڑا وقت لگ سکتا ہے...",
    download_sample: "نمونہ فائل ڈاؤن لوڈ کریں",

    preview_title: "امپورٹ سے پہلے جائزہ لیں",
    preview_desc:
      "درست نشان زدہ قطاریں امپورٹ ہوں گی۔ ڈپلیکیٹ یا غلط قطاریں ڈیفالٹ کے طور پر ان چیک ہیں — آپ چاہیں تو انہیں دستی طور پر شامل کر سکتے ہیں۔",

    col_select: "شامل کریں",
    col_name: "نام",
    col_blood_group: "بلڈ گروپ",
    col_phone: "فون",
    col_city: "شہر",
    col_status: "صورتحال",
    col_reason: "وجہ",

    status_valid: "درست",
    status_duplicate: "ڈپلیکیٹ",
    status_invalid: "غلط",

    selected_count: "منتخب از",
    confirm_import: "امپورٹ کی تصدیق کریں",
    importing: "امپورٹ ہو رہا ہے...",
    back_to_upload: "دوسری فائل اپ لوڈ کریں",

    summary_title: "امپورٹ مکمل ہوگئی",
    summary_total: "کل قطاریں",
    summary_imported: "امپورٹ شدہ",
    summary_skipped: "نظر انداز شدہ",
    summary_failed: "ناکام",
    default_password_notice:
      "تمام امپورٹ شدہ ڈونرز کو ڈیفالٹ پاس ورڈ 123456 دیا گیا ہے۔ پہلی لاگ ان پر انہیں پاس ورڈ تبدیل کرنے کو کہا جائے گا۔",
    import_another: "دوسری فائل امپورٹ کریں",
    go_to_donors: "ڈونر مینجمنٹ پر جائیں",

    error_no_file: "پہلے ایک فائل منتخب کریں",
    error_generic: "کچھ غلط ہو گیا۔ دوبارہ کوشش کریں۔",
  },

  roman: {
    page_title: "Donors Import Karein",
    page_desc:
      "Aik sath kai donors add karne ke liye Excel ya CSV file upload karein. Sirf Name aur Blood Group zaroori hain — baqi sab optional hai.",

    upload_title: "File Upload Karein",
    upload_desc:
      ".xlsx, .xls, .csv spreadsheets, ya donor register ki photo/PDF support hoti hai.",
    choose_file: "File Muntakhib Karein",
    parsing: "Aapki file parhi aur check ki ja rahi hai...",
    ocr_processing: "Aapki file se text parha ja raha hai — isme thora waqt lag sakta hai...",
    download_sample: "Sample File Download Karein",

    preview_title: "Import Se Pehle Jaiza Lein",
    preview_desc:
      "Valid mark ki gayi rows import hongi. Duplicate ya invalid rows default taur par unchecked hain — chahen to unhein manually include kar sakte hain.",

    col_select: "Shamil Karein",
    col_name: "Naam",
    col_blood_group: "Blood Group",
    col_phone: "Phone",
    col_city: "City",
    col_status: "Status",
    col_reason: "Wajah",

    status_valid: "Valid",
    status_duplicate: "Duplicate",
    status_invalid: "Invalid",

    selected_count: "select ki gayi",
    confirm_import: "Import Confirm Karein",
    importing: "Import Ho Raha Hai...",
    back_to_upload: "Dusri File Upload Karein",

    summary_title: "Import Mukammal Ho Gaya",
    summary_total: "Kul Rows",
    summary_imported: "Import Hui",
    summary_skipped: "Skip Hui",
    summary_failed: "Fail Hui",
    default_password_notice:
      "Sab imported donors ko default password 123456 diya gaya hai. Pehli login par unhein password change karne ko kaha jayega.",
    import_another: "Dusri File Import Karein",
    go_to_donors: "Donor Management Par Jayein",

    error_no_file: "Pehle ek file muntakhib karein",
    error_generic: "Kuch ghalat ho gaya. Dobara koshish karein.",
  },
};