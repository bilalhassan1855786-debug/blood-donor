"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { commonTranslations } from "@/lib/translations/common";
import { importHistoryTranslations } from "@/lib/translations/import-history";
import { safeFetch, isOfflineError } from "@/lib/safeFetch";
import OfflineCard from "@/components/network/OfflineCard";

type HistoryItem = {
  _id: string;
  fileName: string;
  totalRows: number;
  imported: number;
  skipped: number;
  failed: number;
  undone: boolean;
  createdAt: string;
  importedBy?: { fullName: string };
};

export default function ImportHistoryPage() {
  const { lang } = useLanguage();
  const t = { ...commonTranslations[lang], ...importHistoryTranslations[lang] };

  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [undoingId, setUndoingId] = useState<string | null>(null);
  const [offline, setOffline] = useState(false);

  useEffect(() => {
    load();
  }, []);

  const load = () => {
    setLoading(true);
    safeFetch("/api/admin/import/history")
      .then((res) => res.json())
      .then((data) => {
        setHistory(data.history || []);
        setOffline(false);
      })
      .catch((err) => {
        setOffline(isOfflineError(err));
      })
      .finally(() => setLoading(false));
  };

  const handleUndo = async (id: string) => {
    if (!confirm(t.confirm_undo)) return;

    setUndoingId(id);
    try {
      const res = await safeFetch("/api/admin/import/undo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ importHistoryId: id }),
      });
      const data = await res.json();

      if (data.success) {
        alert(t.undo_success);
        load();
      } else {
        alert(data.message);
      }
    } catch (err) {
      if (isOfflineError(err)) {
        alert("You're offline. Please check your connection and try again.");
      } else {
        alert("Something went wrong. Please try again.");
      }
    } finally {
      setUndoingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#FBF7F1] py-8 sm:py-10 md:py-12 px-3 sm:px-4">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-2xl md:text-3xl font-bold text-[#C81E3A] mb-1 sm:mb-2">{t.title}</h1>
          <p className="text-[#5B5964] text-xs sm:text-sm">{t.desc}</p>
        </div>

        <div className="bg-white rounded-3xl border border-black/5 shadow-sm overflow-hidden">
          {loading ? (
            <p className="p-6 sm:p-8 md:p-10 text-center text-[#5B5964]">{t.loading}</p>
          ) : offline ? (
            <div className="p-6 sm:p-8 md:p-10">
              <OfflineCard onRetry={load} />
            </div>
          ) : history.length === 0 ? (
            <p className="p-6 sm:p-8 md:p-10 text-center text-[#5B5964]">{t.empty}</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-xs sm:text-sm min-w-[700px]">
                <thead>
                  <tr className="text-left text-xs uppercase tracking-wider text-black/40 border-b border-black/5">
                    <th className="py-2 sm:py-3 px-2 sm:px-4">{t.col_file}</th>
                    <th className="py-2 sm:py-3 px-2 sm:px-4">{t.col_date}</th>
                    <th className="py-2 sm:py-3 px-2 sm:px-4">{t.col_admin}</th>
                    <th className="py-2 sm:py-3 px-2 sm:px-4">{t.col_imported}</th>
                    <th className="py-2 sm:py-3 px-2 sm:px-4">{t.col_skipped}</th>
                    <th className="py-2 sm:py-3 px-2 sm:px-4">{t.col_failed}</th>
                    <th className="py-2 sm:py-3 px-2 sm:px-4">{t.col_action}</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((h) => (
                    <tr key={h._id} className="border-b border-black/5 last:border-0">
                      <td className="py-2 sm:py-3 px-2 sm:px-4 font-medium text-[#15141A]">{h.fileName}</td>
                      <td className="py-2 sm:py-3 px-2 sm:px-4 text-[#5B5964]">
                        {new Date(h.createdAt).toLocaleString()}
                      </td>
                      <td className="py-2 sm:py-3 px-2 sm:px-4 text-[#5B5964]">
                        {h.importedBy?.fullName || "—"}
                      </td>
                      <td className="py-2 sm:py-3 px-2 sm:px-4 font-semibold text-[#0F6E66]">{h.imported}</td>
                      <td className="py-2 sm:py-3 px-2 sm:px-4 text-[#B45309]">{h.skipped}</td>
                      <td className="py-2 sm:py-3 px-2 sm:px-4 text-[#C81E3A]">{h.failed}</td>
                      <td className="py-2 sm:py-3 px-2 sm:px-4">
                        {h.undone ? (
                          <span className="text-xs font-semibold text-black/30">
                            {t.undone_label}
                          </span>
                        ) : (
                          <button
                            onClick={() => handleUndo(h._id)}
                            disabled={undoingId === h._id}
                            className="text-xs font-semibold bg-[#C81E3A] hover:bg-[#A11530] disabled:opacity-50 text-white px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg transition"
                          >
                            {undoingId === h._id ? t.undoing : t.undo_btn}
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
