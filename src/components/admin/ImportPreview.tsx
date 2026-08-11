"use client";

import { useMemo, useState } from "react";

type ParsedRow = {
  rowIndex: number;
  data: Record<string, any>;
  status: "valid" | "duplicate" | "invalid";
  reason: string;
};

export default function ImportPreview({
  t,
  fileName,
  rows,
  onConfirm,
  onBack,
  submitting,
}: {
  t: Record<string, string>;
  fileName: string;
  rows: ParsedRow[];
  onConfirm: (selectedRows: Record<string, any>[]) => void;
  onBack: () => void;
  submitting: boolean;
}) {
  // Valid rows start checked; duplicate/invalid start unchecked but
  // the admin can still override and include them manually.
  const [checked, setChecked] = useState<Record<number, boolean>>(() =>
    Object.fromEntries(rows.map((r) => [r.rowIndex, r.status === "valid"]))
  );

  const selectedCount = useMemo(
    () => Object.values(checked).filter(Boolean).length,
    [checked]
  );

  const toggle = (rowIndex: number) => {
    setChecked((prev) => ({ ...prev, [rowIndex]: !prev[rowIndex] }));
  };

  const handleConfirm = () => {
    const selected = rows
      .filter((r) => checked[r.rowIndex])
      .map((r) => r.data);
    onConfirm(selected);
  };

  const STATUS_STYLE: Record<string, { bg: string; text: string; label: string }> = {
    valid: { bg: "#0F6E6618", text: "#0F6E66", label: t.status_valid },
    duplicate: { bg: "#B4530918", text: "#B45309", label: t.status_duplicate },
    invalid: { bg: "#C81E3A18", text: "#C81E3A", label: t.status_invalid },
  };

  return (
    <div className="bg-white rounded-3xl border border-black/5 shadow-sm p-6 md:p-8">
      <div className="flex items-center justify-between flex-wrap gap-3 mb-2">
        <div>
          <h2 className="text-xl font-bold text-[#15141A]">{t.preview_title}</h2>
          <p className="text-xs text-black/40 mt-1">{fileName}</p>
        </div>
        <span className="text-sm font-semibold text-[#15141A]">
          {selectedCount} {t.selected_count} {rows.length}
        </span>
      </div>

      <p className="text-[#5B5964] text-sm mb-6">{t.preview_desc}</p>

      <div className="overflow-x-auto -mx-6 md:mx-0">
        <table className="w-full text-sm min-w-[700px]">
          <thead>
            <tr className="text-left text-xs uppercase tracking-wider text-black/40 border-b border-black/5">
              <th className="py-3 px-3">{t.col_select}</th>
              <th className="py-3 px-3">{t.col_name}</th>
              <th className="py-3 px-3">{t.col_blood_group}</th>
              <th className="py-3 px-3">{t.col_phone}</th>
              <th className="py-3 px-3">{t.col_city}</th>
              <th className="py-3 px-3">{t.col_status}</th>
              <th className="py-3 px-3">{t.col_reason}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => {
              const style = STATUS_STYLE[r.status];
              return (
                <tr key={r.rowIndex} className="border-b border-black/5 last:border-0">
                  <td className="py-3 px-3">
                    <input
                      type="checkbox"
                      checked={!!checked[r.rowIndex]}
                      onChange={() => toggle(r.rowIndex)}
                      className="w-4 h-4 accent-[#C81E3A]"
                    />
                  </td>
                  <td className="py-3 px-3 font-medium text-[#15141A]">{r.data.fullName || "—"}</td>
                  <td className="py-3 px-3">{r.data.bloodGroup || "—"}</td>
                  <td className="py-3 px-3 text-[#5B5964]">
                    {r.data.whatsappNumber || r.data.localNumber || "—"}
                  </td>
                  <td className="py-3 px-3 text-[#5B5964]">{r.data.city || "—"}</td>
                  <td className="py-3 px-3">
                    <span
                      className="text-[11px] font-bold px-2.5 py-1 rounded-full"
                      style={{ backgroundColor: style.bg, color: style.text }}
                    >
                      {style.label}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-xs text-black/40">{r.reason || "—"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col md:flex-row gap-3 mt-8">
        <button
          onClick={handleConfirm}
          disabled={submitting || selectedCount === 0}
          className="flex-1 bg-[#C81E3A] hover:bg-[#A11530] disabled:opacity-50 text-white py-3 rounded-xl font-bold transition"
        >
          {submitting ? t.importing : t.confirm_import}
        </button>

        <button
          onClick={onBack}
          disabled={submitting}
          className="border border-black/10 text-[#15141A] py-3 px-6 rounded-xl font-semibold hover:bg-black/5 transition"
        >
          {t.back_to_upload}
        </button>
      </div>
    </div>
  );
}