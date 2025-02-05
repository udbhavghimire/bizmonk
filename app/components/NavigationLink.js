"use client";

import Link from "next/link";
import { startNavigationLoading } from "@/app/utils/navigation";

export default function NavigationLink({
  href,
  children,
  className,
  ...props
}) {
  return (
    <Link
      href={href}
      onClick={startNavigationLoading}
      className={className}
      {...props}
    >
      {children}
    </Link>
  );
}
