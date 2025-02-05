"use client";

import { useEffect } from "react";
import NProgress from "nprogress";
import { usePathname, useSearchParams } from "next/navigation";

export default function LoadingBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    NProgress.configure({
      showSpinner: false,
      minimum: 0.3,
      trickleSpeed: 200,
      easing: "ease",
      speed: 500,
    });

    // Add event listeners for navigation
    const handleStart = () => {
      NProgress.start();
    };

    const handleStop = () => {
      NProgress.done();
    };

    // Add event listeners
    document.addEventListener("navigationStart", handleStart);
    document.addEventListener("navigationEnd", handleStop);

    // For Next.js Link component and router navigation
    if (window?.navigation) {
      window.navigation.addEventListener("navigate", handleStart);
      window.navigation.addEventListener("navigatesuccess", handleStop);
      window.navigation.addEventListener("navigateerror", handleStop);
    }

    return () => {
      // Clean up event listeners
      document.removeEventListener("navigationStart", handleStart);
      document.removeEventListener("navigationEnd", handleStop);

      if (window?.navigation) {
        window.navigation.removeEventListener("navigate", handleStart);
        window.navigation.removeEventListener("navigatesuccess", handleStop);
        window.navigation.removeEventListener("navigateerror", handleStop);
      }
    };
  }, []);

  // Handle route changes from Next.js router
  useEffect(() => {
    NProgress.start();
    const timer = setTimeout(() => {
      NProgress.done();
    }, 300);

    return () => {
      clearTimeout(timer);
      NProgress.done();
    };
  }, [pathname, searchParams]);

  return null;
}
