import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";
import "./experience.css";
import "./polish.css";
import ExperienceMotion from "@/components/ExperienceMotion";
export const metadata: Metadata = {
  title: {
    default: "Wellspring & Watershed — Turning points for better relations",
    template: "%s | Wellspring & Watershed",
  },
  description:
    "Public relations, community integration, multi-agency partnerships, statutory consultation and 24/7 crisis response. Wellspring & Watershed, company number 17469585.",
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "Wellspring & Watershed",
    description:
      "Turning points for better relations. Connecting communities and institutions through trust, dialogue and shared purpose.",
    type: "website",
    locale: "en_GB",
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-GB" data-scroll-behavior="smooth">
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <ExperienceMotion />
      </body>
    </html>
  );
}
