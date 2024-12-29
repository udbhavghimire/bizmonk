"use client";

export default function ClientLayout({ children }) {
  return (
    <body suppressHydrationWarning className="antialiased">
      {children}
    </body>
  );
}
