"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { safeFetch, isOfflineError } from "@/lib/safeFetch";
import OfflineCard from "@/components/network/OfflineCard";
import ShareButton from "@/components/ShareButton";

// ===============================
// STATIC CONTENT
// Name / photo / WhatsApp / email come LIVE from the database (via the
// "developer" role on /api/team) — never duplicate those here.
// ===============================

const TITLE = "Full-Stack & AI Developer";

const BIO =
  "I build modern, responsive full-stack web applications and AI-powered products using Next.js, React, TypeScript, Node.js, databases, APIs, and modern AI technologies. My projects focus on solving real-world problems through practical software, AI integration, real-time collaboration, and modern user experiences.";

const EDUCATION = "BS Artificial Intelligence — Superior University, Sargodha Campus, Pakistan";

// Grouped skills — keeps the badge list readable instead of one long wall.
const SKILL_GROUPS: { label: string; items: string[] }[] = [
  { label: "Core", items: ["Next.js", "React", "TypeScript", "JavaScript", "Tailwind CSS", "Node.js"] },
  { label: "Backend & Database", items: ["REST APIs", "JWT", "MongoDB", "MongoDB Atlas", "PostgreSQL", "Prisma"] },
  { label: "AI", items: ["Gemini", "OpenAI API", "AI App Development", "AI Dashboards"] },
  { label: "Real-Time", items: ["Socket.io", "Real-Time Chat", "Collaborative Apps"] },
  { label: "Deployment", items: ["Vercel", "Render", "Railway", "GitHub"] },
  { label: "Other", items: ["Leaflet", "n8n", "Godot", "Cloudinary"] },
];

// Portfolio projects. This app itself (Emergency Blood Donation Network)
// is deliberately left out here since the whole site already showcases it.
const PROJECTS: { name: string; description: string }[] = [
  {
    name: "AI Blog Writer",
    description: "AI-powered content and blog generation application.",
  },
  {
    name: "AI Mock Interview",
    description: "An AI interview simulator for practicing real interview scenarios.",
  },
  {
    name: "Real-Time Collaborative Whiteboard",
    description:
      "Excalidraw-inspired whiteboard with pen, shapes, eraser, rooms, and real-time multi-user sync.",
  },
  {
    name: "Real-Time Chat App",
    description: "Real-time messaging app built with Socket.io, Next.js, and MongoDB.",
  },
  {
    name: "Maps App",
    description: "Location-based application with interactive maps built on Leaflet.",
  },
  {
    name: "Game Platform",
    description: "Android/web game platform built with Godot, with a focus on short-session games.",
  },
];

// ===============================
// LINKS — fill in the `url` for whichever of these you have, and delete
// any row you don't want shown. Each row already has the right icon/label;
// just paste your real link in. Order here = order shown on the page.
// ===============================
const LINKS: { label: string; icon: string; url: string }[] = [
  { label: "GitHub", icon: "💻", url: "https://github.com/bilalhassan1855786-debug" }, // e.g. "https://github.com/bilalhassan1855786-debug"
  { label: "LinkedIn", icon: "🔗", url: "https://www.linkedin.com/in/bilal-hassan-160762397/" }, // e.g. "https://www.linkedin.com/in/bilal-hassan-160762397/"
  { label: "Portfolio", icon: "🌐", url: "https://bilal-portfolio-rouge.vercel.app/" }, // e.g. "https://your-portfolio-site.com"
];

type TeamMember = {
  fullName: string;
  email?: string;
  whatsappNumber?: string;
  photo?: string;
  role: string;
};

export default function DeveloperPage() {
  const [developer, setDeveloper] = useState<TeamMember | null>(null);
  const [loading, setLoading] = useState(true);
  const [offline, setOffline] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const res = await safeFetch("/api/team");
      const data = await res.json();

      const dev = (data.team || []).find(
        (m: TeamMember) => m.role === "developer"
      );

      setDeveloper(dev || null);
      setOffline(false);
    } catch (err) {
      setOffline(isOfflineError(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-[#5B5964]">
        Loading...
      </div>
    );
  }

  if (offline) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <OfflineCard onRetry={load} />
      </div>
    );
  }

  const activeLinks = LINKS.filter((link) => link.url);

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <div className="bg-white rounded-3xl border border-black/5 shadow-sm p-10 text-center">
        <div className="w-28 h-28 rounded-full overflow-hidden mx-auto mb-6 bg-black/5 flex items-center justify-center text-4xl">
          {developer?.photo ? (
            <Image
              src={developer.photo}
              alt={developer.fullName}
              width={112}
              height={112}
              className="object-cover w-full h-full"
            />
          ) : (
            "👨‍💻"
          )}
        </div>

        <h1 className="text-2xl font-bold text-[#15141A] mb-1">
          {developer?.fullName || "Bilal Hassan"}
        </h1>
        <p className="text-[#C81E3A] font-semibold text-sm mb-1">{TITLE}</p>
        <p className="text-[#5B5964] text-xs mb-6">{EDUCATION}</p>

        <p className="text-[#5B5964] leading-7 mb-8 max-w-xl mx-auto">{BIO}</p>

        {/* Skills */}
        <div className="mb-10 text-left max-w-xl mx-auto">
          {SKILL_GROUPS.map((group) => (
            <div key={group.label} className="mb-4">
              <p className="text-xs font-bold text-[#5B5964] uppercase tracking-wide mb-2">
                {group.label}
              </p>
              <div className="flex flex-wrap gap-2">
                {group.items.map((skill) => (
                  <span
                    key={skill}
                    className="bg-black/5 text-[#15141A] text-xs font-semibold px-3 py-1.5 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Contact + social links */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {developer?.whatsappNumber && (
            <a
              href={`https://wa.me/${developer.whatsappNumber.replace(/\D/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#C81E3A] hover:bg-[#A11530] text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition"
            >
              💬 WhatsApp
            </a>
          )}
          {developer?.email && (
            <a
              href={`mailto:${developer.email}`}
              className="bg-black/5 hover:bg-black/10 text-[#15141A] text-sm font-semibold px-5 py-2.5 rounded-lg transition"
            >
              ✉️ Email
            </a>
          )}
          {activeLinks.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-black/5 hover:bg-black/10 text-[#15141A] text-sm font-semibold px-5 py-2.5 rounded-lg transition"
            >
              {link.icon} {link.label}
            </a>
          ))}
        </div>

        {/* Projects */}
        <div className="text-left border-t border-black/5 pt-8">
          <h2 className="text-lg font-bold text-[#15141A] mb-5 text-center">
            Projects
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {PROJECTS.map((project) => (
              <div
                key={project.name}
                className="bg-[#FBF7F1] rounded-2xl border border-black/5 p-4"
              >
                <p className="font-semibold text-[#15141A] text-sm mb-1">
                  {project.name}
                </p>
                <p className="text-[#5B5964] text-xs leading-5">
                  {project.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10">
          <ShareButton
            title={`${developer?.fullName || "Bilal Hassan"} — Emergency Blood Donation Network`}
            text="Check out the developer behind this app."
            label="Share this page"
            className="inline-flex items-center gap-2 bg-black/5 hover:bg-black/10 text-[#15141A] text-sm font-semibold px-5 py-2.5 rounded-lg transition"
          />
        </div>
      </div>
    </div>
  );
}