"use client";
import { useEffect, Suspense } from "react";
import { usePathname } from "next/navigation";
import NProgress from "nprogress";

NProgress.configure({
  showSpinner: false,
  trickleSpeed: 200,
  minimum: 0.08,
});

const LoadingBarContent = () => {
  const pathname = usePathname();

  useEffect(() => {
    NProgress.start();
    
    // Small delay to make the loading bar visible even on fast page loads
    const timer = setTimeout(() => {
      NProgress.done();
    }, 200);

    return () => {
      clearTimeout(timer);
      NProgress.done();
    };
  }, [pathname]);

  return null;
};

const LoadingBar = () => {
  return (
    <Suspense fallback={null}>
      <LoadingBarContent />
    </Suspense>
  );
};

export default LoadingBar;
