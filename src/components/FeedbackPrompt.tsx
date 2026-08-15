"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { safeFetch } from "@/lib/safeFetch";

// Set this once the app is live on the Play Store, e.g.
// "https://play.google.com/store/apps/details?id=com.yourapp.id"
// Until then it stays empty and the prompt just says "thank you" instead
// of sending people to a store page that doesn't exist yet.
const PLAY_STORE_URL = "";

const RE_PROMPT_AFTER_MS = 3.5 * 24 * 60 * 60 * 1000; // ~3.5 days
const FIRST_PROMPT_DELAY_MS = 15 * 1000; // wait 15s after page load, don't ambush on arrival

const STORAGE_GIVEN = "feedback_given";
const STORAGE_LAST_PROMPT = "feedback_last_prompt";

const copy = {
  en: {
    title: "Enjoying the app?",
    subtitle: "Your feedback helps us improve.",
    yes: "Yes, I like it 👍",
    no: "Not really 👎",
    ratePrompt: "Great! Would you mind rating us on the Play Store?",
    rateButton: "Rate on Play Store",
    thanksNoStore: "Thanks for the feedback! We'll ask again once we're live on the Play Store.",
    feedbackPrompt: "Sorry to hear that. What can we improve?",
    feedbackPlaceholder: "Tell us what's not working...",
    submit: "Submit",
    later: "Maybe later",
    thankYou: "Thanks for letting us know — we'll work on it.",
  },
  ur: {
    title: "کیا آپ کو ایپ اچھی لگ رہی ہے؟",
    subtitle: "آپ کی رائے ہمیں بہتر بنانے میں مدد دیتی ہے۔",
    yes: "جی ہاں، اچھی لگ رہی ہے 👍",
    no: "کچھ خاص نہیں 👎",
    ratePrompt: "بہت خوب! کیا آپ ہمیں Play Store پر ریٹنگ دیں گے؟",
    rateButton: "Play Store پر ریٹ کریں",
    thanksNoStore: "شکریہ! جیسے ہی ہم Play Store پر آئیں گے دوبارہ پوچھیں گے۔",
    feedbackPrompt: "معذرت۔ ہم کیا بہتر کر سکتے ہیں؟",
    feedbackPlaceholder: "بتائیں کیا مسئلہ ہے...",
    submit: "بھیجیں",
    later: "بعد میں",
    thankYou: "شکریہ، ہم اس پر کام کریں گے۔",
  },
  roman: {
    title: "App kaisi lag rahi hai?",
    subtitle: "Aapki feedback humein behtar banane mein madad deti hai.",
    yes: "Ji han, achi lag rahi hai 👍",
    no: "Kuch khas nahi 👎",
    ratePrompt: "Zabardast! Kya aap humein Play Store par rating denge?",
    rateButton: "Play Store par Rate karein",
    thanksNoStore: "Shukriya! Jese hi hum Play Store par aayenge dubara poochenge.",
    feedbackPrompt: "Maazrat. Hum kya behtar kar sakte hain?",
    feedbackPlaceholder: "Batayein kya masla hai...",
    submit: "Bhejein",
    later: "Baad mein",
    thankYou: "Shukriya, hum is par kaam karenge.",
  },
};

type Step = "closed" | "ask" | "rate" | "feedback" | "done";

export default function FeedbackPrompt() {
  const { lang } = useLanguage();
  const t = copy[lang] || copy.en;

  const [step, setStep] = useState<Step>("closed");
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const given = localStorage.getItem(STORAGE_GIVEN);
    if (given === "true") return;

    const lastPrompt = localStorage.getItem(STORAGE_LAST_PROMPT);
    const lastPromptTime = lastPrompt ? Number(lastPrompt) : 0;
    const dueForPrompt = Date.now() - lastPromptTime >= RE_PROMPT_AFTER_MS;

    if (!dueForPrompt) return;

    const timer = setTimeout(() => {
      setStep("ask");
      localStorage.setItem(STORAGE_LAST_PROMPT, String(Date.now()));
    }, FIRST_PROMPT_DELAY_MS);

    return () => clearTimeout(timer);
  }, []);

  const dismiss = () => setStep("closed");

  const handlePositive = () => {
    setStep("rate");
  };

  const handleNegative = () => {
    setStep("feedback");
  };

  const finishPositive = async () => {
    localStorage.setItem(STORAGE_GIVEN, "true");
    setStep("done");
    try {
      await safeFetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sentiment: "positive",
          routedToStore: !!PLAY_STORE_URL,
        }),
      });
    } catch {
      // Non-critical — don't block the UI on this.
    }

    if (PLAY_STORE_URL) {
      window.open(PLAY_STORE_URL, "_blank");
    }

    setTimeout(() => setStep("closed"), 2500);
  };

  const submitFeedback = async () => {
    setSubmitting(true);
    try {
      await safeFetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sentiment: "negative",
          comment,
        }),
      });
    } catch {
      // Non-critical — still close out the flow for the user.
    } finally {
      setSubmitting(false);
      localStorage.setItem(STORAGE_GIVEN, "true");
      setStep("done");
      setTimeout(() => setStep("closed"), 2500);
    }
  };

  if (step === "closed") return null;

  return (
    <div className="fixed bottom-3 right-3 left-3 sm:left-auto sm:bottom-4 sm:right-4 sm:w-96 z-[9999]">
      <div className="bg-white rounded-lg sm:rounded-xl md:rounded-2xl shadow-2xl border border-black/10 p-3 sm:p-4 md:p-5 relative animate-in fade-in slide-in-from-bottom-4">
        <button
          onClick={dismiss}
          aria-label="Close"
          className="absolute top-2 sm:top-3 right-2 sm:right-3 text-[#5B5964] hover:text-black text-lg sm:text-lg leading-none"
        >
          ×
        </button>

        {step === "ask" && (
          <>
            <h3 className="font-bold text-[#15141A] mb-0.5 sm:mb-1 pr-6 text-sm sm:text-base">{t.title}</h3>
            <p className="text-xs sm:text-sm text-[#5B5964] mb-2 sm:mb-3 md:mb-4">{t.subtitle}</p>
            <div className="flex gap-1.5 sm:gap-2">
              <button
                onClick={handlePositive}
                className="flex-1 bg-[#C81E3A] hover:bg-[#A11530] text-white text-xs sm:text-sm font-semibold py-1.5 sm:py-2 rounded-lg transition"
              >
                {t.yes}
              </button>
              <button
                onClick={handleNegative}
                className="flex-1 bg-black/5 hover:bg-black/10 text-[#15141A] text-xs sm:text-sm font-semibold py-1.5 sm:py-2 rounded-lg transition"
              >
                {t.no}
              </button>
            </div>
          </>
        )}

        {step === "rate" && (
          <>
            <p className="text-xs sm:text-sm text-[#15141A] mb-2 sm:mb-3 md:mb-4">
              {PLAY_STORE_URL ? t.ratePrompt : t.thanksNoStore}
            </p>
            {PLAY_STORE_URL ? (
              <button
                onClick={finishPositive}
                className="w-full bg-[#C81E3A] hover:bg-[#A11530] text-white text-xs sm:text-sm font-semibold py-1.5 sm:py-2 rounded-lg transition"
              >
                {t.rateButton}
              </button>
            ) : (
              <button
                onClick={finishPositive}
                className="w-full bg-black/5 hover:bg-black/10 text-[#15141A] text-xs sm:text-sm font-semibold py-1.5 sm:py-2 rounded-lg transition"
              >
                OK
              </button>
            )}
          </>
        )}

        {step === "feedback" && (
          <>
            <p className="text-xs sm:text-sm text-[#15141A] mb-2 sm:mb-3 md:mb-4">{t.feedbackPrompt}</p>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder={t.feedbackPlaceholder}
              rows={2}
              className="w-full border border-black/10 rounded-lg p-2 text-xs sm:text-sm mb-2 sm:mb-3 md:mb-3 resize-none focus:outline-none focus:ring-2 focus:ring-[#C81E3A]/30"
            />
            <div className="flex gap-1.5 sm:gap-2">
              <button
                onClick={submitFeedback}
                disabled={submitting}
                className="flex-1 bg-[#C81E3A] hover:bg-[#A11530] disabled:opacity-60 text-white text-xs sm:text-sm font-semibold py-1.5 sm:py-2 rounded-lg transition"
              >
                {submitting ? "..." : t.submit}
              </button>
              <button
                onClick={dismiss}
                className="flex-1 bg-black/5 hover:bg-black/10 text-[#15141A] text-xs sm:text-sm font-semibold py-1.5 sm:py-2 rounded-lg transition"
              >
                {t.later}
              </button>
            </div>
          </>
        )}

        {step === "done" && (
          <p className="text-xs sm:text-sm text-[#15141A] text-center py-1.5 sm:py-2">{t.thankYou}</p>
        )}
      </div>
    </div>
  );
}