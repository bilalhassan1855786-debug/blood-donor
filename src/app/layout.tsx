import type { Metadata } from "next";
// @ts-ignore
import "./globals.css";
import EmergencyButton from "@/components/EmergencyButton";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LanguageProvider } from "@/context/LanguageContext";
import { NetworkProvider } from "@/context/NetworkContext";
import OfflineBanner from "@/components/network/OfflineBanner";
import FeedbackPrompt from "@/components/FeedbackPrompt";
// @ts-ignore
import "leaflet/dist/leaflet.css";

export const metadata: Metadata = {
  title: "Emergency Blood Donation Network",
  description:
    "Emergency Blood Donation Network - Save Lives Through Blood Donation",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-100 min-h-screen flex flex-col">
        <NetworkProvider>
          <LanguageProvider>
            <OfflineBanner />
            <Navbar />

            <main className="flex-1">{children}</main>
            <EmergencyButton />

            <Footer />
            <FeedbackPrompt />
          </LanguageProvider>
        </NetworkProvider>
      </body>
    </html>
  );
}