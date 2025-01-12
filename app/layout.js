import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LoadingBar from "@/components/LoadingBar";

const bricolage = Bricolage_Grotesque({ subsets: ["latin"] });

export const metadata = {
  title: "Bizmonk - Find your business space in Greater Toronto Area",
  description:
    "Looking for a business space in Greater Toronto Area? Bizmonk is the best place to find your business space.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={bricolage.className}>
        <LoadingBar />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
