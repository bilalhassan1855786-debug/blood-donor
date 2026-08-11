import { Lang } from "./index";

type HealthTipsContent = {
  page_title: string;
  page_desc: string;

  ticker_general_label: string;
  ticker_before_label: string;
  ticker_after_label: string;
  ticker_facts_label: string;

  compatibility_title: string;
  compatibility_desc: string;
  select_prompt: string;
  can_donate_to: string;
  universal_donor: string;
  universal_recipient: string;
  donor_label: string;
  patient_label: string;

  general: string[];
  before: string[];
  after: string[];
  facts: string[];
};

export const healthTipsContent: Record<Lang, HealthTipsContent> = {
  en: {
    page_title: "Health Tips & Blood Compatibility",
    page_desc:
      "Simple health guidance for donors and patients, plus an interactive guide to blood group compatibility.",

    ticker_general_label: "Wellness Tip",
    ticker_before_label: "Before You Donate",
    ticker_after_label: "After You Donate",
    ticker_facts_label: "Did You Know?",

    compatibility_title: "Blood Compatibility Guide",
    compatibility_desc:
      "Tap any blood group above to see which patients can safely receive it.",
    select_prompt: "Tap a blood group to see who it can help",
    can_donate_to: "can donate to:",
    universal_donor: "everyone — the universal donor",
    universal_recipient: "can receive from any blood group",
    donor_label: "Donor",
    patient_label: "Patient",

    general: [
      "Drink at least 8 glasses of water a day to stay well hydrated.",
      "Eat iron-rich foods like spinach, red meat, and lentils to keep your blood healthy.",
      "Aim for 7–8 hours of sleep — it helps your body recover and stay strong.",
      "Regular light exercise, like a 20-minute walk, supports healthy circulation.",
      "Include vitamin C rich fruits like oranges to help your body absorb iron better.",
      "Avoid smoking — it reduces the oxygen-carrying capacity of your blood.",
    ],

    before: [
      "Eat a healthy meal 2–3 hours before donating blood.",
      "Drink extra water the night before and the morning of your donation.",
      "Get a full night's sleep before your donation appointment.",
      "Avoid fatty foods right before donating — they can affect test results.",
      "Wear a shirt with sleeves that roll up easily.",
      "Bring a valid ID and any donor documents with you.",
    ],

    after: [
      "Rest for 10–15 minutes after donating before you stand up.",
      "Drink extra fluids for the next 24–48 hours.",
      "Avoid heavy lifting or intense exercise for the rest of the day.",
      "Keep the bandage on for a few hours to avoid bruising.",
      "Eat iron-rich foods over the next few days to help replenish your levels.",
      "If you feel dizzy, sit or lie down immediately and inform staff.",
    ],

    facts: [
      "One blood donation can save up to 3 lives.",
      "O- is the universal donor — it can be given to any patient.",
      "AB+ is the universal recipient — it can receive blood from any group.",
      "Your body replaces the donated blood volume within 24–48 hours.",
      "A healthy adult can safely donate blood every 90 days.",
      "Less than 10% of eligible people donate blood each year, but demand never stops.",
    ],
  },

  ur: {
    page_title: "صحت کے مشورے اور بلڈ کمپیٹیبلٹی",
    page_desc:
      "ڈونرز اور مریضوں کے لیے آسان صحت رہنمائی، اور بلڈ گروپ کمپیٹیبلٹی کا انٹرایکٹو گائیڈ۔",

    ticker_general_label: "صحت کا مشورہ",
    ticker_before_label: "عطیہ سے پہلے",
    ticker_after_label: "عطیہ کے بعد",
    ticker_facts_label: "کیا آپ جانتے ہیں؟",

    compatibility_title: "بلڈ کمپیٹیبلٹی گائیڈ",
    compatibility_desc:
      "اوپر کوئی بھی بلڈ گروپ منتخب کریں تاکہ دیکھ سکیں کون سے مریض اسے محفوظ طریقے سے حاصل کر سکتے ہیں۔",
    select_prompt: "کسی بلڈ گروپ کو منتخب کریں اور دیکھیں یہ کس کی مدد کر سکتا ہے",
    can_donate_to: "یہ عطیہ کر سکتا ہے:",
    universal_donor: "ہر کسی کو — یونیورسل ڈونر",
    universal_recipient: "کسی بھی بلڈ گروپ سے حاصل کر سکتا ہے",
    donor_label: "ڈونر",
    patient_label: "مریض",

    general: [
      "ہائیڈریٹڈ رہنے کے لیے روزانہ کم از کم 8 گلاس پانی پییں۔",
      "خون کو صحت مند رکھنے کے لیے آئرن سے بھرپور غذائیں جیسے پالک، سرخ گوشت اور دال کھائیں۔",
      "7 سے 8 گھنٹے کی نیند لینے کی کوشش کریں — یہ جسم کو صحت یاب رکھتی ہے۔",
      "روزانہ 20 منٹ کی ہلکی ورزش صحت مند خون کی گردش میں مدد دیتی ہے۔",
      "وٹامن سی سے بھرپور پھل جیسے مالٹا کھائیں تاکہ جسم آئرن بہتر جذب کر سکے۔",
      "سگریٹ نوشی سے گریز کریں — یہ خون کی آکسیجن لے جانے کی صلاحیت کم کرتی ہے۔",
    ],

    before: [
      "خون عطیہ کرنے سے 2 سے 3 گھنٹے پہلے صحت بخش کھانا کھائیں۔",
      "عطیہ سے ایک رات پہلے اور صبح اضافی پانی پییں۔",
      "عطیہ کی اپائنٹمنٹ سے پہلے پوری نیند لیں۔",
      "عطیہ سے فوراً پہلے چکنائی والی غذاؤں سے گریز کریں۔",
      "ایسی قمیض پہنیں جس کی آستین آسانی سے موڑی جا سکے۔",
      "اپنے ساتھ شناختی کارڈ اور ڈونر دستاویزات لے کر جائیں۔",
    ],

    after: [
      "عطیہ کے بعد کھڑے ہونے سے پہلے 10 سے 15 منٹ آرام کریں۔",
      "اگلے 24 سے 48 گھنٹوں تک زیادہ مقدار میں مائع پییں۔",
      "باقی دن سخت ورزش یا وزن اٹھانے سے گریز کریں۔",
      "خراش سے بچنے کے لیے چند گھنٹے پٹی لگی رہنے دیں۔",
      "اگلے چند دنوں میں آئرن سے بھرپور غذائیں کھائیں۔",
      "اگر چکر آئیں تو فوراً بیٹھ یا لیٹ جائیں اور عملے کو بتائیں۔",
    ],

    facts: [
      "خون کا ایک عطیہ 3 جانیں بچا سکتا ہے۔",
      "O- یونیورسل ڈونر ہے — یہ کسی بھی مریض کو دیا جا سکتا ہے۔",
      "AB+ یونیورسل وصول کنندہ ہے — یہ کسی بھی گروپ سے خون حاصل کر سکتا ہے۔",
      "جسم عطیہ شدہ خون کی مقدار 24 سے 48 گھنٹوں میں پورا کر لیتا ہے۔",
      "ایک صحت مند بالغ ہر 90 دن بعد محفوظ طریقے سے خون عطیہ کر سکتا ہے۔",
      "اہل افراد میں سے 10 فیصد سے بھی کم لوگ سالانہ خون عطیہ کرتے ہیں، لیکن ضرورت کبھی نہیں رکتی۔",
    ],
  },

  roman: {
    page_title: "Health Tips Aur Blood Compatibility",
    page_desc:
      "Donors aur patients ke liye asaan health guidance, aur blood group compatibility ka interactive guide.",

    ticker_general_label: "Health Tip",
    ticker_before_label: "Donation Se Pehle",
    ticker_after_label: "Donation Ke Baad",
    ticker_facts_label: "Kya Aap Jantay Hain?",

    compatibility_title: "Blood Compatibility Guide",
    compatibility_desc:
      "Upar koi bhi blood group select karein taake dekh sakein kaun se patients isay mehfooz tareeqe se hasil kar sakte hain.",
    select_prompt: "Blood group select karein aur dekhein ye kis ki madad kar sakta hai",
    can_donate_to: "ye donate kar sakta hai:",
    universal_donor: "har kisi ko — universal donor",
    universal_recipient: "kisi bhi blood group se hasil kar sakta hai",
    donor_label: "Donor",
    patient_label: "Patient",

    general: [
      "Hydrated rehne ke liye roz kam az kam 8 glass pani piyein.",
      "Blood healthy rakhne ke liye iron-rich cheezein jaise palak, red meat aur daal khayein.",
      "7-8 ghante ki neend lene ki koshish karein — ye jism ko sehatyab rakhti hai.",
      "Roz 20 minute ki halki exercise healthy blood circulation mein madad deti hai.",
      "Vitamin C rich phal jaise orange khayein taake jism iron behtar absorb kar sake.",
      "Cigarette noshi se parhaiz karein — ye khoon ki oxygen le jaane ki salahiyat kam karti hai.",
    ],

    before: [
      "Blood donate karne se 2-3 ghante pehle sehatmand khana khayein.",
      "Donation se ek raat pehle aur subah extra pani piyein.",
      "Donation appointment se pehle puri neend lein.",
      "Donation se foran pehle chikna khana khane se parhaiz karein.",
      "Aisi shirt pehnein jiski aasteen aasani se mor sakein.",
      "Apne sath ID aur donor documents le kar jayein.",
    ],

    after: [
      "Donation ke baad khare hone se pehle 10-15 minute rest karein.",
      "Agle 24-48 ghanton tak zyada fluids piyein.",
      "Baqi din heavy exercise ya wazan uthane se parhaiz karein.",
      "Bruising se bachne ke liye kuch ghante bandage laga rehne dein.",
      "Agle kuch dinon mein iron-rich khana khayein.",
      "Agar chakkar ayein to foran baith ya let jayein aur staff ko batayein.",
    ],

    facts: [
      "Ek blood donation 3 zindagiyan bacha sakta hai.",
      "O- universal donor hai — ye kisi bhi patient ko diya ja sakta hai.",
      "AB+ universal recipient hai — ye kisi bhi group se blood hasil kar sakta hai.",
      "Jism donate kiya gaya blood volume 24-48 ghanton mein pura kar leta hai.",
      "Ek healthy adult har 90 din baad mehfooz tareeqe se blood donate kar sakta hai.",
      "Eligible logon mein se 10% se bhi kam log saalana blood donate karte hain, lekin zaroorat kabhi nahi rukti.",
    ],
  },
};