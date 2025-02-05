import { Inter } from "next/font/google";
import "./globals.css";
import ClientLayout from "./ClientLayout";
import LoadingBar from "./components/LoadingBar";
import "leaflet/dist/leaflet.css";
import "nprogress/nprogress.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

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
      <body suppressHydrationWarning className={inter.className}>
        <LoadingBar />
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
