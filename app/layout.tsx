import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollDepthTracker from "./components/ScrollDepthTracker";
import AnalyticsProvider from "./components/AnalyticsProvider";
import WebVitalsReporter from "./components/WebVitalsReporter";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://linguabatch.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "LinguaBatch — Efficient Translation & Document Workflow Automation",
    template: "%s · LinguaBatch",
  },
  description:
    "Translate entire PDFs, Excel sheets, and PowerPoint presentations — no copy-paste, directly in your browser. LinguaBatch turns manual translation into automated, scalable document workflows.",
  keywords: [
    "document translation",
    "batch translation",
    "PDF translation",
    "Excel translation",
    "PowerPoint translation",
    "translation workflow",
    "AI document processing",
    "localization automation",
    "enterprise translation",
  ],
  authors: [{ name: "LinguaBatch" }],
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "LinguaBatch — Translation & Workflow Optimization for Large Documents",
    description:
      "Translate entire PDFs, Excel sheets, and PowerPoint presentations — no copy-paste, directly in your browser.",
    siteName: "LinguaBatch",
  },
  twitter: {
    card: "summary_large_image",
    title: "LinguaBatch",
    description:
      "Efficient translation and workflow optimization for large documents.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: { canonical: SITE_URL },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <ScrollDepthTracker />
        <AnalyticsProvider />
        <WebVitalsReporter />
        {gaId ? <GoogleAnalytics gaId={gaId} /> : null}
        <Analytics />
      </body>
    </html>
  );
}
