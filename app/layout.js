import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import ClientLayout from "./ClientLayout";
import "leaflet/dist/leaflet.css";
import "nprogress/nprogress.css";

const bricolage = Bricolage_Grotesque({ subsets: ["latin"] });

export const metadata = {
  title: "Bizmonk - Find your business space in Greater Toronto Area",
  description:
    "Looking for a business space in Greater Toronto Area? Bizmonk is the best place to find your business space.",
};

// Add custom styles for NProgress
const customNProgressStyles = `
  #nprogress .bar {
    background: #2563eb !important;
    height: 3px !important;
  }
  #nprogress .peg {
    box-shadow: 0 0 10px #2563eb, 0 0 5px #2563eb !important;
  }
  #nprogress .spinner-icon {
    display: none;
  }
`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <style>{customNProgressStyles}</style>
      </head>
      <body suppressHydrationWarning className={bricolage.className}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
