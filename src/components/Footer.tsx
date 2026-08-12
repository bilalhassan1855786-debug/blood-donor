"use client";

import Link from "next/link";
import { Space_Grotesk, IBM_Plex_Mono } from "next/font/google";
import { useLanguage } from "@/context/LanguageContext";
import { footerTranslations } from "@/lib/translations/footer";
import ShareButton from "@/components/ShareButton";

const display = Space_Grotesk({ subsets: ["latin"], weight: ["600", "700"] });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"] });

// ===============================
// TEAM CONTACTS
// ⚠️ Amjad aur Shabir ke phone/whatsapp/email abhi placeholder hain —
// inhe real numbers se replace kar dein.
// ===============================
type Contact = {
  name: string;
  roleKey: "super_admin" | "admin";
  phone: string; // tel: format, e.g. "+923456665997"
  whatsapp: string; // digits only, e.g. "923456665997"
  email: string;
};

const CONTACTS: Contact[] = [
  {
    name: "Muhammad Irfan",
    roleKey: "super_admin",
    phone: "+923456665997",
    whatsapp: "923456665997",
    email: "irfansaleemi6665@gmail.com",
  },
  {
    name: "Muhammad Amjad",
    roleKey: "admin",
    phone: "+923218615531", // TODO: real number
    whatsapp: "923218615531", // TODO: real number
    email: "ianamjad.me@gmail.com", // TODO: real email
  },
  {
    name: "Ghulam Shabir",
    roleKey: "admin",
    phone: "+923348741624", // TODO: real number
    whatsapp: "+923348741624", // TODO: real number
    email: "Jinnahlabkalowal@gmail.com", // TODO: real email
  },
];

export default function Footer() {
  const { lang } = useLanguage();
  const ft = footerTranslations[lang as keyof typeof footerTranslations];

  return (
    <footer className="bg-[#15141A] text-white mt-20">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <h2 className={`${display.className} text-xl font-bold text-[#C81E3A] leading-tight`}>
              EMERGENCY BLOOD
              <br />
              DONATION NETWORK
            </h2>

            <p className="text-white/50 mt-4 leading-7 text-sm">
              {ft.brand_desc}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className={`${display.className} font-semibold text-lg mb-5`}>
              {ft.quick_links}
            </h3>

            <ul className="space-y-3 text-white/60 text-sm">
              <li>
                <Link href="/" className="hover:text-white transition">
                  {ft.home}
                </Link>
              </li>
              <li>
                <Link href="/donors" className="hover:text-white transition">
                  {ft.find_donors}
                </Link>
              </li>
              <li>
                <Link href="/become-donor" className="hover:text-white transition">
                  {ft.become_donor}
                </Link>
              </li>
              <li>
                <Link href="/request-blood" className="hover:text-white transition">
                  {ft.request_blood}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition">
                  {ft.contact}
                </Link>
              </li>
              <li>
                <Link href="/developer" className="hover:text-white transition">
                  Developer
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick emergency action */}
          <div>
            <h3 className={`${display.className} font-semibold text-lg mb-5`}>
              {ft.emergency_title}
            </h3>

            <div className="flex flex-col gap-3">
              <a
                href={`tel:${CONTACTS[0].phone}`}
                className="motion-safe:animate-pulse bg-[#C81E3A] hover:bg-[#A11530] text-white text-center py-3 px-4 rounded-xl font-semibold transition"
              >
                📞 {ft.call_now}
              </a>
              <a
                href={`https://wa.me/${CONTACTS[0].whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/15 border border-white/10 text-white text-center py-3 px-4 rounded-xl font-semibold transition"
              >
                💬 {ft.whatsapp}
              </a>
              <ShareButton
                title="Emergency Blood Donation Network"
                text="Save lives — join the Emergency Blood Donation Network."
                label="Share this app"
              />
            </div>
          </div>
        </div>

        {/* Team contacts */}
        <div className="mt-14 pt-12 border-t border-white/10">
          <h3 className={`${display.className} text-xl font-bold mb-8 text-center`}>
            {ft.contacts_heading}
          </h3>

          <div className="grid md:grid-cols-3 gap-6">
            {CONTACTS.map((contact) => (
              <ContactCard key={contact.name} contact={contact} ft={ft} />
            ))}
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-white/40 text-xs">
          <p>
            © {new Date().getFullYear()} EMERGENCY BLOOD DONATION NETWORK. {ft.rights_reserved}
          </p>

          <div className="flex items-center gap-5">
            <Link href="/privacy-policy" className="hover:text-white transition">
              {ft.privacy_policy}
            </Link>
            <span className="text-white/20">•</span>
            <Link href="/terms-conditions" className="hover:text-white transition">
              {ft.terms}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ===============================
// CONTACT CARD — Super Admin gets a crimson badge, Admins get teal
// ===============================
function ContactCard({
  contact,
  ft,
}: {
  contact: Contact;
  ft: Record<string, string>;
}) {
  const isSuperAdmin = contact.roleKey === "super_admin";
  const badgeColor = isSuperAdmin ? "#C81E3A" : "#0F6E66";
  const roleLabel = isSuperAdmin ? ft.super_admin : ft.admin;

  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-6 hover:border-white/20 transition">
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-11 h-11 rounded-full flex items-center justify-center text-lg font-semibold"
          style={{ backgroundColor: `${badgeColor}22`, color: badgeColor }}
        >
          👤
        </div>
        <div>
          <p className="font-semibold text-white text-sm">{contact.name}</p>
          <span
            className="text-[11px] font-medium px-2 py-0.5 rounded-full inline-block mt-0.5"
            style={{ backgroundColor: `${badgeColor}22`, color: badgeColor }}
          >
            {roleLabel}
          </span>
        </div>
      </div>

      <div className={`${mono.className} text-xs text-white/50 space-y-1 mb-4`}>
        <p>{contact.phone}</p>
        <p className="truncate">{contact.email}</p>
      </div>

      <div className="flex gap-2">
        <a
          href={`tel:${contact.phone}`}
          className="flex-1 text-center bg-[#C81E3A] hover:bg-[#A11530] text-white text-xs font-semibold py-2 rounded-lg transition"
        >
          📞 {ft.call_now}
        </a>
        <a
          href={`https://wa.me/${contact.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 text-center bg-white/10 hover:bg-white/15 border border-white/10 text-white text-xs font-semibold py-2 rounded-lg transition"
        >
          💬 {ft.chat}
        </a>
      </div>
    </div>
  );
}