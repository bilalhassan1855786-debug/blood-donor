"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Space_Grotesk, IBM_Plex_Mono } from "next/font/google";
import { useLanguage } from "@/context/LanguageContext";
import { healthTipsContent } from "@/lib/translations/health-tips";

const display = Space_Grotesk({ subsets: ["latin"], weight: ["600", "700"] });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["500", "600"] });

// Order matters here: it's the layout order for the compatibility rows.
const BLOOD_GROUPS = ["O-", "O+", "A-", "A+", "B-", "B+", "AB-", "AB+"];

// Which patient blood groups a given donor group can safely give to.
const COMPATIBILITY: Record<string, string[]> = {
  "O-": ["O-", "O+", "A-", "A+", "B-", "B+", "AB-", "AB+"],
  "O+": ["O+", "A+", "B+", "AB+"],
  "A-": ["A-", "A+", "AB-", "AB+"],
  "A+": ["A+", "AB+"],
  "B-": ["B-", "B+", "AB-", "AB+"],
  "B+": ["B+", "AB+"],
  "AB-": ["AB-", "AB+"],
  "AB+": ["AB+"],
};

// How long (ms) each donor stays highlighted before the demo auto-advances.
const AUTO_ADVANCE_MS = 4000;

export default function HealthTipsPage() {
  const { lang } = useLanguage();
  const c = healthTipsContent[lang];

  return (
    <div className="min-h-screen bg-[#FBF7F1] py-14 px-4">
      <style>{`
        @keyframes tipFadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes bloodDash {
          to { stroke-dashoffset: -28; }
        }
        @keyframes bagPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.06); }
        }
      `}</style>

      <div className="max-w-6xl mx-auto">
        {/* Header / brand strip */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="relative w-9 h-9 md:w-11 md:h-11 shrink-0">
            {/* Replace "/logo.png" below with your actual filename/extension
                if it isn't logo.png (e.g. logo.svg, logo.webp) */}
            <Image
              src="/logo.png"
              alt="App logo"
              fill
              sizes="44px"
              className="object-contain"
              priority
            />
          </div>
          <span className={`${mono.className} text-xs md:text-sm tracking-wider uppercase text-[#5B5964]`}>
            {"Blood Donation Guide"}
          </span>
        </div>

        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className={`${display.className} text-3xl md:text-5xl font-bold text-[#C81E3A] mb-4`}>
            {c.page_title}
          </h1>
          <p className="text-[#5B5964] max-w-2xl mx-auto leading-7">{c.page_desc}</p>
        </div>

        {/* 4 rotating tip tickers, placed around the page */}
        <div className="grid md:grid-cols-2 gap-5 mb-12">
          <TipTicker label={c.ticker_general_label} icon="💧" tips={c.general} accent="#0F6E66" />
          <TipTicker label={c.ticker_facts_label} icon="💡" tips={c.facts} accent="#4338CA" />
        </div>

        {/* Blood Compatibility diagram sits in the middle */}
        <BloodCompatibility c={c} />

        <div className="grid md:grid-cols-2 gap-5 mt-12">
          <TipTicker label={c.ticker_before_label} icon="🩸" tips={c.before} accent="#C81E3A" />
          <TipTicker label={c.ticker_after_label} icon="❤️" tips={c.after} accent="#B45309" />
        </div>
      </div>
    </div>
  );
}

// ===============================
// ROTATING TIP TICKER
// Cycles through its tips array automatically. Multiple instances on
// the page each hold their own timer/index, so they don't sync up —
// giving the page a livelier, "always something changing" feel.
// ===============================
function TipTicker({
  label,
  icon,
  tips,
  accent,
}: {
  label: string;
  icon: string;
  tips: string[];
  accent: string;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % tips.length);
    }, 5000);
    return () => clearInterval(id);
  }, [tips.length]);

  return (
    <div className="bg-white rounded-2xl border border-black/5 shadow-sm hover:shadow-md transition-shadow p-6 min-h-[120px] flex flex-col">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-lg">{icon}</span>
        <span
          className={`${mono.className} text-[11px] font-semibold uppercase tracking-wider`}
          style={{ color: accent }}
        >
          {label}
        </span>
      </div>

      <p
        key={index}
        className="text-sm text-[#15141A] leading-6 flex-1"
        style={{ animation: "tipFadeIn 0.6s ease" }}
      >
        {tips[index]}
      </p>

      <div className="flex gap-1.5 mt-4">
        {tips.map((_, i) => (
          <span
            key={i}
            className="h-1 flex-1 rounded-full transition-colors duration-500"
            style={{ backgroundColor: i === index ? accent : "#00000012" }}
          />
        ))}
      </div>
    </div>
  );
}

// ===============================
// BLOOD COMPATIBILITY DIAGRAM
// Donor row on top, patient (recipient) row on the bottom, a person
// avatar in the middle — every bag stays visibly "tubed" into the
// avatar at all times, and the demo auto-advances through every donor
// group on a loop so the flow is always moving, exactly like a looping
// explainer video. Tapping a bag jumps straight to it and the loop
// simply continues from there.
// ===============================
function BloodCompatibility({ c }: { c: (typeof healthTipsContent)["en"] }) {
  const [selected, setSelected] = useState<string>(BLOOD_GROUPS[0]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const compatible = COMPATIBILITY[selected];

  const restartTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setSelected((prev) => {
        const nextIndex = (BLOOD_GROUPS.indexOf(prev) + 1) % BLOOD_GROUPS.length;
        return BLOOD_GROUPS[nextIndex];
      });
    }, AUTO_ADVANCE_MS);
  };

  useEffect(() => {
    restartTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const handleSelect = (bg: string) => {
    setSelected(bg);
    restartTimer(); // keep the loop going smoothly from wherever the user tapped
  };

  // Layout math for the SVG overlay (viewBox is 800 x 320).
  const colX = (i: number) => ((i + 0.5) / BLOOD_GROUPS.length) * 800;
  const topAnchorY = 58;
  const bottomAnchorY = 262;
  const centerX = 400;
  const centerTopY = 128;
  const centerBottomY = 192;

  return (
    <div className="bg-white rounded-3xl border border-black/5 shadow-sm p-6 md:p-10">
      <div className="text-center mb-2">
        <h2 className={`${display.className} text-2xl md:text-3xl font-bold text-[#15141A]`}>
          {c.compatibility_title}
        </h2>
        <p className="text-[#5B5964] text-sm mt-2 max-w-xl mx-auto">{c.compatibility_desc}</p>
      </div>

      <div className="relative w-full mx-auto" style={{ maxWidth: 760, height: 320 }}>
        {/* Tubes: every donor↔avatar and avatar↔patient pair is always
            drawn faintly, so the whole rig reads as "connected", and the
            currently active path glows red with a flowing dash. */}
        <svg
          viewBox="0 0 800 320"
          className="absolute inset-0 w-full h-full pointer-events-none"
          preserveAspectRatio="none"
        >
          {BLOOD_GROUPS.map((bg, i) => {
            const x = colX(i);
            const isActiveDonor = bg === selected;
            return (
              <path
                key={`d-${bg}`}
                d={`M ${x} ${topAnchorY + 16} C ${x} ${topAnchorY + 60}, ${centerX} ${centerTopY - 40}, ${centerX} ${centerTopY}`}
                fill="none"
                stroke={isActiveDonor ? "#C81E3A" : "#00000014"}
                strokeWidth={isActiveDonor ? 3 : 2}
                strokeLinecap="round"
                strokeDasharray={isActiveDonor ? "8 6" : undefined}
                style={isActiveDonor ? { animation: "bloodDash 0.8s linear infinite" } : undefined}
              />
            );
          })}

          {BLOOD_GROUPS.map((bg, i) => {
            const x = colX(i);
            const isCompatible = compatible.includes(bg);
            return (
              <path
                key={`p-${bg}`}
                d={`M ${centerX} ${centerBottomY} C ${centerX} ${centerBottomY + 40}, ${x} ${bottomAnchorY - 60}, ${x} ${bottomAnchorY - 16}`}
                fill="none"
                stroke={isCompatible ? "#C81E3A" : "#00000014"}
                strokeWidth={isCompatible ? 2.75 : 2}
                strokeLinecap="round"
                strokeDasharray={isCompatible ? "7 6" : undefined}
                opacity={isCompatible ? 0.9 : 1}
                style={isCompatible ? { animation: "bloodDash 0.9s linear infinite" } : undefined}
              />
            );
          })}
        </svg>

        {/* Donor row (top) */}
        <div className="absolute top-0 left-0 right-0 flex justify-between px-1">
          {BLOOD_GROUPS.map((bg) => (
            <BloodBag
              key={bg}
              label={bg}
              active={selected === bg}
              onClick={() => handleSelect(bg)}
              tone="donor"
            />
          ))}
        </div>

        {/* Avatar (center) */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center transition-colors duration-500"
            style={{
              backgroundColor: "#C81E3A1A",
              animation: "bagPulse 2.4s ease-in-out infinite",
            }}
          >
            <svg viewBox="0 0 48 48" className="w-10 h-10 md:w-12 md:h-12">
              <circle cx="24" cy="16" r="8" fill="#C81E3A" opacity={0.9} />
              <path d="M8 42c0-9 7-15 16-15s16 6 16 15" fill="#C81E3A" opacity={0.9} />
            </svg>
            <span
              className={`${mono.className} absolute text-[10px] md:text-xs font-bold text-white bg-[#C81E3A] px-2 py-0.5 rounded-full -bottom-2`}
            >
              {selected}
            </span>
          </div>
        </div>

        {/* Patient row (bottom) */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-between px-1">
          {BLOOD_GROUPS.map((bg) => (
            <BloodBag
              key={bg}
              label={bg}
              active={compatible.includes(bg)}
              tone="patient"
            />
          ))}
        </div>
      </div>

      {/* Labels under each row */}
      <div className="flex justify-between text-[10px] uppercase tracking-wider text-black/30 font-semibold mt-3 max-w-[760px] mx-auto">
        <span>{c.donor_label}</span>
        <span>{c.patient_label}</span>
      </div>

      {/* Result text */}
      <p className="text-center mt-8 text-sm text-[#15141A]">
        <span className="font-bold text-[#C81E3A]">{selected}</span>{" "}
        {c.can_donate_to}{" "}
        <span className="font-semibold">
          {selected === "O-" ? c.universal_donor : compatible.join(", ")}
        </span>
      </p>
    </div>
  );
}

// ===============================
// BLOOD BAG NODE
// A small drip-bag shaped badge used for both the donor row (top) and
// the patient row (bottom). "active" means: currently selected donor,
// or currently compatible patient — filled red; otherwise a plain
// outline bag.
// ===============================
function BloodBag({
  label,
  active,
  onClick,
  tone,
}: {
  label: string;
  active: boolean;
  onClick?: () => void;
  tone: "donor" | "patient";
}) {
  const patientAccent = "#0F6E66";
  const fill = active ? (tone === "donor" ? "#C81E3A" : patientAccent) : "#FFFFFF";
  const border = active ? (tone === "donor" ? "#C81E3A" : patientAccent) : "#00000018";
  const textColor = active ? "#FFFFFF" : "#15141A";

  const Comp = onClick ? "button" : "div";

  return (
    <Comp
      onClick={onClick}
      className={`relative w-11 h-14 md:w-14 md:h-[68px] flex flex-col items-center transition-transform duration-300 ${
        active ? "scale-110" : "scale-100"
      } ${onClick ? "cursor-pointer" : ""}`}
      style={{ transformOrigin: tone === "donor" ? "bottom center" : "top center" }}
    >
      {/* clip / tube nub */}
      <span
        className="w-2.5 h-2.5 rounded-sm"
        style={{ backgroundColor: border, opacity: 0.6 }}
      />
      {/* bag body */}
      <svg viewBox="0 0 44 52" className="w-full h-full drop-shadow-sm">
        <path
          d="M6 10 C6 4 14 2 22 2 C30 2 38 4 38 10 L38 34 C38 44 30 50 22 50 C14 50 6 44 6 34 Z"
          fill={fill}
          stroke={border}
          strokeWidth={2}
        />
        <text
          x="22"
          y="30"
          textAnchor="middle"
          fontSize="10.5"
          fontWeight={700}
          fill={textColor}
          fontFamily="var(--font-ibm-plex-mono), monospace"
        >
          {label}
        </text>
      </svg>
    </Comp>
  );
}