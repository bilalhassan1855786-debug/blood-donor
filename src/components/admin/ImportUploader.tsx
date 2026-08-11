"use client";

import { useRef, useState } from "react";
import { safeFetch, isOfflineError } from "@/lib/safeFetch";

function endpointForFile(fileName: string): string {
  const ext = fileName.toLowerCase().split(".").pop() || "";
  if (["jpg", "jpeg", "png", "webp"].includes(ext)) return "/api/admin/import/image";
  if (ext === "pdf") return "/api/admin/import/pdf";
  return "/api/admin/import/excel";
}

export default function ImportUploader({
  t,
  onParsed,
  onError,
}: {
  t: Record<string, string>;
  onParsed: (data: any) => void;
  onError: (message: string) => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState("");
  const [isSlowSource, setIsSlowSource] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const endpoint = endpointForFile(file.name);
    setIsSlowSource(endpoint !== "/api/admin/import/excel");

    setFileName(file.name);
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await safeFetch(endpoint, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        onError(data.message || t.error_generic);
        setLoading(false);
        return;
      }

      onParsed(data);
    } catch (err) {
      if (isOfflineError(err)) {
        onError("📡 You're offline. Please reconnect and try uploading again.");
      } else {
        onError(t.error_generic);
      }
    } finally {
      setLoading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-black/5 shadow-sm p-10 text-center">
      <div className="text-5xl mb-4">📊</div>

      <h2 className="text-xl font-bold text-[#15141A] mb-2">{t.upload_title}</h2>
      <p className="text-[#5B5964] text-sm mb-8">{t.upload_desc}</p>

      <label className="inline-block cursor-pointer bg-[#C81E3A] hover:bg-[#A11530] text-white px-8 py-3 rounded-xl font-semibold transition">
        {t.choose_file}
        <input
          ref={fileInputRef}
          type="file"
          accept=".xlsx,.xls,.csv,.jpg,.jpeg,.png,.webp,.pdf"
          onChange={handleFileChange}
          className="hidden"
          disabled={loading}
        />
      </label>

      {loading && (
        <p className="text-sm text-[#5B5964] mt-4 motion-safe:animate-pulse">
          {isSlowSource ? t.ocr_processing : t.parsing}
        </p>
      )}

      {fileName && !loading && (
        <p className="text-xs text-black/40 mt-4">{fileName}</p>
      )}

      <div className="mt-8 pt-6 border-t border-black/5">
        <a
          href="/sample-donors.csv"
          download
          className="text-sm text-[#0F6E66] font-semibold hover:underline"
        >
          📥 {t.download_sample}
        </a>
      </div>
    </div>
  );
}