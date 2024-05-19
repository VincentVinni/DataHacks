import type { Metadata } from "next";
import { Oranienbaum, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/components/navbar";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const oran = Oranienbaum({ subsets: ["latin"], variable: '--font-oran', weight: '400' });

export const metadata: Metadata = {
  title: "ai or not?",
  description: "The idea is simple. You are presented with 2 images side by side, and you have to pick the one that is real. The images that fool y’all the most times will go on the leaderboard. Analyze them carefully, because the AI-generated ones can get quite good! ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <link rel="icon" href="/favicon.ico?" sizes="any" />
      <body className={`bg-customGray text-white ${oran.variable}`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
