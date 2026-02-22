import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "T V L Bharathwaj | Portfolio",
  description: "AI/ML Engineer & Full Stack Developer — Interactive 3D portfolio by T V L Bharathwaj",
  keywords: "AI, ML, GenAI, Full Stack, Portfolio, Next.js, React, Developer, T V L Bharathwaj",
  authors: [{ name: "T V L Bharathwaj" }],
  creator: "T V L Bharathwaj",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
  },
  openGraph: {
    title: "T V L Bharathwaj | Portfolio",
    description: "AI/ML Engineer & Full Stack Developer — Interactive 3D portfolio by T V L Bharathwaj",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "T V L Bharathwaj | Portfolio",
    description: "AI/ML Engineer & Full Stack Developer — Interactive 3D portfolio by T V L Bharathwaj",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}
      >
        {children}
      </body>
    </html>
  );
}