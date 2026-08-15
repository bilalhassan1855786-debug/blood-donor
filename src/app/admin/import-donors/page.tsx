"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { commonTranslations } from "@/lib/translations/common";
import { importDonorsTranslations } from "@/lib/translations/import-donors";
import { safeFetch, isOfflineError } from "@/lib/safeFetch";
import ImportUploader from "@/components/admin/ImportUploader";
import ImportPreview from "@/components/admin/ImportPreview";
import ImportSummary from "@/components/admin/ImportSummary";

type Step = "upload" | "preview" | "summary";

export default function ImportDonorsPage() {
  const { lang } = useLanguage();
  const t = {
    ...commonTranslations[lang],
    ...importDonorsTranslations[lang],
  };

  const [step, setStep] = useState<Step>("upload");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const [fileName, setFileName] = useState("");
  const [rows, setRows] = useState<any[]>([]);
  const [summary, setSummary] = useState<{
    total: number;
    imported: number;
    skipped: number;
    failed: number;
  } | null>(null);

  const handleParsed = (data: any) => {
    setError("");
    setFileName(data.fileName);
    setRows(data.rows);
    setStep("preview");
  };

  const handleConfirm = async (selectedRows: Record<string, any>[]) => {
    setSubmitting(true);
    setError("");

    try {
      const res = await safeFetch("/api/admin/import/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fileName, rows: selectedRows }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.message || t.error_generic);
        setSubmitting(false);
        return;
      }

      setSummary(data.summary);
      setStep("summary");
    } catch (err) {
      if (isOfflineError(err)) {
        setError("📡 You're offline. Please reconnect and confirm the import again.");
      } else {
        setError(t.error_generic);
      }
    } finally {
      setSubmitting(false);
    }
  };

  const reset = () => {
    setStep("upload");
    setRows([]);
    setFileName("");
    setSummary(null);
    setError("");
  };

  return (
    <div className="min-h-screen bg-[#FBF7F1] py-8 sm:py-10 md:py-12 px-3 sm:px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-2xl md:text-3xl font-bold text-[#C81E3A] mb-1 sm:mb-2">{t.page_title}</h1>
          <p className="text-[#5B5964] text-xs sm:text-sm max-w-xl mx-auto">{t.page_desc}</p>
        </div>

        {error && (
          <div className="bg-[#C81E3A12] border border-[#C81E3A40] rounded-lg sm:rounded-lg md:rounded-xl p-3 sm:p-4 mb-4 sm:mb-6 text-xs sm:text-sm text-[#C81E3A] text-center">
            {error}
          </div>
        )}

        {step === "upload" && (
          <ImportUploader t={t} onParsed={handleParsed} onError={setError} />
        )}

        {step === "preview" && (
          <ImportPreview
            t={t}
            fileName={fileName}
            rows={rows}
            onConfirm={handleConfirm}
            onBack={reset}
            submitting={submitting}
          />
        )}

        {step === "summary" && summary && (
          <ImportSummary t={t} summary={summary} onImportAnother={reset} />
        )}
      </div>
    </div>
  );
}