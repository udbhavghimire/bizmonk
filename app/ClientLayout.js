"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LoadingBar from "@/components/LoadingBar";
import { NextUIProvider } from "@nextui-org/react";
import { Suspense } from "react";

export default function ClientLayout({ children }) {
  return (
    <>
      <Suspense fallback={null}>
        <LoadingBar />
      </Suspense>
      <Navbar />
      <NextUIProvider>
        <main>{children}</main>
      </NextUIProvider>
      <Footer />
    </>
  );
}
