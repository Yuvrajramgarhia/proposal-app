import type { Metadata } from "next";
import { Inter, Great_Vibes } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/ui/CustomCursor";
import FloatingNav from "@/components/ui/FloatingNav";
import MusicPlayer from "@/components/ui/MusicPlayer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const greatVibes = Great_Vibes({
  weight: "400",
  variable: "--font-great-vibes",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "For Muskan ❤️",
  description: "Every love story is beautiful... but ours is my favorite.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${inter.variable} ${greatVibes.variable} antialiased bg-brand-dark text-brand-light font-sans selection:bg-brand-rose selection:text-white`}
      >
        <CustomCursor />
        <MusicPlayer />
        {children}
        <FloatingNav />
      </body>
    </html>
  );
}
