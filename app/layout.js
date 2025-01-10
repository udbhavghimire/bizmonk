import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LoadingBar from "@/components/LoadingBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Bizmonk",
  description: "Find your business space",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LoadingBar />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
