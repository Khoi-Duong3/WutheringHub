import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link"
import Navbar from "./components/NavBar";
import Script from 'next/script'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WutheringHub",
  description: "The source of tools, guides, and information for Wuthering Waves",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Script
          src="https://platform.twitter.com/widgets.js"
          strategy="lazyOnload"
          id="twitter-wjs"
        />

        <Navbar />
        <div>
          {" "}
        </div>
        <main className="pt-16">
          {children}
        </main>
      </body>
    </html>
  );
}
