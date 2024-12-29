import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import ClientLayout from "./ClientLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Bizmonk - Find Your Perfect Business Location",
  description:
    "Discover premium business opportunities across the Greater Toronto Area",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <ClientLayout>
        <main className={`${geistSans.variable} ${geistMono.variable}`}>
          <Navbar />
          {children}
        </main>
      </ClientLayout>
    </html>
  );
}
