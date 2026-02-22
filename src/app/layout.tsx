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
  title: "F1 Portfolio | T V L Bharathwaj",
  description: "Interactive 3D Formula 1 themed portfolio showcasing full-stack development skills",
  keywords: "F1, Formula 1, Portfolio, 3D, Three.js, React, Next.js, Developer, Full Stack",
  authors: [{ name: "T V L Bharathwaj" }],
  creator: "T V L Bharathwaj",
  publisher: "T V L Bharathwaj",
  openGraph: {
    title: "F1 Portfolio | T V L Bharathwaj",
    description: "Interactive 3D Formula 1 themed portfolio showcasing full-stack development skills",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "F1 Portfolio | T V L Bharathwaj",
    description: "Interactive 3D Formula 1 themed portfolio showcasing full-stack development skills",
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