export type Lang = "en" | "ur" | "roman";

export type TranslationKeys =
  | "home"
  | "profile_title"
| "edit_profile"
| "loading_profile"
| "full_name"
| "father_name"
| "role"
| "whatsapp_number"
| "local_number"
| "blood_group"
| "cnic"
| "present_address"
| "permanent_address"
| "update_profile"
| "profile_updated"
| "update_failed"
  | "about"
  | "team"
  | "donors"
  | "become_donor"
  | "request_blood"
  | "contact"
  | "login"
  | "signup"
  | "logout"
  | "admin_panel"
  | "add_donor"
  | "super_admin"
  | "your_name"
  | "patient_name"
  | "patient_age"
  | "select_gender"
  | "male"
  | "female"
  | "disease_reason"
  | "select_blood_group"
  | "hospital_name"
  | "hospital_location"
  | "hospital_address"
  | "city"
  | "contact_number"
  | "additional_notes"
  | "normal"
  | "urgent"
  | "critical"
  | "submit_request"
  | "blood_request_form"
  | "blood_request_success"
  | "contact_team_title"
  | "contact_team_subtitle"
  | "our_team"
  | "send_message"
  | "emergency_title"
  | "emergency_desc"
  | "find_donors"
  | "email"
  | "subject"
  | "message"
  | "send_message_btn"
  | "sending"
  | "loading"
  | "message_sent_success"
  | "message_failed"
  | "something_wrong"
  | "admin"
  | "call"
  | "donor_agreement"
| "agree_terms"
| "transport_support"
| "transport_yes"
| "transport_partial"
| "transport_no"
| "no_donor_found"
| "no_donor_message"
| "call_emergency_team"
| "whatsapp_team"
| "register_as_donor_message"
  | "agreement_1"
  | "agreement_2"
  | "agreement_3"
  | "agreement_4"
  | "change_password"
  | "availability"
  | "available"
  | "busy"
  | "out_of_city"
  | "unavailable"
  | "total_donations"
  | "uploading_image"
  | "back"
  | "last_donation_date"
  | "gender"
| "age"
| "weight"
| "privacy_policy"
| "accept_terms"
| "donor_commitment"
| "privacy_policy"
| "privacy_policy_desc"
| "accept_terms"
| "continue_btn"

| "platform_purpose"
| "platform_purpose_desc"

| "term_1"
| "term_2"
| "term_3"
| "term_4"
| "term_5"
| "term_6"
| "term_7"
| "term_8"
| "term_9"
| "term_10"
| "term_11"
| "term_12"
| "term_13"
| "term_14"
| "term_15"

| "medical_disclaimer"
| "agree_all_terms"
| "terms_accepted"
| "i_understand"
| "health_check"
| "health_check_desc"

| "age_confirm"
| "weight_question"

| "have_hepatitis"
| "have_hiv"
| "blood_disease"
| "serious_disease"

| "recent_surgery"
| "fever"

| "pregnancy_question"
| "doctor_restriction"

| "last_donation_question"

| "health_declaration"

| "eligible"
| "not_eligible"
| "donor_commitment"
| "self_responsibility"
| "no_guarantee"
| "respect_policy"
| "correct_information"
| "data_privacy"
| "notification_consent"
| "no_blood_selling"

| "health_passed"
| "health_failed"

| "save_and_continue"

| "yes"
| "no"

| "proceed_to_donor_form"
| "data_privacy"
| "data_visibility"
| "data_security"

| "notification_consent"

| "respect_policy"
| "no_abuse"

| "no_blood_selling"

| "correct_information"

| "recipient_notice"
| "recipient_notice_desc"

| "policy_updates"
| "child"
| "blood_units"
| "patient_hb"

| "minimum_age"
| "availability"
| "available"
| "busy"
| "out_of_city"
| "unavailable"
| "total_donations"
| "uploading_image"
| "back"
| "change_password"
| "last_donation_date"
| "gender"
| "age"
| "weight"
| "date_needed"
| "urgency"
| "use_current_location"
| "latitude"
| "longitude"
| "additional_notes"
| "blood_units"
| "patient_hb"
| "use_current_location"
| "latitude"
| "longitude"
| "child"
| "transport_support"
| "transport_yes"
| "transport_partial"
| "transport_no"
| "hospital_location"
| "additional_notes"
| "patient_age"
| "blood_request_form"
| "your_name"
| "patient_name"
| "select_gender"
| "male"
| "female"
| "disease_reason"
| "select_blood_group"
| "hospital_name"
| "city"
| "contact_number"
| "date_needed"
| "select_urgency"
| "normal"
| "urgent"
| "critical"
| "submit_request"
| "blood_request_success"

// Use Partial for translations to allow incomplete language maps during development
export const translations: Record<Lang, Partial<Record<TranslationKeys, string>>> = {
  en: {
    home: "Home",
    about: "About",
    team: "Team",
    donors: "Donors",
    become_donor: "Become Donor",
    request_blood: "Request Blood",
    contact: "Contact",
    login: "Login",
    signup: "Signup",
    logout: "Logout",
    admin_panel: "Admin Panel",
    add_donor: "Add Donor",
    super_admin: "Super Admin",

    your_name: "Your Name",
    patient_name: "Patient Name",
    patient_age: "Patient Age",
    select_gender: "Select Gender",
    male: "Male",
    female: "Female",
    disease_reason: "Disease / Reason",
    select_blood_group: "Select Blood Group",
    hospital_name: "Hospital Name",
    hospital_location: "Hospital Address",
    city: "City",
    contact_number: "Contact Number",
    additional_notes: "Additional Notes",

    normal: "Normal",
    urgent: "Urgent",
    critical: "Critical",

    submit_request: "Submit Request",
    blood_request_form: "Blood Request Form",
    blood_request_success: "Blood Request Submitted Successfully",

    contact_team_title: "Contact Our Team",
    contact_team_subtitle: "Need blood urgently or want to contact team?",
    our_team: "Our Team",
    send_message: "Send Message",
    emergency_title: "Emergency Blood Need",
    emergency_desc: "Contact team immediately in emergency.",
    find_donors: "Find Donors",

    email: "Email",
    subject: "Subject",
    message: "Message",

    send_message_btn: "Send Message",
    sending: "Sending...",
    loading: "Loading...",

    message_sent_success: "Message sent successfully!",
    message_failed: "Failed to send message",
    something_wrong: "Something went wrong",

    admin: "Admin",
    call: "Call",
    profile_title: "My Profile",
edit_profile: "Edit Profile",
loading_profile: "Loading Profile...",

full_name: "Full Name",
father_name: "Father Name",
role: "Role",
whatsapp_number: "WhatsApp Number",
local_number: "Local Number",
blood_group: "Blood Group",
cnic: "CNIC",

present_address: "Present Address",
permanent_address: "Permanent Address",

update_profile: "Update Profile",

profile_updated: "Profile updated successfully",
update_failed: "Update failed",
donor_agreement: "Donor Declaration",
agree_terms:
  "I agree to respond to blood requests whenever possible and provide correct information.",

transport_support: "Transport Support",
transport_yes: "I can provide pick & drop",
transport_partial: "Can share travel expenses",
transport_no: "Cannot provide transport",

no_donor_found: "No Donors Found",

no_donor_message:
  "No donor was found in your selected area.",

call_emergency_team: "Call Emergency Team",

whatsapp_team: "WhatsApp Team",

register_as_donor_message:
  "Register as a donor and invite friends so more people can find blood in future.",
  agreement_1:
  "I confirm that the information provided is correct.",

agreement_2:
  "I will try to respond to blood requests whenever possible.",

agreement_3:
  "I understand that blood donation depends on my health condition and availability.",

agreement_4:
  "I understand that this platform is built to help save lives.",
  change_password: "Change Password",

availability: "Availability",

available: "Available",

busy: "Busy",

out_of_city: "Out of City",

unavailable: "Unavailable",

total_donations: "Total Donations",

uploading_image: "Uploading image...",

back: "Back",

last_donation_date: "Last Donation Date",
gender: "Gender",
age: "Age",
weight: "Weight",
privacy_policy: "Privacy Policy & Terms",
accept_terms: "I accept all terms and conditions",
continue_btn: "Continue",

donor_commitment:
  "I will try my best to donate blood whenever someone needs it in an emergency.",

self_responsibility:
  "If I donate blood despite being medically unfit and suffer any harm, I understand that I am personally responsible, not the app team.",

no_guarantee:
  "I understand that the team cannot guarantee that every blood request will be fulfilled.",

respect_policy:
  "I agree to treat all users with respect and dignity.",

correct_information:
  "I confirm that all information provided by me is true and accurate.",

data_privacy:
  "I understand that my personal data will only be used for blood donation and emergency purposes.",

notification_consent:
  "I agree to receive notifications, SMS, WhatsApp messages, or emails related to blood requests.",

no_blood_selling:
  "I understand that buying or selling blood is strictly prohibited.",

medical_disclaimer:
  "I understand that this platform is not a hospital or blood bank.",

health_check: "Health Check",
health_check_desc:
  "Please answer honestly to determine your eligibility.",

have_hepatitis:
  "Do you have Hepatitis B or C?",

have_hiv:
  "Do you have HIV/AIDS?",

blood_disease:
  "Do you have any blood-related disease?",

recent_surgery:
  "Have you had surgery recently?",

fever:
  "Do you currently have a fever or serious infection?",

weight_question:
  "Is your weight 50kg or above?",

health_passed:
  "Congratulations! You passed the basic health screening.",

health_failed:
  "Unfortunately, you are currently not eligible to donate blood.",
blood_units: "Blood Units Required",
patient_hb: "Patient HB",
urgency: "Urgency",
use_current_location: "Use Current Location",
latitude: "Latitude",
longitude: "Longitude",
hospital_address: "Hospital Address",
child: "Child",
date_needed: "Date Needed",

  },

  ur: {
    home: "ہوم",
    about: "ہمارے بارے میں",
    team: "ٹیم",
    donors: "ڈونرز",
    become_donor: "ڈونر بنیں",
    request_blood: "خون کی درخواست",
    contact: "رابطہ",
    login: "لاگ اِن",
    signup: "سائن اَپ",
    logout: "لاگ آؤٹ",
    admin_panel: "ایڈمن پینل",
    add_donor: "ڈونر شامل کریں",
    super_admin: "سپر ایڈمن",

    your_name: "آپ کا نام",
    patient_name: "مریض کا نام",
    patient_age: "مریض کی عمر",
    select_gender: "جنس منتخب کریں",
    male: "مرد",
    female: "عورت",
    disease_reason: "بیماری / وجہ",
    select_blood_group: "بلڈ گروپ منتخب کریں",
    hospital_name: "ہسپتال کا نام",
    hospital_location: "ہسپتال کا پتہ",
    city: "شہر",
    contact_number: "رابطہ نمبر",
    additional_notes: "اضافی معلومات",

    normal: "نارمل",
    urgent: "فوری",
    critical: "انتہائی ضروری",

    submit_request: "درخواست جمع کریں",
    blood_request_form: "خون کی درخواست فارم",
    blood_request_success: "خون کی درخواست کامیابی سے جمع ہو گئی",

    contact_team_title: "ہماری ٹیم سے رابطہ کریں",
    contact_team_subtitle: "فوری خون کی ضرورت یا رابطہ کریں",
    our_team: "ہماری ٹیم",
    send_message: "پیغام بھیجیں",
    emergency_title: "ایمرجنسی بلڈ ضرورت",
    emergency_desc: "فوری حالت میں ٹیم سے رابطہ کریں",
    find_donors: "ڈونرز تلاش کریں",

    email: "ای میل",
    subject: "موضوع",
    message: "پیغام",

    send_message_btn: "پیغام بھیجیں",
    sending: "بھیجا جا رہا ہے...",
    loading: "لوڈ ہو رہا ہے...",

    message_sent_success: "پیغام کامیابی سے بھیج دیا گیا!",
    message_failed: "پیغام بھیجنے میں ناکامی",
    something_wrong: "کچھ غلط ہو گیا",

    admin: "ایڈمن",
    call: "کال",
    profile_title: "میرا پروفائل",
edit_profile: "پروفائل ترمیم کریں",
loading_profile: "پروفائل لوڈ ہو رہا ہے...",

full_name: "پورا نام",
father_name: "والد کا نام",
role: "کردار",
whatsapp_number: "واٹس ایپ نمبر",
local_number: "مقامی نمبر",
blood_group: "بلڈ گروپ",
cnic: "شناختی کارڈ نمبر",

present_address: "موجودہ پتہ",
permanent_address: "مستقل پتہ",

update_profile: "پروفائل اپڈیٹ کریں",

profile_updated: "پروفائل کامیابی سے اپڈیٹ ہو گیا",
update_failed: "اپڈیٹ ناکام ہو گئی",
donor_agreement: "ڈونر اعلامیہ",

agree_terms:
  "میں تصدیق کرتا ہوں کہ ضرورت پڑنے پر خون عطیہ کرنے کی پوری کوشش کروں گا اور درست معلومات فراہم کروں گا۔",

transport_support: "سفری سہولت",

transport_yes:
  "میں پک اینڈ ڈراپ فراہم کر سکتا ہوں",

transport_partial:
  "میں سفری اخراجات میں حصہ ڈال سکتا ہوں",

transport_no:
  "میں سفری سہولت فراہم نہیں کر سکتا",

no_donor_found: "کوئی ڈونر نہیں ملا",

no_donor_message:
  "آپ کے منتخب کردہ علاقے میں کوئی ڈونر نہیں ملا۔",

call_emergency_team: "ایمرجنسی ٹیم کو کال کریں",

whatsapp_team: "واٹس ایپ ٹیم",

register_as_donor_message:
  "بطور ڈونر رجسٹر ہوں اور اپنے دوستوں کو بھی شامل کریں تاکہ آئندہ بہتر نتائج مل سکیں۔",
  agreement_1:
  "میں تصدیق کرتا ہوں کہ فراہم کردہ معلومات درست ہیں۔",

agreement_2:
  "میں ممکن ہونے پر خون کی درخواستوں کا جواب دینے کی کوشش کروں گا۔",

agreement_3:
  "میں سمجھتا ہوں کہ خون عطیہ کرنا میری صحت اور دستیابی پر منحصر ہے۔",

agreement_4:
  "میں سمجھتا ہوں کہ یہ پلیٹ فارم انسانی جانیں بچانے کے لیے بنایا گیا ہے۔",
  change_password: "پاس ورڈ تبدیل کریں",

availability: "دستیابی",

available: "دستیاب",

busy: "مصروف",

out_of_city: "شہر سے باہر",

unavailable: "دستیاب نہیں",

total_donations: "کل عطیات",

uploading_image: "تصویر اپ لوڈ ہو رہی ہے...",

back: "واپس",

last_donation_date: "آخری خون عطیہ کرنے کی تاریخ",
gender: "جنس",
age: "عمر",
weight: "وزن",
privacy_policy: "رازداری اور شرائط",
accept_terms: "میں تمام شرائط و ضوابط قبول کرتا ہوں",

donor_commitment:
  "میں ہنگامی صورتحال میں خون عطیہ کرنے کی پوری کوشش کروں گا۔",

self_responsibility:
  "اگر میں اپنی طبی حالت کو نظر انداز کر کے خون عطیہ کرتا ہوں اور مجھے کوئی نقصان ہوتا ہے تو اس کا ذمہ دار میں خود ہوں گا، نہ کہ ایپ ٹیم۔",

no_guarantee:
  "میں سمجھتا ہوں کہ ٹیم ہر خون کی درخواست مکمل ہونے کی ضمانت نہیں دے سکتی۔",

respect_policy:
  "میں تمام صارفین کے ساتھ عزت اور احترام سے پیش آنے پر متفق ہوں۔",

correct_information:
  "میں تصدیق کرتا ہوں کہ میری فراہم کردہ تمام معلومات درست ہیں۔",

data_privacy:
  "میں سمجھتا ہوں کہ میری ذاتی معلومات صرف خون عطیہ اور ہنگامی مقاصد کے لیے استعمال ہوں گی۔",

notification_consent:
  "میں خون کی درخواستوں سے متعلق اطلاعات، ایس ایم ایس، واٹس ایپ یا ای میل موصول کرنے سے اتفاق کرتا ہوں۔",

no_blood_selling:
  "میں سمجھتا ہوں کہ خون کی خرید و فروخت سختی سے ممنوع ہے۔",

medical_disclaimer:
  "میں سمجھتا ہوں کہ یہ پلیٹ فارم ہسپتال یا بلڈ بینک نہیں ہے۔",

health_check: "صحت کی جانچ",

have_hepatitis:
  "کیا آپ کو ہیپاٹائٹس بی یا سی ہے؟",

have_hiv:
  "کیا آپ کو ایچ آئی وی یا ایڈز ہے؟",

blood_disease:
  "کیا آپ کو خون سے متعلق کوئی بیماری ہے؟",

recent_surgery:
  "کیا آپ کی حال ہی میں سرجری ہوئی ہے؟",

fever:
  "کیا آپ کو اس وقت بخار یا کوئی سنگین انفیکشن ہے؟",

weight_question:
  "کیا آپ کا وزن 50 کلو یا اس سے زیادہ ہے؟",

health_passed:
  "مبارک ہو! آپ بنیادی صحت کی جانچ میں کامیاب ہو گئے ہیں۔",

health_failed:
  "معذرت، آپ فی الحال خون عطیہ کرنے کے اہل نہیں ہیں۔",
child: "بچہ",
blood_units: "خون کے مطلوبہ یونٹس",
patient_hb: "مریض کا ایچ بی",
urgency: "ہنگامی صورتحال",
use_current_location: "موجودہ مقام استعمال کریں",
latitude: "عرض البلد",
longitude: "طول البلد",
hospital_address: "ہسپتال کا مقام",
date_needed: "تاریخ ضرورت",   
  },

  roman: {
    home: "Home",
    about: "Hamaray baray mein",
    team: "Team",
    donors: "Donors",
    become_donor: "Donor bano",
    request_blood: "Khoon ki darkhwast",
    contact: "Rabta",
    login: "Login",
    signup: "Signup",
    logout: "Logout",
    admin_panel: "Admin Panel",
    add_donor: "Donor add karo",
    super_admin: "Super Admin",

    your_name: "Ap ka naam",
    patient_name: "Patient ka naam",
    patient_age: "Patient ki umar",
    select_gender: "Gender select karo",
    male: "Mard",
    female: "Aurat",
    disease_reason: "Bemari ya wajah",
    select_blood_group: "Blood group select karo",
    hospital_name: "Hospital ka naam",
    hospital_location: "Hospital ka address",
    city: "Shehar",
    contact_number: "Contact number",
    additional_notes: "Extra maloomat",

    normal: "Normal",
    urgent: "Urgent",
    critical: "Bahut urgent",

    submit_request: "Submit karo",
    blood_request_form: "Blood request form",
    blood_request_success: "Request submit ho gayi",

    contact_team_title: "Contact Our Team",
    contact_team_subtitle: "Need help or blood urgently?",
    our_team: "Our Team",
    send_message: "Send Message",
    emergency_title: "Emergency Blood Need",
    emergency_desc: "Contact team immediately in emergency",
    find_donors: "Find Donors",

    email: "Email",
    subject: "Subject",
    message: "Message",

    send_message_btn: "Send Message",
    sending: "Sending...",
    loading: "Loading...",

    message_sent_success: "Message sent successfully!",
    message_failed: "Failed to send message",
    something_wrong: "Something went wrong",

    admin: "Admin",
    call: "Call",
    profile_title: "Mera Profile",
edit_profile: "Profile Edit Karein",
loading_profile: "Profile Load Ho Raha Hai...",

full_name: "Poora Naam",
father_name: "Walid Ka Naam",
role: "Role",
whatsapp_number: "WhatsApp Number",
local_number: "Local Number",
blood_group: "Blood Group",
cnic: "CNIC Number",

present_address: "Mojooda Pata",
permanent_address: "Mustaqil Pata",

update_profile: "Profile Update Karein",

profile_updated: "Profile Kamyabi Se Update Ho Gaya",
update_failed: "Update Naakam Ho Gayi",
donor_agreement: "Donor Elan",

agree_terms:
  "Main tasdeeq karta hun ke zarurat parne par blood donate karne ki puri koshish karunga aur durust maloomat faraham karunga.",

transport_support: "Transport Support",

transport_yes:
  "Main pick and drop provide kar sakta hun",

transport_partial:
  "Main travel expense share kar sakta hun",

transport_no:
  "Main transport provide nahi kar sakta",

no_donor_found: "Koi donor nahi mila",

no_donor_message:
  "Aap ke selected area mein koi donor nahi mila.",

call_emergency_team:
  "Emergency Team ko Call Karein",

whatsapp_team:
  "WhatsApp Team",

register_as_donor_message:
  "Donor register karein aur apne doston ko bhi invite karein taake future mein behtar results mil sakein.",
agreement_1:
  "Main tasdeeq karta hun ke di gai maloomat durust hain.",

agreement_2:
  "Main mumkin hone par blood requests ka jawab dene ki koshish karunga.",

agreement_3:
  "Main samajhta hun ke blood donation meri sehat aur availability par depend karta hai.",

agreement_4:
  "Main samajhta hun ke ye platform insani zindagiyan bachane ke liye banaya gaya hai.",
change_password: "Password Tabdeel Karein",

availability: "Dastyabi",

available: "Dastiyab",

busy: "Masroof",

out_of_city: "Shehar Se Bahar",

unavailable: "Dastiyab Nahi",

total_donations: "Kul Donations",

uploading_image: "Tasveer Upload Ho Rahi Hai...",

back: "Wapis",

last_donation_date: "Aakhri Blood Donate Karne Ki Tareekh",
gender: "Gender",
age: "Umar",
weight: "Weight",
privacy_policy: "Privacy aur Terms",
accept_terms:
  "Main tamam terms aur conditions ko accept karta hun",

donor_commitment:
  "Main emergency mein blood donate karne ki puri koshish karunga.",

self_responsibility:
  "Agar main apni sehat ko nazar andaz karke blood donate karun aur mujhe nuqsan ho to us ka zimmedar main khud hunga, app team nahi.",

no_guarantee:
  "Main samajhta hun ke team har blood request poori hone ki guarantee nahi deti.",

respect_policy:
  "Main tamam users ke sath izzat aur ehtiram se pesh aunga.",

correct_information:
  "Main tasdeeq karta hun ke meri di hui tamam maloomat durust hain.",

data_privacy:
  "Main samajhta hun ke mera data sirf blood donation aur emergency purposes ke liye use hoga.",

notification_consent:
  "Main SMS, WhatsApp aur email notifications receive karne se mutafiq hun.",

no_blood_selling:
  "Main samajhta hun ke blood ki khareed o farokht sakht mana hai.",

medical_disclaimer:
  "Main samajhta hun ke ye platform hospital ya blood bank nahi hai.",

    health_check: "Health Check",

    have_hepatitis:
      "Kya aap ko Hepatitis B ya C hai?",

    have_hiv:
      "Kya aap ko HIV/AIDS hai?",

    blood_disease:
      "Kya aap ko blood se mutaliq koi bemari hai?",

    recent_surgery:
      "Kya aap ki haal hi mein surgery hui hai?",

    fever:
      "Kya aap ko is waqt bukhar ya serious infection hai?",

    weight_question:
      "Kya aap ka weight 50kg ya us se zyada hai?",

    health_passed:
      "Mubarak ho! Aap health screening pass kar gaye hain.",

    health_failed:
      "Maazrat, aap filhal blood donate karne ke eligible nahi hain.",
    child: "Bacha",
    blood_units: "Khoon ke Units",
    patient_hb: "Patient HB",
    urgency: "Urgency",
    use_current_location: "Current Location Istemal Karein",
    latitude: "Latitude",
    longitude: "Longitude",
  },
};

export function t(lang: Lang, key: TranslationKeys) {
  return translations[lang]?.[key] || translations.en[key] || key;
}