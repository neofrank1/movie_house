import type { Metadata } from "next";
import "../styles/globals.css";

import { Archivo_Black, Space_Grotesk } from "next/font/google";
import { Toaster } from "@/components/retroui/Sonner";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
 
const archivoBlack = Archivo_Black({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-head",
  display: "swap",
});
 
const space = Space_Grotesk({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Movie House",
  description: "Movie House",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${archivoBlack.variable} ${space.variable} antialiased`}
      >
        <Toaster visibleToasts={1} position="bottom-center" />
        {children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}